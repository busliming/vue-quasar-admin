<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="消息中心" />
        <q-breadcrumbs-el label="公告栏" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px" style="margin: 0 10px 10px 10px;">
      <div id="top2"  class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x border-radius-4px">
        <div class="append-handle-btn-input ml10x w-200 position-relative">
          <a-input
            v-model.trim="searchForm.title"
            @keydown.enter="handle_search"
            placeholder="请输入公告标题"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>  
        <div class="append-handle-btn-input ml20x w-200 position-relative">
          <a-input
            v-model.trim="searchForm.mid"
            @keydown.enter="handle_search"
            placeholder="请输入赛事ID"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input ml20x position-relative">
          <a-select autocomplete class="w-140" placeholder="请选择发布状态" v-model="searchForm.status" @change="handle_notice_status">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in noticeStatusList"
              :key="'status'+index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>    
        <div class="append-handle-btn-input ml20x position-relative" v-if="noticeList.length > 0">
          <a-select autocomplete class="w-140" placeholder="请选择公告类型" v-model="searchForm.nid" @change="handle_notice_type_id">
            <a-select-option
              :value="item.id"
              v-for="(item, index) in noticeList"
              :key="index"
            >{{ item.typeName }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input pl30x height-30px line-height-30px">
          <a-button
            type="primary"
            style="height: 30px; line-height: 30px;"
            @click="handle_search"
          >搜索</a-button>
        </div>
        <q-space />
        <div>
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:80px;height:30px; "
            label="发布公告"
            @click="handle_new_bulletin"
          />
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
      >
        <span slot="bulletinTitle" slot-scope="text, record">
          <div class="flex items-center text-center justify-start">
            <div>
              <my-icon v-if="record.isTag == 1" type="p-icon-biaoji" class="mr5x"></my-icon>
              <span v-else class="mr5x no-show">11</span>
            </div>
            <div class="text-over-130">【{{ handle_notice(record.noticeTypeId) }}】 <span class=" cursor-pointer" @click="handleCopy(record.title,'公告标题')">{{record.title}}</span></div>
            <div>
              <my-icon v-if="record.upload" type="p-icon-fujian" class="ml10x text-panda-text-4"></my-icon>
            </div>
          </div>
        </span>
        <span slot="context" slot-scope="text, record" class="text-over">
          <span class="text-over">{{getText(record.context)}}</span>
        </span>
        <span slot="status" slot-scope="text, record">
          <span class="panda-icon-blue" v-if="record.status === 0">草稿</span>
          <span v-if="record.status === 1">已发布</span>
          <span v-if="record.status === 2">取消发布</span>
        </span>
        <span
          slot="sendTime"
          slot-scope="text, record"
        >{{moment(record.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>

        <span slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看公告</div>
            </template>
            <q-icon @click.native="handle_look(record, index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">编辑公告</div>
            </template>
            <q-icon @click.native="handleEdit(record, index)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>

          <a-popconfirm
            :title="record.status === 0?'你确定删除这项草稿吗?': record.status === 1? '你确定删除已发布这项公告吗?': '你确定要删除取消发布这项公告吗?'"
            @confirm="confirm_delete(record.id, record.status)"
            @cancel="cancel(record.status)"
            okText="确定"
            cancelText="取消"
            placement="topRight"
          >
            <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">删除公告</div>
              </template>
              <q-icon  class="panda-icon panda-icon-delete panda-icon-hover fs20 cursor-pointer"></q-icon>
            </a-tooltip>
          </a-popconfirm>

          <a-popconfirm
            :title="record.status === 1? '你确定取消发布这项公告吗?': '你确定要恢复发布这项公告吗?'"
            @confirm="confirm(record.id, record.status)"
            @cancel="cancel_is_public(record.status)"
            okText="确定"
            cancelText="取消"
            placement="topRight"
          >
            <!-- <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">删除草稿</div>
              </template>
              <q-icon  class="panda-icon panda-icon-delete panda-icon-hover fs20 mr15x"></q-icon>
            </a-tooltip> -->
            <a-tooltip  placement="top" v-if="record.status === 1">
              <template slot="title">
                <div class="fs12">取消发布</div>
              </template>
              <q-icon v-if="record.status == 1" class="panda-icon panda-icon-panda-icon-cancel panda-icon-hover fs18 cursor-pointer"></q-icon>
            </a-tooltip>
            <a-tooltip  placement="top" v-if="record.status == 2">
              <template slot="title">
                <div class="fs12">恢复发布</div>
              </template>
              <q-icon  class="panda-icon panda-icon-panda-icon-come panda-icon-hover fs18 cursor-pointer" ></q-icon>
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
      <!-- confirm确认再次删除草稿箱 -->
      <!-- 查看活动详情弹窗 -->
      <q-dialog
        v-model="dialogDetailShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-detail :detailObj="showDialogObj" @closeDialog="handle_close_dialog_detail"></dialog-detail>
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
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-over-130 {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 310px;
  white-space: nowrap;
}

.text-over-300 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

.no-show{
  // opacity 0
  visibility hidden
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
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
import { mapGetters, mapActions} from 'vuex'
import { api_message } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/message/bulletin/config/config.js";
import dialogDetail from "src/pages/message/bulletin/component/dialogDetail.vue";
import { getText } from "src/util/module/getText.js";
import { handleCopy } from "src/util/module/common.js";

import moment from "moment";
// import { getAutoParams } from "src/util/module/common.js";

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
        // 所属查询条件
        title: "", // 公告标题
        nid: "",  //  公告类型
        mid: "", // 赛事ID
        status: 1
      },
      noticeStatusList: [
        { label: '所有状态', value: ''},
        { label: '草稿', value: 0},
        { label: '已发布', value: 1},
        { label: '取消发布', value: 2},
      ],
      dialogDetailShow: false, //活动详情阀值
      showDialogObj: {}, // 传值给弹窗的数据
      currentRecord: "", // 当前行数据
      noticeList: [] // 公告类型数据
    };
  },
  computed: {
    ...mapGetters(['get_message'])
  },
  created() {
    this.tabledata_loading = true;
    this.init_notice_list();
    this.initTableData();
  },
  methods: {
    ...mapActions(['clear_message']),
    moment,
    getText,
    handleCopy,
    /**
     * @description 根据赛事id找到对应的赛事标题
     * @param  {Number} id 赛事种类
     * @return {String} 赛事标题
     */
    handle_notice(id){
      let obj =  this.noticeList.find(item => item.id === id);
      if(obj){
        return obj.typeName;
      }else{
        return '--';
      }
    },
    handle_notice_status(){
      this.initTableData();
    },
    /**
     * @description 公告类型切换
     * @return {undefined} undefined
     */
    handle_notice_type_id(){
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_message.post_manage_notice_list(params).then(res => {
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
    /**
     * @description 拉取公告类型数据
     * @return {undefined} undefined
     */
    async init_notice_list(){
      let res = await api_message.post_manage_notice_noticeType({})
      console.log(res.data)
      if(res.data.code === '0000000'){
        this.$q.sessionStorage.set('noticeList', res.data.data);
        this.noticeList = this.computed_needed_data(res.data.data);
      }else{
        this.noticeList = [];
      }
    },
    /**
     * @description 对后台公告类型数据进行加工
     * @param  {Array} arr 公告类型数组
     * @return {Array} 加入了所有公告的公告类型数组
     */
    computed_needed_data(arr){
      // return arr.push({id: '', typeName: '所有公告'})
      arr.unshift({id: '', typeName: '所有公告'})
      return arr;
    },
    compute_init_tabledata_params() {
      let params = {
        title: this.searchForm.title, //商户名称，可模糊搜索
        nid: this.searchForm.nid, //公告类型Id
        mid: this.searchForm.mid, //赛事Id
        status: this.searchForm.status, // 公告状态
        pgNum: this.pagination.current, //分页，查询第几页数据。
        pgSize: this.pagination.pageSize //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    },
    /**
     * @description 点击搜索按钮
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
    },
    /**
     * @description 新建发布公告
     * @return {undefined} undefined
     */
    handle_new_bulletin() {
      this.$router.push({ name: "bulletin_edit" });
    },
    /**
     * @description 编辑公告进行路由跳转
     * @return {undefined} undefined
     */
    handleEdit(record, index) {
      this.$router.push({
        name: "bulletin_update",
        query: {
          id: record.id
        }
      });
    },
    /**
     * @description 查看公告详情
     * @return {undefined} undefined
     */
    handle_look(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.dialogDetailShow = true;
    },
    /**
     * @description 关闭详情弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_detail(){
      if(this.get_message){
        this.clear_message();
      }
      this.initTableData();
    },
    confirm_delete(val, status) {
      let params = { id: val };
      api_message.post_manage_notice_delete(params).then(res => {
        let { code } = res.data;
        if (code === "0000000") {
          let str = status === 0? '删除草稿成功！': status === 1? '删除已发布公告成功！': '删除取消发布公告成功！'
          this.$message.success(str);
          this.handle_search();
        } else {
          let msg = status === 0? '删除草稿失败！': status === 1? '删除已发布公告失败！': '删除取消发布公告失败！'
          this.$message.error(msg);
        }
      }); 
    },
    confirm(val, status) {
      let params = { id: val };
      if( status === 1){
        // 状态为1 取消公告发布
        api_message.post_manage_notice_cancelNotice(params).then(res => {
          let { code } = res.data;
          if (code === "0000000") {
            this.$message.success("取消发布公告成功！");
            this.handle_search();
          } else {
            this.$message.error("删除发布公告失败！");
          }
        })
      }else{
        // 状态为2 恢复发布
        api_message.post_manage_notice_backNotice(params).then(res => {
          let { code } = res.data;
          if (code === "0000000") {
            this.$message.success("恢复发布公告成功！");
            this.handle_search();
          } else {
            this.$message.error("恢复发布公告失败！");
          }
        })
      }
      
    },
    cancel(status) {
      let str = status === 0? '取消删除草稿操作！': status === 1? '取消删除已发布公告操作！': '取消删除取消发布公告操作！'
      this.$message.warn(str);
    },
    /**
     * @description 取消发布操作
     * @return {undefined} undefined
     */
    cancel_is_public(status) {
      let str = status === 2? '取消恢复发布操作！': '取消发布操作！'
      this.$message.warn(str);
    },
    /**
     * @description 确认按钮
     * @return {undefined} undefined
     */
    async handle_confirm() {
      let params = {
        merchantCode: this.currentRecord.merchantCode,
        status: this.currentRecord.status == 1 ? 0 : 1
      };
      let res = await api_merchant.get_manage_merchant_updateMerchantStatus(
        params
      );
      let { code, msg } = res.data;
      if (code == "0000000") {
        if (this.currentRecord.status == 0) {
          this.$message.success("启用" + msg);
        } else {
          this.$message.error("禁用" + msg);
        }
      }
      this.$set(
        this.currentRecord,
        "status",
        this.currentRecord.status == 1 ? 0 : 1
      );
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
