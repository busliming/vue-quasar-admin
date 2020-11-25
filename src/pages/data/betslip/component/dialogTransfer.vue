<!--
 * @Author: Nice
 * @Date: 2020-07-30 15:20
 * @Description: 账变弹窗
 * @FilePath: /pandaToB端商户后台/src/pages/data/betslip/component/dialogTransfer.vue
-->

<template>
  <div
    style="width: 690px; height:auto;max-width:690px; min-height: 60px; overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">{{detailObj.userName}}-账变记录</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <a-table
        :columns="columns"
        :dataSource="tabledata"
        :pagination="pagination"
        :loading="tabledata_loading1"
        :scroll="{ x: 510,y: 290}"
        size="small"
        rowKey="id"
      >
        <span
          slot="createTime"
          slot-scope="text,record"
        >{{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
        <span slot="changeAmount" slot-scope="text,record"><span><span v-if="record.changeType === 0">+</span><span v-if="record.changeType === 1">-</span>{{record.changeAmount | amount}}</span></span>
        <span slot="beforeTransfer" slot-scope="text,record">{{record.beforeTransfer | moneyFormat}}</span>
        <span slot="afterTransfer" slot-scope="text,record">{{record.afterTransfer | moneyFormat}}</span>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import { transfer_config } from "src/pages/data/betslip/config/transferConfig.js";
import moment from "moment";
export default {
  props: {
    betTodayData: {
      type: Array,
      default() {
        return {};
      }
    },
    detailObj: {
      type: Object
    }
  },
  data() {
    return {
      tabledata_loading1: false, //  弹窗loading
      columns: transfer_config,  // 表格配置
      tabledata: [], // 表格数据
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
    this.initTableData();
  },
  methods: {
    moment,
    initTableData() {
      this.tabledata_loading1 = true;
      let params = this.compute_init_tabledata_params();
      api_merchant
        .post_order_user_queryTransferList(params)
        .then(res => {
          this.tabledata_loading1 = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == "0000000") {
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            console.log(this.tabledata)
            this.pagination.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(res.data.msg, 2);
          }
        });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item.id = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let { current, pageSize } = this.pagination;
      return {
        pageNum: current,
        pageSize,
        orderNo: this.detailObj.orderNo,
        userId: this.detailObj.uid
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 70px !important;
  min-height: 70px !important;
}

>>>.ant-empty-normal {
  margin: 50px 0 !important;;
}

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
</style>
