
<template>
  <div style="width: 920px ; max-width:920px;overflow-y:hidden;">
    <q-card class="bg-white text-panda-text-7">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">查看二级商户</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" class="text-panda-dialog-close" v-close-popup />
        </div>
      </q-card-section>
      <!-- <q-separator></q-separator> -->
      <!-- <q-card-section> -->
      <a-table
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 900, y: 480 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="small"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <span class="cursor-pointer">
            <a-popover v-if="getStrLength(record.merchantName)>20" title="" placement="top">
              <template slot="content">
                <div
                  v-html="record.merchantName"
                  :style="`max-width: 180px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over1">{{record.merchantName}}</span>
            </a-popover>
            <span v-else class="text-over1">{{record.merchantName}}</span>
          </span><br>
          <!-- <span>{{ record.merchantName }}</span> -->
          <span class="text-panda-text-4">[{{record.merchantCode}}]</span>
        </span>
        <span slot="agentLevel" slot-scope="text">
          <span>{{ text | filterAgentLevel }}</span>
        </span>
        <span
          slot="orderAmountTotal"
          slot-scope="text, record"
        >{{ record.orderAmountTotal | moneyFormat }}</span>
        <span slot="profitAmount" slot-scope="text, record">
          <span v-if="record.profitAmount>=0">{{ record.profitAmount | moneyFormat }}</span>
          <span v-else class="panda-text-red">{{ record.profitAmount | moneyFormat }}</span>
        </span>
        <span slot="profitRate" slot-scope="text,record">
          <span v-if="record.profitRate == null">-</span>
          <span v-else-if="record.profitRate >= 0">{{ text | moneyFormat}}%</span>        
          <span v-else class="panda-text-red">{{ text | moneyFormat}}%</span>         
        </span>
        <template slot="footer" slot-scope="" >
          <a-table
            class="border-top "
            :columns="columns"
            :dataSource="countData"
            :scroll="{ x: 900 }"
            size="small"
            :bordered="false"
            :pagination="false"
            :showHeader="false"
            rowKey="rowkey" 
            >  
          </a-table>
        </template>
      </a-table>
      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>
<script>
import { api_finance } from "src/api/index.js";
import { lookMerchantConfig } from "src/pages/finance/liquidation/config/lookMerchantConfig.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import { getStrLength } from "src/util/module/common.js";
import financeMixin from 'src/pages/finance/liquidation/mixin/index.js'
import financesorter from "src/mixins/module/financesorter.js";
export default {
  mixins: [commonmixin,financeMixin,financesorter],
  props: {
    detailObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tabledata: [], //表格数据
      columns: lookMerchantConfig, //表格配置
      tabledata_loading: false, //表格loading
      countData: [
        //总计
        {
          rowkey:'totalData',
          _index: '总计',
          currencyStr: '',
          orderAmountTotal: '',
          profitAmount: '',
          profitRate: ''
        }
      ]
    };
  },

  created() {
    this.initTableData();
    this.query_finance_month_count();
  },
  methods: {
    getStrLength,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_finance
        .post_report_financeMonth_queryFinanceMonthList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == '0000000') {
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          }
        });
    },
    /**
     * @description 总计数据拉取
     * @return {undefined} undefined
     */
    async query_finance_month_count(){
      let params = {
        parentId: this.detailObj.merchantId,
        financeDate: this.detailObj.financeDate,
        timeZone: this.detailObj.timeZone
      }
     let res = await api_finance.post_report_financeMonth_queryFinanceMonthCount(params)
     let {code,msg,data} = res.data;
     if(code == '0000000'){;
      this.countData[0].currencyStr = data.currencyStr;
      this.countData[0].orderAmountTotal = this.$options.filters['moneyFormat'](data.orderAmountTotal);
      this.countData[0].profitAmount = this.$options.filters['moneyFormat'](data.profitAmount);
      this.countData[0].profitRate = data.profitRate?this.$options.filters['moneyFormat'](data.profitRate)+'%': '-';
      console.log(this.countData,'countData')
     }else{
       this.$message.error(msg);
     }
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let params = {
        financeDate: this.detailObj.financeDate,
        parentId: this.detailObj.merchantId,
        timeZone: this.detailObj.timeZone,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      return params;
    },
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
>>>.ant-empty-normal {
  margin: 100px 0;
}

>>> .ant-table-header {
  background: #ffffff;
}

>>> .ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
}

>>>.ant-table-footer {
  padding: 0;
  height: 40px;
  line-height: 40px;
  background: #F4F5F8;
}

>>>.ant-table-small {
  border: none;
}

>>>.ant-table-scroll {
  overflow-y: hidden;
}

.text-over1{
  display inline-block;
  max-width 160px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

>>>.ant-table-footer .ant-table-body{
  overflow: hidden !important;
}

>>>.ant-table-footer {
  font-weight bold;
  padding 0px;
  padding-right :8px;
}

</style>
