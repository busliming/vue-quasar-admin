<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x fs14" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="panda-text-2" />
        <q-breadcrumbs-el label="商户注单统计" class="panda-text-1 fs14" />
      </q-breadcrumbs>    
    </div>
    <div class="fs14 bg-panda-bg-6 border-radius-4 shadow-3" style="margin: 0px 10px 0px 10px">
      <div class="row pl10x pb10x pt10x" id="top2" style="min-width: 1600px; overflow-x: hidden;">
        <!-- 投注时间tab栏 -->
        <div class="append-handle-btn-input">
          <a-radio-group v-model="pagination.filter">
            <a-radio-button value="3">结算时间</a-radio-button> 
            <a-radio-button value="1">投注时间</a-radio-button>  
          </a-radio-group>
        </div>
        <!-- 投注周期tab栏 -->
        <div class="ml20x">
          <a-radio-group v-model="pagination.dateType" class="pl20x">
            <a-radio-button value="day">日</a-radio-button>
            <!-- <a-radio-button value="week">周</a-radio-button>  2020-6-28注释-->
            <a-radio-button value="month">月</a-radio-button>
            <!-- <a-radio-button value="year">年</a-radio-button> -->
          </a-radio-group>
        </div>
        <!-- 日期选择 -->
        <div class="ml20x append-handle-btn-input w-200">
          <!-- <a-week-picker
            :disabledDate="disabledDate"
            v-if="pagination.dateType==='week'"
            placeholder="请选择周期"
            
            :defaultValue="moment(moment().format('l'), dateFormat)"
            @change="on_change"
          >
          </a-week-picker> -->
          <!-- <a-month-picker
            :disabledDate="disabledDate"
            
            :defaultValue="moment(moment().format('l'), 'YYYYMM')"
            placeholder="请选择月份"
            @change="on_change"
          /> -->
          <!-- :defaultValue="moment(moment().format('l'), dateFormat)" -->
          <a-range-picker 
            @change="on_change" 
            :disabledDate="disabledDate"
            :allowClear="false"
            v-if="pagination.dateType==='day'"
            :value="[moment(searchForm.startDate,'YYYY-MM-DD'), moment(searchForm.endDate, 'YYYY-MM-DD')]"
            :format="dateFormat"
          />
          <a-range-picker
            :placeholder="['开始月份', '结束月份']"
            v-else-if="pagination.dateType==='month'"
            format="YYYY-MM"
            :disabledDate="disabledDate"
            :value="value"
            :mode="mode"
            :allowClear="false"
            :open="isopen"
            @openChange="handleOpenChange"
            @panelChange="handlePanelChange"
          />
                    <!-- :defaultValue="[moment(searchForm.startDate1,'YYYY-MM'), moment(searchForm.endDate1, 'YYYY-MM')]" -->
          <!-- <a-date-picker
            :disabledDate="disabledDate"
            :disabledTime="disabledDateTime"
            :defaultValue="moment(moment().format('l'), dateFormat)" 
            @change="on_change"
          /> -->
          <!-- <a-date-picker
            placeholder="请选择年份"
            mode="year"
            format="YYYY"
            :defaultValue="defaultYeah"
            v-else
            :value="time"
            :open="isopen"
            @panelChange="handlePanelChange"
            @openChange="handleOpenChange"
            @change="handleChange"
          /> -->
        </div>
        <!-- 自然日切换 -->
        <div class="append-handle-btn-input position-relative ml10x" >
          <!-- <a-checkbox v-model="isDay">
            自然日
          </a-checkbox> -->
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
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input position-relative ml10x">
          <a-select autocomplete class="w-120" v-model="searchForm.sportId"  placeholder="体育种类" @change="handle_matches">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in allMatches"
              :key="index"
            >{{item.label}}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input position-relative ml10x">
          <a-select autocomplete class="w-120" v-model="searchForm.agentLevel"  placeholder="商户类型" @change="handle_agent_level">
            <a-select-option
              :value="item.value"
              v-for="(item) in merchantTypeList"
              :key="'currency' + item.value"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <!-- <div class="append-handle-btn-input ml10x w-200 position-relative">
          <a-input v-model.trim="searchForm.merchantName" @keydown.enter="handle_search" placeholder="请输入商户编号" maxLength="20" allowClear autocomplete="off">
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12"/>
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div> -->
        <div class="no-left append-handle-btn-input ml10x row position-relative" style=" width: 200px !important;">
          <a-tree-select             
            show-search
            :tree-data="merchantList"
            style="width: 100%"
            @change="handle_change"
            :dropdown-style="{maxHeight: '400px', overflow: 'auto' }"
            placeholder="请输入或选择商户名称"
            allow-clear
            dropdownMatchSelectWidth
            tree-default-expand-all
            treeNodeFilterProp='title' 
          >
          </a-tree-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input ml10x height-30px line-height-30px">
          <a-button
            type="primary"
            style="height: 30px; line-height: 30px;"
            @click="handle_search"
          >搜索</a-button>
        </div>
        <q-space />
        <div class="row">
          <div class="append-handle-btn-input position-relative mr10x">
            <a-select autocomplete class="w-120" placeholder="币种类型" @change="handle_currency">
              <a-select-option
                :value="item.value"
                v-for="(item) in currencyList"
                :key="'currency' + item.value"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:105px;height:30px; "
            @click="handle_export_excel"
            :loading='exportLoading'
          >
            <a-icon type="export" />
            <div class="ml10x">导出报表</div>
          </q-btn>
        </div>
      </div>
      <a-table
        class="pl10x pr10x"
        :columns="columns"
        ref="matchTable"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight - 45 }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="record.merchantName.length>20" placement="top">
                <template slot="title">
                  <span
                    v-html="record.merchantName"
                    :style="`max-width: 180px; word-break:break-all;`"
                  ></span>
                </template>
                <span class="text-over-160">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over-160">{{record.merchantName}}</span>
            </span>
            <span class="text-panda-text-4 cursor-pointer ml5x text-over1" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="time" slot-scope="text, record">
          <span v-if="pagination.dateType === 'day' && record.time">{{ String(record.time).replace(/(\d{4})(\d\d)(\d\d)/, "$1-$2-$3")}}</span>
          <span v-else>{{ String(record.time).replace(/(\d{4})(\d\d)/, "$1-$2")}}</span>
        </span>
        <span slot="merchantLevel" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.merchantLevel !== null">Lv{{record.merchantLevel}}</span> 
          <span v-else>-</span>
        </span>
        <span slot="agentLevel" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.agentLevel !== null">{{record.agentLevel | filterAgentLevel}}</span> 
          <span v-else>-</span>
        </span>
        <span slot="currency" slot-scope="text, record" class="q-gutter-md">
          <span v-if="record.currency !== null">{{record.currency | filterCurrency}}</span> 
          <span v-else>-</span>
        </span>
        <span slot="betAmount" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record && record[filterName[pagination.filter].betAmount] | moneyFormat}}</span>
        </span>
        <span slot="orderSum" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].orderSum] | amount}}</span>
        </span> 
        <span slot="returnAmount" slot-scope="text,record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].returnAmount] | moneyFormat}}</span>
        </span>
        <span slot="profit" slot-scope="text, record" class="q-gutter-md">
          <span :class="record[filterName[pagination.filter].profit]<0?'panda-text-red': ''">{{record[filterName[pagination.filter].profit] | moneyFormat}}</span>
        </span>
        <span slot="returnRate" slot-scope="text, record" class="q-gutter-md">
          <span :class="record[filterName[pagination.filter].returnRate] < 0?'text-red': ''">{{ record[filterName[pagination.filter].returnRate]+"%" }}</span>
        </span>
        <span slot="betUserSum" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].betUserSum]>=0?record[filterName[pagination.filter].betUserSum]:"" }}</span>
        </span>
        <span slot="betUserRate" slot-scope="text, record" class="q-gutter-md">
          <span>{{ record[filterName[pagination.filter].betUserRate] | moneyFormat }}%</span>
        </span>
        <template slot="footer">
          <a-table
            class="border-top "
            :columns="columns"
            :dataSource="totalData"
            :scroll="{ x: 1600 }"
            size="middle"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="rowkey" 
            >  
          </a-table>
        </template>
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
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
  </div>
