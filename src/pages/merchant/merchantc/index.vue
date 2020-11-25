<template>
  <div class="full-height full-width">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="商户管理" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="line-height-30px items-center text-panda-text-dark bg-panda-bg-6 ml10x mr10x border-radius-4px pl10x pr10x shadow-3">
      <div id="top2" class="row pt10x pb10x">
        <a-radio-group v-model="pagination.agentLevel">
          <a-radio-button value="0">直营商户</a-radio-button>
          <a-radio-button value="1">渠道商户</a-radio-button>
          <a-radio-button value="2">二级商户</a-radio-button>
        </a-radio-group>
        <div class="append-handle-btn-input ml20x w-200 position-relative">
          <a-input
            @keydown.enter="handle_search"
            v-model.trim="searchForm.merchantName"
            placeholder="请输入商户名称"
            autocomplete="off"
            maxLength="20"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <!-- 二级商户才显示 -->
        <div class="append-handle-btn-input ml20x position-relative w-200" v-if="pagination.agentLevel === '2'">
          <a-input
            @keydown.enter="handle_search"
            v-if="pagination.agentLevel === '2'"
            v-model.trim="searchForm.parentName"
            placeholder="请输入渠道商户名称"
            autocomplete="off"
            maxLength="20"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <q-btn
          class="panda-btn-primary-dense bg-primary ml40x"
          style="width:60px;height:30px; "
          label="搜索"
          @click="handle_search"
        />
        <q-space />
        <div>
          <q-btn
            class="panda-btn-primary-dense bg-primary mr10x"
            style="width:110px;height:30px; font-size: 12px;"
            :label="btnName"
            @click="handle_new_merchant"
          />
        </div>
      </div>
      <a-table
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record.id"
      >
        <span slot="merchantCode" slot-scope="text">
          <span>{{ text }}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record">
          <!-- {{getStrLength(record.merchantName)}} -->
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
            :str_all="('<div>'+record.merchantName +'</div>')"
            :defaultplace="'topLeft'"
            :col_width="180"
            :str='record.merchantName'
          ></table-cell-ellipsis-ant>
          <!-- <span class="text-over-120">{{ record.merchantName }}</span> -->
        </span>
        <span slot="secondMerchantNum" slot-scope="text, record">
          <span>Lv{{ record.secondMerchantNum }} ++</span>
        </span>
        <span slot="childAmount" slot-scope="text, record">
          <span>
            {{ record.childAmount }}
            <span v-if="record.childMaxAmount">/</span>
            {{ record.childMaxAmount }}
          </span>
        </span>
        <span slot="level" slot-scope="text, record">
          <span>Lv{{ record.level }}</span>
        </span>
        <span slot="email" slot-scope="text, record">
          <span class="text-over-180">{{ record.email }}</span>
        </span>
        <span slot="contact" slot-scope="text, record">
          <div class="text-over-150">
            <span
              v-if="record.contact && record.contact.indexOf(',') > 0"
            >{{ record.contact.slice(0, record.contact.indexOf(",")) }}</span>
            <span v-else>{{ record.contact }}</span>
          </div>
        </span>
        <span slot="phone" slot-scope="text, record">
          <div style="max-width: 160px;">
            <span
              v-if="record.phone && record.phone.indexOf(',') > 0"
            >{{ record.phone.slice(0, record.phone.indexOf(",")) }}</span>
            <span v-else>{{ record.phone }}</span>
          </div>
        </span>
        <span slot="merchantAdmin" slot-scope="text, record">
          <span class="text-over-160">{{ record.merchantAdmin }}</span>
        </span>
        <span slot="enabled" slot-scope="text, record">
          <q-btn
            class="panda-btn-green"
            v-if="record.status == 1"
            @click="handleUpdateStatus(record)"
          >启用</q-btn>
          <q-btn class="panda-btn-grey" v-else @click="handleUpdateStatus(record)">禁用</q-btn>
        </span>
        <span slot="action" slot-scope="text, record, index" class="flex justify-between ml10x mr10x">
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">编辑商户</div>
            </template>
            <q-icon @click.native="handle_edit(record, index)" class="panda-icon panda-icon-bian-ji panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看商户</div>
            </template>
            <q-icon @click.native="handle_look(record, index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">设置超级管理员</div>
            </template>
            <q-icon @click.native="handle_set_admin(record, index)" class="panda-icon panda-icon-shezhi-guanliyuan panda-icon-hover fs20 cursor-pointer"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top" v-if="record.agentLevel != '2'">
            <template slot="title">
              <div class="fs12">设置IP白名单</div>
            </template>
            <q-icon  style="margin-top: 1px;" @click.native="handleSetIp(record, index)" class="panda-icon panda-icon-panda-icon-ip panda-icon-hover fs18 cursor-pointer"></q-icon>
          </a-tooltip>
          <a-tooltip  placement="top" v-if="record.agentLevel == '1' && record.childAmount != record.childMaxAmount">
            <template slot="title">
              <div class="fs12">设置二级商户</div>
            </template>
            <q-icon  style="margin-top: 1px;" @click.native="handle_set_second_merchant(record, index)" class="panda-icon panda-icon-panda-icon-shezhi-erji panda-icon-hover fs20 cursor-pointer"></q-icon>
          </a-tooltip>
          <q-icon
            v-else
            class="panda-icon panda-icon-panda-icon-shezhi-erji panda-icon-hover fs20 no-show"
          >
            <q-tooltip
              anchor="top middle"
              content-class="bg-white text-black shadow-6"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <span>设置二级商户</span>
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
    </div>
    
    <!-- 查看商户弹窗 -->
    <q-dialog v-model="lookMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-look :detailObj="showDialogObj"></dialog-look>
    </q-dialog>
    <!-- 设置管理员弹窗 -->
    <q-dialog v-model="setMerchantShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set :detailObj="showDialogObj" @handle_close_dialog_set="handle_close_dialog_set"></dialog-set>
    </q-dialog>
    <!-- 设置IP弹窗 -->
    <q-dialog v-model="setIpShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-ip :detailObj="showDialogObj" @handle_close_dialog_ip="handle_close_dialog_ip"></dialog-ip>
    </q-dialog>
    <!-- 切换商户状态弹窗 -->
    <q-dialog v-model="toggleStatusShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-toggle @handle_confirm="handle_confirm"></dialog-toggle>
    </q-dialog>
    <!-- 新建商户弹窗 -->
    <q-dialog v-model="setShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-set-merchant :isUpdate="isUpdate" :detailObj="showDialogObj" @closeDialogSetMerchantShow="handle_close_dialog_set_merchant"></dialog-set-merchant>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
