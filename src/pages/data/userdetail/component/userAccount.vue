<template>
  <div class="full-width full-height mt10x" style="background: #F0F2F5">
    <div id="top2" style="min-width: 1600px; overflow-x: hidden;" class="pl20x bg-panda-bg-6 row pb10x">
      <div class="append-handle-btn-input row line-height-30px">
        <div class="mr10x fs14">账变类型</div>
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
      <div class="append-handle-btn-input row line-height-32px ml20x">
        <div class="mr10x fs14">账变时间</div>
        <div>
          <!-- <a-range-picker 
            @change="on_change" 
            :disabledDate="disabledDate"
            :allowClear="false"
            v-if="pagination.dateType==='day'"
            :value="[moment(searchForm.startDate,'YYYY-MM-DD'), moment(searchForm.endDate, 'YYYY-MM-DD')]"
            :format="dateFormat"
          /> -->
          <a-range-picker
            style="width: 300px;"
            :value="[moment(searchForm.startTime,'YYYY-MM-DD HH:mm:ss'), moment(searchForm.endTime, 'YYYY-MM-DD HH:mm:ss')]"
            show-time 
            @change="on_change"
          />
        </div>
      </div>
      <div class="no-left append-handle-btn-input ml20x w-200 position-relative">
        <a-input
          v-model.trim="searchForm.orderNo"
          placeholder="请输入注单号"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-bet"></div>
      </div>
      <div class="append-handle-btn-input pl20x">
        <a-checkbox class="text-panda-text-7" style="margin-top: 3px;" v-model="searchForm.bizStatus">账变后负余额</a-checkbox>
      </div>
      <div class="append-handle-btn-input pl30x height-30px line-height-30px">
        <a-button type="primary" style="height: 30px; line-height: 30px;" @click="handle_search">搜索</a-button>
      </div>
    </div>

    <div class="bg-panda-bg-6 border-radius-4">
      <a-table
        :columns="columns"
        class=" pl10x pr10x "
        :dataSource="tabledata"
        :scroll="{ x: 1670, y: scrollHeight - 186 - 48 }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        rowKey="id"
      >
        <span
          slot="bizType"
          slot-scope="text,record"
        >{{transferTypeList[record.bizType*1-1].label}}</span>
        <span slot="changeAmount" slot-scope="text,record"><span><span v-if="record.changeType === 0">+</span><span v-if="record.changeType === 1">-</span>{{record.changeAmount | moneyFormat}}</span></span>
        <span slot="beforeTransfer" slot-scope="text,record">{{record.beforeTransfer | moneyFormat}}</span>
        <span slot="afterTransfer" slot-scope="text,record"><span :class="record.afterTransfer<0?'text-red': ''">{{record.afterTransfer | moneyFormat}}</span></span>
        <span slot="delFlag" slot-scope="text,record">{{record.delFlag == 0? '成功': '失败'}}</span>
        <span slot="orderNo" slot-scope="text,record">
          <span class=" cursor-pointer">
            <a-tooltip  v-if="record.orderNo && (getStrLength(record.orderNo)>14)" placement="topLeft">
              <template slot="title">
                <div
                  v-html="record.orderNo"
                  :style="`max-width: 116px; word-break:break-all;`"
                ></div>
              </template>
              <span class="text-over-130" @click="handleCopy(record.orderNo,'注单号')">{{record.orderNo}}</span>
            </a-tooltip>
            <span v-else class="text-over-130" @click="handleCopy(record.orderNo,'注单号')">{{record.orderNo}}</span>
          </span>
        </span>
        <span
          slot="createTime"
          slot-scope="text,record"
        >{{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api_data, api_export, api_account, api_merchant } from "src/api/index.js";
// import mixins from "src/mixins/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import { userAccountConfig } from "src/pages/merchant/bettinguser/config/userAccountConfig.js";
import { handleCopy,getStrLength } from "src/util/module/common.js";
import moment from "moment";
export default {
  mixins: [commonmixin, dataCenterMixin, constantmixin],
  data() {
    return {
      tabledata: [], //表格数据
      columns: userAccountConfig, //表格配置
      tabledata_loading: false, //表格loading
      searchForm: {
        // startTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 12:00:00`:`${moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')} 12:00:00`,
        // endTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')} 11:59:59`:`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 11:59:59`,
        startTime: "",  //开始日期
        endTime: "", // 结束日期
        bizTypeList: [], // 账变类型
        orderNo: '', //注单号
        bizStatus: false //账变后余额
      },
      transferTypeList: [
        // 账变类型
        {value: "1", label: '转入'},
        {value: "2", label: '转出'},
        {value: "3", label: '下注'},
        {value: "4", label: '结算'},
        {value: "5", label: '退款'},
        {value: "6", label: '冻结'},
        {value: "7", label: '礼金'},
        {value: "8", label: '拒单'},
        {value: "9", label: '结算回滚'},
        {value: "10", label: '下注取消'},
        {value: "11", label: '下注取消回滚'},
      ],
      value: ['1','2','3','4'] //默认账变类型值
    };
  },
  created() {
    this.tabledata_loading = true;
    this.init_assignment();
    this.initTableData();
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  methods: {
    moment,
    handleCopy,
    getStrLength,
    init_assignment(){
      let { timeZone, dateType } = this.$route.query;
      let {startDate, endDate, startDate1, endDate1} = this.$q.sessionStorage.getItem('record');
      let start_time = dateType === 'day'? startDate: moment(startDate1).format('YYYY-MM-DD');
      let end_time =dateType === 'day'? endDate: moment(endDate1).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
      if(timeZone === 'UTC8'){
        //自然日
        this.searchForm.startTime = moment(start_time).format('YYYY-MM-DD') + ' 00:00:00';
        this.searchForm.endTime = end_time + ' 23:59:59';
      }else{
        this.searchForm.startTime = moment(start_time).format('YYYY-MM-DD') + ' 12:00:00';
        this.searchForm.endTime = end_time + ' 11:59:59';
      }
      console.log(start_time,end_time,'start_time');
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    on_change(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      // this.initTableData();
    },
    handle_search() {
      this.initTableData();
    },
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_merchant.post_order_user_queryTransferList(params)
        .then(res => {
          this.tabledata_loading = false;
          let code = this.$lodash.get(res, "data.code");
          if (code == "0000000") {
            let currentPage =
              this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
            let arr = this.$lodash.get(res, "data.data.list") || [];
            this.tabledata = this.rebuild_tabledata_to_needed(arr);
            this.pagination.total =
              this.$lodash.get(res, "data.data.total") * 1 || 0;
          } else {
            this.$message.error(res.data.msg, 2);
          }
        });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item.id = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let { startTime, endTime, orderNo,bizStatus } = this.searchForm;
      let { current, pageSize, sort, orderBy } = this.pagination;
      let { userId } = this.$route.query;
      return {
        pageNum: current,
        pageSize,
        userId,
        sort,
        orderBy,
        startTime,
        endTime,
        orderNo,
        bizTypeList: this.value,
        bizStatus
      };
    },
  },
  filters: {
    filterTransferType(val) {
      let arr = ["转入", "转出", "投注", "结算", "撤单"];
      return arr[val - 1];
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 500px;
  min-height: 500px;
}

>>>.ant-empty-normal {
  margin: 200px 0;
}

.text-over-130 {
  display: inline-block;
  max-width: 120px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

>>>.icon-tog {
  font-size: 16px;
  margin: 5px 0;
}

>>>.ant-input-disabled{
  color: #666;
  background: #f5f5f5;
  cursor: not-allowed;
}
</style>
