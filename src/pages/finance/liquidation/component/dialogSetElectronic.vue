<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 11:45
 -->
<template>
  <div
    style="width: 960px ; height:auto;max-width:960px; backgroundColor: pink"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="text-black">
      <q-card-section class="no-padding position-relative bg-panda-dialog">
        <div class="row fs14 text-panda-text-7 pr10x pb10x text-center">
          <div class="pl20x mt10x full-width">
            <div
              class="fw_600 fs20"
              v-if="currentUser.financeDate"
            >电子账单({{currentUser.financeDate.split('-')[0]}}年{{currentUser.financeDate.split('-')[1]}}月份)</div>
            <div class="text-panda-text-4">NO.{{currentUser.createTime}}</div>
          </div>
          <q-btn
            class="position-absolute text-panda-dialog-close"
            style="right:20px; top:5px;"
            flat
            dense
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="bg-panda-dialog pb20x">
        <div class="content">
          <div class="row pt20x">
            <div class="col-2">
              <span class="text-panda-text-4">客户名称：</span>
              <span class="text-panda-text-7">{{currentUser.merchantName}}</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">分成方式：</span>
              <span class="text-panda-text-7">{{currentUser.computingStandardStr}}</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">标准费率：</span>
              <span class="text-panda-text-7">{{currentUser.terraceRate | moneyFormat}}%</span>
            </div>
            <div class="col-5 ml20x">
              <span class="text-panda-text-4">调整金额：</span>
              <span class="text-panda-text-7">
                <span class="text-panda-text-7 w-100 fs14">
                  <a-input-number
                    :step="1"
                    size="small"
                    v-model="currentUser.adjustAmount"
                    allowClear
                  />
                </span>
                <!-- <a-input  size="small" v-model="money" allowClear/> -->
                <!-- :min="1" :max="10" -->
              </span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-2">
              <span class="text-panda-text-4">客户编号：</span>
              <span class="text-panda-text-7">{{currentUser.merchantCode}}</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">结算货币：</span>
              <span class="text-panda-text-7">{{currentUser.currencyStr}}</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">执行费率：</span>
              <span class="text-panda-text-7">{{currentUser.executeRate | moneyFormat}}%</span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-12 row">
              <span class="text-panda-text-4">调整原因：</span>
              <span class="text-panda-text-7 col-11 height-24px">
                <a-input maxlength="100" v-model="currentUser.adjustCause" size="small" allowClear></a-input>
              </span>
            </div>
          </div>
          <div class="fee bg-panda-bg-6 border-radius-4px mt20x">
            <div class="fw_600 text-panda-text-7 row text-center line-height-40px">
              <div class="w-90 text-left">
                <span class="ml15x">科目</span>
              </div>
              <div class="w-130 text-left">
                <span class="ml45x">币种</span>
              </div>
              <div class="w-200">本期投注额</div>
              <div class="w-190">本期注单笔数</div>
              <div class="w-150">本期盈利</div>
              <div class="w-150">应缴费用</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-90 text-left">
                <span class="ml15x">投注分成</span>
              </div>
              <div class="w-130 text-left">
                <span class="ml45x">总计-人民币</span>
              </div>
              <div class="w-200 text-left">
                <span class="ml65x">{{currentUser.orderAmountTotal | moneyFormat}}</span>
              </div>
              <div class="w-190 text-left">
                <span class="ml50x">{{currentUser.orderNum | amount}}</span>
              </div>
              <div class="w-150 text-left">
                <span
                  class="ml50x"
                  :class="currentUser.profitAmount<0? 'text-red': ''"
                >{{currentUser.profitAmount | moneyFormat}}</span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">{{currentUser.orderPaymentAmount | moneyFormat}}</span>
              </div>
            </div>
            <div
              class="text-panda-text-4 row text-center line-height-24px"
              v-for="(item, index) in billMonthVoList"
              :key="index"
            >
              <div class="w-90"></div>
              <div class="w-130 text-left">
                <span class="ml45x">{{item.currencyStr}}</span>
              </div>
              <div class="w-200 text-left">
                <span class="ml65x">{{item.billOrderAmount | amount}}</span>
              </div>
              <div class="w-190 text-left">
                <span class="ml50x">{{item.billOrderNum | moneyFormat}}</span>
              </div>
              <div class="w-150 text-left">
                <span
                  class="ml50x"
                  :class="item.billProfitAmount<0? 'text-red': ''"
                >{{item.billProfitAmount | moneyFormat}}</span>
              </div>
              <!-- <div class="w-150">{{item.billProfitAmount | amount}}</div> -->
              <div class="w-150"></div>
            </div>
            <q-separator class="mt10x"></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-90 text-left">
                <span class="ml15x">会员费</span>
              </div>
              <div class="w-130">人民币</div>
              <div class="w-200 text-left">
                <span class="ml65x">-</span>
              </div>
              <div class="w-190 text-left">
                <span class="ml50x">-</span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">-</span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">{{currentUser.vipAmount | moneyFormat}}</span>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-90 text-left">
                <span class="ml15x">技术支持费</span>
              </div>
              <!-- <div class="w-80">技术支持费</div> -->
              <div class="w-130">人民币</div>
              <div class="w-200 text-left">
                <span class="ml65x">-</span>
              </div>
              <div class="w-190 text-left">
                <span class="ml50x">-</span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">-</span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">{{currentUser.techniqueAmount | moneyFormat}}</span>
              </div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-90">调整金额</div>
              <div class="w-130">人民币</div>
              <div class="w-200"></div>
              <div class="w-190"></div>
              <div class="w-150 text-left">
                <span class="ml50x"></span>
              </div>
              <div class="w-150 text-left">
                <span class="ml50x">{{currentUser.adjustAmount | moneyFormat}}</span>
              </div>
            </div>
            <q-separator></q-separator>
            <div
              class="text-panda-text-7 fw_600 row text-center line-height-40px bg-panda-bg1 border-radius-lr"
            >
              <div class="w-80">总计：</div>
              <div>{{currentUser.billAmountName}}</div>
              <q-space></q-space>
              <div class="w-150 text-left">
                <span class="ml50x">{{currentUser.billAmount | amount}}</span>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt20x">
            <a-button type="primary" class="mr20x" @click="handle_confirm">确认</a-button>
            <a-button type="default" @click="$emit('closeDialog')">取消</a-button>
          </div>
        </div>
      </div>
    </q-card>
    <!-- 查看电子账单详情弹窗 -->
    <q-dialog
      v-model="dialogLookRecordShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-look-record :financeId="financeId"></dialog-look-record>
    </q-dialog>
  </div>
