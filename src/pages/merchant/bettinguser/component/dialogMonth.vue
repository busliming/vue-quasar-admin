<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors  : Nice
 * @LastEditTime : 2020-02-06 23:11:54
 -->
<template>
  <div
    style="width: 700px ; height:auto;max-width:700px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">{{year}}{{detailObj.month}}份投注趋势</div>
          <q-space></q-space>
          <q-btn class="mr5x" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="row pl20x pt20x">
        <div>
          <ve-line
            ref="lineChart"
            :loading="loading"
            :data="chartData"
            :colors="colors"
            width="660px"
            height="390px"
            :extend="lineExtend"
          ></ve-line>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { api_user } from "src/api/index.js";
import VeRing from "v-charts/lib/ring.common";
import "v-charts/lib/style.css";
export default {
  components: {
    VeRing
  },
  data() {
    return {
      loading: false,
      colors: ["#5B8FF9 ", "#FF9D4D"],
      chartData: {
        columns: ["日期", "投注金额 (万)", "盈亏金额 (万)"],
        rows: []
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
      }
    };
  },
  created() {
    // this.formData.merchantAdmin = this.detailObj.merchantAdmin;
    this.initOrderMonthDays();
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    },
    betRows: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    time() {
      return (
        this.betRows &&
        this.betRows.filter(item => this.detailObj.month == item["日期"])[0]
          .time
      );
    },
    year() {
      return this.time && this.time.toString().substr(0, 4) + "年";
    }
  },
  methods: {
    // 保存按钮
    handleSave() {
      this.validate();
      if (this.$refs.key.hasError) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          merchantCode: this.detailObj.merchantCode,
          key: this.detailObj.key,
          startTime: this.detailObj.startTime,
          endTime: this.detailObj.endTime
        };
        this.initSaveUserKey(params);
      }
    },
    initOrderMonthDays() {
      let params = {
        userId: this.detailObj.userId,
        time: this.time
      };
      this.loading = true;
      api_user.get_order_user_orderMonth_days(params).then(res => {
        this.loading = false;
        let { code, msg, data } = res.data;
        let arr = []
        if (code == "0000000") {
          data.length>0 && data.map((item,index) => {
          arr.push({
            '日期': item &&(item.time.toString().substr(6)+'日'),
            '投注金额 (万)': item.betAmount/10000,
            '盈亏金额 (万)': item.profit/10000,
            'time': item.time
          });
          return arr;
        })
        this.chartData.rows = arr;
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    validate() {
      this.$refs.key.validate();
      // this.$refs.time.validate();
    },
    // 生成KEY
    handleGeneratePassword() {
      api_merchant.get_manage_merchant_generateKey({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.detailObj.key = res.data.data;
          this.$message.success("生成KEY" + msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
      console.log(this.detailObj, "detailObj");
    }
  }
};
</script>
<style lang="stylus" scoped>
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
</style>
