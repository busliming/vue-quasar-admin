<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-29 22:05
 -->
<template>
  <div class="full-content">
    <q-card class="bg-white text-black dialog_main" style="width: 1010px">
      <div class="row line-height-38px title-content">
        <div style="padding-left: 15px" class="q-pr-sm fw_600">
          玩法投注统计
        </div>
        <q-space></q-space>
        <q-btn flat dense icon="close" v-close-popup />
      </div>
      <div class="table-content">
        <a-table
          class="border-top expanded-down"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 1000, y: 595 }"
          :pagination="pagination"
          :loading="tabledata_loading"
          @change="table_sort_by"
          size="middle"
          rowKey="_index"
        >
          <div slot="expandedbtn" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <span v-if="record.expanded.length > 1 && index < 1">
                <span
                  :class="'row-close' + record._index"
                  class="ant-table-row-expand-icon ant-table-row-collapsed"
                  @click="rowtog(record._index)"
                ></span>
              </span>
            </div>
          </div>
          <div slot="_index" slot-scope="text, record">
            {{ record._index * 1 + 1 }}
          </div>
          
          <div slot="playName" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div v-if="index < 1" class="item-open">
                <div v-if="item.playName">{{ item.playName }}</div>
                <div v-else>汇总</div>
              </div>
              <div
                v-else
                class="item-open"
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
              >
                <div>{{ item.playName }}</div>
              </div>
            </div>
          </div>
          <div slot="marketValue" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                v-if="index > 0"
                :class="index > 0 ? 'hidden row-item-close' + record._index : ''"
                class="item-open"
              >
                <div>{{ item.marketValue?item.marketValue: '-' }}</div>
              </div>
              <div
                v-if="index == 0"
                class="item-open"
              >
                <div v-if="record.expanded.length == 1">{{ item.marketValue?item.marketValue: '-' }}</div>
                <div v-else><span class="panda-text-red">共</span> {{ item.marketValue }} <span class="panda-text-red">个盘口</span></div>
              </div>
            </div>
          </div>
          <div slot="orderAmount" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div>{{ item.orderAmount}}</div>
              </div>
            </div>
          </div>
          <div slot="betAmount" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div>{{ item.betAmount | moneyFormat }}</div>
              </div>
            </div>
          </div>
          <div slot="unSettleOrder" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div>{{ item.unSettleOrder}}</div>
              </div>
            </div>
          </div>
          <div slot="unSettleAmount" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div>{{ item.unSettleAmount | moneyFormat}}</div>
              </div>
            </div>
          </div>
          <div slot="profit" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div v-bind:class="[item.profit < 0 ? 'red' : '']">
                  {{ item.profit | moneyFormat }}
                </div>
              </div>
            </div>
          </div>
          <div slot="profitRate" slot-scope="text, record">
            <div v-for="(item, index) in record.expanded" :key="index">
              <div
                :class="
                  index > 0 ? 'hidden row-item-close' + record._index : ''
                "
                class="item-open"
              >
                <div :class="[item.profitRate < 0 ? 'red' : '']">
                  <span v-if="item.profitRate < 0 && item.profitRate > -1"
                    >{{ (item.profitRate * 100) | moneyFormat }}%</span
                  >
                  <span v-else>{{ item.profitRate | moneyFormat }}%</span>
                </div>
              </div>
            </div>
          </div>
        </a-table>
      </div>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import log_login_mixin from "src/pages/data/matchbonus/mixin/index.js";
import { tablecolumns_config } from "src/pages/data/matchbonus/config/config_main.js";
export default {
  mixins: [...mixins, log_login_mixin],
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      pagination: {
        pageSize: 100,
        current: 1,
        pageSizeOptions: ["10", "20", "50", "100"],
        orderBy: "",
        sort: "",
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: false,
        showQuickJumper: false,
      },
    };
  },
  props: {
    detail_obj: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.tabledata_loading = true;
    this.initTableData();
  },
  methods: {
    table_sort_by(pagination, filters, sorter) {
      Object.assign(this.pagination, {
        orderBy: sorter.field,
        sort: sorter.order && sorter.order.replace("end", ""),
      });
    },
    rowtog(ind) {
      let dom = document.getElementsByClassName("row-close" + ind);
      console.warn(dom[0].classList.value);
      let domvalue = dom[0].classList.value.includes("ant-table-row-collapsed");
      let itemlist = document.getElementsByClassName("row-item-close" + ind);
      if (domvalue) {
        dom[0].classList.remove("ant-table-row-collapsed");
        dom[0].classList.add("ant-table-row-expanded");
      } else {
        dom[0].classList.remove("ant-table-row-expanded");
        dom[0].classList.add("ant-table-row-collapsed");
      }
      this.$lodash.forEach(itemlist, function (val, ind) {
        let itemval = val.classList.value.includes("hidden");
        if (itemval) {
          val.classList.remove("hidden");
        } else {
          val.classList.add("hidden");
        }
      });
    },
    compute_init_tabledata_params() {
      let { sort, orderBy } = this.pagination;
      return {
        matchId: this.detail_obj.matchId,
        sort,
        orderBy,
        merchantCode: this.detail_obj.merchantCode
      };
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.query_PlayStatisticList(params).then((res) => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.groupList") || [];
          let newarr = [];
          arr = arr.map((item) => {
            newarr.push({ expanded: item });
          });
          this.tabledata = this.rebuild_tabledata_to_needed(newarr);
          console.warn(this.tabledata,newarr,'qqqqqq');
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }else{
          this.$message.error(res.data.msg)
        }
      });
    },
  },
  rebuild_tabledata_to_needed(arr) {
    arr.map((item, index) => {
      item._index = this.pagination.start + index;
      item.showExpand = false;
    });
    return arr;
  },
};
</script>
<style lang="stylus" scoped>
.red {
  color: $red !important;
}

.item-open {
  padding: 5px 0px;
}

>>>.ant-table-pagination {
  display: none;
}

.table-content {
  max-height: 800px;
  overflow: auto;
}
</style>
