<!--
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 今日用户信息-币种明显弹窗
 * @FilePath: /pandaToB端商户后台/src/pages/home/component/dialogBet.vue
-->

<template>
  <div
    style="max-width:386px; overflow:hidden;"
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
        :columns="merchantBetColumns"
        :dataSource="userTodayData"
        :pagination="pagination"
        :loading="tabledata_loading"
        id="bet"
        size="small"
        rowKey="currency"
      >
        <span slot="customTitle">
          大额投注用户数
          <a-tooltip placement="top">
            <template slot="title">
              <span>累计投注金额≧￥5000</span>
            </template>
            <a-icon type="question-circle" class="cursor-pointer" />
          </a-tooltip>
        </span>
        <template slot="footer">
          <div class="flex justify-between fw_600 text-panda-text-7 text-center">
            <span style="width: 86px">总计</span>
            <span style="width: 136px">{{userToday.betUserAmount}}</span>
            <span style="width: 162px">{{userToday.briskUser}}</span>
          </div>
        </template>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_user } from "src/api/index.js";
import { betCurrency_config } from "src/pages/home/config/betCurrency.js";
export default {
  data() {
    return {
      tabledata_loading: false, // 表格loading
      merchantBetColumns: betCurrency_config,  // 表格配置
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
  props: {
    userTodayData: {
      type: Array,
      default() {
        return [];
      }
    },
    userToday: {
      type: Object
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-table-body {
  overflow;
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
#bet>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background #fff
}
</style>