</template>

<script>

import { api_merchant, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/merchantnote/config/config.js";
import { handleCopy,download } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin,constantmixin],
  components: {
    dialogExcel
  },
  data() {
    return {
      dateFormat: "YYYY-MM-DD",  // 日期组件格式
      tabledata: [], // 表格数据
      mode: ['month', 'month'],
      columns: tablecolumns_config, // 表格配置
      tabledata_loading: false,  // 表格loading
      filterName: {
        // 表格取值根据结算时间和投注时间取不同的字段
        "1": {
          betAmount: "validBetAmount",
          returnRate: "profitRate",
          profit: "profit",
          orderSum: "validTickets",
          betUserRate: "betUserRate",
          returnAmount: "returnAmount",
          betUserSum: 'validBetUsers',
        },
        "2": {
          betAmount: "liveBetAmount",
          returnRate: "liveReturnRate",
          profit: "liveProfit",
          orderSum: "liveOrderNum",
          betUserRate: "betUserRate",
          returnAmount: "liveReturn",
          betUserSum: 'liveUsers',
        },
        "3": {
          betAmount: "settleBetAmount",
          returnRate: "settleProfitRate",
          profit: "settleProfit",
          orderSum: "settleOrderNum",
          betUserRate: "settileUserRate",
          returnAmount: "settleReturn",
          betUserSum: 'settleUsers',
        }
      },
      searchForm: {
        // 搜索查询条件
        agentLevel: "", // 商户等级
        merchantName: "", // 商户名称
        merchantCode: "", // 商户编号
        startDate:moment(new Date().setDate(new Date().getDate() - 2)).format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startDate1:  moment(new Date().setDate(new Date().getDate() - 90)).format("YYYY-MM"), 
        endDate1: moment().format("YYYY-MM"),
        timeZone: "UTC8", //日期类型 EZ是帐务日，UTC8是自然日
        sportId: "", // 赛种
        currency: "", // 币种类型
      },
      timeZoneList: [
        // 区分账务日/自然日
        // { label: '所有账期', value: ''},
        { label: '自然日', value: 'UTC8'},
        { label: '账务日', value: 'EZ'},
      ],
      value: [],
      exportExcelShow: false,
      time: null,
      isopen: false,  //是否展开年日期组件 暂无用 前面版本去掉
      // defaultYeah: "",
    };
  },
  created() {
    this.tabledata_loading = true;
    this.value = [moment(this.searchForm.startDate1,'YYYY-MM'), moment(this.searchForm.endDate1, 'YYYY-MM')];
    this.init_merchant_list();
    // this.defaultYeah = moment(moment().format("YYYY"), this.dateFormat);
    // this.searchForm.date = moment().format("YYYYMMDD");
    this.initTableData();
  },
  methods: {
    moment,
    handleCopy,
    download,
    /**
     * @description 商户名称树形下拉框 选中某一个父级节点，需要将它子级节点value一起带给后台
     * @param  {value,label} 所选中的merchantCode值  所选中的merchantName值
     * @return {undefined} undefined
     */
    handle_change(value,label){
      console.log(value,label)
      if(value){
        let obj = this.merchantList.find(item => value == item.value)
        console.log(obj,'obj')
        if( obj && obj.children && obj.children.length > 0){
          let arr = []
          obj.children.forEach(child => {
            arr.push(child.value)
          })
          arr.unshift(value);
          this.searchForm.merchantCodeList = arr;
        }else{
          this.searchForm.merchantCodeList = [value]
        }
      }else{
        this.searchForm.merchantCodeList = ''
      }
      console.log(this.searchForm.merchantCodeList,'传给后台的参数')
    },
    /**
     * @description 账务日/自然日切换
     * @return {undefined} undefined
     */
    handle_time_zone_change(val){
      this.handle_search();
    },
    disabledDate(current) {
      return  current.isBefore(moment(Date.now()).add(-90, 'days')) ||  current.isAfter(moment(Date.now()).add(1, 'days'))    
    },
    // 关闭年期组件
    handleOpenChange(status) {
      this.isopen = status ? true : false;
    },
    // 更新月份值
    handlePanelChange(value, mode) {
      console.log(mode.indexOf('date'),value,mode,'月份')
      this.value = value;
      this.mode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]];
      if(mode.indexOf('date')>0){
        // console.log(mode.indexOf('date'))
        this.isopen = false;
        this.initTableData();
      } 
    },
    /**
     * @description 切换商户等级
     * @return {undefined} undefined
     */
    handle_agent_level(val){
      this.searchForm.agentLevel = val;
      this.initTableData();
    },
    /**
     * @description 切换币种类型
     * @return {undefined} undefined
     */
    handle_currency(val) {
      console.warn(val);
      this.searchForm.currency = val;
      this.initTableData();
    },
    /**
     * @description 切换赛种
     * @return {undefined} undefined
     */
    handle_matches(val) {
      this.searchForm.sportId = val;
      this.initTableData();
    },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    },
    handle_search() {
      this.initTableData();
    },
    on_change(date, dateStrings) {
      console.log(date,dateStrings)
      if(dateStrings){
        Object.assign(this.searchForm, {
          startDate: dateStrings[0],
          endDate: dateStrings[1]
        });
      }   
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.query_merchantlist(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        
        if (code === "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          if( res.data.data && res.data.data.aggregate){
            let { profitRate,settleProfitRate,validBetAmountSum,settleBetAmountSum,validTicketsSum, settleOrderNumSum,profitSum,settleProfitSum,validBetUsersSum,settleUsersSum,addUserSum } = res.data.data.aggregate
            profitRate = profitRate? profitRate+'%': ''
            settleProfitRate = settleProfitRate? settleProfitRate+'%': ''
            this.totalData[0].betAmount = this.pagination.filter == 1?this.$options.filters['moneyFormat'](validBetAmountSum): this.$options.filters['moneyFormat'](settleBetAmountSum)  // 投注金额
            this.totalData[0].orderSum = this.pagination.filter == 1?this.$options.filters['amount'](validTicketsSum): this.$options.filters['amount'](settleOrderNumSum)  // 投注笔数
            this.totalData[0].profit = this.pagination.filter==1?this.$options.filters['moneyFormat'](profitSum):this.$options.filters['moneyFormat'](settleProfitSum) // 平台盈利金额
            this.totalData[0].returnRate = this.pagination.filter==1?profitRate: settleProfitRate// 盈利率
            this.totalData[0].betUserSum = this.pagination.filter==1?validBetUsersSum: settleUsersSum// 投注用户数                     
            this.totalData[0].addUser = addUserSum   //新增用户数
            this.$forceUpdate();
          }else{
            this.totalData[0].betAmount = 0;
            this.totalData[0].orderSum = 0;
            this.totalData[0].profit = 0;
            this.totalData[0].returnRate = 0
            this.totalData[0].betUserSum = 0;
            this.totalData[0].addUser = 0;
          }
          console.warn(this.totalData,'totalData')
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.tabledata = [];
          this.totalData[0].betAmount = 0;
          this.totalData[0].orderSum = 0;
          this.totalData[0].profit = 0;
          this.totalData[0].returnRate = 0
          this.totalData[0].betUserSum = 0;
          this.totalData[0].addUser = 0;
        }
        console.warn(this.pagination,'pagination')
      });
    },
    compute_init_tabledata_params() {
      let {
        current,
        pageSize,
        dateType,
        sort,
        orderBy,
        filter
      } = this.pagination;
      let { merchantName, sportId,currency, date,startDate, endDate,startDate1, endDate1, agentLevel, merchantCode, timeZone, merchantCodeList} = this.searchForm;
      if(dateType === 'day'){
        startDate = moment(startDate).format("YYYYMMDD");
        endDate = moment(endDate).format("YYYYMMDD");
      }else{
        console.log(this.value)
        startDate = moment(this.value[0]).format("YYYYMM");
        endDate = moment(this.value[1]).format("YYYYMM");
      }
      if (/^\+?[0-9][0-9]*$/.test(merchantName)) {
        merchantCode = merchantName;
        merchantName = "";
      } else {
        merchantName = merchantName;
        merchantCode = "";
      }
      return {
        // date,
        pageNum: current,
        pageSize,
        merchantName,
        merchantCode,
        agentLevel,
        startDate,
        endDate,
        currency,
        timeZone,
        sportId,
        dateType,
        sort,
        orderBy,
        filter,
        merchantCodeList
      };
    },
    // 导出报表
    handle_export_excel() {
      // this.exportExcelShow = true;
      if (this.pagination.total > 0) {
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params, {"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId},{ url: "/order/merchant/merchantFileExport" });
        // api_export.post_excel_export(params);
        this.exportLoading = true;
        api_export.post_exportTicketList(params, params.url).then(res => {
          this.exportLoading = false;
          console.log(res)
          if(res.status == 200){
            this.download(res);
          }
        })
      }else{
        this.handle_error();
      }
    }
  },
  watch: {
    "pagination.dateType"(val) {
      this.isopen = false;
      if (val === "month") {
        this.value = [moment(this.searchForm.startDate1,'YYYY-MM'), moment(this.searchForm.endDate1, 'YYYY-MM')]
      }
    },
    tabledata(val) {
      // 同步表与footer滚动
      let dom = this.$refs.matchTable.$el.querySelectorAll(".ant-table-body")[0];  
      dom.addEventListener(
        "scroll",
        () => {
          this.$refs.matchTable.$el.querySelectorAll(
            ".ant-table-body"
          )[1].scrollLeft = dom.scrollLeft;
        },
        true
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}

>>>.ant-radio-button-wrapper-disabled{
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #c1c1c1;
}

>>>.ant-table-footer {
  padding 0px;
  padding-right :8px;
}

>>>.ant-empty-normal {
  margin: 285px 0;
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}


.red {
  color: $red;
}

.text-over-160{
  display inline-block;
  max-width 155px;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over1{
  display inline-block;
  vertical-align middle;
  // line-height 20px;
  max-width 70px ;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
  white-space: nowrap;
}
</style>
