<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 21:47
 -->
<template>
  <div style="width: 936px ; height:auto;max-width:936px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">选择平台费率</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <!-- <q-card-section> -->
      <a-table
        class="border-top mt10x pb10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 920, y: 380 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        size="middle"
        rowKey="id"
      >
        <span slot="computingStandard" slot-scope="text, record">
          <div class="text-over">
            <span>{{
              record.computingStandard == 1 ? "盈利金额" : "投注金额"
            }}</span>
          </div>
        </span>
        <span slot="rangeAmountBegin" slot-scope="text, record">
          <span>
            {{ (record.rangeAmountBegin / 10000) | amount }}
            <span v-if="record.rangeAmountBegin != 0">万</span>
            - {{ (record.rangeAmountEnd / 10000) | amount }}万
          </span>
        </span>
        <span slot="terraceRate" slot-scope="text, record">
          <span v-if="record.terraceRate">{{ record.terraceRate }}%</span>
          <span v-else>免费</span>
        </span>
        <span slot="paymentCycle" slot-scope="text, record">
          <span>{{ record.paymentCycle | filterPaymentCycle }}</span>
        </span>
        <span slot="modifyTime" slot-scope="text, record">
          <span>{{ format_date(record.modifyTime, "-") }}</span>
        </span>
        <a slot="action" slot-scope="text, record, index">
          <q-btn
            class="panda-btn-green"
            @click.native="handle_select(record, index)"
            >选择</q-btn
          >
        </a>
      </a-table>
      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>
<script>
import { api_base } from "src/api/index.js";
import { selectRateConfig } from "src/pages/set/merchantlevel/config/selectRateConfig.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
export default {
  mixins: [commonmixin],
  data() {
    return {
      tabledata: [],
      columns: selectRateConfig,
      tabledata_loading: false,
      pagination: {
        pageSize: 100,
        current: 1,
        total: 0,
        hideOnSinglePage: true,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      }
    };
  },

  created() {
    this.initTableData();
  },
  watch: {},
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    }
  },
  methods: {
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_base.post_set_merchantrate_query(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.records") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
      });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      return params;
    },
    /**
     * @description 点击选择按钮
     * @return {undefined} undefined
     */
    handle_select(record, index) {
      this.$message.success("您选择的平台费率 " + record.terraceRate + "%");
      console.log(record.id, "record");
      this.$emit("closeSelectRate", record);
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 400px;
  min-height: 400px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

>>> .ant-table-thead > tr > th {
  color: #7D87A5;
  font-weight: bold;
}
</style>
