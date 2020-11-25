<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="首页" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div class="row mt20x pl20x pr20x text-panda-text-dark">
      <div class="col bg-panda-bg-6 shadow-2 radius-4">
        <div class="row">
          <div
            class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600"
          >
            <div>
              <span class="title-block bg-panda-bg-2 mr5x"></span>今日投注信息
            </div>
            <div class="fs20 pt20x">{{ $route.query.userId }}</div>
          </div>
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x">
            <div class="fs20">{{ detailObj.merchantName }}</div>
            <div>icon</div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <span class="fs20">{{ detailObj.lastBet }}</span>
            </div>
            <div class="text-center">icon</div>
          </div>
        </div>
        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">投注金额</div>
            <div class="q-pr-sm">
              <span class="fs20"
                >￥{{ (detailObj.profit / 10000).toFixed(2) }}</span
              >万
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <div class="text-center">派彩金额</div>
              <div class="q-pr-sm">
                <span class="fs20"
                  >￥{{ (detailObj.profit / 10000).toFixed(2) }}</span
                >万
              </div>
            </div>
          </div>
        </div>

        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">盈利投注</div>
            <div class="q-pr-sm">
              <span class="fs20"
                >￥{{
                  detailObj && (detailObj.betAmount / 10000).toFixed(2)
                }}</span
              >万
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">投注笔数</div>
            <div class="text-center">
              <div class="q-pr-sm">
                <span class="fs20"
                  >￥{{
                    detailObj && (detailObj.betAmount / 10000).toFixed(2)
                  }}</span
                >万
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col bg-panda-bg-6 shadow-2 radius-4">
        <div class="row">
          <div
            class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600"
          >
            <div>
              <span class="title-block bg-panda-bg-2 mr5x"></span>今日用户信息
            </div>
            <div class="fs20 pt20x">{{ $route.query.userId }}</div>
          </div>
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x">
            <div class="fs20">{{ detailObj.merchantName }}</div>135356
            <div>icon</div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <span class="fs20">{{ detailObj.lastBet }}</span>
            </div>
            <div class="text-center">icon</div>
          </div>
        </div>
        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">投注金额</div>
            <div class="q-pr-sm">
              <span class="fs20"
                >￥{{ (detailObj.profit / 10000).toFixed(2) }}</span
              >万
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <div class="text-center">派彩金额</div>
              <div class="q-pr-sm">
                <span class="fs20"
                  >￥{{ (detailObj.profit / 10000).toFixed(2) }}</span
                >万
              </div>
            </div>
          </div>
        </div>

        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">盈利投注</div>
            <div class="q-pr-sm">
              <span class="fs20"
                >￥{{
                  detailObj && (detailObj.betAmount / 10000).toFixed(2)
                }}</span
              >万
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">投注笔数</div>
            <div class="text-center">
              <div class="q-pr-sm">
                <span class="fs20"
                  >￥{{
                    detailObj && (detailObj.betAmount / 10000).toFixed(2)
                  }}</span
                >万
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 bg-panda-bg-6 shadow-2 border-radius-4">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span
            >今日投注金额TOP10赛事
          </div>
        </div>
        <a-table
          class="border-top mt20x"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 760, y: 290 }"
          :pagination="pagination"
          :loading="tabledata_loading"
          size="middle"
          rowKey="id"
        ></a-table>
      </div>
    </div>

    <div class="row mt20x pr20x pl20x" style="height: 448px;">
      <div class="col-6 bg-panda-bg-6 shadow-2 border-radius-4">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>本月入驻商户信息
          </div>
        </div>
        <a-table
          class="border-top mt20x"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 760, y: 290 }"
          :pagination="pagination"
          :loading="tabledata_loading"
          size="middle"
          rowKey="id"
        ></a-table>
      </div>

      <div
        class="col bg-panda-bg-6 ml20x shadow-2 border-radius-4 position-relative"
      >
        <div
          class="fs16 line-height-16px pl20x pt20x mb20x text-panda-text-7 fw_600"
        >
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>投注额趋势
          </div>
        </div>
        <!-- <a-radio-group v-model="tab" style="right: 20px; top: 20px;" class="position-absolute">
          <a-radio-button value="a1">投注时间</a-radio-button>
          <a-radio-button value="a2">开赛时间</a-radio-button>
          <a-radio-button value="a3">结算时间</a-radio-button>
        </a-radio-group>
        <ve-line ref="lineChart" :loading="loading" :data="chartData" :colors="colors" width="99%" height="400px" :extend="lineExtend"></ve-line>-->
        <a-radio-group
          v-model="tab"
          style="right: 20px; top: 20px;"
          class="position-absolute"
        >
          <a-radio-button value="a1">投注时间</a-radio-button>
          <a-radio-button value="a2">开赛时间</a-radio-button>
          <a-radio-button value="a3">结算时间</a-radio-button>
        </a-radio-group>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="a1">
            <ve-line
              ref="lineChart"
              :loading="loading"
              :data="chartData"
              :colors="colors"
              width="99%"
              height="390px"
              :extend="lineExtend"
              :events="chartEvents"
            ></ve-line>
          </q-tab-panel>

          <q-tab-panel name="a2">
            <ve-line
              ref="lineChart"
              :loading="loading"
              :data="chartData"
              :colors="colors"
              width="99%"
              height="390px"
              :extend="lineExtend"
              :events="chartEvents"
            ></ve-line>
          </q-tab-panel>

          <q-tab-panel name="a3">
            <ve-line
              ref="lineChart"
              :loading="loading"
              :data="chartData"
              :colors="colors"
              width="99%"
              height="390px"
              :extend="lineExtend"
              :events="chartEvents"
            ></ve-line>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <!-- 月份弹窗 -->
    <q-dialog
      v-model="dialogMonthShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-month
        :detailObj="showDetailObj"
        :betRows="betRows"
        @closeDialogSetShow="handleCloseDialogSet"
      ></dialog-month>
    </q-dialog>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
