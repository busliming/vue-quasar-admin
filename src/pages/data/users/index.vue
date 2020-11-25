<template>
  <div class="full-width full-height position-relative">
    <div class="pl10x pt10x pb10x fs14" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="panda-text-2" />
        <q-breadcrumbs-el label="用户投注统计" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="fs14 bg-panda-bg-6 shadow-3" style="margin: 0 10px 10px 10px;">
      <div id="top2" class="pb10x" style="min-width: 1600px; overflow-x: hidden;">
        <div class="row pl10x pt10x pb10x">
          <!-- 投注时间tab栏 -->
          <div class="tabs">
            <a-radio-group v-model="pagination.filter">
              <a-radio-button value="3">结算时间</a-radio-button>   
              <a-radio-button value="1">投注时间</a-radio-button>            
              <!-- <a-radio-button value="2">开赛时间</a-radio-button> -->
            </a-radio-group>
          </div>
          <!-- 投注周期tab栏 -->
          <div class="ml20x">
            <a-radio-group v-model="pagination.dateType" class="pl20x">
              <a-radio-button value="day">日</a-radio-button>
              <!-- <a-radio-button value="week">周</a-radio-button> -->
              <a-radio-button value="month">月</a-radio-button>
              <!-- <a-radio-button value="year">年</a-radio-button> -->
            </a-radio-group>
          </div>
          <!-- 日期选择 -->
          <div class="ml20x w-200">
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
            <!-- <a-date-picker
              :disabledDate="disabledDate"
              :disabledTime="disabledDateTime"
              v-if="pagination.dateType==='day'"
              :defaultValue="defaultDay"
              @change="handle_select_day"
            />
            <a-week-picker
              :disabledDate="disabledDate"
              v-else-if="pagination.dateType==='week'"
              placeholder="请选择周期"
              :defaultValue="defaultWeek"
              @change="handleSelectWeek"
            ></a-week-picker>
            <a-month-picker
              :disabledDate="disabledDate"
              v-else-if="pagination.dateType==='month'"
              placeholder="请选择月份"
              :defaultValue="defaultMonth"
              @change="handle_select_month"
            />
            <a-date-picker
              placeholder="请选择年份"
              mode="year"
              format="YYYY"
              v-else-if="pagination.dateType==='year'"
              :value="time"
              :open="isopen"
              @panelChange="handlePanelChange"
              @openChange="handle_open_change"
              @change="handle_change"
            /> -->
          </div>
          <!-- 自然日切换 -->
          <div class="append-handle-btn-input position-relative ml10x" >
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
          <q-space />
          <div>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:105px;height:30px; "
              @click="handle_export_excel"
              :loading="exportLoading"
            >
              <a-icon type="export" />
              <div class="ml10x">导出报表</div>
            </q-btn>
          </div>
        </div>
        <div class="border-top"></div>
        <div class="content row pt10x">
          <div class="append-handle-btn-input position-relative ml10x">
            <a-select
              autocomplete
              class="w-120"
              placeholder="体育种类"
              v-model="searchForm.sportId"
              @change="handle_matches"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-bet"></div>
          </div>
          <div class="append-handle-btn-input ml20x w-200 position-relative">
            <a-input
              v-model.trim="searchForm.userName"
              placeholder="输入用户名/用户ID"
              @keydown.enter="handle_search"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
            </a-input>
            <div class="position-absolute select-left-border-bet"></div>
          </div>
          <div class="no-left append-handle-btn-input ml20x position-relative" style=" width: 200px !important;">
            <a-tree-select             
              show-search
              :tree-data="merchantList"
              style="width: 100%"
              @change="handle_merchant_change"
              :dropdown-style="{maxHeight: '400px', overflow: 'auto' }"
              placeholder="请输入或选择商户名称"
              allow-clear
              dropdownMatchSelectWidth
              tree-default-expand-all
              treeNodeFilterProp='title' 
            >
            </a-tree-select>
            <div class="position-absolute select-left-border-bet"></div>
          </div>
          <div class="append-handle-btn-input pl20x row line-height-30px">
            <div style="line-height: 30px; margin-right: 10px;">投注金额</div>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.minBetAmount"
                placeholder="最小值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.maxBetAmount"
                placeholder="最大值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl20x pr20x row line-height-30px">
            <div style="line-height: 30px; margin-right: 10px;">输赢金额</div>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.minProfit"
                placeholder="最小值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.maxProfit"
                placeholder="最大值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl30x" style="box-sizing: border-box">
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
        rowKey="id"
      >
        <span slot="time" slot-scope="text, record" >
          <span>{{get_time(record.time)}}</span>
        </span>
        <span slot="userId" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userId,'用户ID')">{{record.userId}}</span>
        </span>
        <span slot="userName" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userName,'用户名')">{{record.userName}}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">{{record.merchantName}}</span>
        </span>
        <span slot="betNum" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betNum] | amount}}</span>
        </span>
        <span slot="betAmount" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betAmount] | moneyFormat}}</span>
        </span>
        <span slot="profit" slot-scope="text, record" class="q-gutter-md">
          <span v-bind:class="[record[filterName[pagination.filter].profit]<0?'red':'']">
            <span>{{record[filterName[pagination.filter].profit] | moneyFormat}}</span>
          </span>
        </span>
        <span slot="profitRate" slot-scope="text, record" class="q-gutter-md">
          <span
            v-bind:class="[record[filterName[pagination.filter].profitRate]<0?'red':'']"
            v-if="record[filterName[pagination.filter].profitRate]"
          >{{record[filterName[pagination.filter].profitRate] | moneyFormat}}%</span>
          <span v-else>-</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a class="bet" @click.prevent="handle_look(record, index)">投注详情</a>
          <!-- <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看用户投注详情</div>
            </template>
            <q-icon @click.native="handle_look(record, index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip> -->
        </a>
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
      <!-- 统计数据 -->
      <div class="fs16 position-absolute line-height-30px" style="bottom: 11px; left: 25px;" v-if="tabledata.length>0">
        <span class="pr10x">
          <span class="title-grey">总计: </span>
          <span class="fw_600">{{this.pagination.filter === '3'? userStatistics.settleOrderNum : userStatistics.validTickets}}单</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户数: </span>
          <span class="fw_600">{{userStatistics.userSum}}人</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">总计投注额: </span>
          <span class="fw_600" v-if="userStatistics.settleOrderAmount || userStatistics.validBetAmount">¥{{this.pagination.filter === '3'?userStatistics.settleOrderAmount: userStatistics.validBetAmount | amount}}</span>
          <span class="fw_600" v-else>--</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户净输赢: </span>
          <span
            v-if="userStatistics.settleProfit || userStatistics.profit"
            class="fw_600"
            :class="userStatistics.profit>0 || userStatistics.settleProfit > 0 ?'text-red': 'text-green'"
          >{{this.pagination.filter === '3'?userStatistics.settleProfit: userStatistics.profit | moneyFormat}}</span>
          <span v-else>--</span>
        </span>
      </div>
    </div>
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
  </div>
