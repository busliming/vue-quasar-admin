<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="消息中心" />
        <q-breadcrumbs-el label="我的消息" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px" style="margin: 0 10px 10px 10px;">
      <div class="search" id="top2">
        <div class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x border-radius-4px">
          <div class="append-handle-btn-input ml10x w-200 row position-relative">
            <a-input
              v-model.trim="searchForm.title"
              @keydown.enter="handle_search"
              placeholder="请输入消息标题"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
            </a-input>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input ml30x height-30px line-height-30px">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handle_search"
            >搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="pl10x pr10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
        childrenColumnName='child'
      >
        <!-- :class="record.isRead == 0?'fw_600': ''" -->
        <span slot="_index" slot-scope="text, record">
          <span>{{record._index}}</span>
        </span>
        <span slot="newTitle" slot-scope="text, record">
          <span class="mr10x">【系统消息】<span class="cursor-pointer"  @click="handleCopy(record.title,'消息标题')">{{record.title}}</span></span>
          <!-- 0 未读 -->
          <my-icon v-if="record.isRead == 0" type="p-icon-weidu1"></my-icon>
          <!-- 1 已读 -->
          <my-icon v-if="record.isRead == 1" type="p-icon-wei" class="text-panda-text-4"></my-icon>
        </span>
        <span
          slot="sendTime"
          slot-scope="text, record"
        
        >{{moment(record.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span slot="context" slot-scope="text, record">
          <span class="text-over" v-html="record.context" @click.prevent="handle_update_key(record)"></span>
        </span>
        <span slot="action" slot-scope="text, record" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看消息</div>
            </template>
            <q-icon @click.native="handle_look(record)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>
          <!-- confirm确认再次删除消息 -->
          <a-popconfirm
            title="你确定删除这项消息吗?"
            @confirm="confirm(record.id)"
            @cancel="cancel"
            okText="确定"
            cancelText="取消"
            placement="topRight"
          >
            <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">删除消息</div>
              </template>
              <q-icon class="panda-icon panda-icon-delete panda-icon-hover fs20 cursor-pointer"></q-icon>
            </a-tooltip>
          </a-popconfirm>
        </span>
      </a-table>
      <a-pagination
        v-if="tabledata.length>0"
        :total="pagination.total" 
        show-size-changer 
        show-quick-jumper
        :page-size-options="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :show-total="total => `共 ${pagination.total} 条数据`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      />

      <!-- 消息详情弹窗 -->
      <q-dialog
        v-model="dialogDetailShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-detail
          :detailObj="showDialogObj"
          @lookNew="handle_look_new"
          @deleteNew="handle_delete_new"
        ></dialog-detail>
      </q-dialog>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 310px 0;
}

.text-over {
  display: block;
  display: -webkit-box;
  max-width: 595px;
  margin: 0 auto;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.ant-table-middle > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.ant-table-middle > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant, api_message } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/message/mymessage/config/config.js";
import dialogDetail from "src/pages/message/mymessage/component/dialogDetail.vue";
import { getText } from "src/util/module/getText.js";
import moment from "moment";
import { handleCopy } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  components: {
    dialogDetail
  },
  data() {
    return {
      tabledata: [], // 表格数据
      columns: tablecolumns_config, // 表格配置
      tabledata_loading: false, // 表格loading
      searchForm: {
        title: "" // 消息标题
      },
      dialogDetailShow: false, //消息详情阀值
      showDialogObj: {}, // 传给弹窗的信息
      currentNew: {} //点击此处该详情
    };
  },
  computed: {
    ...mapGetters(["get_message"])
  },
  created() {
    this.tabledata_loading = true;
    this.initTableData();
  },
  methods: {
    ...mapActions(["clear_message","set_data"]),
    moment,
    getText,
    handleCopy,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_message.post_manage_news_list(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata, "tabledata");
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          if(code !== '00400430'){
            this.$message.error(msg, 5);
          }
          this.tabledata = [];
        }
      });
    },
    compute_init_tabledata_params() {
      let params = {
        title: this.searchForm.title, //公告标题，可模糊搜索
        pgNum: this.pagination.current, //分页，查询第几页数据。
        pgSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    /**
     * @description 点击此处逻辑  新用户跳转商户中心 key过期跳转key证书管理
     * @return {undefined} undefined
     */
    async handle_update_key(record) {
      let params = {
        id: record.id
      };
      let res = await api_message.post_manage_news_findById(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentNew = data;
        if (this.currentNew.type === 1) {
          // 新注册商户
          this.$router.push({ name: "merchantc" });
        } else {
          // 商户key是否过期信息
          this.$router.push({ name: "key_management" });
        }
        this.set_data(this.currentNew.children);
      } else {
        this.$message.error(msg);
      }
    },
    /**  点击搜索按钮
     * @description esc
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
    },
    /**
     * @description 查看信息详情
     * @return {undefined} undefined
     */
    handle_look(record) {
      this.showDialogObj = { ...record };
      this.dialogDetailShow = true;
    },
    /**
     * @description 确认按钮
     * @return {undefined} undefined
     */
    confirm(val) {
      let params = { id: val };
      api_message.post_manage_news_delete(params).then(res => {
        let { code, msg } = res.data;
        if (code === "0000000") {
          this.$message.success("删除我的消息成功！");
          this.handle_clear_vuex();
          this.handle_search();
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    /**
     * @description 弹窗里面的确定按钮 清除vuex值 重新拉取列表
     * @return {undefined} undefined
     */
    handle_look_new() {
      this.handle_clear_vuex();
      this.handle_search();
    },
    /**
     * @description 删除信息
     * @return {undefined} undefined
     */
    handle_delete_new(id) {
      this.confirm(id);
    },
    /**
     * @description 取消按钮
     * @return {undefined} undefined
     */
    cancel(e) {
      this.$message.warn("取消删除信息操作！");
    },
    /**
     * @description 清除vuex里面的值
     * @return {undefined} undefined
     */
    handle_clear_vuex() {
      this.get_message && this.clear_message(null);
    }
  },
  watch: {
    get_message: {
      handler: function(val) {
        if (val) {
          this.handle_look({ ...val });
        }
      },
      immediate: true
    }
  }
};
</script>
