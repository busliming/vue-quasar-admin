<template>
  <div class="full-width full-height">
    <div class="pl20x pt15x pb15x fs14 bg-panda-bg-6 row">
      <!-- 投注时间tab栏 -->
      <div>
        <a-radio-group v-model="pagination.filter">
          <a-radio-button value="1">投注时间</a-radio-button>
          <a-radio-button value="2">开赛时间</a-radio-button>
          <a-radio-button value="3">结算时间</a-radio-button>
        </a-radio-group>
      </div>
      <!-- 投注周期tab栏 -->
      <div class="ml20x">
        <a-radio-group v-model="pagination.dateType" class="pl20x">
          <a-radio-button value="day">日</a-radio-button>
          <a-radio-button value="week">周</a-radio-button>
          <a-radio-button value="month">月</a-radio-button>
          <a-radio-button value="year">年</a-radio-button>
        </a-radio-group>
      </div>
      <!-- 日期选择 -->
      <div class="ml20x">
        <a-week-picker
          :disabledDate="disabledDate"
          v-if="pagination.dateType==='week'"
          v-model="searchForm.week"
          placeholder="请选择周期"
          :defaultValue="defaultDate"
          @change="onChange"
        ></a-week-picker>
        <a-month-picker
          :disabledDate="disabledDate"
          v-else-if="pagination.dateType==='month'"
          :defaultValue="defaultDate"
          placeholder="请选择月份"
          @change="onChange"
        />
        <a-date-picker
          :disabledDate="disabledDate"
          :disabledTime="disabledDateTime"
          :defaultValue="defaultDate"
          v-else-if="pagination.dateType==='day'"
          @change="onChange"
        />
        <a-date-picker
          placeholder="请选择年份"
          mode="year"
          format="YYYY"
          :defaultValue="defaultDate"
          v-else-if="pagination.dateType==='year'"
          :value="time"
          :open="isopen"
          @panelChange="handlePanelChange"
          @openChange="handleOpenChange"
          @change="handleChange"
        />
      </div>
      {{defaultDate}}
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
        >
          <div class="append-handle-btn-input position-relative ml20x">
            <a-select
              autocomplete
              class="w-170"
              placeholder="体育种类"
              v-model="searchForm.sportId"
              @change="handlerMatches"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input
              v-model.trim="searchForm.user"
              placeholder="输入用户名/用户ID"
              @keydown.enter="handlerSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input
              v-model.trim="searchForm.merchantName"
              placeholder="请输入商户名称"
              @keydown.enter="handlerSearch"
              autocomplete="off"
              allowClear
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x" style="box-sizing: border-box">
            <a-button
              type="primary"
              style="height: 30px; line-height: 30px;"
              @click="handlerSearch"
            >搜索</a-button>
          </div>
          <q-space />
          <div>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:105px;height:30px; "
              @click="handleExportExcel"
            >
              <q-icon left class="panda-icon panda-icon-cha-kan panda-icon-white"></q-icon>
              <div class="ml10x">导出报表</div>
            </q-btn>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: 595 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="betNum" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betNum] | amount}}</span>
        </span>
        <span slot="betAmount" slot-scope="text, record" class="q-gutter-md">
          <span>{{record[filterName[pagination.filter].betAmount] | amount}}</span>
        </span>
        <span slot="profit" slot-scope="text, record" class="q-gutter-md">
          <span v-bind:class="[record[filterName[pagination.filter].profit]<0?'red':'']">
            <span>{{record[filterName[pagination.filter].profit] | amount}}</span>
          </span>
        </span>
        <span slot="profitRate" slot-scope="text, record" class="q-gutter-md">
          <span
            v-bind:class="[record[filterName[pagination.filter].profitRate]<0?'red':'']"
          >{{record[filterName[pagination.filter].profitRate]?record[filterName[pagination.filter].profitRate]+"%":"-"}}</span>
        </span>
        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <q-icon
            class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"
            @click.native="handleLook(record,index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>查看</span>
            </q-tooltip>
          </q-icon>
        </a>
      </a-table>
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
          betNum: "betNum",
          betAmount: "betAmount",
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
      allMatches: [
        { label: "全部赛种", value: "" },
        { label: "足球", value: 1 },
        { label: "篮球", value: 2 },
        { label: "网球", value: 3 }
      ],
      dateFormat: "YYYY-MM-DD",
      searchForm: {
        user: "",
        userId: "",
        merchantName: "",
        sportId: "",
        date: ""
      },
      exportExcelShow: false,
      time: null,
      isopen: false,
      defaultDate: ''
    };
  },
  created() {
    this.defaultYeah = moment(moment().format("YYYY"), this.dateFormat);
    console.log(this.$route,'$route')
    this.initSessionObj();
    this.initTableData();
  },
  destroyed() {
    if (this.$q.sessionStorage.getItem("userDetail")) {
      this.$q.sessionStorage.remove("userDetail");
      this.$q.sessionStorage.remove("noChangeWeek");
    }
  },
  directives: {
    width_eq_prev(el) {
      let prev = el && el.previousElementSibling;
      if (prev) {
        let width = prev.offsetWidth || 300;
        el.style.width = width + "px";
      }
    }
  },
  methods: {
    moment,
    // 处理用户投注详情回旋参数
    initSessionObj() {
      let initObj = this.$q.sessionStorage.getItem("userDetail");
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate");
      if (initObj) {
        this.searchForm.date = initObj.date;
        this.pagination.filter = initObj.filter;
        this.pagination.dateType = initObj.dateType;
        this.searchForm.date = initObj.date;
        this.searchForm.sportId = initObj.sportId;
        this.searchForm.user = initObj.user;
        this.searchForm.merchantName = initObj.merchantName;
        let noChangeWeek = this.$q.sessionStorage.getItem('noChangeWeek');
        this.defaultDate = selectedDate?  moment(moment(selectedDate).format("l"), this.dateFormat): initObj.date===noChangeWeek? moment(moment().format("l"), this.dateFormat): moment(moment(initObj.date).format("l"), this.dateFormat)
        console.log(this.defaultDate,'methods')
      } else {
        this.searchForm.date = moment().format("YYYYMMDD");
        this.defaultDate = moment(moment().format("l"), this.dateFormat);
        // console.log( moment(selectedDate).format("l"), this.dateFormat,'defaultWeek')
      }
      console.log(this.searchForm.date,'initSessionObj')
    },
    // 体育赛事种类切换
    handlerMatches(val) {
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
    handlerSearch() {
      this.initTableData();
    },
    handleLook(record, index) {
      let { sportId, date, user, merchantName } = this.searchForm;
      let { dateType, filter } = this.pagination;
      date = this.computeSelectedDate(dateType,date);
      let params = {
        date,
        dateType,
      }
      this.$q.sessionStorage.set('noChangeWeek',params);
      console.log(dateType,date,'@@@')
      this.$router.push({
        name: "users_user_detail",
        query: {
          userId: record.userId,
          sportId,
          date,
          dateType,
          filter,
          user,
          merchantName
        }
      });
    },
    // 关闭年期组件
    handleOpenChange(status) {
      this.isopen = status ? true : false;
    },
    // 更新年份值
    handlePanelChange(value, mode) {
      this.isopen = false;
      this.time = value;
      this.searchForm.date = moment(this.time).format("YYYY");
      this.initTableData();
    },
    // 清除年份值
    handleChange() {
      this.time = null;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
      let newdate = ''
      if (dateString) {
        if (this.pagination.dateType === "week") {
          newdate = dateString.replace(/-/g, "").replace("周", "");
          this.searchForm.date = newdate;  
        }else if(this.pagination.dateType === "day"){       
          this.searchForm.date =  moment(dateString).format("YYYYMMDD");
        }else if(this.pagination.dateType === 'month'){
          this.searchForm.date =  moment(dateString).format("YYYYMM");
        }
        this.$q.sessionStorage.set("selectedDate", date); 
        console.log(this.searchForm.date,'newdate')
        this.initTableData();
      }
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
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
      });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item.id = index + 1;
      });
      return arr;
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
      let { userId, user, merchantName, sportId, date } = this.searchForm;
      if (/^\+?[0-9][0-9]*$/.test(user)) {
        userId = user;
        user = "";
      } else {
        user = user;
        userId = "";
      }
      date = this.computeSelectedDate(dateType,date);
      
      console.log(date,dateType,'查看bug')
      return {
        date,
        pageNum: current,
        pageSize,
        userId,
        user,
        merchantName,
        sportId,
        dateType,
        sort,
        orderBy,
        filter
      };
    },
    computeSelectedDate(dateType,date){
      if (dateType === "year" && date) {
        date = moment(this.time).format("YYYY");
        console.log(date);
      } else if (dateType === "week") {
        // 前端显示的周比后端多了一周；需减1
        if(this.$q.sessionStorage.getItem("userDetail") || this.$q.sessionStorage.getItem('selectedDate')){
          let selectedDate = this.$q.sessionStorage.getItem('selectedDate');
          let userDetail = this.$q.sessionStorage.getItem('userDetail');
          let noChangeWeek = this.$q.sessionStorage.getItem('noChangeWeek');
          if(selectedDate){
            date = (moment(selectedDate).format("YYYY") + this.getYearWeek(moment(selectedDate).format("YYYY-MM-DD")))*1-1
          }else if(noChangeWeek) {
            date = (moment().format("YYYY") + this.getYearWeek(moment().format("YYYY-MM-DD")))*1-1
          }else{
             date = (moment(userDetail.date).format("YYYY") + this.getYearWeek(moment(userDetail.date).format("YYYY-MM-DD")))*1-1
          }
          console.log(date,'第几周');
        }else{
          date = this.isDate8(date)? (moment(date).format("YYYY") + this.getYearWeek(moment(date).format("YYYY-MM-DD")))*1-1: date*1-1;
        }
        
         console.log(date,dateType,'查看周期')
      } else if (dateType === "month") {
        // 根据
        let selectedDate = this.$q.sessionStorage.getItem('selectedDate');
        if(selectedDate){
          date = moment(selectedDate).format("YYYYMM");
        }else{
           date = this.isDate8(date) ? moment(date).format("YYYYMM") : date;
        }    
      }else{
        console.log(date,'处理前的日')
        if(this.$q.sessionStorage.getItem("userDetail") || this.$q.sessionStorage.getItem('selectedDate')){
          let selectedDate = this.$q.sessionStorage.getItem('selectedDate');
          let userDetail = this.$q.sessionStorage.getItem('userDetail');
          date = selectedDate?moment(selectedDate).format("YYYYMMDD"): moment(userDetail.date).format("YYYYMMDD")
        }else{
          // date = moment(date).format("YYYYMMDD");
          date = moment(date).format("YYYYMMDD");
        }
        console.log(date,'返回日')
      }
      return date;
    },
    // 导出报表
    handleExportExcel() {
      if (this.pagination.total > 0) {
        // this.exportExcelShow = true;
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params, { url: "/order/user/export" });
        api_export.post_excel_export(params);
      } else {
        this.$message.error("暂无数据！");
      }
    }
  },
  watch: {
    "pagination.dateType"(val) {
      let userDetail = this.$q.sessionStorage.getItem('userDetail');
      let selectedDate = this.$q.sessionStorage.getItem("selectedDate");
      let noChangeWeek = this.$q.sessionStorage.getItem("noChangeWeek");
      if((userDetail || selectedDate) && val !== 'week'){
        console.log(val,'111')
        this.defaultDate =selectedDate? moment(moment(selectedDate).format("l"), this.dateFormat): moment(moment(userDetail.date).format("l"), this.dateFormat);
      }else if( noChangeWeek && (noChangeWeek.dateType === val)){
        console.log('222')
        this.defaultDate = moment(moment(Date.now()).format("l"), this.dateFormat);
        console.log('---------------')
        console.log(this.defaultDate);
      }else{
        console.log('333')
        this.defaultDate = moment(moment().format("l"), this.dateFormat);
      }
      console.log(this.defaultDate,'pagination')
      this.time = null;
      this.isopen = false;
      if (val === "year") {
        this.time = moment(moment().format("YYYY"), this.dateFormat);
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 274px 0;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 15%;
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
</style>