</template>
<script>
import dialogLookRecord from "src/pages/finance/liquidation/component/dialogLookRecord.vue";
import { api_finance, api_public } from "src/api/index.js";
export default {
  components: {
    dialogLookRecord
  },
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      currentUser: {},
      billMonthVoList: [], //币种列表
      dialogLookRecordShow: false, //查看电子账单调整历史
      pagination: {
        pageSize: 100,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "30", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      },
      financeId: ""
    };
  },
  props: {
    detailObj: ""
  },
  created() {
    this.init_electronic_detail();
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    },
    filterCurrency(val) {
      if (!val) return "暂无数据";
      let arr = ["人民币", "积分制"];
      return arr[val - 1];
    }
  },
  methods: {
    /**
     * @description 初始化电子账单数据
     * @return {undefined} undefined
     */
    async init_electronic_detail() {
      let params = {
        id: this.detailObj.id,
        timeZone: this.detailObj.timeZone
      };
      let res = await api_finance.post_report_financeMonth_queryFinanceMonthDetail(
        params
      );
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.oldAdjustAmount = data.adjustAmount || '';
        this.oldAdjustCause = data.adjustCause || '';
        this.currentUser = {...data};
        this.billMonthVoList = data.billMonthVoList;
      } else {
        this.$message.error(msg);
      }
    },
    //确认按钮
    handle_confirm() {
      const self = this;
      if (!this.currentUser.adjustCause) {
        this.$message.warn("调整原因不能为空！");
      } else {
        this.$modal.confirm({
          title: "确认调整",
          content: "系统将按新的执行费率和调整金额生成电子账单，请确定！",
          centered: true,
          onOk() {
            // console.log("OK");
            let {
              id,
              adjustAmount,
              adjustCause,
              executeRate,
              merchantCode,
              merchantName
            } = self.currentUser;
            let params = {
              id,
              adjustAmount,
              oldAdjustAmount: self.oldAdjustAmount,
              oldAdjustCause: self.oldAdjustCause,
              adjustCause,
              executeRate,
              timeZone: self.detailObj.timeZone,
              merchantCode,
              merchantName
            };
            api_finance
              .post_report_financeMonth_updateFinanceMonthDetail(params)
              .then(res => {
                let { code, data, msg } = res.data;
                if (code == '0000000') {
                  self.$message.success("调整电子账单成功！");
                  self.$emit("closeDialog");
                } else {
                  self.$message.error(msg);
                }
              });
          },
          onCancel() {
            console.log("Cancel");
          }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 95%;
  margin: 0 auto;
}

>>>.ant-table-small {
  border: none;
}

>>>.ant-table-footer {
  padding: 0;
  height: 40px;
  line-height: 40px;
  background: #DDE0EF;
}

>>> .ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
}

>>>.ant-table-scroll {
  overflow-y: hidden;
}

.border-radius-lr {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
