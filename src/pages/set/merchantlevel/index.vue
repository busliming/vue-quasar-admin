<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs
        separator="/"
        active-color="whiddte"
        class="panda-text-2"
      >
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el
          label="商户等级设置"
          class="panda-text-1"
        />
      </q-breadcrumbs>
      
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px" style="margin: 0 10px 10px 10px;">
      <div>
        <div id="top2" class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x border-radius-4px">
          <q-space />
          <div>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr10x"
              style="width:135px;height:30px; "
              @click="handle_new_rate"
            >
              <div class="ml10x">+ 新建商户等级</div>
            </q-btn>
          </div>
        </div>
        <a-table
          class="pl10x pr10x"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 1600, y: scrollHeight + 57 }"
          :pagination="pagination"
          :loading="tabledata_loading"
          size="middle"
          rowKey="id"
        >
          <span slot="level" slot-scope="text, record">
            <div class="text-over">
              <span>Lv{{ record.level }}</span>
            </div>
          </span>
          <span slot="computingStandard" slot-scope="text, record">
            <div class="text-over">
              <span>
                {{ record.computingStandard == 1 ? "盈利金额" : "投注金额" }}
              </span>
            </div>
          </span>
          <span slot="rangeAmountBegin" slot-scope="text, record">
            <span>
              {{ (record.rangeAmountBegin / 10000) | amount }}
              <span v-if="record.rangeAmountBegin != 0">万</span>
              -
              {{ (record.rangeAmountEnd / 10000) | amount }}万
            </span>
          </span>
          <span slot="terraceRate" slot-scope="text, record">
            <span v-if="!record.terraceRate">免费</span>
            <span v-else>{{ record.terraceRate }}%</span>
          </span>
          <span slot="paymentCycle" slot-scope="text, record">
            <span>{{ record.paymentCycle | filterPaymentCycle }}</span>
          </span>
          <span slot="vipAmount" slot-scope="text, record">
            <span v-if="record.vipAmount == null || record.vipAmount == 0"
              >免费</span
            >
            <span v-else>
              {{ (record.vipAmount / 10000) | amount }}
              <span v-if="record.vipAmount != 0">万</span>
              {{ record.vipPaymentCycle | filterPaymentCycle }}
            </span>
          </span>
          <span slot="techniqueAmount" slot-scope="text, record">
            <span
              v-if="
                record.techniqueAmount == null || record.techniqueAmount == 0
              "
              >免费</span
            >
            <span v-else>
              {{ (record.techniqueAmount / 10000) | amount }}
              <span v-if="record.techniqueAmount != 0">万</span>
              {{ record.techniquePaymentCycle | filterPaymentCycle }}
            </span>
          </span>
          <span slot="modifyTime" slot-scope="text, record">
            <span>{{ format_date(record.modifyTime, "-") }}</span>
          </span>
          <span slot="action" slot-scope="text, record, index" class="q-gutter-md cursor-pointer">
            <a-tooltip  placement="top">
              <template slot="title">
                <div class="fs12">编辑商户等级</div>
              </template>
              <q-icon @click.native="handle_update(record, index)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
            </a-tooltip>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 新建商户等级 -->
    <q-dialog
      v-model="editRateShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-edit @closeDialogSetShow="handle_close_dialog_set"></dialog-edit>
    </q-dialog>
    <!-- 修改商户等级 -->
    <q-dialog
      v-model="updateRateShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-update
        :detailObj="showDialogObj"
        @closeDialogShow="handle_close_dialog_update"
      ></dialog-update>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api_account, api_base } from "src/api/index.js";
import formartmixin from "src/mixins/module/formartmixin.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dialogEdit from "src/pages/set/merchantlevel/component/dialogEdit.vue";
import dialogUpdate from "src/pages/set/merchantlevel/component/dialogUpdate.vue";
import { tablecolumns_config } from "src/pages/set/merchantlevel/config/config.js";
export default {
  mixins: [commonmixin, formartmixin],
  components: {
    dialogEdit,
    dialogUpdate
  },
  data() {
    return {
      tabledata: [], // 表格数据
      columns: tablecolumns_config, //表格配置
      tabledata_loading: false, // 表格loading
      editRateShow: false,  // 新建商户等级阀值
      updateRateShow: false, // 编辑商户等级阀值
      showDialogObj: {},  // 传递给弹窗的信息
      pagination: {
        // 分页配置选项
        pageSize: 100,
        current: 1,
        hideOnSinglePage: true,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      },
      scrollHeight: 630
    };
  },
  computed: {
    ...mapGetters(['get_window_size_info'])
  },
  mounted() {
    this.get_max_height();
  },
  methods: {
    get_max_height(){
      let top = document.getElementById('top');
      let top1 = document.getElementById('top1');
      let top2 = document.getElementById('top2');
      console.log(document.documentElement.clientHeight,top.clientHeight,top1.clientHeight,top2.clientHeight);
      this.scrollHeight = document.documentElement.clientHeight - top.clientHeight - top1.clientHeight - top2.clientHeight - 60 - 50;
      console.log(this.scrollHeight)
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_base.post_manage_merchantLevel_queryList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.page") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.records") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(JSON.stringify(this.tabledata[0]));
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
      });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let params = {
        pageNum: this.pagination.current, //当前页
        pageSize: this.pagination.pageSize // 当前页数据条数
      };
      return params;
    },
    /**
     * @description 新建商户等级按钮
     * @return {undefined} undefined
     */
    handle_new_rate() {
      this.editRateShow = true;
    },
    /**
     * @description 编辑商户等级icon
     * @return {undefined} undefined
     */
    handle_update(record, index) {
      this.showDialogObj = { ...record };
      this.updateRateShow = true;
    },
    /**
     * @description 关闭新建商户等级弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.editRateShow = false;
      this.initTableData();
    },
    /**
     * @description 关闭编辑商户等级弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_update() {
      this.updateRateShow = false;
      this.initTableData();
    }
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    }
  },
  watch: {
    pagination: {
      handler: function(val) {
        this.initTableData();
      },
      deep: true,
      immediate: true
    },
    get_window_size_info(){
      this.get_max_height();
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 310px 0;
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
