<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="投注用户管理" />
        <q-breadcrumbs-el label="投注用户详情" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="row line-height-30px shadow-3 items-center text-panda-text-dark bg-panda-bg-6 pb10x border-radius-4 ml10x mr10x">
      <!-- 用户投注详情 -->
      <div class="col-12">
        <div class="row mb10x">
          <div class="fs16 line-height-16px pl20x pt20x text-panda-text-7 fw_600 row">
            <div>
              <span class="title-block bg-panda-bg-2 mr5x"></span>用户基本信息
              <a-tooltip trigger="hover">
                <template slot="title">
                  <div :style="`max-width: 240px; word-break:break-all;`">此处只汇总用户近90天的已结算注单记录！与用户基本信息中累计注单数据不一致属于正常现象，详情请咨询平台客服工作人员！</div>
                </template>
                <a-icon type="question-circle" class="text-red fs15 ml5x cursor-pointer" />
              </a-tooltip>
            </div>
          </div>
          <q-space/>
          <div class="status  line-height-16px pl20x pr20x text-panda-text-7 flex">
            <!-- <div class="pt20x mr20x">用户状态: {{userDetail.status === 1? '在线': '--'}}</div> -->
            <a-button
              type="primary"
              style="height: 30px; line-height: 16px;"
              class="mt12x"
              @click="handle_back"
            >返回</a-button>
          </div>
        </div>
        <div class="border-top mb10x"></div>
        <div class="row pl20x pr20x">
          <!-- 第一排数据 -->
          <div class="bos" style="width: 25%">
            <div class="title">用户名</div>
            <div class="content">{{userDetail.userName}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">可用余额</div>
            <div class="content">{{userDetail.amount | amount}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">注册时间</div>
            <div class="content">{{moment(userDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">累计登录次数</div>
            <div class="content" v-if="userDetail.loginTimes">{{userDetail.loginTimes}}</div>
            <div class="content" v-else>--</div>
          </div>
          <!-- 第二排数据 -->
          <div class="bos" style="width: 25%">
            <div class="title">用户ID</div>
            <div class="content">{{userDetail.userId}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">累计投注金额</div>
            <div class="content">{{userDetail.betAmount | amount}}</div>
          </div>
         <div class="bos" style="width: 25%">
            <div class="title">注单数量</div>
            <div class="content">{{userDetail.betNum | amount}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">最后登录时间</div>
            <div class="content">{{moment(userDetail.lastLogin*1).format('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <!-- 第三排数据 -->
          <div class="bos" style="width: 25%">
            <div class="title">用户币种</div>
            <div class="content">{{userDetail.currencyCode | filterCurrency}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">累计盈利</div>
            <div class="content">{{userDetail.profit | amount}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">所属商户</div>
            <div class="content">{{userDetail.merchantName}}</div>
          </div>
          <div class="bos" style="width: 25%">
            <div class="title">最后投注时间</div>
            <div class="content" v-if="userDetail.lastBetStr">{{userDetail.lastBetStr}}</div>
            <div class="content" v-else>--</div>
          </div> 
        </div>
        <!-- <div class="row pl20x pr20x">
          <div class="bos" style="width: 33.33%">
            <div class="title">用户名</div>
            <div class="content">{{userDetail.userName}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">用户币种</div>
            <div class="content">{{userDetail.currencyCode | filterCurrency}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">累计登录次数</div>
            <div class="content" v-if="userDetail.loginTimes">{{userDetail.loginTimes}}</div>
            <div class="content" v-else>--</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">可用余额</div>
            <div class="content">{{userDetail.amount | amount}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">用户ID</div>
            <div class="content">{{userDetail.userId}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">最后登录时间</div>
            <div class="content">{{moment(userDetail.lastLogin*1).format('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">累计投注金额</div>
            <div
              class="content"
            >{{userDetail.betAmount | amount}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">注册时间</div>
            <div class="content">{{moment(userDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">最后投注时间</div>
            <div
              class="content"
              v-if="userDetail.lastBetStr"
            >{{userDetail.lastBetStr}}</div>
            <div class="content" v-else>--</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">累计盈利</div>
            <div class="content">{{userDetail.profit | amount}}</div>
          </div>
          <div class="bos" style="width: 33.33%">
            <div class="title">注单数量</div>
            <div class="content">{{userDetail.betNum | amount}}</div>
          </div>
          <div class="bos" style="width: 33.34%">
            <div class="title">所属商户</div>
            <div class="content">{{userDetail.merchantName}}</div>
          </div>
        </div> -->
      </div>
      
    </div>
    
    <div class="col-12 bg-panda-bg-6 radius-4  ml10x mr10x shadow-3 ">
      <!-- tab选项卡 -->
      <div class="row mt10x panda-text-2 position-relative">
        <span class="title-block bg-panda-bg-2 mr5x mt15x position-absolute" style="left: 20px;"></span>
        <a-tabs v-model="activeKey" class="col-12">
          <!-- <a-tab-pane key="1" tab="用户看板">
            <user-dashboard v-if="activeKey == 1"></user-dashboard>
          </a-tab-pane> -->
          <a-tab-pane key="2" tab="账变记录" force-render>
            <user-account v-if="activeKey == 2"></user-account>
          </a-tab-pane>
          <a-tab-pane key="3" tab="注单记录">
            <user-bet v-if="activeKey == 3"></user-bet>
          </a-tab-pane>
          
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { api_merchant } from "src/api/index.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import userBet from 'src/pages/data/userdetail/component/userBet.vue'
import userAccount from 'src/pages/data/userdetail/component/userAccount.vue'
import moment from "moment";
export default {
  components: {
    userBet,
    userAccount
  },
  mixins: [constantmixin],
  data() {
    return {
      userDetail: "", //用户详情
      activeKey: '2' // 默认为账变记录
    };
  },
  created() {
    this.init_session_record();
  },
  methods: {
    moment,
    handle_back() {
      this.$router.go(-1);
    },
    /**
     * @description 初始化用户基本信息
     * @return {undefined} undefined
     */
    async init_session_record() {
      let record = this.$q.sessionStorage.getItem("record");
      this.userDetail = record;
      let res = await api_merchant.get_order_user_getUserDetail({
        uid: record.userId
      });
      // console.warn(res)
      if (res.data.code === "0000000") {
        this.userDetail = { ...record, ...res.data.data };
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

.bos {
  box-sizing: border-box;
  margin-top: -1px;
}

.title {
  width: 30%;
  // border: 1px solid #cecece;
  display: inline-block;
  line-height: 32px;
  height: 32px;
  text-align: left;
  color: #666;
  font-size 14px;
  // background: #F2F2F2;
  box-sizing: border-box;
}

.content {
  width: 70%;
  // border: 1px solid #cecece;
  display: inline-block;
  line-height: 32px;
  height: 32px;
  text-align: left;
  font-size 14px;
  color: #333333;
  box-sizing: border-box;
}

>>>.ant-tabs-nav .ant-tabs-tab{
  font-size 16px;
  font-weight 600;
  color $panda-text-1
}
>>>.ant-tabs-bar{
  margin 0 0 0 20px;
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}
</style>