// loading样式
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}
// 无数据时样式
>>>.ant-empty-normal {
  margin: 310px 0;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}


.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
  display: inline-block;
  white-space: nowrap;
}

.text-over-120 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
  display: block;
}

.text-over-180 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  white-space: nowrap;
  display: block;
}

.text-over-150 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  white-space: nowrap;
}

.text-over-160 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 105px;
  white-space: nowrap;
  display: block;
}

.no-left >>> .q-field__append {
  border-left: none;
}

>>>.ant-table-thead > tr > th .ant-table-column-sorter {
  // right: 10%;
}

>>>.ant-select {
  font-size: 12px;
}

//  button-radio的文字颜色
>>>.ant-radio-button-wrapper{
  color $panda-bg-4
}

>>> .ant-radio-button-wrapper-checked{
  color $panda-bg-2
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  // padding: 3px 8px !important;
  background $panda-bg-3
}
>>>.ant-table-middle > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import { handleCopy, getStrLength } from "src/util/module/common.js";
import mixins from "src/mixins/index.js";
import { directlyMerchantConfig } from "src/pages/merchant/merchantc/config/directlyMerchant.js";  // 直营商户表格配置文件
import { secondMerchantConfig } from "src/pages/merchant/merchantc/config/secondMerchant.js"; // 二级商户表格配置文件
import { channelMerchantConfig } from "src/pages/merchant/merchantc/config/channelMerchant.js"; // 渠道商户表格配置文件
import dialogLook from "src/pages/merchant/merchantc/component/dialogLook.vue";
import dialogSet from "src/pages/merchant/merchantc/component/dialogSet.vue";
import dialogIp from "src/pages/merchant/merchantc/component/dialogIp.vue";
import dialogSetMerchant from "src/pages/merchant/merchantc/component/dialogSetMerchant.vue";
import dialogToggle from "src/pages/merchant/merchantc/component/dialogToggle.vue";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
// import { getAutoParams } from "src/util/module/common.js";

