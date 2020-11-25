<template>
  <div class="full-width full-height" style="background: #F0F2F5">
    <div class="row pt20x text-panda-text-dark">  
      <div class="col bg-panda-bg-6 shadow-2 radius-4">
        <div class="row">
          <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
            <div>
              <span class="title-block bg-panda-bg-2 mr5x"></span>用户信息
            </div>
            <div class="fs20 pt20x">{{$route.query.userId}}</div>
          </div>
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x">
            <div class="fs20">{{detailObj.merchantName}}</div>
            <div>所属商户</div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <!-- <span class="fs20">{{moment(detailObj.lastBetStr).endOf('day').fromNow()}}</span> -->
              <span class="fs20" v-if="detailObj.lastLoginStr == '刚刚'">{{detailObj.lastLoginStr}}</span>
              <span class="fs20" v-else>{{detailObj.lastLoginStr}}前</span>
            </div>
            <div class="text-center">上次投注</div>
          </div>
        </div>
        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">
              <span class="fs20">￥{{(detailObj.profit/10000).toFixed(2)}}</span>万
            </div>
            <div class="q-pr-sm">累计盈利</div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <span class="fs20">{{detailObj.betNum | amount}}</span>单
            </div>
            <div class="text-center">投注数量</div>
          </div>
        </div>

        <div class="row mt20x">
          <div class="col-6 pl20x">
            <div class="q-pr-sm">
              <span class="fs20">￥{{detailObj&&(detailObj.betAmount/10000).toFixed(2)}}</span>万
            </div>
            <div class="q-pr-sm">累计投注</div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <span class="fs20">{{detailObj.betAvgDay}}</span>单
            </div>
            <div class="text-center">日均投注</div>
          </div>
        </div>
      </div>

      <div class="col-5 bg-panda-bg-6 shadow-2 radius-4 ml20x mr20x">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>盈利率
          </div>
        </div>
        <div class="row mt45x">
          <div class="col-4 text-center">
            <a-progress
              type="circle"
              :percent="(profitObj&&profitObj.fourteenDay&&(profitObj.fourteenDay.profitRate > 0)&&(profitObj.fourteenDay.profitRate).toFixed(2)*1) || 0"
              strokeColor=" #FBC02D"
              :strokeWidth="10"
            />
            <div class="mt30x">
              <div class="q-pr-sm">
                <span
                  class="fs20 fw_600"
                >￥{{profitObj&&profitObj.fourteenDay&&(profitObj.fourteenDay.profit/10000/100).toFixed(2)}}</span>万
              </div>
              <span>14天盈利</span>
            </div>
          </div>
          <div class="col-4 text-center">
            <a-progress
              type="circle"
              :percent="(profitObj&&profitObj.threeMonth&&(profitObj.threeMonth.profitRate > 0)&&(profitObj.threeMonth.profitRate).toFixed(2)*1) || 0"
              strokeColor=" #F9A825"
              :strokeWidth="10"
            />
            <div class="mt30x">
              <div class="q-pr-sm">
                <span
                  class="fs20 fw_600"
                >￥{{profitObj&&profitObj.threeMonth&&(profitObj.threeMonth.profit/10000/100).toFixed(2)}}</span>万
              </div>
              <span>3个月盈利</span>
            </div>
          </div>
          <div class="col-4 text-center">
            <a-progress
              type="circle"
              :percent="(profitObj&&profitObj.sixMonth&&(profitObj.sixMonth.profitRate>0)&&(profitObj.sixMonth.profitRate).toFixed(2)*1) || 0"
              strokeColor=" #F57F17"
              :strokeWidth="10"
            />
            <div class="mt30x">
              <div class="q-pr-sm">
                <span
                  class="fs20 fw_600"
                >￥{{profitObj&&profitObj.sixMonth&&(profitObj.sixMonth.profit/10000/100).toFixed(2)}}</span>万
              </div>
              <span>6个月盈利</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 bg-panda-bg-6 shadow-2 radius-4">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>注单限额统计
          </div>
        </div>
        <ve-histogram
          ref="betUser14"
          id="betUser14"
          :loading="chartSettings.loading"
          width="100%"
          height="280px"
          :data="chartData_2"
          :data-empty="chartData_2.rows.length>0? false: true"
          :settings="chartSettings"
          :extend="chartExtend"
        >
          <!-- <div class="data-empty"  v-if="userData.rows.length < 0">没有数据😂</div> -->
        </ve-histogram>
        <!-- <ve-bar
          :data="chartData_2"
          :style="{width:'100%',height: '280px',}"
          :settings="chartSettings"
          height="320px"
          width="98%"
          :extend="chartExtend "
        ></ve-bar>-->
      </div>
    </div>


    <div class="row mt20x" style="height: 448px;">
      <div class="col-6 bg-panda-bg-6 shadow-2 border-radius-4">
        <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>最近登录IP地址
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

      <div class="col bg-panda-bg-6 ml20x shadow-2 border-radius-4 position-relative">
        <div class="fs16 line-height-16px pl20x pt20x mb20x text-panda-text-7 fw_600">
          <div>
     
            <span class="title-block bg-panda-bg-2 mr5x"></span>投注金额趋势
          </div>
        </div>
        <!-- <a-radio-group v-model="tab" style="right: 20px; top: 20px;" class="position-absolute">
          <a-radio-button value="a1">投注时间</a-radio-button>
          <a-radio-button value="a2">开赛时间</a-radio-button>
          <a-radio-button value="a3">结算时间</a-radio-button>
        </a-radio-group>
        <ve-line ref="lineChart" :loading="loading" :data="chartData" :colors="colors" width="99%" height="400px" :extend="lineExtend"></ve-line>-->
        <a-radio-group v-model="tab" style="right: 20px; top: 20px;" class="position-absolute">
          <a-radio-button value="a1">投注时间</a-radio-button>
          <!-- <a-radio-button value="a2">开赛时间</a-radio-button> -->
          <a-radio-button value="a3">结算时间</a-radio-button>
        </a-radio-group>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="a1">
            <ve-line
              ref="lineChart"
              :loading="loading"
              :data="chartData"
              :colors="colors"
              width="98%"
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
    <q-dialog v-model="dialogMonthShow" persistent transition-show="scale" transition-hide="scale">
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
import { api_user, api_data } from "src/api/index.js";
import dialogMonth from "src/pages/merchant/bettinguser/component/dialogMonth.vue";
import moment from "moment";
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
        },
        loading: false
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
      chartData_2: {
        columns: ["日期"],
        rows: [
          { 日期: "超过80%", 投注数量: 468 },
          { 日期: "50%~80%", 投注数量: 600 },
          { 日期: "20%~50%", 投注数量: 349 },
          { 日期: "20%以内", 投注数量: 385 }
        ]
      },
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
      showDetailObj: {},
      userDetail: "" //用户详情
    };
  },
  created() {
    this.tabledata = [];
    this.initUserInfo();
    this.initOrderMonth();
    this.initOrderProfit();
  },
  methods: {
    moment,
    // 用户信息
    async initUserInfo() {
      this.chartSettings.loading = true;
      let params = {
        userId: this.$route.query.userId
      };
      let res = await api_user.get_order_user_detail(params);
      this.chartSettings.loading = false;
      // console.log(res.data)
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        // this.chartData_2.rows[0]['投注数量'] = data.orderLimit20per;
        // this.chartData_2.rows[1]['投注数量'] = data.orderLimit20to50;
        // this.chartData_2.rows[2]['投注数量'] = data.orderLimit50to80;
        // this.chartData_2.rows[3]['投注数量'] = data.orderLimit80per;
        this.detailObj = data;
        this.chartData_2.rows = [];
      }
    },
    // 12个月投注额分析
    async initOrderMonth() {
      this.loading = true;
      let params = {
        userId: this.$route.query.userId
      };
      let res = await api_user.get_order_user_orderMonth(params);
      this.loading = false;
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
        this.$refs.lineChart.echarts.resize();
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
>>>.ant-empty-normal {
  margin: 121px 0 !important;
}

>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}

.bos {
  box-sizing: border-box;
  margin-top: -1px;
}

.title {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333;
  background: #F2F2F2;
  box-sizing: border-box;
}

.content {
  width: 50%;
  border: 1px solid #cecece;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  text-align: center;
  color: #333333;
  box-sizing: border-box;
}
</style>
