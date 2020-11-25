<template>
  <div class="full-width full-height" style="background: #F0F2F5">
    <div class="pl10x bg-panda-bg-6 pt10x pb10x row" id="top2" style="min-width: 1750px; overflow-x: hidden">
      <div class="append-handle-btn-input row line-height-30px" style="margin-top:0px;">
        <!-- <div class="mr10x fs14">账变类型</div> -->
        <div style="width: 355px;">
          <a-select
            v-model="value"
            mode="multiple"
            show-search
            allowClear
            style="width: 100%"
            placeholder="请输入或选择账变类型"
            option-label-prop="label"
            :filterOption="filterOption"
            showArrow
            :maxTagCount="4"
            :maxTagTextLength="2"
          >
            <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
            <a-select-option
              :value="item.value"
              :label="item.label"
              v-for="(item,index) in transferTypeList"
              :key="'play'+index"
            >{{item.label}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="append-handle-btn-input row line-height-30px ml10x">
        <!-- <div class="mr10x fs14">账变时间</div> -->
        <div>
          <div class="w-250 mr10x">
            <a-range-picker
              show-time
              showToday
              :allowClear="false"
              :value="[moment(searchForm.startTime,'YYYY-MM-DD HH:mm:ss'), moment(searchForm.endTime, 'YYYY-MM-DD HH:mm:ss')]"
              @change="on_change"
            />
          </div>
        </div>
      </div>
      <div class="append-handle-btn-input w-200 position-relative">
        <a-input
          v-model.trim="searchForm.transferId"
          placeholder="请输入注单号"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
          <!-- 交易号/ -->
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="no-left append-handle-btn-input ml10x position-relative w-200">
        <a-input
          v-model.trim="searchForm.username"
          placeholder="请输入用户名/用户ID"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
           <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="no-left append-handle-btn-input position-relative ml10x w-200">
        <!-- v-model="searchForm.merchantCodes" -->
        <a-tree-select             
          show-search
          :tree-data="merchantList"
          style="width: 100%"
          @change="handle_change"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请输入或选择商户名称"
          allow-clear
          tree-default-expand-all
          dropdownMatchSelectWidth
          treeNodeFilterProp='title' 
        >
        </a-tree-select>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="append-handle-btn-input pl10x">
        <a-checkbox
          class="text-panda-text-7"
          style="margin-top: 3px;"
          v-model="searchForm.bizStatus"
        >二次结算</a-checkbox>
      </div>
      <div class="append-handle-btn-input height-30px line-height-30px ml10x">
        <a-button type="primary" style="height: 30px; line-height: 30px;" @click="handle_search">搜索</a-button>
      </div>
      <div>
        <q-btn
        class="panda-btn-primary-dense bg-primary ml20x"
        style="width:105px;height:30px; "
        @click="handle_export_excel"
        :loading='exportLoading'
        >
          <a-icon type="export" />
          <div class="ml10x">导出账变</div>
        </q-btn>
      </div>
    </div>

    <div class="bg-panda-bg-6 border-radius-4">
      <div></div>
      <a-table
        class="pl10x pr10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight - 31 }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="small"
        rowKey="_id"
      >
        <!-- 账变时间 -->
        <span slot="createTime" slot-scope="text,record">
          {{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}}
        </span>
        <!-- 交易号 -->
        <span slot="transferId" slot-scope="text,record">
          <span v-if="record.transferId" class="cursor-pointer" @click="handleCopy(record.transferId,'交易号')">{{record.transferId}}</span>
          <span v-else>-</span>
        </span>
        <!-- 用户名 -->
        <span slot="userName" slot-scope="text,record">
          <span class="cursor-pointer" @click="handleCopy(record.username,'用户名')">
            <a-tooltip v-if="getStrLength(record.username)> 20"  placement="top">
              <template slot="title">
                <div
                  v-html="record.username"
                  :style="`max-width: 180px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over-140">{{record.username}}</span>
            </a-tooltip>
            <span v-else class="text-over-140">{{record.username}}</span>
          </span>
        </span>
        <!-- ID -->
        <span slot="uid" slot-scope="text,record">
          <span><span class=" cursor-pointer" @click="handleCopy(record.uid,'ID')">{{record.uid}}</span></span>
        </span>
        <!-- 所属商户 -->
        <span slot="merchantName" slot-scope="text,record">
          <span class="cursor-pointer" @click="handleCopy(record.merchantName,'商户名称')">
            <a-tooltip v-if="getStrLength(record.merchantName)>11"  placement="top">
              <template slot="title">
                <div
                  v-html="record.merchantName"
                  :style="`max-width: 120px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over1">{{record.merchantName}}</span>
            </a-tooltip>
            <span v-else class="text-over1">{{record.merchantName}}</span>
          </span>
        </span>
        <!-- 账变类型 -->
        <span slot="bizType" slot-scope="text,record">
          {{transferTypeList[record.bizType*1-1].label}}
        </span>
        <!-- 账变金额 -->
        <span slot="amount" slot-scope="text,record">
          <span>
            <span v-if="record.changeType === 0">+</span>
            <span v-if="record.changeType === 1">-</span>
            {{record.changeAmount | moneyFormat}}
          </span>
        </span>
        <!-- 账变前金额 -->
        <span slot="beforeTransfer" slot-scope="text,record">
          {{record.beforeTransfer | moneyFormat}}
        </span>
        <!-- 账变后余额 -->
        <span slot="afterTransfer" slot-scope="text,record">
          <div
            class="text-right"
            :class="record.afterTransfer<0?'text-red': ''"
          >{{record.afterTransfer | moneyFormat}}</div>
        </span>
        <!-- 账变结果 -->
        <span slot="delFlag" slot-scope="text,record">
          <span :class="!record.delFlag?'panda-dot-success': 'panda-dot-red'" class="panda-dot mr10x"></span>
          <span>{{!record.delFlag? '成功': '失败'}}</span>
        </span>
        <!-- 注单号 -->
        <span slot="orderNo" slot-scope="text,record">
          <span class="cursor-pointer">
            <a-tooltip
              v-if="record.orderNo && (getStrLength(record.orderNo)>14)"
              placement="topLeft"
            >
              <template slot="title">
                <div v-html="record.orderNo" :style="`max-width: 116px; word-break:break-all;`"></div>
              </template>
              <span
                class="text-over-130"
                @click="handleCopy(record.orderNo,'注单号')"
              >{{record.orderNo}}</span>
            </a-tooltip>
            <span
              v-else
              class="text-over-130"
              @click="handleCopy(record.orderNo,'注单号')"
            >{{record.orderNo}}</span>
          </span>
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
    <!--导出数据超出9w条去文件服务器下载弹窗！-->
    <q-dialog v-model="downloadShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-download></dialog-download>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_merchant, api_export} from "src/api/index.js";
// import mixins from "src/mixins/index.js";
import recordmixin from 'src/pages/data/recordquery/mixin/index.js';
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import dialogDownload from "src/pages/data/betslip/component/dialogDownload.vue";
import { userAccountConfig } from "src/pages/data/recordquery/config/user_account_config.js";
import { handleCopy, getStrLength,download } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [recordmixin,commonmixin, dataCenterMixin, constantmixin],
  components: {
    dialogDownload
  },
  data() {
    return {
      tabledata: [],  // 表格数据
      columns: userAccountConfig, // 表格配置
      tabledata_loading: false, //表格loading
      searchForm: {
        //搜索查询条件
        startTime:`${moment(new Date().setDate(new Date().getDate() - 2)).format( "YYYY-MM-DD")} 00:00:00`, //开始日期
        endTime: `${moment(new Date().setDate(new Date().getDate())).format("YYYY-MM-DD")} 23:59:59`, // 结束日期
        bizTypeList: [], // 账变类型
        transferId: "", // 交易号/注单号
        username: '', // 用户名/ID
        bizStatus: false, // 二次结算
        merchantCodes: '' // 商户名称
      },
      value: ["1", "2", "3", "4"], // 默认账变类型
      downloadShow: false, //服务器下载弹窗阀值
    };
  },
  created() {
    this.tabledata_loading = true;
    this.init_merchant_list();
    this.initTableData();
  },
  computed: {
    ...mapGetters(["get_user_info"]),
  },
  methods: {
    moment,
    handleCopy,
    getStrLength,
    download,
    /**
     * @description 导出报表
     * @return {undefined} undefined
     */
    handle_export_excel() {
      if (this.pagination.total > 0 && this.pagination.total < (this.limitSize+1)) {
        let params = this.compute_init_tabledata_params(); 
        params = this.delete_empty_property_with_exclude(params);
        Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/account/accountHistoryExport" });
        // api_export.post_excel_export(params);
        this.exportLoading = true;
        api_export.post_exportTicketList(params, params.url).then(res => {
          this.exportLoading = false;
          console.log(res)
          if(res.status == 200){
            this.download(res);
          }
        })
      }else if(this.pagination.total > this.limitSize){
        this.downloadShow = true;
      }else{
        this.handle_error();
      }
    },
    on_change(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1],
      });
    },
    /**
     * @description 商户名称树形下拉框 选中某一个父级节点，需要将它子级节点value一起带给后台
     * @param  {value,label} 所选中的merchantCode值  所选中的merchantName值
     * @return {undefined} undefined
     */
    handle_change(value,label){
      console.log(value,label)
      if(value){
        let obj = this.merchantList.find(item => value == item.value)
        if(obj && obj.children && obj.children.length > 0){
          let arr = []
          obj.children.forEach(child => {
            arr.push(child.value)
          })
          arr.unshift(value);
          this.searchForm.merchantCodes = arr;
        }else{
          this.searchForm.merchantCodes = [value]
        }
      }else{
        this.searchForm.merchantCodes = ''
      }
      console.log(this.searchForm.merchantCodes,'传给后台的参数')
    },
    handle_search() {
      this.initTableData();
    },
    initTableData() {
      this.tabledata = [];
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.post_manage_account_findAccountHistory(params).then((res) => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.records") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.$forceUpdate();
          console.log(this.tabledata,'数据')
          this.pagination.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(res.data.msg, 2);
        }
      });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item._id = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let { startTime, endTime, transferId, bizStatus, username,merchantCodes } = this.searchForm;
      let { current, pageSize, sort, orderBy, amountTag} = this.pagination;
      return {
        pageNum: current,
        pageSize,
        username,
        sort,
        orderBy,
        merchantCodes,
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        transferId,
        bizTypeList: this.value,
        orderTimes: bizStatus ? "1" : "0",
        amountTag
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
.text-over-130 {
  display: inline-block;
  max-width: 120px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text-over-140{
  display inline-block;
  max-width 160px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

.text-over1{
  display inline-block;
  max-width 110px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

>>>.leftdetail div {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flipy {
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /* IE */
  filter: FlipV;
}

>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 600px;
  min-height: 600px;
}

>>>.ant-empty-normal {
  margin: 290px 0 !important;
}

// >>>.ant-table-thead > tr > th .ant-table-column-sorter {
// right: 15%;
// }
>>>.icon-tog {
  font-size: 16px;
  margin: 5px 0;
}

>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  padding: 3px 8px !important;
  background #F4F5F8
}
>>>.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td{
  padding: 3px 8px !important;
}
</style>
