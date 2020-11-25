<template>
  <div class="full-width full-height" style="background: #F0F2F5">
    <div class="append-handle-btn-input pl10x row line-height-30px bg-panda-bg-6 mt10x pb10x">
      <div class="mr10x fs12">下注时间</div>
      <div>
        <a-range-picker
          show-time           
          @change="on_change"
        />
      </div>
      <div class="append-handle-btn-input ml20x row w-200 position-relative">
        <a-input
          v-model.trim="searchForm.orderNo"
          placeholder="请输入注单号"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        > 
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="append-handle-btn-input pl30x height-30px line-height-30px">
        <a-button
          type="primary"
          style="height: 30px; line-height: 30px;"
          @click="handle_search"
        >搜索</a-button>
      </div>
    </div>
    <div class="bg-panda-bg-6 border-radius-4 pl10x pr10x">
      <a-table
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: 450 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="orderDetailList" slot-scope="text,record">
          <div
            class="card-panel-row row line-height-24px justify-between color-blue"
            v-if="record.seriesType!==1"
          >
            <div class="text-left">
              <span>
                <span class="fw_600">{{ record.seriesValue }}</span>
                &nbsp;&nbsp;共&nbsp;{{record.betCount}}&nbsp;注&nbsp;&nbsp;每注：{{record.orderDetailList[0].betAmount}}
              </span>
            </div>
            <span
              class="panda-icon panda-icon-zhankai-beifen cursor-pointer icon-tog flipy"
              :class="'row-title'+record._index"
              @click="rowtog('row-close'+record._index,'row-title'+record._index)"
            ></span>
          </div>
          <div v-for="(item,key) in text" :key="key">
            <div :class="[key==0?'row-close'+record._index:'hidden row-close'+record._index]" class=" relative-position">
              <q-separator v-if="record.seriesType!==1&&key>0" class="mt5x mb5x hr-grey-1"></q-separator>
              <div class="card-panel-row row line-height-24px justify-between DetailList">
                <div class="leftdetail ">
                  <table-cell-ellipsis-ant
                    :str_all="('<div class=\'text-left Detail-text-grey\'>'+item.sportName +'/'+item.matchName+'</div><div class=\'text-left\'>'+item.matchInfo+'</div> <div class=\'text-left Detail-text-grey\' >'+item.betNo+'&nbsp;('+(item.beginTimeStr?item.beginTimeStr:'')+')</div>')"
                  ></table-cell-ellipsis-ant>
                  <div class="absolute-right" style="top: 25px;right: -80px;">{{betResultName[item.betResult]}}</div>
                </div>
                <div>
                  <div class="card-panel-row row line-height-24px justify-between">
                    <div>
                      <span
                        class="fw_600 text-red"
                      >{{ (item.oddsValue/100000).toFixed(3).slice(0,-1) }}</span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="title-grey"
                      >{{matchTypeName[ item.matchType] }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-panel-row row line-height-24px justify-between">
                <div class="text-left col-6">
                  <table-cell-ellipsis-ant
                    :str_all="('<div  class=\'ellipsis\'>'+item.playName+'&nbsp;&nbsp;</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
                <div class="text-right col-6 fw_600">
                  <table-cell-ellipsis-ant
                    :str_all="('<div  class=\'ellipsis\'>'+item.marketValue+'</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span slot="orderNo" slot-scope="text,record" class="q-gutter-md">
          <a @click="handle_detail(record)" class="a-line">{{text}}</a>
        </span>
        <span slot="productAmountTotal" slot-scope="text" class="q-gutter-md">
          <span>{{text | amount}}</span>
        </span>
        <span slot="profitAmount" slot-scope="text" class="q-gutter-md">
          <span>{{text | amount}}</span>
        </span>
        <span slot="settleStatus" slot-scope="text,record">
          <span>{{settleStatusName[record.orderStatus]}}</span><br>
          <span v-if="record.settleTimeStr">{{record.settleTimeStr}}</span>
        </span>
      </a-table>
    </div>
    <!-- 注单详情弹窗 -->
    <q-dialog v-model="detailShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-Main :detailObj="showDialogObj" @closeDialogSetShow="handle_close_dialog_set"></dialog-Main>
    </q-dialog>
  </div>
</template>

<script>
import { api_user, api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import userBet from "src/pages/merchant/bettinguser/mixin/index.js";
import { userBetConfig } from "src/pages/merchant/bettinguser/config/userBetConfig.js";
import dialogMain from "src/pages/merchant/bettinguser/component/dialogMain.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import moment from 'moment'
export default {
  mixins: [commonmixin, dataCenterMixin, userBet,constantmixin],
  components: {
    tableCellEllipsisAnt,
    dialogMain
  },
  data() {
    return {
      tabledata: [], //表格数据
      columns: userBetConfig, //表格配置
      tabledata_loading: false, //表格loading
      exportExcelShow: false, //
      detailShow: false,  // 查看注单详情-注单号点击
      showDialogObj: "", // 传给弹窗的数据
      searchForm: {
        // startTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 12:00:00`:`${moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')} 12:00:00`,
        // endTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')} 11:59:59`:`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 11:59:59`,
        startTime: '',  // 开始日期
        endTime: '',  // 结算日期
        orderNo: ''  // 注单号
      }
    };
  },
  created() {
    this.initTableData();
  },
  methods: {
    moment,
    on_change(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      // this.initTableData();
    },
    handle_search() {
      this.initTableData();
    },
    rowtog(key, title) {
      let tit = document.getElementsByClassName(title);
      let dom = document.getElementsByClassName(key);
      let domvalue = dom[1].classList.value.includes("hidden");
      let itemlist = document.getElementsByClassName(key);
      if (domvalue) {
        tit[0].classList.remove("flipy");
      } else {
        tit[0].classList.add("flipy");
      }
      this.$lodash.forEach(itemlist, function(val, ind) {
        if (domvalue) {
          val.classList.remove("hidden");
        } else if (ind > 0) {
          val.classList.add("hidden");
        }
      });
    },
    /**
     * @description 点击注单-注单详情弹窗
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
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_user.post_order_user_queryTicketList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(res.data.msg, 2);
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
      let {startTime, endTime, orderNo } = this.searchForm;
      let { current, pageSize, sort, orderBy } = this.pagination;
      let { sportId, date, dateType, userId, filter } = this.$route.query;
      return {
        pageNum: current,
        pageSize,
        userId,
        sort,
        orderBy,
        sportId,
        date,
        dateType,
        filter,
        startTime,
        endTime,
        orderNo
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.leftdetail div {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flipy {
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /* IE */
  filter: FlipV;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 15%;
}

>>>.icon-tog {
  font-size: 16px;
  margin: 5px 0;
}

.bos {
  box-sizing border-box;
  margin-top: -1px;
}
.title{
  width 50%
  border: 1px solid #1890ff;
  display inline-block;
  line-height 30px;
  height 30px; 
  text-align center;
  color #000;
  background: #e6f7ff;
  box-sizing border-box
}
.content{
  width 50%
  border: 1px solid #1890ff;
  display inline-block;
  line-height 30px;
  height 30px; 
  text-align center;
  color #000000;
  box-sizing border-box
}
</style>