</template>

<script>
import { api_user, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/users/config/config.js";
import { handleCopy,download } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin],
  components: {
    dialogExcel
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      filterName: {
        "1": {
          betNum: "validTickets",
          betAmount: "validBetAmount",
          profit: "profit",
          profitRate: "profitRate"
        },
        "2": {
          betNum: "liveOrderNum",
          betAmount: "liveOrderAmount",
          profit: "liveProfit",
          profitRate: "liveProfitRate"
        },
        "3": {
          betNum: "settleOrderNum",
          betAmount: "settleOrderAmount",
          profit: "settleProfit",
          profitRate: "settleProfitRate"
        }
      },
      dateFormat: "YYYY-MM-DD",
      searchForm: {
        //搜索查询条件
        filter: '1', // 默认为结算时间
        userName: "", // 用户名
        userId: "", // 用户ID
        merchantName: "", // 商户名称
        sportId: "", // 赛种
        // date: "",  // 202009 日期格式
        startDate:moment(new Date().setDate(new Date().getDate() - 2)).format("YYYY-MM-DD"), // 日-开始时间
        endDate: moment().format("YYYY-MM-DD"), // 日-结束时间
        startDate1:  moment(new Date().setDate(new Date().getDate() - 90)).format("YYYY-MM"),  // 月-开始时间
        endDate1: moment().format("YYYY-MM"), // 月-结束时间
        minBetAmount: "", //  投注金额最小值
        maxBetAmount: "", // 投注金额最大值
        minProfit: "", // 输赢金额最小值
        maxProfit: "", // 输赢金额最大值
        timeZone: "UTC8", //日期类型 EZ是帐务日，UTC8是自然日
      },
      exportExcelShow: false,
      isopen: false,  // 处理年份组件阀值
      defaultDay: null, // 默认日期
      defaultWeek: null, // 默认周数
      defaultMonth: null, // 默认月份
      time: null, // 默认年份
      timeZoneList: [
        // 区分账务日/自然日
        // { label: '所有账期', value: ''},
        { label: '自然日', value: 'UTC8'},
        { label: '账务日', value: 'EZ'},
      ],
      value: [],
      mode: ['month', 'month'],
    };
  },
  created() {
    this.tabledata_loading = true;
    // this.init_session_obj();
    this.init_merchant_list();
    this.initTableData();
  },
  methods: {
    moment,
    download,
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
    /**
     * @description 账务日/自然日切换
     * @return {undefined} undefined
     */
    handle_time_zone_change(val){
      this.handle_search();
    },
    /**
     * @description 将20201104转为2020-11-04
     * @param  {Number} time 转化前日期格式
     * @return {String} 转化后日期格式
     */
    get_time(time){
      // console.log(typeof time);
      let need_time = String(time);
      return need_time.length > 6? need_time.slice(0,4)+'-'+ need_time.slice(4,6)+'-'+ need_time.slice(-2): need_time.slice(0,4)+'-'+ need_time.slice(-2);
    },
    /**
     * @description 商户名称树形下拉框 选中某一个父级节点，需要将它子级节点value一起带给后台
     * @param  {value,label} 所选中的merchantCode值  所选中的merchantName值
     * @return {undefined} undefined
     */
    handle_merchant_change(value,label){
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
    // 复制
    handleCopy,
    /**
     * @description 选择日期参数处理
     * @return {undefined} undefined
     */
    handle_select_day(date, dateString){
      //  2020-04-11 转为 20200411
      this.searchForm.day =  moment(dateString).format("YYYYMMDD");
      this.$q.sessionStorage.set("selectedDate",date);
      this.initTableData();
    },
    //选择周参数处理
    handleSelectWeek(date, dateString){
      this.searchForm.week = dateString.replace(/-/g, "").replace("周", "");
      this.$q.sessionStorage.set("selectedDate",date);
      this.initTableData();
    },
    /**
     * @description 选择月份参数处理
     * @return {undefined} undefined
     */
    handle_select_month(date, dateString){
      this.searchForm.month = moment(dateString).format("YYYYMM");
      this.$q.sessionStorage.set("selectedDate",date);
      this.initTableData();
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
     * @description 体育赛事种类切换
     * @return {undefined} undefined
     */
    handle_matches(val) {
      this.searchForm.sportId = val;
      this.initTableData();
    },
    disabledDate(current) {
      return current && current > moment().endOf("day");
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
    /**
     * @description 查看投注详情
     * @return {undefined} undefined
     */
    // handle_look(record, index) {
    //   let { sportId, timeZone } = this.searchForm;
    //   let { dateType, filter } = this.pagination;
    //   this.$router.push({
    //     name: "users_user_detail",
    //     query: {
    //       userId: record.userId,
    //       sportId,
    //       date: record.time,
    //       dateType,
    //       filter,
    //       timeZone
    //     }
    //   });
    // },
    handle_look(record, index) {
      let reocrd_obj = {...this.searchForm, ...record}
      this.$q.sessionStorage.set('record',reocrd_obj);
      let { timeZone } = this.searchForm;
      let { dateType, filter } = this.pagination;
      this.$router.push({
        name: "users_user_detail",
        query: {
          userId: record.userId,
          timeZone,
          dateType,
          filter
        }
      });
    },
    /**
     * @description handleOpenChange
     * @return {undefined} undefined
     */
    handleOpenChange(status) {
      this.isopen = status ? true : false;
    },
    /**
     * @description 清除年份值
     * @return {undefined} undefined
     */
    handle_change() {
      this.time = null;
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_user.query_userbetlist_byTime(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
          this.userStatistics = this.$lodash.get(res, "data.data.aggregate") || {};
        }
      });
    },
    compute_init_tabledata_params() {
      let { current,pageSize,dateType,sort,orderBy,filter } = this.pagination;
      let { userId, userName, merchantName,startDate, endDate, startDate1, endDate1, sportId, date, merchantCodeList, minBetAmount, maxBetAmount, minProfit, maxProfit, timeZone } = this.searchForm;
      if (/^\+?[0-9][0-9]*$/.test(userName) && userName.length > 16) {
        userId = userName;
        userName = "";
      } else {
        userName = userName;
        userId = "";
      }
      if(dateType === 'day'){
        startDate = moment(startDate).format("YYYYMMDD");
        endDate = moment(endDate).format("YYYYMMDD");
      }else{
        console.log(this.value)
        startDate = moment(this.value[0]).format("YYYYMM");
        endDate = moment(this.value[1]).format("YYYYMM");
      }
      console.log(date,dateType,'查看bug')
      return {
        // date,
        pageNum: current,
        pageSize,
        userId,
        userName,
        merchantName,
        sportId,
        dateType,
        sort,
        orderBy,
        filter,
        merchantCodeList,
        minBetAmount,
        maxBetAmount,
        minProfit,
        maxProfit,
        timeZone,
        startTime: startDate,
        endTime: endDate
      };
    },
    // 导出报表
    handle_export_excel() {
      if (this.pagination.total > 0) {
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/user/export" });
        // api_export.post_excel_export(params);
        this.exportLoading = true;
        api_export.post_exportTicketList(params, params.url).then(res => {
          this.exportLoading = false;
          console.log(res)
          if(res.status == 200){
            this.download(res);
          }
        })
      } else{
        this.handle_error();
      }
    }
  },
  watch: {
    // 处理给日期组件赋值
    "pagination.dateType"(val) {
      console.log(val,'watch监听数据')
      this.isopen = false;
      if (val === "month") {
        this.value = [moment(this.searchForm.startDate1,'YYYY-MM'), moment(this.searchForm.endDate1, 'YYYY-MM')]
      }
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
  margin: 288px 0;
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

.red {
  color: $red;
}

>>>.match-team-child {
  .text-panda-text-light {
    >>>.show_toggle {
      position: absolute;
      right: 0;
    }
  }
}

>>>.bet:hover{
  text-decoration underline;
}
</style>
