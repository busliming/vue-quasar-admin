<template>
  <div class="full-height full-width">
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="投注用户管理" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px ml10x" style="magin:0 10px 10px 0">
      <div id="top2" class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 p110x pt10x pb10x border-radius-4px">
        <div class="no-left append-handle-btn-input row ml10x position-relative w-200">
          <a-input
            v-model.trim="searchForm.userId"
            placeholder="请输入用户ID/用户名"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <div class="no-left append-handle-btn-input ml20x position-relative" style=" width: 200px !important;">
          <!-- v-model="searchForm.merchantCodes" -->
          <a-tree-select             
            show-search
            :tree-data="merchantList"
            style="width: 100%"
            @change="handle_change"
            :dropdown-style="{maxHeight: '400px', overflow: 'auto' }"
            placeholder="请输入或选择商户名称"
            allow-clear
            dropdownMatchSelectWidth
            tree-default-expand-all
            treeNodeFilterProp='title' 
          >
          </a-tree-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <q-btn
          class="panda-btn-primary-dense bg-primary ml40x"
          style="width:60px;height:30px; "
          label="搜索" 
          @click="handle_search"
        />
      </div>
      <a-table
        class="pl10x pr10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 1600, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="record => record._index"
      >
        <span slot="userId" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userId,'用户ID')">{{record.userId}}</span>
        </span>
        <span slot="userName" slot-scope="text, record" >
          <span class="cursor-pointer" @click="handleCopy(record.userName,'用户名')">{{record.userName}}</span>
        </span>
        <span slot="merchantName" slot-scope="text, record" >
          <!-- <span class="cursor-pointer" @click="handleCopy(record.merchantName,'用户名称')">{{record.merchantName}}</span> -->
          <table-cell-ellipsis-ant
            :span_html="('<div class=\'ellipsis\'>'+record.merchantName+'</div>')"
            :str_all="('<div>'+record.merchantName +'</div>')"
            :defaultplace="'topLeft'"
            :str='record.merchantName'
            :col_width="180"
          ></table-cell-ellipsis-ant>
        </span>
        <span slot="amount" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.amount | moneyFormat}}</span>
          </div>
        </span>
        <span slot="betAmount" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betAmount | moneyFormat}}</span>
          </div>
        </span>
        <span slot="profit" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.profit | moneyFormat}}</span>
          </div>
        </span>
        <span slot="betNum" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.betNum | amount}}</span>
          </div>
        </span>
        <span slot="currencyCode" slot-scope="text,record">
          <div class="text-over">
            <span>{{record.currencyCode | filterCurrency}}</span>
          </div>
        </span>
        <span slot="lastLoginStr" slot-scope="text,record">
          <span v-if="record.lastLoginStr == '刚刚'">{{record.lastLoginStr}}</span>
          <span v-else>{{record.lastLoginStr}}<span v-if="record.lastLoginStr">前</span></span>
        </span>
        <span slot="enabled" slot-scope="enabled">
          <span v-if="enabled == 1">在线</span>
          <span v-else>--</span>
        </span>
        <span slot="action" slot-scope="text, record, index" class="q-gutter-md">
          <a class="info" @click.prevent="handle_look(record,index)">投注详情</a>
          <!-- <a-tooltip  placement="top">
            <template slot="title">
              <div class="fs12">查看投注用户详情</div>
            </template>
            <a href="">投注详情</a>
            <q-icon  @click.native="handle_look(record,index)" class="panda-icon panda-icon-cha-kan panda-icon-hover fs18"></q-icon>
          </a-tooltip> -->
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_user } from "src/api/index.js";
import mixins from "src/mixins/index.js";
import { tablecolumns_config } from "src/pages/merchant/bettinguser/config/config.js";
import { handleCopy } from "src/util/module/common.js";
import constantmixin from 'src/mixins/common/constantmixin.js';
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";

export default {
  mixins: [...mixins,constantmixin],
  data() {
    return {
      tabledata: [], // 表格数据
      columns: tablecolumns_config, //表格配置
      tabledata_loading: false, // 表格loading
      searchForm: {
        userId: "", //商户ID
        userName: "", //用户名
        merchantCodeList: "" //商户名称
      }
    };
  },
  components: {
    tableCellEllipsisAnt
  },
  created() {
    this.tabledata_loading = true;
    this.init_merchant_list();
    this.initTableData();
  },
  methods: {
    handleCopy,
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_user.post_order_user_queryUserBetList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }
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
        console.log(obj,'obj')
        if( obj && obj.children && obj.children.length > 0){
          let arr = []
          obj.children.forEach(child => {
            arr.push(child.value)
          })
          arr.unshift(value);
          this.searchForm.merchantCodeList = arr;
        }else{
          this.searchForm.merchantCodeList = [value]
        }
      }else{
        this.searchForm.merchantCodeList = ''
      }
      console.log(this.searchForm.merchantCodeList,'传给后台的参数')
    },
    compute_init_tabledata_params() {
      let { userId,userName,merchantCodeList } = this.searchForm;
      let { current, pageSize, sort, orderBy } = this.pagination;
      if (/^\+?[0-9][0-9]*$/.test(userId) && userId.length > 16 ) {
        userId = userId;
        userName = "";
      } else {
        userName = userId;
        userId = ''
      }
      let params = {
        userId, // 用户ID
        userName,
        merchantCodeList, // 多个商户编码
        pageNum: current,
        pageSize,
        sort,
        orderBy
      };
      console.warn(params,'参数')
      return params;
    },
    // 点击搜索按钮
    handle_search() {
      this.initTableData();
    },
    // 查看
    handle_look(record, index) {
      this.$q.sessionStorage.set('record',record);
      this.$router.push({
        name: "betting_user_detail",
        query: {
          userId: record.userId
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 310px 0;
}

.no-left >>> .q-field__append {
  border-left: none;
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.ant-table-middle > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.ant-table-middle > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

>>>.info:hover{
  text-decoration underline;
}
</style>
