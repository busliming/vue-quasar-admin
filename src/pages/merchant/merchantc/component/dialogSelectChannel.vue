<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-11 20:42:40
 -->
<template>
  <div style="width: 1580px ; height:auto;max-width:1580px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">选择渠道商户</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup class="text-panda-dialog-close" />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <!-- <q-card-section> -->
      <div class="row">
        <div class="append-handle-btn-input pl30x w-240 mt20x">
          <a-input
            v-model="searchForm.merchantName"
            placeholder="请输入商户名称"
            autocomplete="off"
            @keydown.enter="handleSearch"
            allowClear
          >
            <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
          </a-input>
        </div>
          <a-button type="primary" class="mt20x ml20x" style="height: 30px;" @click="handleSearch">搜索</a-button>
      </div>
      <a-table
        class="border-top mt20x pb10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1560, y: 380 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span slot="merchantCode" slot-scope="text">
          <span>{{ text }}</span>
        </span>
        <span slot="secondMerchantNum" slot-scope="text, record">
          <span>Lv{{ record.secondMerchantNum }} ++</span>
        </span>
        <span slot="childAmount" slot-scope="text, record">          
          <span>{{ record.childAmount }}</span><span v-if="record.childMaxAmount">/</span><span>{{record.childMaxAmount}}</span>          
        </span>
        <span slot="level" slot-scope="text, record">
          <span>Lv{{ record.level }}</span>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div>
            <span v-if="record.contact && record.contact.indexOf(',') > 0">
              {{
              record.contact.slice(0, record.contact.indexOf(","))
              }}
            </span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div style="max-width: 160px;">
            <span v-if="record.phone && record.phone.indexOf(',') > 0">
              {{
              record.phone.slice(0, record.phone.indexOf(","))
              }}
            </span>
            <span v-else>{{ record.phone }}</span>
          </div>
        </span>
        <a slot="action" slot-scope="text, record">
          <q-btn v-if="record.childAmount != record.childMaxAmount" class="panda-btn-blue" flat @click="handleSelectChannel(record)">选择</q-btn>
          <q-btn v-else class="no-show" flat>不选</q-btn>
        </a>
      </a-table>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import { selectChannelConfig } from "src/pages/merchant/merchantc/config/selectChannelConfig.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import sortertablemixin from "src/mixins/module/sortertablemixin.js";
export default {
  mixins: [commonmixin, sortertablemixin],
  data() {
    return {
      tabledata: [],
      columns: selectChannelConfig,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      }
    };
  },
  created() {
    this.initTableData();
  },
  methods: {
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 选择
    handleSelectChannel(record) {
      this.$emit("closeDialog", record);
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.get_manage_merchant_list(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata, "tabledata");
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    compute_init_tabledata_params() {
      let { sort, orderBy, status } = this.pagination;
      let { merchantName } = this.searchForm;
      let params = {
        agentLevel: 1,
        merchantName, //商户名称，可模糊搜索
        // status: 1,//商户状态 、1.启用、2.禁用 搜索条件，不传默认查全部
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
        sort,
        orderBy,
        status
      };
      console.log(this.pagination.current, this.pagination.pageSize, "第一次");
      return params;
    },
    handleSelect(record, index) {
      this.$message.success("您选择了Lv" + record.level);
      console.log(record);
      this.$emit("closeSelectDialog", record);
    }
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
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

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
  background: #fff;
}

>>>.ant-table-tbody > tr > td {
  color: #3C4551;
}
</style>
