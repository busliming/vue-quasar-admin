<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="对账单" class="fw_600 panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 0px 10px 10px 10px " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div id="top2" style="min-width: 1600px; overflow-x: hidden;" class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb10x pt10x border-radius-4px">
        <div class="append-handle-btn-input pl10x row line-height-30px" >
        <a-radio-group v-model="searchForm.filter" @change="on_change_filter">
          <a-radio-button value="3">结算时间</a-radio-button>    
          <a-radio-button value="1">投注时间</a-radio-button>      
        <!-- <a-radio-button value="2">开赛时间</a-radio-button> -->
        </a-radio-group>
        </div>
        <div class="append-handle-btn-input position-relative ml10x" style="margin-top:1px;">
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
        <div class="append-handle-btn-input pl10x row line-height-30px">
          <div class="mr10x">日期</div>
          <div class="w-240">
            <a-range-picker
              @change="on_change"
              :default-value="dateFormat"
              :disabled-date="disabledDate"
            />
          </div>      
        </div>
        <div class="append-handle-btn-input ml20x row w-200 position-relative">
          <a-input v-model.trim="searchForm.merchantName" placeholder="请输入商户编号" maxLength="20" allowClear autocomplete="off">
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12"/>
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="no-left append-handle-btn-input ml20x row position-relative" style=" width: 200px !important;">
          <!-- v-model="searchForm.merchantCodes" -->
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
        <div class="append-handle-btn-input pl20x position-relative">
          <a-select autocomplete class="w-120" placeholder="商户类型" @change="handle_agent_level">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in merchantTypeList"
              :key="index"
            >{{item.label}}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input pl20x position-relative">
          <a-select autocomplete class="w-120" placeholder="结算币种" @change="handle_currency">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in currencyList"
              :key="index"
            >{{item.label}}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input pl20x height-30px line-height-30px">
          <a-button type="primary" @click="handle_serarch">搜索</a-button>
        </div>
      </div>
      <a-table
        ref="TableInfo"
        class="pl10x pr10x expanded"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight - 45 }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id" 
      >
        <div slot="expandedbtn" slot-scope="text, record">
          <div v-for="(item, index) in record.dayVoList" :key="index">
            <span v-if="record.dayVoList.length > 1 && index < 1">
              <span
                :class="'row-close' + record._index"
                class="ant-table-row-expand-icon ant-table-row-collapsed"
                @click="table_item_click_expanded(record)"
              ></span>
            </span>
          </div>
        </div>
        <span slot="merchantName" slot-scope="text, record">
          <div class="text-over-130">
            <!-- {{getStrLength(record.merchantName)}} -->
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="getStrLength(record.merchantName)>20" placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 180px; word-break:break-all;`"
                  ></div>
                </template>
                <span class="text-over1">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over1">{{record.merchantName}}</span>
              <!-- <span v-else class="text-over1">亚博-包网10(凤凰)</span> -->
            </span>
            <!-- <br> -->
            <span class="text-panda-text-4 cursor-pointer text-over3 ml5x" @click="handleCopy(record.merchantCode,'商户编号')">[{{record.merchantCode}}]</span>
          </div>
        </span>
        <span slot="agentLevel" slot-scope="text">
          <span>{{ text | filterAgentLevel }}</span>
        </span>
        <span slot="currencyStr" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span>{{ item.currencyStr }}</span>
          </div>
        </span>
        <span slot="orderUserNum" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderUserNum == null">-</span>
            <span v-else>{{ item.orderUserNum | amount }}</span>
          </div>
        </span>
        <span slot="orderValidNum" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderValidNum== null" >-</span>
           <span v-else>{{ item.orderValidNum| amount }}</span>
          </div>
        </span>
        <span slot="orderAmountTotal" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.orderAmountTotal == null">-</span>
            <span v-else>{{ item.orderAmountTotal | moneyFormat }}</span>
          </div>
        </span>
        <span slot="platformProfit" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
            <span v-if="item.platformProfit == null">-</span>
            <span v-else :class="item.platformProfit<0?'panda-text-red': ''">{{ item.platformProfit | moneyFormat }}</span>
            <!-- <span v-else class="panda-text-red">{{ text }}%</span>   -->
          </div>
        </span>
        <span slot="platformProfitRate" slot-scope="text,record">
          <div :class="record.dayVoList.length > 0? 'line-height-36px': ''" v-for="(item, index) in record.dayVoList_ || (Array.isArray(record.dayVoList)  ?record.dayVoList.slice(0, 1) : [])" :key="index">
             <span v-if="item.platformProfitRate==null">-</span>
            <span :class="item.platformProfitRate<0?'panda-text-red': ''">{{ item.platformProfitRate | moneyFormat }}%</span>
          </div>
        </span>
      
        <span slot="action" slot-scope="text, record" class="q-gutter-md cursor-pointer">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">下载对账单</div>
            </template>
            <q-icon :class="record.dayVoList[0].orderAmountTotal <= 0? 'no-show': ''" @click.native="handle_download_record(record)" class="panda-icon panda-icon-xia-zai panda-icon-hover fs18"></q-icon>
          </a-tooltip>  
        </span>
         <template slot="footer" slot-scope="" >
          <a-table
            class="border-top expanded "
            :columns="totalColumns"
            :dataSource="dayTotal"
            :scroll="{ x: 1600 }"
            size="middle"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="rowkey" 
            >  
            <span slot="action" >
              <div>
                <span>-</span>
              </div>
            </span>
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

>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}
>>>.ant-table-footer {
  padding 0px;
  padding-right :8px;
}

.text-over1{
  display inline-block;
  max-width 155px;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over3{
  display inline-block;
  max-width 65px ;
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

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
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

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}
>>>.ant-table-expanded-row td{
  padding 0px;
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
import { api_finance,api_export } from "src/api/index.js";
import financesorter from "src/mixins/module/financesorter.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import financeMixin from 'src/pages/finance/statements/mixin/index.js'
import { tablecolumns_config } from "src/pages/finance/statements/config/config.js";
import { total_config } from "src/pages/finance/statements/config/config.js";
import { handleCopy,getStrLength } from "src/util/module/common.js";
import {delete_data}from "src/util/module/dataProcessing.js";
import moment from "moment";

export default {
  mixins: [financesorter,commonmixin,constantmixin,financeMixin],
  data() {
    return {
      tabledata: [],  // 表格数据
      columns: tablecolumns_config, // 表格配置
      totalColumns: total_config,  //总计配置
      tabledata_loading: false, //表格loading
      searchForm: {
        // 搜索条件查询参数
        financeDate: '',   // 结算时间 投注时间
        merchantName: "", // 商户名称
        agentLevel: "", // 商户类型
        currency: "", //结算币种
        filter:'3', // 1：投注时间    3：结算时间 （默认）
        timeZone: 'UTC8', // EZ：账务日    UTC8：自然日（默认）
        startTime:moment(new Date().setDate(new Date().getDate() - 2)).format(
          "YYYY-MM-DD"
        ),// 开始时间
        endTime:moment().format("YYYY-MM-DD"),// 结束时间
      },
      showDialogObj: {},
      show_right_detail_obj: "",
      currentRecord: "",
      dateFormat:[ moment(new Date(new Date().setDate(new Date().getDate() - 2)),'YYYY-MM-DD'),moment(new Date(), 'YYYY-MM-DD')]
    };
  },
  created() {
    this.tabledata_loading = true;
    this.init_merchant_list();
    this.initTableData();
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  methods: {
    moment,
    handleCopy,
    getStrLength,
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
    handle_time_zone_change(val){
      this.handleSearch();
    },
    // 账单下载
    handle_download_record(item) {
      // window.open(FILE_PREFIX_FINANCE  + item.financeDayId + "&filter="+this.searchForm.filter + "&timeZone="+this.searchForm.timeZone +'&user-id='+
      //   this.get_user_info.userId+"&app-id="+this.get_user_info.appId
      // )
      let params = {
        url: '/order/financeMonth/financeDayExport',
        financeDayId: item.financeDayId,
        filter:this.searchForm.filter,
        timeZone:this.searchForm.timeZone,
        "user-id": this.get_user_info.userId,
        "app-id": this.get_user_info.appId
      }
      api_export.post_excel_export(params,1)
    },
    disabledDate(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(0, 'days'))
    },
    handle_currency(val) {
      this.searchForm.currency = val;
      this.initTableData();
    },
    handle_agent_level(val) {
      this.searchForm.agentLevel = val;
      this.initTableData();
    },
    on_change_filter(val){
      this.pagination.current = 1, //分页，查询第几页数据。
      this.initTableData();
    },
    handle_serarch(){
      this.initTableData();
    },
    /**
     * @description 点击行展开某一行
     * @param  {Object} item 某一行数据对象
     * @return {undefined} undefined
     */
    table_item_click_expanded(item){
      let ind = item._index
      let dom = document.getElementsByClassName("row-close" + ind);
      console.warn(dom[0].classList.value);
      let domvalue = dom[0].classList.value.includes("ant-table-row-collapsed");
      let itemlist = document.getElementsByClassName("row-item-close" + ind);
      if (domvalue) {
        dom[0].classList.remove("ant-table-row-collapsed");
        dom[0].classList.add("ant-table-row-expanded");
      } else {
        dom[0].classList.remove("ant-table-row-expanded");
        dom[0].classList.add("ant-table-row-collapsed");
      }
      this.$lodash.forEach(itemlist, function(val, ind) {
        let itemval = val.classList.value.includes("hidden");
        if (domvalue) {
          val.classList.remove("hidden");
        } else {
          val.classList.add("hidden");
        }
      });
      if(item.showExpand && Array.isArray(item.dayVoList)){
        item.dayVoList_ = item.dayVoList.slice(0,1);
      }else if (Array.isArray(item.dayVoList)){
        item.dayVoList_ = item.dayVoList.slice();
      }
      this.$forceUpdate();
      item.showExpand = item.showExpand == true? false: true;
    },
    on_change(date, dateStrings) {
       Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
       this.initTableData();
    },
    initTableData() {    
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_finance.post_report_financeMonth_queryFinanceDay(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code === '0000000') {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
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
      this.init_day_total(params);
    },
    /**
     * @description 合计数据拉取
     * @param  {Object} params 传给后台的参数
     * @return {undefined} undefined
     */
    init_day_total(params){
      // 总计
      let paramsTotal = JSON.parse(JSON.stringify(params));
      delete_data(paramsTotal,'pageNum');
      delete_data(paramsTotal,'pageSize');
      api_finance.post_report_financeMonth_queryFinanceDayTotal(paramsTotal).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
      if (code === '0000000') {
          let obj = this.$lodash.get(res, "data.data") || {};
          let data = {};
          let filteArr = ['orderValidNum','orderUserNum']
          filteArr.forEach(item=>{
            data[item]= this.$options.filters['amount'] (obj[item]);
          })
          let moneyArr = ['orderAmountTotal','platformProfit','platformProfitRate']
          moneyArr.forEach(item=>{
            data[item]= this.$options.filters['moneyFormat'] (obj[item]);
          })
          data.platformProfitRate !='-' &&  data.platformProfitRate != 0? 
          data.platformProfitRate =  data.platformProfitRate + '%':
          data.platformProfitRate = '-'
          Object.assign(this.dayTotal[0],data); 
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let {financeDate,merchantName,agentLevel,currency,filter,timeZone,startTime,endTime,merchantCodeList} = this.searchForm;
      let params = {
        merchantName, //商户名称，可模糊搜索
        financeDate,
        agentLevel,
        currency,
        filter,
        timeZone,
        startTime,
        endTime,
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
        merchantCodeList
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item.showExpand = false;
      });
      return arr;
    }
  },
};
</script>
