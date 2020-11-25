<template>
  <div class="full-width full-height">
    <div class="pl10x mt10x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="首页" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>

    <div class="row mt10x pl10x pr10x text-panda-text-dark">
      <!-- 今日投注信息 -->
      <div class="col-3 bg-panda-bg-6 shadow-2 radius-4">
        <div class="row pt10x pl20x pr20x">
          <div class="fw_600 fs16 text-panda-text-7">
            <span class="title-block bg-panda-bg-2 mr5x"></span>今日投注信息
          </div>
          <div class="ml10x" style="margin-top: 2px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 240px; word-break:break-all;`">统计的是当前账务日（12点至次日12点）内投注成功（已结算+未结算）的注单数据</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
          <q-space></q-space>
          <q-btn
            class="panda-btn-white fs12 text-panda-text-4 border-1px"
            style="width:68px;height:24px;"
            @click="handle_bet_currency"
            label="币种明细"
          />
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-touzhuliang" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">￥ {{betToday.betAmount | moneyFormat}}</span>
            </div>
            <div style="width: 80%; height: 20px;"></div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-paicai" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">派彩金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">￥ {{betToday.settleAmount | moneyFormat}}</span>
            </div>
          </div>
        </div>
        <q-space class="line"></q-space>
        <div class="row">
          <div class="col-6 pl20x text-center border-right-1px">
            <div style="width: 80%; height: 20px;"></div>
            <my-icon type="p-icon-yingli" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">盈利金额</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">￥ {{betToday.profit | moneyFormat}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <div style="width: 80%; height: 20px;"></div>
            <my-icon type="p-icon-touzhubishu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注笔数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">{{betToday.betNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 今日用户信息 -->
      <div class="col-3 bg-panda-bg-6 shadow-2 radius-4 ml10x mr10x">
        <div class="row pt10x pl20x pr20x">
          <div class="fw_600 fs16 text-panda-text-7">
            <span class="title-block bg-panda-bg-2 mr5x"></span>今日用户信息
          </div>
          <div class="ml10x" style="margin-top: 2px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div  :style="`max-width: 240px; word-break:break-all;`">统计的是当前账务日（12点至次日12点）内投注成功（已结算+未结算）的用户信息</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
          <q-space></q-space>
          <q-btn
            class="panda-btn-white fs12 text-panda-text-4 border-1px"
            style="width:68px;height:24px;"
            @click="handle_user_currency"
            label="币种明细"
          />
        </div>
        <div class="row pt20x">
          <div class="col-6 pl20x text-center border-right-1px">
            <my-icon type="p-icon-touzhuyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">投注用户数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">{{ userToday.betUserAmount | amount}}</span>
            </div>
            <div style="width: 80%; height: 20px;"></div>
          </div>
          <div class="col-6 text-center">
            <my-icon type="p-icon-huoyueyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">
              活跃投注用户数
              <a-tooltip trigger="hover">
                <template slot="title">
                  <span>累计投注金额≧￥5000</span>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">{{ userToday.briskUser | amount}}</span>
            </div>
          </div>
        </div>
        <q-space class="line"></q-space>
        <div class="row">
          <div class="col-6 pl20x text-center border-right-1px">
            <div style="width: 80%; height: 20px;"></div>
            <my-icon type="p-icon-zhuceyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">注册用户数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">{{ userToday.registerAmount | amount}}</span>
            </div>
          </div>
          <div class="col-6 text-center">
            <div style="width: 80%; height: 20px;"></div>
            <my-icon type="p-icon-xinzengyonghushu" style="fontSize: 48px;" />
            <div class="q-pr-sm text-panda-text-4 fs14 line-height-30px">新增用户数</div>
            <div class="q-pr-sm">
              <span class="fs16 fw_600 text-panda-text-7">{{ userToday.addUser | amount}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 今日投注金额TOP10赛事 -->
      <div class="col bg-panda-bg-6 shadow-2 radius-4" style="height: 330px;">
        <bet-top-ten :pagination="pagination"></bet-top-ten>
      </div>
    </div>

    <div class="row ml10x mt10x pr10x">
      <div class="col-6 bg-panda-bg-6 shadow-2 radius-4">
        <div class="row fs16 line-height-16px pl20x pt10x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>30天投注量趋势
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 240px; word-break:break-all;`">统计的是30个账务日（包含当前账务日）投注成功(已结算+未结算)的总注额和公司总盈利的变化趋势</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <div class="width: 500px;">
          <ve-line
          ref="betAmount14"
          id="userOrder"
          :loading="userOrderSettings.loading"   
          :data="chartData"
          :colors="userOrderSettings.colors"
          width="98%"        
          height="340px"
          :extend="lineExtend"
          :events="chartEvents"
          :settings="userOrderSettings"
          :mark-line="markLine"
          >
            <!-- :mark-line="markLine" -->
            <div class="data-empty" v-if="chartData.length < 0">没有数据😂</div>
          </ve-line>
        </div>
      </div>
      <div class="col bg-panda-bg-6 shadow-2 radius-4 ml10x">
        <div class="row fs16 line-height-16px pl20x pt10x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>30天投注用户趋势
          </div>
          <div class="ml10x" style="margin-top: 1px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 240px; word-break:break-all;`">统计的是30个账务日（包含当前账务日）每个账务日成功投注（已结算+未结算）的用户数和大额投注用户数（当天累计投注金额>=￥5000）的变化趋势</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <ve-line
          ref="betUser14"
          :loading="userSettings.loading"
          :data="userData"
          :colors="userSettings.colors"
          width="98%"
          height="340px"
          :extend="lineExtend"
          :events="chartEvents"
          :settings="userSettings"
          :mark-line="markLine1"
        >
          <div class="data-empty" v-if="userData.length < 0">没有数据😂</div>
        </ve-line>
      </div>
    </div>
    <div class="row mt10x pr10x pl10x pb10x">
      <div class="col-5 bg-panda-bg-6 shadow-2 border-radius-4 position-relative">
        <div class="row fs16 line-height-16px pl20x pt10x text-panda-text-7 fw_600 text-panda-text-7">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>本月入驻商户信息
          </div>
        </div>
        <a-radio-group
          v-model="tab"
          style="right: 100px; top: 10px; z-index: 99"
          class="position-absolute"
        >
          <a-radio-button value="0">直营商户</a-radio-button>
          <a-radio-button value="1">渠道商户</a-radio-button>
          <a-radio-button value="2">二级商户</a-radio-button>
        </a-radio-group>
        <div
          style="right: 20px; top: 15px; z-index: 99;"
          class="position-absolute cursor-pointer fs12"
          @click="handle_go_to_more"
        >更多</div>
        <a-table
          class="mt20x pl10x"
          :columns="merchantColumns"
          :dataSource="merchantData"
          :scroll="{ x: 670, y: 340 }"
          :pagination="pagination"
          :loading="merchantDataLoading"
          size="small"
          rowKey="_index"
        >
          <span slot="level" slot-scope="text, record">
            <span>Lv{{ record.level }}</span>
          </span>
          <span slot="merchantName" slot-scope="text, record">
            <table-cell-ellipsis-ant
              :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
              :str_all="('<div>'+record.merchantName +'</div>')"
              :defaultplace="'topLeft'"
              :col_width="200"
            ></table-cell-ellipsis-ant>
          </span>
          <span slot="parentName" slot-scope="text, record">
            <span class="text-over" v-if="record.parentName">{{ record.parentName }}</span>
            <span v-else>未返回</span>
          </span>
          <span slot="createTime" slot-scope="text, record">
            <span>{{ moment(record.createTime).format("MMM Do") }}</span>
          </span>
          <span slot="childAmount" slot-scope="text, record">
            <span v-if="record.childMaxAmount">
              <span>{{record.childAmount}}/{{record.childMaxAmount}}</span>
            </span>
            <span v-else>未返回</span>
          </span>
          <span slot="status" slot-scope="text, record">
            <span
              v-if="record.statusDescription == '即将过期'"
              class="panda-dot panda-dot-yellow line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '有效'"
              class="panda-dot panda-dot-green line-height-40px mr5x"
            ></span>
            <span
              v-if="record.statusDescription == '已过期'"
              class="panda-dot panda-dot-red line-height-40px mr5x"
            ></span>
            <span :class="record.statusDescription == '未上传'?'panda-text-red cursor-pointer': ''">
              <span
                v-if="record.statusDescription == '未上传'"
                class="panda-dot panda-dot-red line-height-40px mr5x"
                @click="handle_update_key(record)"
              ></span>
              <span
                v-if="record.statusDescription == '未上传'"
                @click="handle_update_key(record)"
              >{{record.statusDescription}}</span>
              <span v-else>{{record.statusDescription}}</span>
            </span>
          </span>
          <span slot="merchantAdmin" slot-scope="text, record, index">
            <span v-if="record.merchantAdmin">
              <a-tooltip v-if="getStrLength(record.merchantAdmin)>7" placement="topLeft">
                <template slot="title">
                  <div
                    v-html="record.merchantAdmin"
                    :style="`max-width: 200px; word-break:break-all;`"
                  ></div>
                </template>
                <span class="text-over-admin">{{record.merchantAdmin}}</span>
              </a-tooltip>
              <span v-else class="text-over-admin">{{record.merchantAdmin}}</span>
            </span>
            <span v-else class="panda-text-red cursor-pointer" @click="handle_edit(record,index)">未设置</span>
          </span>
        </a-table>
      </div>
      <div class="col-3 bg-panda-bg-6 shadow-2 border-radius-4 ml10x mr10x" style="min-height: 300px;">
        <div class="row fs16 line-height-16px pl20x pt10x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>商户分布信息
          </div>
        </div>
        <div class="mt20x">
          <ve-ring
            :data="merchantList"
            :extend="ringChart.chartExtend"
            :title="title"
            :colors="ringChart.colors"
            width="95%"
            height="360px"
            style="margin: 0 auto;"
          ></ve-ring>
        </div>
      </div>
      <div class="col bg-panda-bg-6 shadow-2 border-radius-4">
        <div class="row fs16 line-height-16px pl20x pt10x text-panda-text-7 fw_600">
          <div>
            <span class="title-block bg-panda-bg-2 mr5x"></span>本月商户投注金额排行
          </div>
          <div class="ml10x" style="margin-top: 2px;">
            <div class="text-panda-text-4 fs14">
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 240px; word-break:break-all;`">统计的是本月（本月1号12点至次月1号12点）投注成功（已结算+未结算）的总注额前十名的商户排行信息</div>
                </template>
                <a-icon type="question-circle" class="fs15" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <a-table
          class="mt10x pl10x"
          :columns="merchantBetColumns"
          :dataSource="merchantBetData"
          :scroll="{ x: 500, y: 330 }"
          :pagination="pagination"
          :loading="merchantBetLoading"
          size="small"
          rowKey="_index"
        >
          <span slot="_index" slot-scope="text, record">
            <span v-if="record._index == 1">
              <img :src="n1" alt />
            </span>
            <span v-if="record._index == 2">
              <img :src="n2" alt />
            </span>
            <span v-if="record._index == 3">
              <img :src="n3" alt />
            </span>
            <span v-if="record._index == 4">
              <img class="w-8" :src="n4" alt />
            </span>
            <span v-if="record._index == 5">
              <img class="w-8" :src="n5" alt />
            </span>
            <span v-if="record._index == 6">
              <img class="w-8" :src="n6" alt />
            </span>
            <span v-if="record._index == 7">
              <img class="w-8" :src="n7" alt />
            </span>
            <span v-if="record._index == 8">
              <img class="w-8" :src="n8" alt />
            </span>
            <span v-if="record._index == 9">
              <img class="w-8" :src="n9" alt />
            </span>
            <span v-if="record._index == 10">
              <img class="w-12" :src="n10" alt />
            </span>
          </span>   
          <span slot="merchantName" slot-scope="text, record, index">
            <span class="vertical-middle flex items-center">
              <span v-if="(record.lastBy - record.nowBy) === 0">
                <img :src="ping" class="mr5x" />
              </span>
              <span class="text-red vertical-middle flex items-center" v-if="record.lastBy < 11 && record.nowBy < record.lastBy">
                <img :src="up" class="middle" width="10" />
                <span class="ml5x mr5x">{{record.lastBy - record.nowBy}}</span>
              </span>
              <span
                class="text-red inline-block"
                v-if="(record.lastBy  === null|| record.lastBy > 11) && record.nowBy < 11 "
              >
                <img :src="news" class="mr5x middle" width="22" />
                <!-- {{record.nowBy}} -->
              </span>
              <span
                class="text-green"
                v-if=" (record.lastBy && record.lastBy < 11) && record.nowBy > record.lastBy"
              >
                <img :src="down" class="middle" width="10" />
                <span class="ml5x mr5x">{{-(record.lastBy - record.nowBy)}}</span>
              </span>
              <!-- <span>{{record.merchantName}}</span> -->
              <span
                @mouseenter="handler_tooltip_hidden('icon'+index,1)"
                @mouseleave="handler_tooltip_hidden('icon'+index,2)"
              >
                  <a-tooltip  v-if="getStrLength(record.merchantName)>7" placement="topLeft">
                    <template slot="title">
                      <div
                        v-html="record.merchantName"
                        :style="`max-width: 120px; word-break:break-all;`"
                      ></div>
                    </template>
                    <span class="text-over-70">{{record.merchantName}}</span>
                  </a-tooltip>
                  <span v-else class="text-over-70">{{record.merchantName}}</span>
                <span
                  @click="handler_dialog_money(record)"
                  class="hidden cursor-pointer"
                  :ref="'icon'+index"
                >
                  <img :src="money" class="ml5x" alt />
                </span>
              </span>
            </span>
          </span>
          <span slot="lastBy" slot-scope="text, record">
            <span v-if="record.lastBy">{{record.lastBy}}</span>
            <span v-else>-</span>
          </span>
          <span slot="betAmount" slot-scope="text, record">
            <span>￥{{ record.betAmount | moneyFormat }}</span>
          </span>
          <span slot="profit" slot-scope="text, record">
            <span>￥{{ record.profit | moneyFormat }}</span>
          </span>
        </a-table>
      </div>
    </div>
    <!--今日投注信息弹窗-->
    <q-dialog v-model="dialogUserShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-user :betTodayData="betTodayData"></dialog-user>
    </q-dialog>
    <!--今日用户信息币种弹窗-->
    <q-dialog v-model="dialogBetShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-bet :userToday="userToday" :userTodayData="userTodayData"></dialog-bet>
    </q-dialog>
    <!-- 设置管理员弹窗 -->
    <q-dialog v-model="setMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @handle_close_dialog_set="handle_close_dialog_set"></dialog-set>
    </q-dialog>
    <!-- 未上传更新证书弹窗 -->
    <q-dialog v-model="eidtKeyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-edit :detailObj="showDialogObj" @closeDialog="handle_close_dialog_edit"></dialog-edit>
    </q-dialog>
    <!-- 今日投注金额TOP10赛事 多币种 -->
    <q-dialog v-model="dialogMoneyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-money :detailObj="showDialogObj"></dialog-money>
    </q-dialog>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
import VeRing from "v-charts/lib/ring.common";
import "v-charts/lib/style.css";
import { getStrLength } from 'src/util/module/common.js'
import { tablecolumns_config } from "src/pages/merchant/bettinguser/config/userConfig.js";
import { merchantConfig } from "src/pages/home/config/merchant.js";
import { channelConfig } from "src/pages/home/config/channelConfig.js";
import { secondConfig } from "src/pages/home/config/secondConfig.js";
import { merchant_bet_config } from "src/pages/home/config/merchantBetNumber.js";
import { api_home, api_user } from "src/api/index.js";
import dialogBet from "src/pages/home/component/dialogBet.vue";
import dialogUser from "src/pages/home/component/dialogUser.vue";
import dialogSet from "src/pages/merchant/merchantc/component/dialogSet.vue";
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
import dialogMoney from "src/pages/home/component/dialogMoney.vue";
import betTopTen from "src/pages/home/component/betTopTen.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import moment from "moment";
export default {
  components: {
    VeLine,
    VeBar,
    VeRing,
    dialogBet,
    dialogUser,
    dialogSet,
    dialogEdit,
    betTopTen,
    dialogMoney,
    tableCellEllipsisAnt
  },
  data() {
    var self = this;
    // this.markLine = {
    //   data: [
    //     {
    //       name: '平均线',
    //       type: 'average',
          
    //     }
    //   ],
    //   label: {
    //     position: 'middle',
    //   }
    // }
    // 30 天投注量趋势平均值配置
    this.markLine = {
        symbol: 'none',
        data: [
            {
                yAxis: 2,
                label:{
                    show: 'true',
                    position: 'middle',
                    // formatter: 'S线',
                    color: '#5B8FF9',
                    fontSize: 12
                },
                lineStyle:{
                    color: '#5B8FF9',
                    width: 1
                }
            },
            {
                yAxis: 1,
                label:{
                    show: 'true',
                    position: 'middle',
                    // formatter: '及格线',
                    color: '#FF9D4D',
                    fontSize: 12
                },
                lineStyle:{
                    color: '#FF9D4D',
                    width: 1
                }
            }
        ]
    }
    //  30 投注用户趋势平均值配置
    this.markLine1 = {
        symbol: 'none',
        data: [
            {
                yAxis: 2,
                label:{
                    show: 'true',
                    position: 'middle',
                    // formatter: 'S线',
                    color: '#5B8FF9',
                    fontSize: 12
                },
                lineStyle:{
                    color: '#5B8FF9',
                    width: 1
                }
            },
            {
                yAxis: 1,
                label:{
                    show: 'true',
                    position: 'middle',
                    // formatter: '及格线',
                    color: '#5AD8A6',
                    fontSize: 12
                },
                lineStyle:{
                    color: '#5AD8A6',
                    width: 1
                }
            }
        ]
    }
    return {
      columns: tablecolumns_config,  //币种明显弹窗表格配置
      merchantBetLoading: false,  // 本月商户投注金额排行loading
      merchantColumns: merchantConfig, // 本月入驻商户信息表格配置
      merchantBetColumns: merchant_bet_config, // 本月商户投注金额排行表格配置
      dialogBetShow: false, //今日投注信息币种明细阀值
      dialogUserShow: false, //今日用户信息币种明细阀值
      dialogMoneyShow: false, // 多币种弹窗阀值
      // 分页配置
      pagination: {
        pageSize: 100,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      },
      tab: "0", // 本月入住商户信息默认为直营商户
      // 柱状图配置
      chartSettings: {
        metrics: ["投注数量"],
        itemStyle: {
          color: "#84A1FF"
        }
      },
      //14天投注量趋势配置
      userOrderSettings: {
        colors: ["#5B8FF9 ", "#FF9D4D"],
        loading: false
      },
      // 14天用户投注堆叠面积图
      userSettings: {
        area: true,
        colors: ["#5B8FF9", "#5AD8A6"],
        loading: false
      },
      // 商户分布信息环形图
      ringChart: {
        // 环形图颜色
        colors: ["#5B8FF9", "#5AD8A6", "#5D7092"]
      },
      // 商户分布信息数据
      merchantList: {
        columns: ["agentLevel", "count"],
        rows: []
      },
      // 商户分布信息-环形图
      title: {
        text: "16,168",
        subtext: "商户总数量",
        x: "center",
        y: "center",
        itemGap: 10,
        textStyle: {
          color: "#3C4551",
          fontFamily: "微软雅黑",
          fontSize: 30,
          fontWeight: "bold"
        }
      },
      //
      chartExtend: {
        series: {
          barWidth: 30, //这就是宽度
          smooth: false
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
          top: 20
        }, //隐藏legend
        series: [
          {
            name: "邮件营销",
            type: "line",
            symbolSize: 20, //拐点圆的大小
            color: ["red"], //折线条的颜色
            smooth: false, // 曲线改成折线
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: "dotted" //'dotted'虚线 'solid'实线
                }
              }
            }
          },
          
        ],
        series: {
          smooth: false
        }
      },
      // 30天投注量趋势数据
      chartData: {
        columns: ["日期", "投注金额(万)", "盈利金额(万)"],
        rows: []
      },
      // 30天投注用户趋势数据
      userData: {
        columns: ["日期", "投注用户", "大额投注用户数"],
        rows: []
      },
      detailObj: {}, //弹窗需要信息
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
      merchantData: [], //本月入驻商户信息
      showDialogObj: {}, //保存弹窗需要的值
      setMerchantShow: false, // 设置管理员阀值
      merchantDataLoading: false,
      betToday: {}, //今日投注信息
      userToday: {}, //今日用户信息
      betTopTenData: [], //今日投注量 TOP10赛事
      merchantBetData: [], // 本月商户投注量排行
      matchTop10Loading: false, // 阀值
      betTodayData: [], //今日投注信息币种详细数据
      userTodayData: [], //今日用户信息币种详细数据
      n1: require("src/assets/1.svg"),
      n2: require("src/assets/2.svg"),
      n3: require("src/assets/3.svg"),
      n4: require("src/assets/4.svg"),
      n5: require("src/assets/5.svg"),
      n6: require("src/assets/6.svg"),
      n7: require("src/assets/7.svg"),
      n8: require("src/assets/8.svg"),
      n9: require("src/assets/9.svg"),
      n10: require("src/assets/10.svg"),
      money: require("src/assets/money.svg"),
      news: require("src/assets/new.svg"),
      ping: require("src/assets/juxing.svg"),
      up: require("src/assets/up.svg"),
      down: require("src/assets/down.svg"),
      eidtKeyShow: false, //证书弹窗
    };
  },
  created() {
    this.init_all_data();
  },
  methods: {
    moment,
    getStrLength,
    /**
     * @description 是否显示多币种弹窗
     * @param  {String} key dom的refs值
     * @param  {Number} value 1/2
     * @return {undefined} undefined
     */
    handler_tooltip_hidden(key, value) {
      console.warn(key, value);
      /* 727版本需求注释掉 */ 
      // let dom = this.$refs[key];
      // value === 1
      //   ? dom.classList.remove("hidden")
      //   : dom.classList.add("hidden");
    },
    /**
     * @description 多币种弹窗
     * @param  {Object} record 行对象
     * @return {undefined} undefined
     */
    handler_dialog_money(record) {
      this.detailObj = { ...record };
      this.dialogMoneyShow = true;
    },
    /**
     * @description 初始化所有数据
     * @return {undefined} undefined
     */
    init_all_data() {
      //今日投注信息
      this.init_query_bet_today();
      //今日用户信息
      this.init_query_user_today();
      // 14天投注量趋势
      this.init_user_order_day14();
      // 14天投注用户趋势
      this.init_user_day14();
      // 商户分布信息
      this.init_agent_count();
      //本月商户投注量排行
      this.init_merchant_order_top10();
    },
    /**
     * @description 今日投注信息
     * @return {undefined} undefined
     */
    async init_query_bet_today() {
      let res = await api_home.post_report_home_queryBetToday({});
      let { code } = res.data;
      if (code === "0000000") {
        this.betToday = res.data.data;
        this.betToday.currency = "人民币";
        this.betTodayData.push(this.betToday);
      } else {
        this.betToday = {};       
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    /**
     * @description 今日用户信息
     * @return {undefined} undefined
     */
    async init_query_user_today() {
      let res = await api_home.post_report_home_queryUserToday({});
      let { code } = res.data;
      if (code === "0000000") {
        this.userToday = res.data.data;
        this.userToday.currency = "人民币";
        this.userTodayData.push(this.userToday);
        console.warn(this.userTodayData);
      } else {
        this.userToday = {};
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    /**
     * @description 30天投注量趋势
     * @return {undefined} undefined
     */
    async init_user_order_day14() {
      this.userOrderSettings.loading = true;
      let res = await api_home.post_report_home_userOrderDay14({});
      this.userOrderSettings.loading = false;
      let { code, msg, data } = res.data;
      // data = data.list;
      if (code == "0000000") {
        console.log(data.avgs,data.avgs.betUserAvg,'30天')
        data.list.length > 0 &&
          data.list.map((item, index) => {
            this.chartData.rows.push({
              日期: item.key.toString().substring(4,6)+'/'+item.key.toString().substring(6,8),
              "投注金额(万)": item.betAmount.value / 10000,
              "盈利金额(万)": item.profit.value / 10000
            });
          });
        this.markLine.data[0].yAxis = data.avgs.betAmountAvg/10000;
        this.markLine.data[0].label.formatter = (moment().format('MM')-1)+'月日平均投注:' +(data.avgs.betAmountAvg/10000).toFixed(2)+ '万';
        this.markLine.data[1].yAxis = data.avgs.profitAvg/10000;
        this.markLine.data[1].label.formatter = (moment().format('MM')-1)+'月日平均盈利:' +(data.avgs.profitAvg/10000).toFixed(2)+ '万';
        this.$nextTick(_ => {
          
        data.list.length > 0 &&
          this.$refs.betAmount14.echarts.resize();
        });
      } else {
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    /**
     * @description 30天投注用户趋势-数据拉取
     * @return {undefined} undefined
     */
    async init_user_day14() {
      this.userSettings.loading = true;
      let res = await api_home.post_report_home_userDay14({});
      this.userSettings.loading = false;
      let { code, msg, data } = res.data;
      if (code == "0000000") {
        this.user_data_avgs = data.avgs || {};
        data.list.length > 0 &&
          data.list.map((item, index) => {
            this.userData.rows.push({
              日期: item.key.toString().substring(4,6)+'/'+item.key.toString().substring(6,8),
              投注用户: item.betUser.value,
              大额投注用户数: item.briskUser.value
            });
          });
        this.markLine1.data[0].yAxis = data.avgs.betUserAvg;
        this.markLine1.data[0].label.formatter = (moment().format('MM')-1)+'月日平均投注用户:' +(data.avgs.betUserAvg);
        this.markLine1.data[1].yAxis = data.avgs.briskUserAvg;
        this.markLine1.data[1].label.formatter = (moment().format('MM')-1)+'月日平均大额投注用户:' +(data.avgs.briskUserAvg);
        this.$nextTick(_ => {
          this.$refs.betUser14.echarts.resize();
        });
      } else {
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    /**
     * @description 本月商户投注金额排行-数据拉取
     * @return {undefined} undefined
     */
    async init_merchant_order_top10() {
      this.merchantBetLoading = true;
      let res = await api_home.post_report_home_merchantOrderTop10({});
      this.merchantBetLoading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let arr = res.data.data.list;
        this.merchantBetData = this.rebuild_tabledata_needed(arr);
      } else {
        this.merchantBetData = [];
        code != '00400800' && this.$message.error(
          `本月商户投注金额排行,code值: ${code},请联系相关技术人员！`
        );
      }
    },
    /**
     * @description 今日投注信息-币种明细按钮
     * @return {undefined} undefined
     */
    handle_bet_currency() {
      this.dialogUserShow = true;
    },
    /**
     * @description 今日用户信息-币种明细按钮
     * @return {undefined} undefined
     */
    handle_user_currency() {
      this.dialogBetShow = true;
    },
    /**
     * @description 本月入住商户信息-未设置管理员-设置管理员
     * @param  {Object} record 点击某行的行对象
     * @param  {Number} index 某行的索引
     * @return {undefined} undefined
     */
    handle_edit(record, index) {
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
    },
    /**
     * @description 本月入住商户信息-未上传证书-设置证书
     * @param  {Object} record 点击某行的行对象
     * @return {undefined} undefined
     */
    handle_update_key(record) {
      console.table(record);
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    /**
     * @description 子组件传过来的方法触发关闭弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_edit() {
      this.eidtKeyShow = false;
    },
    /**
     * @description 本月入驻商户信息数据拉取
     * @return {undefined} undefined
     */
    async init_merchant_month_list() {
      this.merchantDataLoading = true;
      let params = {
        agentLevel: this.tab
      };
      let res = await api_home.get_manage_merchant_month_list(params);
      this.merchantDataLoading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let { data } = res.data;
        this.merchantData = this.rebuild_tabledata_needed(data);
      } else {
        this.merchantData = [];
        code != '00400800' && this.$message.error(`code值: ${code},${res.data.msg}`);
      }
    },
    /**
     * @description 对返回的后台数据加工成表格需要的格式
     * @param  {Array} arr 后台返回的数组
     * @return {Aaary} 加工之后的表格数组
     */
    rebuild_tabledata_needed(arr) {
      if (Array.isArray(arr) && arr.length >= 0) {
        arr.map((item, index) => {
          item.nowBy = index + 1;
          item._index = index + 1;
        });
        return arr;
      }
    },
    /**
     * @description 商户分布信息数据拉取
     * @return {undefined} undefined
     */
    async init_agent_count() {
      let res = await api_home.get_manage_merchant_queryAgentCount();
      let { code } = res.data;
      if (code === "0000000") {
        // console.log(res.data.data)
        let { data } = res.data;
        let arr = this.handle_need_to_data(data);
        this.title.text = arr.reduce((prev, next) => prev + next.count * 1, 0);
        console.log(this.title.text, "handle_need_to_data");
        this.merchantList.rows = arr;
      }
    },
    /**
     * @description 对后台返回的商户信息数据进行加工
     * @param  {Array} arr 需要加工的商户信息数据
     * @return {Array} 加工后的商户信息数据
     */
    handle_need_to_data(arr) {
      arr.map((item, index) => {
        if (item.agentLevel == 0) {
          item.agentLevel = "直营商户";
        } else if (item.agentLevel == 1) {
          item.agentLevel = "渠道商户";
        } else {
          item.agentLevel = "二级商户";
        }
      });
      console.log(arr, "arr");
      return arr;
    },
    /**
     * @description 关闭设置管理员弹窗-并重新拉取数据
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.setMerchantShow = false;
      this.init_merchant_month_list();
    },
    /**
     * @description 本月入驻商户信息-点击更多路由跳转
     * @return {undefined} undefined
     */
    handle_go_to_more() {
      this.$router.push({
        name: "merchantc",
        params: {
          agent: this.tab
        }
      });
    }
  },
  watch: {
    tab: {
      handler: function(v) {
        console.warn(v, "handler");
        if (v == 1) {
          this.merchantColumns = channelConfig;
        } else if (v == 2) {
          this.merchantColumns = secondConfig;
        } else {
          this.merchantColumns = merchantConfig;
        }
        //本月入驻商户信息
        this.init_merchant_month_list();
      },
      immediate: true
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 340px;
  min-height: 340px;
}

>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}

//表头增加色调
>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}


.line {
  border-bottom: 1px solid #F4F5F8;
  width: 80%;
  margin: 0 auto;
}

.middle {
  vertical-align: middle;
}

.border-right-1px {
  border-right: 1px solid #F4F5F8;
}

>>>.ant-empty-normal {
  margin: 105px 0;
}


.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  display: inline-block;
  white-space: nowrap;
}

.text-over-70 {
  display: inline-block;
  max-width: 60px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text-over-admin {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
  display: inline-block;
  white-space: nowrap;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  display: inline-block;
  white-space: nowrap;
}

.data-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #888;
  font-size: 14px;
}

// 复写table里面td的高度
>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td {
  padding: 3px 4px 3px 4px;
}

>>>.ant-table-small{
  border none
}
</style>
