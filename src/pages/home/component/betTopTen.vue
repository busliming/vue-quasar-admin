<!--
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 
 * @FilePath: /1028-ToB端商户后台/src/pages/home/component/betTopTen.vue
-->

<template>
  <div class="betTopTen">
    <div class="row pt10x pl20x pr20x">
      <div class="fw_600 fs16 text-panda-text-7">
        <span class="title-block bg-panda-bg-2 mr5x"></span>今日投注金额TOP10赛事
      </div>
      <div class="ml10x" style="margin-top: 2px;">
        <div class="text-panda-text-4 fs14">
          <a-tooltip trigger="hover">
            <template slot="title">
              <div :style="`max-width: 240px; word-break:break-all;`">统计的是当前账务日（12点至次日12点）内投注成功（已结算+未结算）的总注额前十名的赛事排行信息</div>
            </template>
            <a-icon type="question-circle" class="fs15" />
          </a-tooltip>
        </div>
      </div>
      <q-space></q-space>
      <div class="cursor-pointer fs12" @click="handle_more">更多</div>
    </div>
    <a-table
      style=" margin-top: 11px;"
      id="betTopTen"
      class="pl10x"
      :columns="betTopTenColumns"
      :dataSource="betTopTenData"
      :scroll="{ x: 700, y: 262 }"
      :pagination="pagination"
      :loading="betTopTenLoading"
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
      <span slot="matchInfo" slot-scope="text, record,index">
        <a-tooltip trigger="hover">
          <template slot="title">
            <p
              style="max-width: 180px; margin:0;"
            >{{record.tournamentName}}</p>
            <p style="max-width: 200px; margin:0; ">{{ record.matchInfo }}</p>
          </template>
          <span
            class="ellipsis"
            @mouseenter="handler_tooltip_hidden('icon'+index,1)"
            @mouseleave="handler_tooltip_hidden('icon'+index,2)"
          >
            {{ record.matchInfo }}
            <span
              @click="handler_dialog_money(record)"
              class="hidden cursor-pointer"
              :ref="'icon'+index"
            >
              <img :src="money" class="ml5x" alt />
            </span>
          </span>
        </a-tooltip>
      </span>
      <span slot="matchStatus" slot-scope="text, record">
        <span>{{matchStatusList[record.matchStatus]}}</span>
      </span>
      <span slot="beginTime" slot-scope="text, record">
        <span>{{ moment(record.beginTime).format("MMMDo HH:mm") }}</span>
      </span>
      <span slot="betAmount" slot-scope="text, record">
        <span>￥{{ record.betAmount | moneyFormat }}</span>
      </span>
      <span slot="profit" slot-scope="text, record">
        <span>￥{{ record.profit | moneyFormat }}</span>
      </span>
      <span slot="userAmount" slot-scope="text, record">
        <span>{{ record.userAmount | amount }}</span>
      </span>
    </a-table>
    <!-- 今日投注金额TOP10赛事 多币种 -->
    <q-dialog v-model="dialogMoneyShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-money :detailObj="showDialogObj"></dialog-money>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { api_home } from "src/api/index.js";
import { bet_top_ten_config } from "src/pages/home/config/betTopTen.js";
import dialogMoney from "src/pages/home/component/dialogMoney.vue";
import moment from "moment";
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  components: {
    dialogMoney
  },
  data() {
    return {
      betTopTenColumns: bet_top_ten_config,  // 表格配置
      betTopTenData: [], // 表格数据
      betTopTenLoading: false, // 表格loading
      dialogMoneyShow: false, // 多币种弹窗阀值
      showDialogObj: {},  // 传值给弹窗的数据对象
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
      // 赛事状态
      matchStatusList: {
        0: "未开赛",
        1: "进行中",
        2: "暂停",
        3: "结束",
        4: "关闭",
        5: "取消",
        6: "比赛放弃",
        7: "延迟",
        8: "未知",
        9: "延期",
        10: "比赛中断"
      }
    };
  },
  created() {
    this.init_match_top10();
  },
  methods: {
    ...mapActions(['set_bool']),
    moment,
    /**
     * @description 今日投注量 TOP10赛事
     * @return {undefined} undefined
     */
    async init_match_top10() {
      this.betTopTenLoading = true;
      let res = await api_home.post_report_home_matchTop10({});
      this.betTopTenLoading = false;
      let { code } = res.data;
      if (code === "0000000") {
        let arr = res.data.data.list || [];
        this.betTopTenData = this.rebuild_tabledata_to_needed(arr);
      } else {
        this.betTopTenData = [];
        code != '00400800' && this.$message.error(
          `今日投注金额TOP10赛事,code值: ${code},请联系相关技术人员！`
        );
      }
    },
    /**
     * @description 对返回的后台数据加工成表格需要的格式
     * @param  {Array} arr 后台返回的数组
     * @return {Aaary} 加工之后的表格数组
     */
    rebuild_tabledata_to_needed(arr) {
      if (Array.isArray(arr) && arr.length >= 0) {
        arr.map((item, index) => {
          item._index = index + 1;
        });
        return arr;
      }
    },
    /**
     * @description 是否显示多币种弹窗
     * @param  {String} key dom的refs值
     * @param  {Number} value 1/2
     * @return {undefined} undefined
     */
    handler_tooltip_hidden(key, value) {
      // 727 版本需求注释掉
      //let dom = this.$refs[key];
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
     * @description 今日投注金额TOP10赛事 更多按钮
     * @return {undefined} undefined
     */
    handle_more() {
      this.$router.push({ name: "match_bonus" });
      // 今日赛事-日期组件默认值为当天
      this.set_bool(true)
    }
  }
};
</script>

<style lang="stylus" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
  display: inline-block;
  white-space: nowrap;
}

// 复写table里面td的高度
#betTopTen>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td {
  padding: 1px;
  font-size  12px;
}

#betTopTen >>> .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  padding 2px;
}

#betTopTen>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 290px;
  min-height: 290px;
}

>>>#betTopTen .ant-empty-normal {
  margin: 78px 0;
}
>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  // padding: 3px 8px !important;
  background $panda-bg-3
}

>>>.ant-popover-inner-content {
  max-width: 180px !important;
}

.w-8 {
  width: 8px;
}

.w-12 {
  width: 12px;
}


</style>