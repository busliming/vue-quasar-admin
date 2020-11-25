<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-18 13:06
 -->
<template>
  <div
    style="width: 582px; height:auto;max-width:582px; overflow-x:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">币种明细</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <a-table
        :columns="userCurrencyColumns"
        :dataSource="betTodayData"
        :pagination="pagination"
        :loading="tabledata_loading"
        size="small"
        id="table"
        rowKey="currency"
        style="overflow:hidden;"
      >
        <!-- :scroll="{ x: 562,}" -->
        <span slot="betAmount" slot-scope="text, record">{{ record.betAmount | amount }}</span>
        <span slot="settleAmount" slot-scope="text, record">{{ record.settleAmount | amount }}</span>
        <span slot="profit" slot-scope="text, record">{{ record.profit | amount }}</span>
        <span slot="betNum" slot-scope="text, record">{{ record.betNum | amount }}</span>
        <template slot="footer">
          <div class="flex justify-between fw_600 text-panda-text-7 text-left" style="padding: 0;margin: 0">
            <div style="width: 100px; text-align: center;">总计</div>
            <div style="width: 110px;">{{betTodayData[0].betAmount | amount}}</div>
            <div style="width: 110px;">{{betTodayData[0].settleAmount | amount}}</div>
            <div style="width: 108px;">{{betTodayData[0].profit | amount}}</div>
            <div style="width: 116px;">{{betTodayData[0].betNum | amount}}</div>
          </div>
        </template>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_user } from "src/api/index.js";
import { userCurrency_config } from "src/pages/home/config/userCurrency.js";
export default {
  props: {
    betTodayData: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      userCurrencyColumns: userCurrency_config,
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
      }
    };
  },
  created() {
    // this.formData.merchantAdmin = this.detailObj.merchantAdmin;
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
>>>.ant-table-body {
  overflow: hidden;
}

>>>.ant-table-footer {
  padding: 0;
  height: 30px;
  line-height: 30px;
}

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: 600;
}  

//表头增加色调
#table>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background #fff
}
</style>
