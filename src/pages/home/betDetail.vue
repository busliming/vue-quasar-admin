<template>
  <div class="full-height full-width">
    <div>
      <div class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x">
        <div class="no-left append-handle-btn-input" style="position: relative">
          <q-input
            style=" width:240px;"
            outlined
            dense
            color="panda-text-light"
            class="text-panda-text-dark panda-input-dense input-height-30px ml20x"
            v-model.trim="searchForm.merchantName"
            placeholder="请输入商户名称"
            @keydown.enter="handleSearch"
            @blur="handleSearch"
            clearable
          >
            <template v-slot:prepend>
              <span class="panda-icon panda-icon-cha-zhao fs15"></span>
            </template>
          </q-input>
          <!-- {{scroll_area_height}} -->
        </div>
        <q-space />
        <div>
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:30px; "
            label="+ 新建商户"
            @click="handleNewMerchant"
          />
        </div>
      </div>
    </div>
    <a-table
      class="border-top"
      :columns="columns"
      :dataSource="tabledata"
      :scroll="{ x: 1700, y: scroll_area_height }"
      :pagination="pagination"
      :loading="tabledata_loading"
      @change="sorterForTable"
      size="middle"
      :rowKey="record => record.id"
    >
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
      <span slot="enabled" slot-scope="text, record">
        <q-btn
          class="panda-btn-green"
          v-if="record.status == 1"
          @click="handleUpdateStatus(record)"
        >启用</q-btn>
        <q-btn class="panda-btn-grey" v-else @click="handleUpdateStatus(record)">禁用</q-btn>
      </span>
      <a slot="action" slot-scope="text, record, index" class="q-gutter-md">
        <q-icon
          class="panda-icon panda-icon-bian-ji panda-icon-hover fs18"
          @click.native="handleEdit(record, index)"
        >
          <q-tooltip
            anchor="top middle"
            content-class="bg-white text-black shadow-6"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <span>编辑</span>
          </q-tooltip>
        </q-icon>
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
            <span>查看</span>
          </q-tooltip>
        </q-icon>
        <q-icon
          class="panda-icon panda-icon-shezhi-guanliyuan panda-icon-hover fs20"
          @click.native="handleSet(record, index)"
        >
          <q-tooltip
            anchor="top middle"
            content-class="bg-white text-black shadow-6"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <span>设置管理员</span>
          </q-tooltip>
        </q-icon>
      </a>
    </a-table>
    <!-- 查看商户弹窗 -->
    <q-dialog v-model="lookMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-look :detailObj="showDialogObj"></dialog-look>
    </q-dialog>
    <!-- 设置管理员弹窗 -->
    <q-dialog v-model="setMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @closeDialogSetShow="handleCloseDialogSet"></dialog-set>
    </q-dialog>
    <!-- 切换商户状态弹窗 -->
    <q-dialog v-model="toggleStatusShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-toggle @handleConfirm="handleConfirm"></dialog-toggle>
    </q-dialog>
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

.textColor {
  color: red !important;
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
import { tablecolumns_config } from "src/pages/merchant/merchantc/config/config.js";
import { dom } from "quasar";
import dialogLook from "src/pages/merchant/merchantc/component/dialogLook.vue";
import dialogSet from "src/pages/merchant/merchantc/component/dialogSet.vue";
import dialogToggle from "src/pages/merchant/merchantc/component/dialogToggle.vue";
const { height, width } = dom;

import { getAutoParams } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  components: {
    dialogLook,
    dialogSet,
    dialogToggle
  },
  data() {
    return {
      tabledata: [],
      columns: tablecolumns_config,
      tabledata_loading: false,

      searchForm: {
        merchantName: ""
      },
      locale: {
        emptyText: "Sorry，没有找到您想要的结果，请更换查询条件！"
      },
      lookMerchantShow: false, // 查看商户弹窗阀值
      setMerchantShow: false, // 设置管理员弹窗阀值
      toggleStatusShow: false, // 切换商户状态弹窗阀值
      updateMerchantShow: false, // 修改商户弹窗阀值
      showDialogObj: {},
      // pagination: {
      //   // 分页配置器
      //   pageSize: 10, // 一页的数据限制
      //   current: 1, // 当前页
      //   total: 100, // 总数
      //   hideOnSinglePage: false, // 只有一页时是否隐藏分页器
      //   showQuickJumper: true, // 是否可以快速跳转至某页
      //   showSizeChanger: true, // 是否可以改变 pageSize
      //   pageSizeOptions: ["10", "20", "50", "100"], // 指定每页可以显示多少条
      //   onShowSizeChange: (current, pagesize) => {
      //     // 改变 pageSize时的回调
      //     this.pagination.current = current;
      //     this.pagination.pageSize = pagesize;
      //   },
      //   // onChange: (current) => { // 切换分页时的回调，
      //   // 当在页面定义change事件时，切记要把此处的事件清除，因为这两个事件重叠了，可能到时候会导致一些莫名的bug
      //   //   this.pagination.current = current
      //   // },
      //   showTotal: total => `总数：${total}人` // 可以展示总数
      // },

      show_right_detail_obj: "",
      scroll_area_height: "",
      currentRecord: ""
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
      let hs = this.window_size_info.height - 64 - 40 - 72 - 55 - 48;
      this.scroll_area_height = hs;
    },
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    // 新建商户按钮
    handleNewMerchant() {
      this.$router.push({ name: "merchantc_edit" });
    },
    // 编辑
    handleEdit(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.$router.push({
        name: "merchantc_update",
        query: {
          id: record.id
        }
      });
    },
    // 查看
    handleLook(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.lookMerchantShow = true;
    },
    // 设置
    handleSet(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
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
