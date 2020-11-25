<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-24 11:36
 -->
<template>
  <div
    style="width: 474px; height:auto;max-width:474px; overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">币种明细</div>
          <q-space></q-space>
          <q-btn class="mr5x panda-dialog-close" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <div class="row"> 
        <a-table
          :columns="merchantBetColumns"
          :dataSource="merchantBetData"
          :pagination="pagination"
          :loading="tabledata_loading"
          :scroll="{ x: 460, y: 300 }"
          size="small"
          rowKey="id"
        >
          <span slot="customTitle">
            活跃投注用户数
            <a-tooltip placement="top">
              <template slot="title">
                <span>活跃投注用户数</span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <template slot="footer" slot-scope="text,record">
            <div class="flex justify-between fw_600 text-panda-text-7">
              <div class="ml20x">总计</div>
              <div>1234</div>
              <div class="mr40x text-center">123456789</div>
            </div>
          </template>
        </a-table>
      </div>
    </q-card>
  </div>
</template>
<script>
import { api_user } from "src/api/index.js";
import { matchMoney } from "src/pages/home/config/matchMoney.js";
export default {
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      merchantBetColumns: matchMoney,
      merchantBetData: [
        { currency: "人民币", betNumber: "478,857", profit: "161,645", activeUser: "161,645",id: 1 },
        { currency: "新加坡元", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 2 },
        { currency: "积分", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 3 },
        { currency: "欧元EUR", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 4 },
        { currency: "美元USD", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 5 },
        { currency: "日元JPY", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 6 },
        { currency: "香港HKD", betNumber: "478,857", profit: "161,645",activeUser: "161,645",id: 7 },
      ],
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
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-table-body{
  overflow: 
}
>>>.ant-table-footer{
  padding: 0;
  height: 30px;
  line-height 30px;
}
>>>.ant-table-thead > tr > th{
  color: #3C4551;
  font-weight: 600;
}
</style>