import VeRing from "v-charts/lib/ring.common";
import "v-charts/lib/style.css";
import { tablecolumns_config } from "src/pages/merchant/bettinguser/config/userConfig.js";
import { api_user } from "src/api/index.js";
import dialogMonth from "src/pages/merchant/bettinguser/component/dialogMonth.vue";
export default {
  components: {
    VeLine,
    VeBar,
    VeRing,
    dialogMonth
  },
  data() {
    var self = this;
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      loading: false,
      colors: ["#5B8FF9 ", "#FF9D4D"],
      pagination: {
        pageSize: 10,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      },
      tab: "a1",
      // 柱状图配置
      chartSettings: {
        metrics: ["投注数量"],
        itemStyle: {
          color: "#84A1FF"
        }
      },
      chartExtend: {
        series: {
          barWidth: 30 //这就是宽度
        },
        legend: {
          left: "16",
          top: 20
        }, //隐藏legend
        yAxis: {
          minInterval: 5 //标值的最小间隔
        },
        grid: {
          show: false
        }
      },
      lineExtend: {
        legend: {
          left: "16",
          top: 15
        }, //隐藏legend
        series: [
          {
            name: "邮件营销",
            type: "line",
            symbolSize: 8, //拐点圆的大小
            color: ["red"], //折线条的颜色
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: "dotted" //'dotted'虚线 'solid'实线
                }
              }
            }
          }
        ]
      },
      // chartData_2: {
      //   columns: ["日期"],
      //   rows: [
      //     { 日期: "超过80%", 投注数量: 468, },
      //     { 日期: "50%~80%", 投注数量: 600, },
      //     { 日期: "20%~50%", 投注数量: 349, },
      //     { 日期: "20%以内", 投注数量: 385, }
      //   ]
      // },
      chartData: {
        columns: ["日期", "投注金额 (万)", "盈亏金额 (万)"],
        rows: [
          { 日期: "1月", 投注金额: 1393, 盈亏金额: -1093 },
          { 日期: "2月", 投注金额: 3530, 盈亏金额: 3230 },
          { 日期: "3月", 投注金额: 2923, 盈亏金额: 2623 },
          { 日期: "4月", 投注金额: 1723, 盈亏金额: 1423 },
          { 日期: "5月", 投注金额: 3792, 盈亏金额: 3492 },
          { 日期: "6月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "7月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "8月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "9月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "10月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "11月", 投注金额: 4593, 盈亏金额: 4293 },
          { 日期: "12月", 投注金额: 4593, 盈亏金额: 4293 }
        ]
      },
      detailObj: {}, //当前用户信息
      profitObj: {}, //盈利率数据
      betRows: [], //投注时间数据
      startRows: [], //开始时间数据,
      endRows: [], //结算时间数据
      orderLimit: [], //注单限额统计
      name: "",
      chartEvents: {
        click(e) {
          self.dialogMonthShow = true;
          self.showDetailObj.month = e.name;
          self.showDetailObj.userId = self.$route.query.userId;
          console.log(e);
        }
      },
      dialogMonthShow: false, //月份弹窗阀值
      showDetailObj: {}
    };
  },
  created() {
    this.tabledata = [
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      },
      {
        _index: 1,
        ip: "183.40.153.55",
        ipAddress: "广东省广州市电信",
        betNumber: 120,
        loginNumber: 120,
        endTime: "2019-12-18 12:00:00"
      }
    ];
    this.initUserInfo();
    this.initOrderMonth();
    this.initOrderProfit();
  },
  methods: {
    // 用户信息
    async initUserInfo() {
      let params = {
        userId: this.$route.query.userId
      };
      let res = await api_user.get_order_user_detail(params);
      // console.log(res.data)
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        this.chartData_2.rows[0]["投注数量"] = data.orderLimit20per;
        this.chartData_2.rows[1]["投注数量"] = data.orderLimit20to50;
        this.chartData_2.rows[2]["投注数量"] = data.orderLimit50to80;
        this.chartData_2.rows[3]["投注数量"] = data.orderLimit80per;
        this.detailObj = data;
      }
    },
    // 12个月投注额分析
    async initOrderMonth() {
      let params = {
        userId: this.$route.query.userId
      };
      let res = await api_user.get_order_user_orderMonth(params);
      // console.log(res.data)
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        // this.detailObj = data;
        data.length > 0 &&
          data.map((item, index) => {
            this.betRows.push({
              日期: item.time.toString().substr(4) + "月",
              "投注金额 (万)": item.betAmount / 10000,
              "盈亏金额 (万)": item.profit / 10000,
              time: item.time
            });
            this.startRows.push({
              日期: item.time.toString().substr(4) + "月",
              "投注金额 (万)": item.liveOrderAmount / 10000,
              "盈亏金额 (万)": item.liveProfit / 10000,
              time: item.time
            });
            this.endRows.push({
              日期: item.time.toString().substr(4) + "月",
              "投注金额 (万)": item.settleOrderAmount / 10000,
              "盈亏金额 (万)": item.settleProfit / 10000,
              time: item.time
            });
            return this.betRows, this.startRows, this.endRows;
          });
        this.chartData.rows = this.betRows;
        console.log(this.betRows, "betRows");
      }
    },
    // 盈利率
    async initOrderProfit() {
      let params = {
        userId: this.$route.query.userId
      };
      let res = await api_user.get_order_user_profit(params);
      // console.log(res.data)
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        this.profitObj = data;
      }
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.dialogMonthShow = false;
    }
  },
  watch: {
    tab(v) {
      this.$nextTick(_ => {
        this.$refs.lineChart.echarts.resize();
        // console.log(this.$refs.lineChart.echarts);
      });
      // console.log(v,'v');
      if (v == "a1") {
        this.chartData.rows = this.betRows;
      } else if (v == "a2") {
        this.chartData.rows = this.startRows;
      } else {
        this.chartData.rows = this.endRows;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}
</style>
