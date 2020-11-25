<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-28 18:03:18
 -->
<template>
  <div
    style="width: 600px ; height:600px; max-width:600px;max-height:600px;"
    class="text-panda-text-7 overflow-hidden full-content"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding dialog_main">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x title-content"
        >
          <div class="pl20x fw_600">
            {{ detailObj.seriesValue }}
            <span
              v-if="detailObj.seriesType!==1"
            >&nbsp;共{{detailObj.betCount}}注&nbsp;每注：{{detailObj.orderDetailList[0].betAmount}}</span>
          </div>
          <q-space></q-space>
          <q-btn class="mr5x" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="fs14 card-panel overflow-auto" style="height:560px;">
        <div v-for="item in detailObj.orderDetailList" :key="item.betNo">
          <div class="card-panel-row row line-height-30px justify-between">
            <div class="text-color color-grey">{{item.sportName }}/{{item.matchName}}</div>
            <div class="text-color color-grey">{{matchTypeName[ item.matchType] }}</div>
          </div>
          <q-separator class="mt5x mb5x hr-grey-2"></q-separator>
          <div class="card-panel-row row line-height-30px justify-between text-h5 font-title-row">
            <div class="text-color">
              <span class="font-title">
                <span class="title-ico" v-bind:class="betResultClass[item.betResult]">.</span>
                {{item.playOptionsName}}&nbsp;
                <span class="text-weight-medium">{{item.marketValue}}</span>
              </span>
            </div>
            <div class="text-color">{{item.oddsValue/100000}}&nbsp;[{{item.marketType}}]</div>
          </div>
          <div class="card-panel-row row line-height-20px justify-start">
            <div class="text-color">{{item.playName}}</div>
          </div>
          <div class="card-panel-row row line-height-20px justify-start">
            <div class="text-color">{{item.matchInfo}}</div>
          </div>
          <div class="card-panel-row row line-height-20px justify-start">
            <div class="text-color color-grey">{{item.betNo}}&nbsp;({{item.beginTimeStr}})</div>
          </div>
          <q-separator class="mt5x mb5x hr-grey-2"></q-separator>
        </div>
        <div class="card-panel-row row line-height-30px justify-between">
          <div class="text-color">
            注额(本地):
            <span class="text-weight-bold">￥{{detailObj.localBetAmount}}</span>
          </div>
          <div class="text-color">
            输赢(本地):
            <span class="text-weight-bold">￥{{detailObj.localProfitAmount}}</span>
          </div>
        </div>
        <div class="card-panel-row row line-height-30px justify-between">
          <div class="text-color">
            注额(外汇):
            <span class="text-weight-bold">￥{{detailObj.settleAmount}}</span>
          </div>
          <div class="text-color">
            输赢(外汇):
            <span class="text-weight-bold">￥{{detailObj.profitAmount}}</span>
          </div>
        </div>
        <div class="card-panel-row row line-height-30px justify-between">
          <div class="text-color">用户ID：{{ detailObj.uid }}</div>
          <div class="text-color">用户名(本地)：{{ detailObj.userName }}</div>
        </div>
        <q-separator class="mt5x mb5x hr-grey-2"></q-separator>
        <div class="card-panel-row row line-height-30px justify-start">
          <div class="text-color">
            注单编号：
            <a>{{ detailObj.orderNo }}</a>
          </div>
        </div>
        <div class="card-panel-row row line-height-30px justify-between">
          <div>
            <div class="row line-height-30px justify-start">
              <div class="text-color">下注时间：{{ detailObj.createTimeStr }}</div>
            </div>
            <div class="row line-height-30px justify-start">
              <div class="text-color">IP地址：{{ detailObj.ipArea }}</div>
            </div>
            <div class="row line-height-30px justify-start">
              <div class="text-color">
                设备：[&nbsp;{{ deviceTypeName[detailObj.deviceType] }}&nbsp;]
                <a>{{detailObj.deviceImei}}</a>
              </div>
            </div>
          </div>
          <div>
            <img
              v-if="detailObj.outcome ==='2'"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-zoushui.svg"
              height="100px"
              alt
              srcset
            />
            <img
              v-else-if="detailObj.outcome ==='3'"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-shu.svg"
              height="100px"
              alt
              srcset
            />
            <img
              v-else-if="detailObj.outcome ==='4'"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-ying.svg"
              height="100px"
              alt
              srcset
            />
            <img
              v-else-if="detailObj.outcome ==='5'"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-yingban.svg"
              height="100px"
              alt
              srcset
            />
            <img
              v-else-if="detailObj.outcome ==='6'"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-shuban.svg"
              height="100px"
              alt
              srcset
            />
            <img
              v-else-if="detailObj.outcome ==='7'"
              class="ml30"
              src="~assets/zhudanxiangqing-quxiao.svg"
            />
            <img
              v-else-if="detailObj.outcome ==='8'"
              class="ml30"
              src="~assets/zhudanxiangqing-yanqi.svg"
            />
            <img
              v-else-if="detailObj.settleStatus===0 && !detailObj.outcome"
              style="margin-left: 30px;"
              src="~assets/zhudanxiangqing-wusaiguo.svg"
              height="100px"
              alt
              srcset
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import log_login_mixin from "src/pages/data/userdetail/mixin/index.js";
export default {
  mixins: [log_login_mixin],
  data() {
    return {
      // betResultName:{0:"无结果",  2:"走水",  3:"输", 4:"赢", 5:"赢一半", 6:"输一半"},
      betResultClass: {
        "0": "other-title-ico",
        "2": "other-title-ico",
        "3": "lose-title-ico",
        "4": "win-title-ico",
        "5": "win-title-ico",
        "6": "lose-title-ico"
      }
    };
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.title-ico {
  display: inline;
  margin-right: 5px;
}

.lose-title-ico {
  background-color: rgb(105, 201, 105);
  color: rgb(105, 201, 105);
}

.win-title-ico {
  background-color: #F5222D;
  color: #F5222D;
}

.other-title-ico {
  background-color: #838CA1;
  color: #838CA1;
}

.card-div-1 {
  width: 80px;
}

.card-div-2 {
  width: calc(100% - 80px);
}

.font-title {
  font-size: 14px;
}

.text-color {
  color: #414655;
  font-size: 12px;
}

// form表单input样式重写
>>>.q-field--with-bottom {
  padding-bottom: 0;
}

>>>.q-field__bottom--animated {
  bottom: 4px;
}

>>>.q-field__marginal {
  font-size: 16px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 14px;
}

>>>.q-field__append {
  border-left: 0px;
}

>>>.card-panel {
  padding: 5px 0 16px 0;
}

>>>.card-panel .card-panel-row {
  padding: 0 16px;
}

.font-title-row {
  padding-left: 8px !important;
}

// 复写日期组件样式
>>>.ant-input {
  height: 36px;
  line-height: 36px;
  border-color: #c1c1c1;
  padding: 0 11px;
}

>>>.ant-input:hover {
  box-shadow: 0 2px 4px 0 rgba(97, 128, 239, 0.2);
}

.color-grey {
  color: #A5A9B3;
}
</style>

