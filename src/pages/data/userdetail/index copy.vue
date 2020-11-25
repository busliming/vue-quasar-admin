<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x fs14" id="top1">
      <q-breadcrumbs separator=">" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="数据中心"  />
        <q-breadcrumbs-el label="用户投注统计" />
        <q-breadcrumbs-el label="用户投注详情" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>

    <div style="margin: 0px 10px 10px 10px" class="bg-panda-bg-6 shadow-3 border-radius-4">
      <div id="top2" class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x border-radius-4">
        <div class="append-handle-btn-input pl10x" style="box-sizing: border-box">
          <a-button type="primary" style="height: 30px; line-height: 30px;" @click="handle_back">返回</a-button>
        </div>
        <q-space />
        <div>
          <q-btn
            class="panda-btn-primary-dense bg-primary mr10x"
            style="width:105px;height:30px; "
            @click="handle_export_excel"
          >
             <a-icon type="export" />
            <div class="ml10x">导出报表</div>
          </q-btn>
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
        rowKey="_id"
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
            <div :class="[key==0?'row-close'+record._index:'hidden row-close'+record._index]">
              <q-separator v-if="record.seriesType!==1&&key>0" class="mt5x mb5x hr-grey-1"></q-separator>
              <div class="card-panel-row row line-height-24px justify-between DetailList">
                <div class="leftdetail">
                  <table-cell-ellipsis-ant
                    :str_all="('<div class=\'text-left Detail-text-grey\'>'+item.sportName +'/'+item.matchName+'</div><div class=\'text-left\'>'+item.matchInfo+'</div> <div class=\'text-left Detail-text-grey\' >'+item.betNo+'&nbsp;('+(item.beginTimeStr?item.beginTimeStr:'')+')</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
                <div>
                  <div class="card-panel-row row line-height-24px justify-between">
                    <div>
                      <span class="fw_600 text-red">{{ (item.oddsValue/100000).toFixed(3).slice(0,-1) }}</span>
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
          <span>{{text | moneyFormat}}</span>
        </span>
        <span slot="profitAmount" slot-scope="text" class="q-gutter-md">
          <span>{{text | moneyFormat}}</span>
        </span>
        <span slot="settleStatus" slot-scope="text,record">
          <span>{{settleStatusName[record.orderStatus]}}</span><br>
          <span v-if="record.settleTimeStr">{{record.settleTimeStr}}</span>
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
    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-excel></dialog-excel>
    </q-dialog>
    <q-dialog v-model="detailShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-Main :detailObj="showDialogObj" @closeDialogSetShow="handle_close_dialog_set"></dialog-Main>
    </q-dialog>
  </div>
</template>

<script>
import { api_user, api_export } from "src/api/index.js";
// import mixins from "src/mixins/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import log_login_mixin from "src/pages/data/userdetail/mixin/index.js";
import dialogExcel from "src/components/dialog/dialogExcel.vue";
import { tablecolumns_config } from "src/pages/data/userdetail/config/config.js";
import dialogMain from "src/pages/data/userdetail/component/dialogMain.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
export default {
  mixins: [commonmixin, dataCenterMixin, log_login_mixin],
  components: {
    dialogExcel,
    tableCellEllipsisAnt,
    dialogMain
  },
  data() {
    return {
      tabledata: [],  // 表格数据
      columns: tablecolumns_config, // 表格配置
      tabledata_loading: false, // 表格loading
      exportExcelShow: false, // 弹窗下载
      detailShow: false, // 注单详情
      showDialogObj: "" // 传给弹窗的数据
    };
  },
  created() {
    this.tabledata_loading = true;
    this.initTableData();
    console.log(this.$route,'$route')
  },
  methods: {
    handle_back() {
      this.$router.go(-1);
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
    handle_detail(record) {
      this.showDialogObj = { ...record };
      this.detailShow = true;
    },
    handle_close_dialog_set() {
      this.detailShow = false;
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_user.query_userorderlist(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }else{
          this.$message.error(res.data.msg, 2)
        }
      });
    },
    compute_init_tabledata_params() {
      let { current, pageSize, sort, orderBy } = this.pagination;
      let { sportId, date, dateType, userId, filter, timeZone} = this.$route.query;
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
        timeZone
      };
    },
    // 导出报表
    handle_export_excel() {
      if (this.pagination.total > 0) {
        this.exportExcelShow = true;
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params,{"user-id": this.get_user_info.userId },{"app-id": this.get_user_info.appId}, { url: "/order/user/exportUserOrder" });
        api_export.post_excel_export(params, 1);
        setTimeout(() => {
          this.exportExcelShow = false;
          console.log("exportExcelShow");
        }, 500);
      }
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

>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.icon-tog {
  font-size: 16px;
  margin: 5px 0;
}
</style>
