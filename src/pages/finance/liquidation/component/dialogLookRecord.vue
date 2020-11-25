<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 11:44
 -->
<template>
  <div
    style="width: 780px ; height:auto;max-width:780px;"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="text-black">
      <q-card-section class="no-padding position-relative bg-panda-dialog">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">电子账单调整记录</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="pb20x">
        <div class="content">
          <a-table
            :columns="userCurrencyColumns"
            :dataSource="tableData"
            :pagination="pagination"
            :loading="tabledata_loading"
            class="mt10x pb20x"
            :scroll="{ x: 700,y: 300}"
            size="small"
            rowKey="id"
            @change="sorterForTable"
          >
            <span slot="adjustAmountBefore" slot-scope="text, record">
              <span>调整金额：{{ record.adjustAmountBefore }}</span><br>
            </span>
            <span slot="adjustAmount" slot-scope="text, record">
              <span>{{ record.adjustAmount }}</span><br> 
            </span>
            <span slot="adjustCause" slot-scope="text, record">
              <span v-if="!record.adjustCause">-</span>
              <span v-else>{{record.adjustCause}}</span>
            </span>
          </a-table>
        </div>
      </div> 
    </q-card>
  </div>
</template>
<script>
import { updateRecordConfig } from "src/pages/finance/liquidation/config/updateRecordConfig.js";
import { api_finance } from "src/api/index.js";
import sorterTableMixin from 'src/mixins/module/sortertablemixin.js'

export default {
  mixins: [sorterTableMixin],
  props: {
    financeId: "",
    timeZone: ''
  },
  data() {
    return {
      tabledata_loading: false,  //表格loading
      userCurrencyColumns: updateRecordConfig, //表格配置
      tableData: [], //表格数据
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        hideOnSinglePage: true,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
      }
    };
  },
  created() {
    this.initTableData();
  },
  methods: {
    async initTableData() {
      let params = {
        financeId: String(this.financeId),
        timeZone: this.timeZone
      };
      let res = await api_finance.post_report_financeMonth_getFinanceOperateRecordList(
        params
      );
      let { code, data, msg } = res.data;
      if (code == '0000000') {
        this.tableData = data;
      } else {
        this.$message.error(msg);
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
