<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="清算管理" class="fw_600 panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 0px 10px 10px 10px;" class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div >
        <div id="top2" style="min-width: 1600px; overflow-x: hidden;" class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb10x pt10x border-radius-4px">
          <div class="append-handle-btn-input pl10x row line-height-30px">
            <div class="mr10x fs14">账单</div>
            <a-month-picker
              :disabledDate="disabledDate"
              placeholder="请选择月份"
              @change="on_change"
            />
          </div>
          <div class="append-handle-btn-input position-relative ml10x">
            <a-select
              autocomplete
              class="w-120"
              placeholder="请选择"
              v-model="searchForm.timeZone"
              @change="handle_time_zone_change"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in timeZoneList"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-bet"></div>
          </div>
          <div class="append-handle-btn-input ml10x row w-200 position-relative">
            <a-input
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户编号"
              autocomplete="off"
              maxLength="20"
              allowClear
            >
              <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
            </a-input>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl10x row position-relative" style="width: 200px;">
            <a-select
              show-search
              placeholder="请输入或选择商户名称"
              option-filter-prop="children"
              style="width: 100%"
              :filterOption="filterOption"
              allowClear
              @change="handle_merchant_change"
            >
              <a-select-option
                :value="item.merchantCode"
                :label="item.merchantName"
                v-for="(item,index) in merchantList"
                :key="'merchant'+index"
              >{{item.merchantName}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x fs14">盈利范围</div>
            <div class="w-90">
              <a-input-number
                v-model.trim="searchForm.profitAmountStart"
                placeholder="最小值"
                autocomplete="off"
              ></a-input-number>
            </div>
            <div class="ml10x mr10x">~</div>
            <div class="w-100">
              <a-input-number
                v-model.trim="searchForm.profitAmountEnd"
                placeholder="最大值"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl10x position-relative">
            <a-select autocomplete class="w-120" placeholder="结算币种" @change="handle_currency">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in currencyList"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl10x position-relative">
            <a-select autocomplete class="w-120" placeholder="商户类型" @change="handle_agent_level">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in merchantTypeList"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl10x">
            <a-checkbox class="text-panda-text-7" v-model="status">金额展示人民币</a-checkbox>
          </div>
          <div class="append-handle-btn-input pl20x line-height-32px">
            <a-button type="primary" size="default" @click="handle_search">搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="pl10x pr10x"
        id="liquidation"
        :columns="status? tablecolumns_config: noCnyConfig"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="getStrLength(record.merchantName)>20"  placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 180px; word-break:break-all;`"
                  ></div>
                </template>
                <span class="text-over1">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over1">{{record.merchantName}}</span>
            </span><br>
            <span class="text-panda-text-4 cursor-pointer" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="agentLevel" slot-scope="text">
          <span>{{ text | filterAgentLevel }}</span>
        </span>
        <span slot="billAmount" slot-scope="text, record">{{ record.billAmount | moneyFormat }}</span>
        <span slot="billAmountCNY" slot-scope="text, record">{{ record.billAmountCNY | moneyFormat }}</span>
        <span
          slot="orderAmountTotal"
          slot-scope="text, record"
        >{{ record.orderAmountTotal | moneyFormat }}</span>
        <span
          slot="orderAmountTotalCNY"
          slot-scope="text, record"
        >{{ record.orderAmountTotalCNY | moneyFormat }}</span>
        <span slot="profitAmount" slot-scope="text, record">
          <span v-if="record.profitAmount>=0">{{ record.profitAmount | moneyFormat }}</span>
          <span v-else class="panda-text-red">{{ record.profitAmount | moneyFormat }}</span>
        </span>
        <span slot="profitAmountCNY" slot-scope="text, record">
          <span v-if="record.profitAmountCNY>=0">{{ record.profitAmountCNY | moneyFormat }}</span>
          <span v-else class="panda-text-red">{{ record.profitAmountCNY | moneyFormat }}</span>
        </span>
        <span slot="profitRate" slot-scope="text,record">
          <span v-if="record.profitRate == null">-</span>
          <span v-else-if="record.profitRate >= 0">{{ text | moneyFormat }}%</span>        
          <span v-else class="panda-text-red">{{ text | moneyFormat }}%</span>         
        </span>
        <span slot="computingStandard" slot-scope="text, record">
          <span>{{ record.computingStandard | filterComputingStandard }}</span>
        </span>
        <span slot="terraceRate" slot-scope="text, record">
          <span v-if="record.terraceRate">{{ record.terraceRate | moneyFormat }}%</span>
          <span v-else>-</span>
        </span>
        <span slot="executeRate" slot-scope="text, record">
          <span v-if="record.executeRate ">{{ record.executeRate | moneyFormat }}%</span>
          <span v-else>-</span>
        </span>
        <span slot="adjustAmount" slot-scope="text, record">
          <span v-if="record.adjustAmount">{{ record.adjustAmount | moneyFormat }}</span>
          <span v-else-if="record.adjustAmount===0">0</span>
          <span v-else>-</span>
        </span>
        <span slot="merchantNum" slot-scope="text, record" v-if="record.agentLevel === 1">
          <a @click.prevent="handle_look_secondary_merchant(record)">
            {{ record.merchantNum }}
          </a>
        </span>
        <span slot="action" slot-scope="text, record, index" class="q-gutter-md cursor-pointer">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看电子账单</div>
            </template>
            <q-icon @click.native="handle_look(record, index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">调整电子账单</div>
            </template>
            <q-icon @click.native="handle_set(record, index)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"></q-icon>
          </a-tooltip>
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
      <!-- 查看二级商户详情 -->
      <q-dialog
        v-model="dialogLookMerchantShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-look-merchant :detailObj="showDialogObj"></dialog-look-merchant>
      </q-dialog>
      <!-- 查看电子账单详情弹窗 -->
      <q-dialog
        v-model="dialogLookElectronicShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-look-electronic :detailObj="showDialogObj" @closeDialog="handle_close_dialog_set"></dialog-look-electronic>
      </q-dialog>
      <!-- 调整电子账单弹窗 -->
      <q-dialog
        v-model="dialogSetElectronicShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-set-electronic :detailObj="showDialogObj" @closeDialog="handle_close_dialog_set"></dialog-set-electronic>
      </q-dialog>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>#liquidation .ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>#liquidation .ant-empty-normal {
  margin: 310px 0;
}
.text-over1{
  display inline-block;
  max-width 160px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}

.text-over-120{
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}

.text-over-200 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

a {
  text-decoration: underline;
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
import { api_merchant, api_finance,api_user } from "src/api/index.js";
import financesorter from "src/mixins/module/financesorter.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import financeMixin from "src/pages/finance/liquidation/mixin/index.js";
import { tablecolumns_config } from "src/pages/finance/liquidation/config/config.js";
import { noCnyConfig } from "src/pages/finance/liquidation/config/noCnyConfig.js";
import { handleCopy,getStrLength } from "src/util/module/common.js";
import dialogLookElectronic from "src/pages/finance/liquidation/component/dialogLookElectronic.vue";
import dialogSetElectronic from "src/pages/finance/liquidation/component/dialogSetElectronic.vue";
import dialogLookMerchant from "src/pages/finance/liquidation/component/dialogLookMerchant.vue";
import moment from 'moment';
export default {
  mixins: [financesorter, commonmixin, constantmixin, financeMixin],
  components: {
    dialogLookElectronic,
    dialogLookMerchant,
    dialogSetElectronic
  },
  data() {
    return {
      tabledata: [], // 表格数据
      noCnyConfig, // 无人民币表格配置
      tablecolumns_config, // 有人民币表格配置
      tabledata_loading: false, // 表格loading
      searchForm: {
        merchantName: "", //商户名称
        profitAmountStart: "", // 盈利范围 -开始范围
        profitAmountEnd: "", // 盈利范围 -结束范围
        agentLevel: "", //商户类型
        currency: "", // 结算币种
        financeDate: "", // 账单日期
        timeZone: "UTC8", //日期类型 EZ是帐务日，UTC8是自然日
      },
      dialogLookElectronicShow: false, //查看电子账单阀值
      dialogSetElectronicShow: false, //调整电子账单阀值
      dialogLookMerchantShow: false, //二级商户详情阀值
      showDialogObj: {}, //传给弹窗的数据
      status: false, // 金额展示人民币阀值
    };
  },
  created() {
    this.tabledata_loading = true;
    this.init_tree_merchant_list();
    this.initTableData();
  },
  methods: {
    moment,
    handleCopy,
    getStrLength,
    /**
     * @description 商户名称数据初始化
     * @return {undefined}
     */
    async init_tree_merchant_list(){
      let res = await api_user.post_manage_merchant_queryMerchantList({})
      // console.warn(res.data);
      if ((res.data.code = "0000000")) {
        let arr = res.data.data || [];
        this.merchantList = arr.filter( item => item.agentLevel != 2 )
      }
    },
    handle_merchant_change(value) {
      this.searchForm.merchantCode = value;
      console.log(`selected ${value}`);
    },
    // 本月之后日期禁用掉
    disabledDate(current) {
      return current && current > moment().endOf("day");
    },
    /**
     * @description 账单日切换
     * @return {undefined} undefined
     */
    handle_time_zone_change(){
      this.handle_search();
    },
    /**
     * @description 搜索
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
    },
    /**
     * @description 结算币种切换
     * @return {undefined} undefined
     */
    handle_currency(val) {
      this.searchForm.currency = val;
      this.initTableData();
    },
    /**
     * @description 商户类型切换
     * @return {undefined} undefined
     */
    handle_agent_level(val) {
      this.searchForm.agentLevel = val;
      this.initTableData();
    },
    on_change(date, dateString) {
      console.log(date, dateString);
      this.searchForm.financeDate = dateString;
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_finance
        .post_report_financeMonth_queryFinanceMonthList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          let msg = this.$lodash.get(res, "data.msg");
          if (code == "0000000") {
            let currentPage =
              this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.pagination.start = this.$lodash.get(res, "data.data.startRow");
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            console.log(this.tabledata, "tabledata");
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(msg, 5);
          }
        });
    },
    compute_init_tabledata_params() {
      let { pageSize, sort, orderBy } = this.pagination;
      let {
        merchantName,
        financeDate,
        currency,
        agentLevel,
        profitAmountStart,
        profitAmountEnd,
        timeZone,
        merchantCode
      } = this.searchForm;
      let params = {
        merchantName, //商户名称，可模糊搜索
        // status: 1,//商户状态 、1.启用、2.禁用 搜索条件，不传默认查全部
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize, //分页，每页查询多少条，默认20条。可不传
        agentLevel: String(agentLevel),
        financeDate,
        currency,
        profitAmountStart,
        profitAmountEnd,
        sort,
        orderBy,
        timeZone,
        merchantCode
      };
      return params;
    },
    /**
     * @description 调整电子账单
     * @param  {Object} record 点击某行的对象
     * @param  {Number} index 点击某行的索引
     * @return {undefined} undefined
     */
    handle_set(record, index) {
      console.log(record, index, "qqq");
      record.timeZone = this.searchForm.timeZone;
      this.showDialogObj = { ...record };
      this.dialogSetElectronicShow = true;
    },
    /**
     * @description 查看二级商户详情列表
     * @param  {Object} record 点击某行的对象
     * @return {undefined} undefined
     */
    handle_look_secondary_merchant(record) {
      console.log(record,this.searchForm.timeZone);
      record.timeZone = this.searchForm.timeZone;
      this.showDialogObj = {...record };
      this.dialogLookMerchantShow = true;
    },
    /**
     * @description 查看电子账单
     * @param  {Object} record 点击某行的对象
     * @param  {Number} index 点击某行的索引
     * @return {undefined} undefined
     */
    handle_look(record, index) {
      console.log(record, index, "qqq");
      record.timeZone = this.searchForm.timeZone;
      this.showDialogObj = { ...record};
      this.dialogLookElectronicShow = true;
    },
    /**
     * @description 关闭弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.dialogSetElectronicShow = false;
      this.dialogLookElectronicShow = false;
      this.initTableData();
    }
  }
};
</script>
