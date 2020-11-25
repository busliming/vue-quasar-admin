<template>
  <div class="full-height full-width">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs
        separator="/"
        active-color="whiddte"
        class="panda-text-2"
      >
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="证书管理" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px" style="margin: 0 10px 10px 10px;">
      <div class="top" id="top2">
        <div class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x border-radius-4px">
          <div class="append-handle-btn-input ml10x w-200 row position-relative fs12">
            <a-input
              @keydown.enter="handle_search"
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              autocomplete="off"
              maxLength="20"
              class="fs12"
              allowClear
            >
              <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
            </a-input>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <q-btn
            class="panda-btn-primary-dense bg-primary ml40x"
            style="width:60px;height:30px; "
            label="搜索"
            @click="handle_search"
          />
        </div>
      </div>
      <a-table
        class="full-width pl10x pr10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        size="middle"
        @change="sorterForTable"
        :rowKey="record => record._index"
      >
        <span slot="merchantName" slot-scope="text,record">
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
            :str_all="('<div>'+record.merchantName +'</div>')"
            :defaultplace="'topLeft'"
            :col_width="180"
            :str='record.merchantName'
          ></table-cell-ellipsis-ant>
        </span>
        <span slot="parentName" slot-scope="text, record">
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.parentName+'</div>')"
            :str_all="('<div>'+record.parentName +'</div>')"
            :defaultplace="'topLeft'"
            :col_width="180"
            :str='record.parentName'
          ></table-cell-ellipsis-ant>
        </span>
        <span slot="agentLevel" slot-scope="text, record">
          <div class="text-over">
            <span v-if="record.agentLevel === 0">直营商户</span>
            <span v-else-if="record.agentLevel === 1">渠道商户</span>
            <span v-else-if="record.agentLevel === 2">二级商户</span>
            <span v-else>--</span>
          </div>
        </span>
        <span slot="startTime" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.startTime }} 至 {{ record.endTime }}</span>
          </div>
        </span>
        <span slot="status" slot-scope="text, record">
          <div class="text-over">
            <span
              v-if="record.statusDescription == '即将过期'"
              class="panda-dot panda-dot-yellow line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '有效'"
              class="panda-dot panda-dot-green line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '已过期'"
              class="panda-dot panda-dot-red line-height-40px mr5x"
            ></span>
            <span>{{ record.statusDescription }}</span>
          </div>
        </span>
        <span slot="action" slot-scope="text, record, index" class="q-gutter-md cursor-pointer">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">复制证书</div>
            </template>
            <q-icon @click.native="handleCopy(record.key, '证书信息')" class="panda-icon panda-icon-fu-zhi-key panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">更新证书</div>
            </template>
            <q-icon @click.native="handle_edit(record)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top" v-if="record.agentLevel == 1">
            <template slot="title">
              <div class="fs12">子证书管理</div>
            </template>
            <q-icon @click.native="handle_sub_cert(record, index)" class="panda-icon panda-icon-panda-icon-zi-guanli panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            style="opacity:0"
            v-else
          >
          </q-icon>
        </span>
      </a-table>
      <a-pagination
        v-if="tabledata.length>0"
        :total="pagination.total"
        :current="pagination.current"
        show-size-changer 
        show-quick-jumper
        :page-size-options="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :show-total="total => `共 ${pagination.total} 条数据`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      />
    </div>
    <!-- 更新证书弹窗 -->
    <q-dialog
      v-model="eidtKeyShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-edit
        :detailObj="showDialogObj"
        @closeDialog="handle_close_dialog_edit"
      ></dialog-edit>
    </q-dialog>
    <!-- 子证书管理弹窗 -->
    <q-dialog
      v-model="subKeyShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-sub
        :detailObj="showDialogObj"
        @closeDialogSetShow="handle_close_dialog_set"
      ></dialog-sub>
    </q-dialog>
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

.no-left >>> .q-field__append {
  border-left: none;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
  display: inline-block;
  white-space: nowrap;
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
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/merchant/key/config/config.js";
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
import dialogSub from "src/pages/merchant/key/component/dialogSub.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import { handleCopy } from "src/util/module/common.js";
export default {
  mixins: [...mixins],
  components: {
    dialogEdit,
    dialogSub,
    tableCellEllipsisAnt
  },
  data() {
    return {
      tabledata: [],  //表格数据
      columns: tablecolumns_config,  // 表格配置
      tabledata_loading: false, // 表格loading
      searchForm: {
        merchantName: "" //商户名称
      },
      showDialogObj: "", // 传给弹窗的数据
      eidtKeyShow: false, //编辑证书弹窗阀值
      subKeyShow: false //子证书管理弹窗阀值
    };
  },
  computed: {
    ...mapGetters(['get_data'])
  },
  created() {
    this.tabledata_loading = true;
    this.init_params();
  },
  methods: {
    ...mapActions(['clear_data']),
    /**
     * @description 从我的消息跳转过来需要弹出编辑key弹窗
     * @return {undefined} undefined
     */
    init_params(){
      if(this.get_data){
        this.searchForm.merchantName = this.get_data.merchantName;
        this.handle_edit(this.get_data);
      }
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.get_manage_merchant_queryKeyList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.page") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
      });
    },
    compute_init_tabledata_params() {
      let params = {
        merchantName: this.searchForm.merchantName, // 商户名称
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
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
    handleCopy,
    /**
     * @description 编辑证书
     * @return {undefined} undefined
     */
    handle_edit(record) {
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    handle_close_dialog_edit(val){
      if(val){
        this.initTableData();
      }
      this.eidtKeyShow = false;
    },
    /**
     * @description 查看子证书管理
     * @return {undefined} undefined
     */
    handle_sub_cert(record, index) {
      this.showDialogObj = { ...record };
      this.subKeyShow = true;
    },
    /**
     * @description 关闭子证书弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.eidtKeyShow = false;
      this.initTableData();
    }
  }
};
</script>
