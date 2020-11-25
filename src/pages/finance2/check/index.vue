<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="对账单" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; " class="bg-panda-bg-6 shadow-3 border-radius-4px">
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x">账务日期{{searchForm.time}}</div>
            <a-date-picker v-model="searchForm.time" />
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input v-model="searchForm.merchantName" placeholder="请输入商户名称/编码" autocomplete="off">
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x position-relative">
            <a-select
              autocomplete
              class="w-130"
              placeholder="商户类型"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in merchantTypeList"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border1"></div>
          </div>
          <div class="append-handle-btn-input pl30x position-relative">
            <a-select
              autocomplete
              class="w-130"
              placeholder="结算币种"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in settleCurrencyList"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border1"></div>
          </div>
          <div class="append-handle-btn-input pl30x height-30px line-height-30px">
             <a-button type="primary">搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scroll_area_height }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <p slot="expandedRowRender" slot-scope="record" style="margin:0">测试页面啊</p>
        <span slot="merchantCode" slot-scope="text">
          <div class="text-over">
            <span>{{ text }}</span>
            <!-- <q-tooltip
            anchor="bottom middle"
            content-class="bg-white text-black shadow-6"
            self="top middle"
            :offset="[10, 10]"
          >
            <span>{{text}}</span>
            </q-tooltip>-->
          </div>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="text-over-200">
            <span v-if="record.contact && record.contact.indexOf(',') > 0">
              {{
              record.contact.slice(0, record.contact.indexOf(","))
              }}
            </span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div class="text-over-200">
            <span v-if="record.phone && record.phone.indexOf(',') > 0">
              {{
              record.phone.slice(0, record.phone.indexOf(","))
              }}
            </span>
            <span v-else>{{ record.phone }}</span>
          </div>
        </span>
        <span slot="merchantAdmin" slot-scope="text, record">
          <div class="text-over-130">
            <span>{{ record.merchantAdmin }}</span>
            <q-tooltip
              anchor="bottom middle"
              content-class="bg-white text-black shadow-6"
              self="top middle"
              :offset="[10, 10]"
              max-width="130px"
            >
              <span style="word-break: break-all;">
                {{
                record.merchantAdmin
                }}
              </span>
            </q-tooltip>
          </div>
        </span>

        <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <q-icon
            class="panda-icon panda-icon-xia-zai panda-icon-hover fs18"
            @click.native="handleDownLoad(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>下载对账单</span>
            </q-tooltip>
          </q-icon>
        </a>
      </a-table>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 306px 0;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}

.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  white-space: nowrap;
}

.text-over-200 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
}

.no-left >>> .q-field__append {
  border-left: none;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/finance2/check/config/config.js";
import { dom } from "quasar";
const { height, width } = dom;

// import { getAutoParams } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      },
      showDialogObj: {},
      show_right_detail_obj: "",
      scroll_area_height: "",
      currentRecord: "",
      settleCurrencyList: [
        //结算方式
        { label: "人民币", value: 1 },
        { label: "美元", value: 2 },
        { label: "欧元", value: 3 },
      ],
      merchantTypeList: [
        //商户类型
        { label: "直营商户", value: 1 },
        { label: "渠道商户", value: 2 },
        { label: "二级商户", value: 3 },
      ],
    };
  },
  watch: {},
  created() {
    this.initTableData();
  },
  methods: {
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
      let params = {
        merchantName: this.searchForm.merchantName, //商户名称，可模糊搜索
        // status: 1,//商户状态 、1.启用、2.禁用 搜索条件，不传默认查全部
        pageNum: this.pagination.current, //分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //分页，每页查询多少条，默认20条。可不传
        sort: this.pagination.sort,
        orderBy: this.pagination.orderBy,
        status: this.pagination.status
      };
      return params;
    },
    compute_scrollarea_style() {
      let hs = this.window_size_info.height - 64 - 40 - 72 - 55 - 48 - 42;
      this.scroll_area_height = hs;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },     
    // 下载对账单
    handleDownLoad(record, index) {
      console.log(record, index, "qqq");
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.setMerchantShow = false;
      this.initTableData();
    },
    // 修改商户状态
    handleUpdateStatus(record) {
      console.log(record.status);
      this.currentRecord = record;
      this.toggleStatusShow = true;
    },
    //确认按钮
    async handleConfirm() {
      let params = {
        merchantCode: this.currentRecord.merchantCode,
        status: this.currentRecord.status == 1 ? 0 : 1
      };
      let res = await api_merchant.get_manage_merchant_updateMerchantStatus(
        params
      );
      let { code, msg } = res.data;
      if (code == "0000000") {
        if (this.currentRecord.status == 0) {
          this.$message.success("启用" + msg);
        } else {
          this.$message.error("禁用" + msg);
        }
      }
      this.$set(
        this.currentRecord,
        "status",
        this.currentRecord.status == 1 ? 0 : 1
      );
    }
  }
};
</script>
