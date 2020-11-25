<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-20 15:05
 -->
<template>
  <div
    style="width: 1300px ; max-height: 500px; max-width:1300px;overflow:hidden;"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">{{detailObj && detailObj.merchantName}}-子证书信息</div>
          <q-space></q-space>
          <q-btn
            flat
            dense
            icon="close"
            v-close-popup
            class="text-panda-dialog-close"
          />
        </div>
      </q-card-section>
      <div class="append-handle-btn-input pl20x row  mt10x">
        <div class="w-200 position-relative">
          <a-input
            v-model="searchForm.merchantName"
            placeholder="请输入商户名称"
            autocomplete="off"
            @keydown.enter="handle_search"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <a-button style="height: 30px; line-height: 30px;" class="ml20x" type="primary" @click="handle_search">搜索</a-button>
      </div>
      <!-- <q-card-section> -->
      <a-table
        class="mt10x "
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1280, y: 320 }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="small"
        rowKey="id"
      >
        <span slot="merchantName" slot-scope="text, record">
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
            :str_all="('<div>'+record.merchantName +'</div>')"
            :defaultplace="'topLeft'"
            :col_width="180"
            :str='record.merchantName'
          ></table-cell-ellipsis-ant>
        </span>
        <span slot="parentName" slot-scope="text, record">
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.parentName+'</div>')"
            :str_all="('<div>'+record.parentName +'</div>')"
            :defaultplace="'topLeft'"
            :col_width="180"
            :str='record.parentName'
          ></table-cell-ellipsis-ant>
          <!-- <span class="text-over-100">{{ record.parentName }}</span> -->
        </span>
        <span slot="startTime" slot-scope="text, record">
          <span>{{ record.startTime }} 至 {{ record.endTime }}</span>
        </span>
        <span slot="status" slot-scope="text, record">
          <span
            v-if="record.statusDescription == '即将过期'"
            class="panda-dot panda-dot-yellow line-height-40px mr5x"
          ></span>
          <span
            v-if="record.statusDescription == '有效'"
            class="panda-dot panda-dot-green line-height-40px mr5x"
          ></span>
          <span
            v-if="record.statusDescription == '已过期'"
            class="panda-dot panda-dot-red line-height-40px mr5x"
          ></span>
          <span>{{ record.statusDescription }}</span>
        </span>
        <span slot="action" slot-scope="text, record, index" class="q-gutter-md cursor-pointer">
          <q-icon
            class="panda-icon panda-icon-fu-zhi-key panda-icon-hover fs18"
            @click.native="handleCopy(record.key, '证书信息')"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>复制证书</span>
            </q-tooltip>
          </q-icon>
          <q-icon
            class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
            v-if="detailObj.childConnectMode == 1"
            @click.native="handleEdit(record, index)"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>更新证书</span>
            </q-tooltip>
          </q-icon>
        </span>
      </a-table>
      <a-pagination
        v-if="tabledata.length>0"
        :total="pagination.total"
        :current="pagination.current"
        show-size-changer 
        show-quick-jumper
        :page-size-options="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :show-total="total => `共 ${pagination.total} 条数据`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      />
      <!-- 更新证书弹窗 -->
      <q-dialog
        v-model="eidtKeyShow"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <dialog-edit
          :detailObj="showDialogObj"
          @closeDialog="handle_close_dialog_edit"
        ></dialog-edit>
      </q-dialog>
      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import { subConfig } from "src/pages/merchant/key/config/subConfig.js";
import { handleCopy } from "src/util/module/common.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import sortertablemixin from "src/mixins/module/sortertablemixin.js";
import keymixin from "src/pages/merchant/key/mixin/index.js";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
export default {
  mixins: [commonmixin, sortertablemixin,keymixin],
  props: {
    detailObj: {
      required: true,
      type: Object
    }
  },
  components: {
    tableCellEllipsisAnt
  },
  data() {
    return {
      tabledata: [],
      columns: subConfig,
      tabledata_loading: false,
      searchForm: {
        merchantName: ""
      }
    };
  },

  created() {
    this.tabledata_loading = true;
    this.initTableData();
  },
  methods: {
    handleCopy,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant
        .get_manage_merchant_queryKeyList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == "0000000") {
            let currentPage = this.$lodash.get(res, "data.data.page") * 1 || 1;
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.pagination.start = this.$lodash.get(res, "data.data.startRow");
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // handle_close_dialog_edit(){
    //   this.eidtKeyShow = false;
    //   this.initTableData()
    // },
    compute_init_tabledata_params() {
      let params = {
        merchantName: this.searchForm.merchantName, // 商户名称
        parentId: this.detailObj.merchantId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      return params;
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
      });
      return arr;
    },
    /**
     * @description 点击搜索按钮
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
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
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 350px !important;
  min-height: 350px !important;
}

>>>.ant-empty-normal {
  margin: 100px 0 !important;
}

>>>.ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
  background: #fff;
}

.ellipsis{
  display block;
  max-width 160px;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}
.text-over-100{
  display block;
  max-width 95px;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

>>>.ant-table-tbody > tr > td {
  color: #3C4551;
}

>>>.ant-table-pagination.ant-pagination {
  margin: 16px 20px 16px 0;
}
</style>
