<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs
        separator=">"
        active-color="whiddte"
        class="text-panda-text-4"
      >
        <q-breadcrumbs-el label="财务中心" />
        <q-breadcrumbs-el label="清算管理" class="fw_600 text-panda-text-7" />
      </q-breadcrumbs>
    </div>
    <div
      style="margin: 20px; "
      class="bg-panda-bg-6 shadow-3 border-radius-4px"
    >
      <div>
        <div
          class="row line-height-30px items-center text-panda-text-7 bg-panda-bg-6 pb20x pt20x border-radius-4px"
        >
          <div class="append-handle-btn-input pl20x row line-height-32px">
            <div class="mr10x fs12">账单</div>
            <a-date-picker @change="onChange" />
          </div>
          <div class="append-handle-btn-input pl30x row w-240">
            <a-input
              v-model="searchForm.merchantName"
              placeholder="请输入商户名/编号"
              autocomplete="off"
              allowClear
            >
              <my-icon
                slot="prefix"
                type="p-icon-chazhao"
                class="panda-text-1 fs15"
              />
            </a-input>
          </div>
          <div class="append-handle-btn-input pl30x row line-height-32px">
            <div class="mr10x fs12">盈利范围</div>
            <div class="w-100">
              <a-input
                v-model="searchForm.min"
                placeholder="最小值"
                autocomplete="off"
              ></a-input>
            </div>
            <div class="ml10x mr10x">~</div>
            <div class="w-100">
              <a-input
                v-model="searchForm.max"
                placeholder="最大值"
                autocomplete="off"
              ></a-input>
            </div>
          </div>
          <div class="append-handle-btn-input pl30x position-relative">
            <a-select autocomplete class="w-130" placeholder="结算币种">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in settleCurrencyList"
                :key="index"
                >{{ item.label }}</a-select-option
              >
            </a-select>
            <div class="position-absolute select-left-border1"></div>
          </div>
          <div class="append-handle-btn-input pl30x position-relative">
            <a-select autocomplete class="w-130" placeholder="商户类型">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in merchantTypeList"
                :key="index"
                >{{ item.label }}</a-select-option
              >
            </a-select>
            <div class="position-absolute select-left-border1"></div>
          </div>
          <div class="append-handle-btn-input pl30x">
            <a-checkbox class=" text-panda-text-7" v-model="status"
              >金额展示人民币</a-checkbox
            >
          </div>
          <div class="append-handle-btn-input pl30x line-height-32px">
            <a-button type="primary" size="default">搜索</a-button>
          </div>
        </div>
      </div>
      <a-table
        class="border-top"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1569, y: scroll_area_height }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <span slot="merchantCode" slot-scope="text">
          <div class="text-over">
            <span>{{ text }}</span>
          </div>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="text-over-200">
            <span v-if="record.contact && record.contact.indexOf(',') > 0">
              {{ record.contact.slice(0, record.contact.indexOf(",")) }}
            </span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div class="text-over-200">
            <span v-if="record.phone && record.phone.indexOf(',') > 0">
              {{ record.phone.slice(0, record.phone.indexOf(",")) }}
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
                {{ record.merchantAdmin }}
              </span>
            </q-tooltip>
          </div>
        </span>
        <span slot="secondaryMerchant" slot-scope="text, record">
          <a @click.prevent="handleSecondary(record)">{{ record.level }}</a>
        </span>
        <span
          slot="action"
          slot-scope="text, record, index"
          class="q-gutter-md cursor-pointer"
        >
          <q-icon
            class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"
            @click.native="handleLook(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>查看电子账单</span>
            </q-tooltip>
          </q-icon>

          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            @click.native="handleSet(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>调整电子账单</span>
            </q-tooltip>
          </q-icon>
        </span>
      </a-table>
      <!-- 查看二级商户详情 -->
      <q-dialog
        v-model="dialogSecondaryShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-Secondary :detailObj="showDialogObj"></dialog-Secondary>
      </q-dialog>
      <!-- 查看电子账单详情弹窗 -->
      3.
      <q-dialog
        v-model="dialogViewShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-view :detailObj="showDialogObj"></dialog-view>
      </q-dialog>
      <!-- 编辑调整电子账单弹窗 -->
      <q-dialog
        v-model="dialogEditShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-Edit
          :detailObj="showDialogObj"
          @closeDialog="handleCloseDialogSet"
        ></dialog-Edit>
      </q-dialog>
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

a{
  text-decoration underline
}

// >>>.ant-input{
//   font-size 12px;
// }
// >>>.ant-select{
//   font-size 12px;
// }

// >>>.ant-select-dropdown{
//   font-size 12px;
// }
// >>>.ant-select-dropdown-menu-item{
//   font-size 12px;
// }
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/finance2/settlement/config/config.js";
import { noCnyConfig } from "src/pages/finance2/settlement/config/noCnyConfig.js";
import dialogView from "src/pages/finance2/settlement/component/dialogView.vue"; //查看电子账单 1.
import dialogEdit from "src/pages/finance2/settlement/component/dialogEdit.vue"; //调整电子账单
import dialogSecondary from "src/pages/finance2/settlement/component/dialogSecondary.vue"; //二级商户

export default {
  mixins: [...mixins],
  components: {
    dialogView, // 2.
    dialogSecondary,
    dialogEdit
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      },
      dialogViewShow: false, //查看电子账单阀值
      dialogEditShow: false, //编辑调整电子账单阀值
      dialogSecondaryShow: false, //二级商户详情阀值
      showDialogObj: {},
      show_right_detail_obj: "",
      settleCurrencyList: [
        //结算币种
        { label: "人民币", value: 1 },
        { label: "美元", value: 2 },
        { label: "欧元", value: 3 }
      ],
      merchantTypeList: [
        //商户类型
        { label: "直营商户", value: 1 },
        { label: "渠道商户", value: 2 },
        { label: "二级商户", value: 3 }
      ],
      status: false // 金额展示人民币阀值
    };
  },
  watch: {
    status(val) {
      console.log(val);
      if (!val) {
        this.columns = noCnyConfig;
      } else {
        this.columns = tablecolumns_config;
      }
    }
  },
  created() {
    this.initTableData();
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
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
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 编辑调整
    handleSet(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.dialogEditShow = true;
    },
    // 查看二级商户详情列表
    handleSecondary(record) {
      console.log(record);
      this.showDialogObj = { ...record };
      this.dialogSecondaryShow = true;
    },
    // 查看
    handleLook(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.dialogViewShow = true;
    },
    confirm(e) {
      console.log(e);
      this.$message.success("Click on Yes");
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    //关闭弹窗
    handleCloseDialogSet() {
      this.dialogEditShow = false;
    }
  }
};
</script>
