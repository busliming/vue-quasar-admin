<template>
  <div class="full-width full-height position-relative">
    <div class="pl10x pt10x fs14 pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="panda-text-2" />
        <q-breadcrumbs-el label="赛事投注统计" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3" style="margin: 0 10px 10px 10px;">
      <div id="top2" class="row line-height-30px  border-radius-4 items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x" style="min-width: 1700px; overflow-x: hidden;">
        <div class="append-handle-btn-input pl10x position-relative">
          <a-select autocomplete class="w-120" placeholder="请选择赛种" v-model="searchForm.sportId" @change="handle_change_sport_id">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in allMatches"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input ml20x w-240">
          <a-range-picker
            :defaultValue="defaultValue"
            :disabled-date="disabledDate"
            @change="on_change"
          />
        </div>
        <div class="append-handle-btn-input ml20x row w-200 position-relative">
          <a-input
            v-model.trim="searchForm.tournamentId"
            placeholder="请输入联赛ID"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="append-handle-btn-input ml20x row w-200 position-relative">
          <a-input
            v-model.trim="searchForm.matchId"
            placeholder="请输入赛事ID"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
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
        <div class="append-handle-btn-input ml20x row position-relative w-200">
          <a-select
            show-search
            placeholder="请输入或选择赛事等级"
            option-filter-prop="children"
            style="width: 100%"
            :filterOption="filterOption"
            allowClear
            @change="handle_match_change"
          >
            <a-select-option
              :value="item.value"
              :label="item.label"
              v-for="(item) in matchLevelList"
              :key="'match'+item.value"
            >{{item.label}}</a-select-option>
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
        <div class="row">
          <!-- <span class="pr40x">货币单位：人民币</span> -->
          <div class="append-handle-btn-input position-relative mr20x" style="margin-top: 1.5px;">
            <a-select autocomplete class="w-120" placeholder="币种类型" @change="handle_currency">
              <a-select-option
                :value="item.value"
                v-for="(item) in currencyList"
                :key="'currency' + item.value"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <a-dropdown>
            <a-menu slot="overlay" @click="handle_export_excel">
              <a-menu-item key="1">导出赛事统计</a-menu-item>
              <a-menu-item key="2">导出玩法统计</a-menu-item>
            </a-menu>
            <!-- <a-button class="mr20x" type="primary"> <a-icon type="export" /> 导出报表 </a-button> -->
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:105px;height:30px; "
              :loading="exportLoading"
            >
              <a-icon type="export" />
              <div class="ml10x">导出报表</div>
            </q-btn>
          </a-dropdown>
          <!-- <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:105px;height:30px; "
            @click="handle_export_excel"
          >
            <a-icon type="export" />
            <div class="ml10x">导出报表</div>
          </q-btn> -->
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
        <span slot="merchantName" slot-scope="text,record" class>
          <div class="text-over-130">
            <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
              <a-tooltip v-if="getStrLength(record.merchantName)>15" placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 180px; word-break:break-all;`"
                  ></div>
                </template>
                <span>{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else>{{record.merchantName}}</span>
              <!-- <span v-else class="text-over1">亚博-包网10(凤凰)</span> -->
            </span>
          </div>
        </span>
        <span slot="matchStatus" slot-scope="text" class>
          <span>{{ matchStatus[text] }}</span>
        </span>
        <div
          slot="matchInfo"
          slot-scope="text, record"
          class="display-inline-block"
          @mouseover="tooltip_icotitle_hidden('ico-title' + record._index, 1)"
          @mouseout="tooltip_icotitle_hidden('ico-title' + record._index, 2)"
        >
          <div
            class="textwidth-2 float-left tournamentId cursor-pointer"
            @click="handleCopy(record.tournamentId,'联赛ID')"
          >
            <table-cell-ellipsis-ant :span_html="text" :str_all="text"></table-cell-ellipsis-ant>
          </div>
          <span class="float-right ml1x hidden" :ref="'ico-title' + record._index">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ record.matchId }}</span>
              </template>
              <img
                src="~assets/copy.svg"
                class="tag-read cursor-pointer"
                @click="handleCopy(record.matchId,'赛事ID')"
              />
            </a-tooltip>
          </span>
        </div>
        <span slot="tournamentLevel" slot-scope="text,record" class>
          <span>{{ record.tournamentLevel | filterMatchLevel }}</span>
        </span>
        <span slot="beginTime" slot-scope="text,record" class>
          <span>{{ record.beginTimeStr }}</span>
        </span>
        <span slot="betAmount" slot-scope="text,record" class>
          <span>{{ record.validBetAmount | moneyFormat }}</span>
        </span>
        <span slot="orderAmount" slot-scope="text" class>
          <span>{{ text | amount }}</span>
        </span>
        <span slot="unSettleAmount" slot-scope="text" class>
          <span v-if="text">{{ text | moneyFormat }}</span>
          <span v-else>-</span>
        </span>
        <span slot="settleAmount" slot-scope="text" class>
          <span v-if="text">{{ text | moneyFormat }}</span>
          <span v-else>-</span>
        </span>
        <span slot="profit" slot-scope="text" class>
          <span v-if="text" v-bind:class="[text < 0 ? 'text-red' : '']">{{ text | moneyFormat }}</span>
          <span v-else>-</span>
        </span>
        <span slot="profitRate" slot-scope="text" class>
          <span v-if="text" v-bind:class="[text < 0 ? 'text-red' : '']">{{ text | moneyFormat }}%</span>
          <span v-else>-</span>
        </span>
        <span slot="playAmount" slot-scope="text, record" class>
          <span @click="handle_detail(record)" class="a-line cursor-pointer">{{ text }}</span>
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
      <!-- 统计数据 -->
      <div class="fs16 position-absolute line-height-30px" style="bottom: 11px; left: 25px;" v-if="tabledata.length>0">
        <span class="pr10x">
          <span class="title-grey">总计: </span>
          <span class="fw_600">{{userStatistics.orderAmount}}单</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户数: </span>
          <span class="fw_600">{{userStatistics.userAmount}}人</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">总计投注额: </span>
          <span class="fw_600" v-if="userStatistics.validBetAmount">¥{{userStatistics.validBetAmount}}</span>
          <span class="fw_600" v-else>--</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户净输赢: </span>
          <span
            v-if="userStatistics.profit !== undefined"
            class="fw_600"
            :class="userStatistics.profit>0?'text-red': 'text-green'"
          >{{userStatistics.profit | moneyFormat}}</span>
          <span v-else>--</span>
        </span>
        <!-- <a-tooltip trigger="hover">
          <template slot="title">
            <div :style="`max-width: 240px; word-break:break-all;`">此处只汇总用户近90天的已结算注单记录！与用户基本信息中累计注单数据不一致属于正常现象，详情请咨询平台客服工作人员！</div>
          </template>
          <a-icon type="question-circle" :class="userStatistics.sumProfitAmount>0?'text-red': 'text-green'" class="fs15 ml10x cursor-pointer" />
        </a-tooltip> -->
      </div>
    </div>
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
    <q-dialog v-model="detailShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-Main
        :detail_obj="showDialogObj"
        @closeDialogSetShow="handle_close_dialog_set"
        style="max-width:1010px;"
      ></dialog-Main>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { api_merchant, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import moment from "moment";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/matchbonus/config/config.js";
import dialogMain from "src/pages/data/matchbonus/component/dialog_main.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import log_login_mixin from "src/pages/data/matchbonus/mixin/index.js";
import { handleCopy,getStrLength,download } from "src/util/module/common.js";
export default {
  mixins: [commonmixin, dataCenterMixin, log_login_mixin, constantmixin],
  components: {
    dialogExcel,
    tableCellEllipsisAnt,
    dialogMain
  },
  data() {
    return {
      tabledata: [], // 表格数据
      defaultValue: [ moment(new Date(new Date().setDate(new Date().getDate() - 2)),'YYYY-MM-DD'),moment(new Date(), 'YYYY-MM-DD')], // 默认日期组件赋值
      columns: tablecolumns_config,
      tabledata_loading: false,
      detailShow: false,
      showDialogObj: "",
      exportExcelShow: false,
      searchForm: {
        sportId: "",
        startTime: moment(new Date().setDate(new Date().getDate() - 2)).format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        tournamentId: "",
        matchId: "",
        tournamentLevel: '', // 赛事等级
        merchantCodeList: '' // 商户名称
      }
    };
  },
  created() {
    this.tabledata_loading = true;
    this.initTableData();
    this.init_merchant_list();
  },
  destroyed(){
    this.clear_bool();
  },
  computed: {
    ...mapGetters(['get_bool']),
  },
  methods: {
    ...mapActions(['clear_bool']),
    getStrLength,
    moment,
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
    handle_match_change(value) {
      this.searchForm.tournamentLevel = value;
      this.initTableData();
      console.log(`selected ${value}`);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
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
    handle_change_sport_id(){
      this.handle_search();
    },
    disabledDate(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(1, 'days'))
    },
    handleCopy,
    /**
     * @description 鼠标移上去显示icon
     * @param  {String} 某一行的标识
     * @param  {Number} 1 移入 2 离开
     * @return {undefined} undefined
     */
    tooltip_icotitle_hidden(key, value) {
      let dom = this.$refs[key];
      if (value == 1) {
        dom.classList.remove("hidden");
      } else {
        dom.classList.add("hidden");
      }
    },
    /**
     * @description 玩法数量详情
     * @param  {Object} record 点击行数据
     * @return {undefined} undefined
     */
    handle_detail(record) {
      this.showDialogObj = { ...record };
      this.detailShow = true;
    },
    /**
     * @description 关闭弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.detailShow = false;
    },
    on_change(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      this.get_bool && this.clear_bool();
      this.initTableData();
    },
    handle_search() {
      this.initTableData();
    },
    initTableData() {
      if(this.get_bool){
        console.warn(moment().format('LT') === '11:46');
        // 从首页赛事Top10进来大于12点 默认选择当天日期
        if( moment().format('LT')<'12:00'){
          this.defaultValue = [ moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD'),moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD')]
        }else{
          this.defaultValue = [ moment(new Date(), 'YYYY-MM-DD'),moment(new Date(), 'YYYY-MM-DD')]
        }       
      }
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.query_MatchStatisticList(params).then(res => {
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
      let { current, pageSize, sort, orderBy } = this.pagination;
      let {
        tournamentId,
        startTime,
        endTime,
        matchId,
        sportId,
        currency,
        tournamentLevel,
        merchantCodeList
      } = this.searchForm;
      // startTime = this.get_bool?moment().format("YYYY-MM-DD"): startTime;
      // 从首页进来默认赋值 <12 减一天日期  
      if( this.get_bool &&  moment().format('LT')<'12:00'){
        startTime =  moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD').format("YYYY-MM-DD");
        endTime =  moment(new Date(new Date().setDate(new Date().getDate() - 1)), 'YYYY-MM-DD').format("YYYY-MM-DD");
      }else if(this.get_bool &&  moment().format('LT')>='12:00'){
        startTime = moment().format("YYYY-MM-DD")
      }
      return {
        pageNum: current,
        pageSize,
        tournamentId,
        startTime,
        endTime,
        matchId,
        sportId,
        sort,
        orderBy,
        tournamentLevel,
        currency,
        merchantCodeList
      };
    },
    /**
     * @description 导出报表
     * @return {undefined} undefined
     */
    handle_export_excel(e) {
      console.log('click', e.key);
      if (this.pagination.total > 0) {
        // this.exportExcelShow = true;
        let params = this.compute_init_tabledata_params();
        // params[user-id]= this.get_user_info.userCode;  
        params = this.delete_empty_property_with_exclude(params);
        
        if(e.key == 1){
          //赛事统计下载
          Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/match/exportMatchStatistic" });      
        }else{
          // 玩法统计报表下载
          Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/match/exportMatchPlayStatistic" });
        }
        // api_export.post_excel_export(params);
        this.exportLoading = true;
        api_export.post_exportTicketList(params, params.url).then(res => {
          this.exportLoading = false;
          console.log(res)
          if(res.status == 200){
            this.download(res);
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('导出失败')
        })
      }else{
        this.handle_error();
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
  margin: 310px 0;
}

.textwidth-2 {
  width: 172px;
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

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
  white-space: nowrap;
}
</style>
