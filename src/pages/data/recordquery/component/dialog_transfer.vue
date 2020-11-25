<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 16:15
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
        id="transfer"
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
        <!-- 账变来源 -->
        <!-- <span slot="remark" slot-scope="text,record">
          {{transferTypeList[record.bizType*1-1].label}} ({{record.transferMode ==1 ?'加款': '扣款'}})
        </span> -->
        <span slot="changeAmount" slot-scope="text,record"><span><span v-if="record.changeType === 0">+</span><span v-if="record.changeType === 1">-</span>{{record.changeAmount | moneyFormat}}</span></span>
        <span slot="beforeTransfer" slot-scope="text,record">{{record.beforeTransfer | moneyFormat}}</span>
        <span slot="afterTransfer" slot-scope="text,record">{{record.afterTransfer | moneyFormat}}</span>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import recordmixin from 'src/pages/data/recordquery/mixin/index.js';
import { transfer_config } from "src/pages/data/betslip/config/transferConfig.js";
import moment from "moment";
export default {
  mixins: [recordmixin],
  props: {
    detailObj: {
      type: Object
    }
  },
  data() {
    return {
      tabledata_loading1: false,
      columns: transfer_config,
      tabledata: [],
      pagination: {
        pageSize: 40,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        // hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
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
        .post_manage_account_findAccountHistory(params)
        .then(res => {
          this.tabledata_loading1 = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == "0000000") {
            let arr = this.$lodash.get(res, "data.data.records") || [];
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
        item._id = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let { current, pageSize } = this.pagination;
      let { startTime, endTime, userId } = this.detailObj;
      return {
        pageNum: current,
        pageSize,
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        username: userId
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
#transfer>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 70px !important;
  min-height: 70px !important;
}

#transfer >>>.ant-empty-normal {
  margin: 50px 0 !important;;
}

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: 600;
}
</style>
