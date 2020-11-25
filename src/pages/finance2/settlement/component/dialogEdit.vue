
<template>
  <div
    style="width: 960px ; height:auto;max-width:960px; backgroundColor: pink"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="text-black">
      <q-card-section class="no-padding position-relative bg-panda-dialog">
        <div class="row fs14 text-panda-text-7 pr10x pb10x text-center">
          <div class="pl20x mt10x full-width">
            <div class="fw_600 fs20">电子账单(2020年2月份)</div>
            <div class="text-panda-text-4">NO.234829138902</div>
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
              <span class="text-panda-text-7">欧宝</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">分成方式：</span>
              <span class="text-panda-text-7">盈利</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">标注费率：</span>
              <span class="text-panda-text-7">20%</span>
            </div>
            <div class="col-5 ml20x row">
              <span class="text-panda-text-4">调整金额：</span>
              <span class="text-panda-text-7 w-100 fs14">
                <a-input-number :step="0.01" size="small" v-model="money" allowClear />
                <!-- <a-input  size="small" v-model="money" allowClear/> -->
                <!-- :min="1" :max="10" -->
              </span>
              <span class="text-panda-text-4">人民币</span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-2">
              <span class="text-panda-text-4">客户编号：</span>
              <span class="text-panda-text-7">100008</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">结算货币：</span>
              <span class="text-panda-text-7">人民币</span>
            </div>
            <div class="col-4 ml20x row">
              <span class="text-panda-text-4">执行费率：</span>
              <span class="text-panda-text-7 w-100">
                <a-input-number :step="0.01" size="small" v-model="executionRate" allowClear />
              </span>
              <span class="text-panda-text-4">%</span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-12 row">
              <span class="text-panda-text-4">调整原因：</span>
              <!-- <span class="text-panda-text-7">2月份投注达标，按协议免去会员费/补1月份曼联vs阿森纳比赛二次结算</span> -->
              <span class="text-panda-text-7 col-11 height-24px">
                <!-- <a-textarea
                  v-model="str"
                  size="small"
                  :autosize="{ minRows: 1, maxRows: 2 }"
                  allowClear
                /> -->
                <a-input v-model="str" size="small" allowClear></a-input>
              </span>
            </div>
          </div>
          <div class="fee bg-panda-bg-6 border-radius-4px mt20x">
            <div class="fw_600 text-panda-text-7 row text-center line-height-40px">
              <div class="w-80">科目</div>
              <div class="w-130">币种</div>
              <div class="w-200">本期投注额</div>
              <div class="w-200">本期注单笔数</div>
              <div class="w-150">本期盈利</div>
              <div class="w-150">应缴费用</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">投注分成</div>
              <div class="w-130">总计-人民币</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150">202,270,662</div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">人民币</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150"></div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">美元</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150"></div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">欧元</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">-70,662</div>
              <div class="w-150">270,662</div>
              <div class="w-150"></div>
            </div>
            <q-separator class="mt10x"></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">会员费</div>
              <div class="w-130">人民币</div>
              <div class="w-200">-</div>
              <div class="w-200">-</div>
              <div class="w-150">-</div>
              <div class="w-150">500,000</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">技术支持费</div>
              <div class="w-130">人民币</div>
              <div class="w-200">-</div>
              <div class="w-200">-</div>
              <div class="w-150">-</div>
              <div class="w-150">200,000</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">调整金额</div>
              <div class="w-130">人民币</div>
              <div class="w-200"></div>
              <div class="w-200"></div>
              <div class="w-150"></div>
              <div class="w-150">200,000</div>
            </div>
            <q-separator></q-separator>
            <div
              class="text-panda-text-7 fw_600 row text-center line-height-40px bg-panda-bg1 border-radius-lr"
            >
              <div class="w-80">总计：</div>
              <div class="w-200">伍佰玖拾肆万贰仟贰佰伍拾陆</div>
              <q-space></q-space>
              <div class="w-150">5,942,256</div>
            </div>
          </div>
          <div class="flex justify-center mt20x">
            <a-button type="primary" class="mr20x" @click="handleConfirm">确认</a-button>
            <a-button type="default" @click="$emit('closeDialog')">取消</a-button>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { api_merchant, api_public } from "src/api/index.js";
export default {
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      money: "666",
      str: "2月份投注达标，按协议免去会员费/补1月份曼联vs阿森纳比赛二次结算",
      executionRate: '15'
    };
  },
  props: {
    detailObj: ""
  },
  methods: {
    // 查看电子账单调整记录
    handleLook() {
      this.dialogLookRecordShow = true;
    },
    //确认按钮
    handleConfirm() {
      this.$modal.confirm({
        title: "确认调整",
        content: '系统将按新的执行费率和调整金额生成电子账单，请确定！',
        centered: true,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
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
>>>.ant-modal{
  top: 50%;
}
</style>
