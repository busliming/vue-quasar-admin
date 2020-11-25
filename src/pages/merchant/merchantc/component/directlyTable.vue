<!--
 * @Desc: 
 * @Date: 2020-03-03 14:25:11
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-03 14:54:29
 -->
<template>
  <a-table
    class="border-top"
    :columns="columns"
    :dataSource="tabledata"
    :scroll="{ x: 1600, y: 524 }"
    :pagination="pagination"
    :loading="tabledata_loading"
    @change="sorterForTable"
    size="middle"
    :rowKey="record => record.id"
  >
    <span slot="merchantCode" slot-scope="text">
      <span>{{ text }}</span>
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
      <div>
        <span v-if="record.phone && record.phone.indexOf(',') > 0">
          {{
          record.phone.slice(0, record.phone.indexOf(","))
          }}
        </span>
        <span v-else>{{ record.phone }}</span>
      </div>
    </span>
    <span slot="merchantAdmin" slot-scope="text, record">
      <div class="text-over-160">
        <span>{{ record.merchantAdmin }}</span>
        <q-tooltip
          anchor="bottom middle"
          content-class="bg-white text-black shadow-6"
          self="top middle"
          :offset="[10, 10]"
          max-width="160px"
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
    <!-- 切换商户状态弹窗 -->
    <q-dialog v-model="toggleStatusShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-toggle @handleConfirm="handleConfirm"></dialog-toggle>
    </q-dialog>
  </a-table>
</template>

<script>
// import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/merchant/merchantc/config/config.js";
import dialogToggle from "src/pages/merchant/merchantc/component/dialogToggle.vue";
export default {
  // mixins: [...mixins],
  props: {
    tabledata: {
      required: true,
      default(){
        return []
      }
    },
    total: '',
    pagination: {}
  },
  data() {
    return {
      tabledata_loading: false,
      columns: tablecolumns_config,
      toggleStatusShow: false // 切换商户状态弹窗阀值
    };
  },
  components: {
    dialogToggle
  },
  methods: {
    sorterForTable(){
      this.$emit('sorterForTable',pagination, filter, sorter)
    },
    // 编辑
    handleEdit(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record };
      this.$router.push({
        name: "merchantc_update",
        query: {
          id: record.id,
          merchantName: this.searchForm.merchantName,
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current
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

<style>
</style>