export default {
  mixins: [...mixins],
  components: {
    dialogLook,
    dialogSet,
    dialogIp,
    dialogSetMerchant,
    dialogToggle,
    tableCellEllipsisAnt
  },
  data() {
    return {
      tabledata: [],  // 表格数据
      columns: directlyMerchantConfig, // 表格配置项
      tabledata_loading: false, // 表格loading
      // 搜索条件
      searchForm: {
        merchantName: "", // 商户名称
        parentName: "" // 渠道商户名称
      },
      // 商户状态
      merchantStatusList: [
        // { value: "", label: "全部" },
        { value: 1, label: "启用" },
        { value: 0, label: "禁用" }
      ],
      btnName: "+ 新建直营商户", // 新建直营按钮
      lookMerchantShow: false, // 查看商户弹窗阀值
      setMerchantShow: false, // 设置管理员弹窗阀值
      setIpShow: false, // 设置ip白名单阀值
      setShow: false, // 新建商户弹窗阀值
      toggleStatusShow: false, // 切换商户状态弹窗阀值
      updateMerchantShow: false, // 修改商户弹窗阀值
      showDialogObj: {}, // 传值给弹窗的对象
      currentRecord: "", // 当前行表格数据对象
      isUpdate: false // 是否新建
    };
  },
  created() {
    this.tabledata_loading = true;
    this.init_session_params();
  },
  destroyed() {
    this.$q.sessionStorage.remove("params");
  },
  computed: {
    ...mapGetters(["get_data"])
  },
  watch: {
    "pagination.agentLevel"(val) {
      this.handle_function(val);
    }
  },
  methods: {
    getStrLength,
    /**
     * @description 解决新建商户和编辑商户参数回旋的问题！！！
     * @return {undefined} undefined
     */
    init_session_params() {
      // 解决由首页跳进来表格不动态配置问题
      this.handle_function(this.pagination.agentLevel);
      // 解决有我的信息跳转详情
      if (this.get_data) {
        this.searchForm.merchantName = this.get_data.merchantName;
        this.pagination.agentLevel = String(this.get_data.agentLevel);
        this.handle_look(this.get_data);
      }
      // 解决首页路由跳转
      // let editOrUpdate = this.$q.sessionStorage.getItem("params") || {};
      // if (Object.keys(editOrUpdate).length != 0) {
      //   alert(1)
      //   let { pageNum, pageSize, merchantName, agentLevel, parentName } = editOrUpdate;
      //   this.pagination.current = pageNum * 1;
      //   this.pagination.pageSize = pageSize * 1;
      //   this.pagination.agentLevel = agentLevel;
      //   if (merchantName || parentName || this.pagination.current === 1) {
      //     this.searchForm.merchantName = merchantName;
      //     this.searchForm.parentName = parentName;
      //     this.initTableData();
      //   }
      // } else {
        this.initTableData();
      // }
    },
    /**
     * @description 初始化表格数据
     * @return {undefined} undefined
     */
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
          msg && this.$message.error(msg, 5);
        }
      });
    },
    /**
     * @description 处理给后台的参数
     * @return {Object} 处理过后后台所需要的参数对象
     */
    compute_init_tabledata_params() {
      let { agentLevel, sort, orderBy, status } = this.pagination;
      let { merchantName, parentName } = this.searchForm;
      let params = {
        agentLevel,
        merchantName, //商户名称，可模糊搜索
        parentName, //渠道商名称，可模糊搜索
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
    /**
     * @description 根据商户等级不同显示不同按钮  直营-新建直营
     * @param  {String} val 商户等级
     * @return {undefined} undefined
     */
    handle_function(val) {
      if (val === "2") {
        this.columns = secondMerchantConfig;
        this.btnName = "+ 新建二级商户";
      } else if (val === "1") {
        this.columns = channelMerchantConfig;
        this.btnName = "+ 新建渠道商户";
        this.searchForm.parentName = "";
      } else {
        this.columns = directlyMerchantConfig;
        this.btnName = "+ 新建直营商户";
        this.searchForm.parentName = "";
      }
    },
    /**
     * @description 点击搜索按钮
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
    },
    /**
     * @description 新建商户-根据不同商户等级新建不同的商户
     * @return {undefined} undefined
     */
    handle_new_merchant() {
      this.isUpdate = false;
      let name = "";
      if (this.pagination.agentLevel === "1") {
        name = "merchantc_channel_edit";
      } else if (this.pagination.agentLevel === "2") {
        name = "merchantc_second_edit";
      } else {
        name = "merchantc_edit";
      }
      this.setShow = true;
      this.showDialogObj = {...this.pagination};
    },
    /**
     * @description 编辑商户按钮-根据不同商户等级编辑不同的商户
     * @return {undefined} undefined
     */
    handle_edit(record, index) {
      let name = "";
      if (this.pagination.agentLevel === "1") {
        name = "merchantc_channel_update";
      } else if (this.pagination.agentLevel === "2") {
        name = "merchantc_second_update";
      } else {
        name = "merchantc_update";
      }
      console.log(record, index, "qqq");
      this.showDialogObj = { ...record, ...this.pagination };
      this.setShow = true;
      this.isUpdate = true;
    },
    /**
     * @description 查看商户
     * @return {undefined} undefined
     */
    handle_look(record) {
      this.showDialogObj = { ...record };
      this.lookMerchantShow = true;
    },
    /**
     * @description 设置管理员
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     * @return {undefined} undefined
     */
    handle_set_admin(record, index) {
      console.log(record, index, "qqq");
      this.showDialogObj = {};
      this.showDialogObj = { ...record };
      this.setMerchantShow = true;
      this.setIpShow = false;
    },
    /**
     * @description 设置ip白名单
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     * @return {undefined} undefined
     */
    handleSetIp(record,index){
      this.showDialogObj = {};
      this.showDialogObj = {...record};
      this.setIpShow = true;
      this.setMerchantShow = false;
    },
    /**
     * @description 新建商户弹窗关闭
     * @param  {Boolean} val 是否新建成功
     * @return {undefined} undefined
     */
    handle_close_dialog_set_merchant(val){
      if(val){
        this.setShow = false;
        this.initTableData();
      }else{
        this.setShow = false;
      }
    },
    /**
     * @description 设置二级商户
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     * @return {undefined} undefined
     */
    handle_set_second_merchant(record, index) {
      this.isUpdate = false;
      record.channelToSecond = true;
      this.showDialogObj = { ...record, ...this.pagination };
      console.table(record.childConnectMode);
      let {
        transferMode,
        url,
        callbackUrl,
        balanceUrl,
        merchantName,
        id,
        whiteIp,
        startTime,
        endTime
      } = record;
      let channelToSecond = {
        id,
        merchantName,
        transferMode,
        balanceUrl,
        url,
        callbackUrl,
        whiteIp,
        startTime,
        endTime,
        pageMode: 1
      };
      this.$q.sessionStorage.set("channelToSecond", channelToSecond);
      this.setShow = true;
    },
    /**
     * @description 关闭管理员弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_set() {
      this.setMerchantShow = false;
      this.initTableData();
    },
    /**
     * @description 关闭设置ip弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_ip(){
      this.setIpShow = false;
      this.initTableData();
    },
    /**
     * @description 修改商户状态
     * @param  {Object} record 点击某行数据对象
     * @return {undefined} undefined
     */
    handleUpdateStatus(record) {
      console.log(record.status);
      this.currentRecord = record;
      this.toggleStatusShow = true;
    },
    /**
     * @description 商户状态确认按钮-提交数据-更新商户状态
     * @return {undefined} undefined
     */
    async handle_confirm() {
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
