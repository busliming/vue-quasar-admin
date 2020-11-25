<template>
  <div class="full-width full-height">
    <div class="pl10x mt10x mb10x">
      <q-breadcrumbs
        separator="/"
        active-color="whiddte"
        class="panda-text-2"
      >
        <q-breadcrumbs-el label="设置中心" />
        <q-breadcrumbs-el
          label="操作日志查询"
          class="panda-text-1"
        />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px row mall pt10x">
      <div class="no-left append-handle-btn-input ml20x w-200 position-relative">
        <a-input
          v-model.trim="searchForm.userName"
          placeholder="请输入操作人用户名"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="no-left append-handle-btn-input ml20x w-200 position-relative">
        <a-input
          v-model.trim="searchForm.dataId"
          placeholder="请输入主数据/ID"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="no-left append-handle-btn-input ml20x w-200 position-relative">
        <a-input
          v-model.trim="searchForm.fieldName"
          placeholder="请输入操作字段"
          @keydown.enter="handle_search"
          autocomplete="off"
          allowClear
        >
          <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
        </a-input>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="append-handle-btn-input row line-height-30px ml20x">
        <div class="w-250">
          <a-range-picker
            show-time
            showToday
            :allowClear="false"
            :disabled-date="disabled_date"         
            :value="[moment(searchForm.startTime,'YYYY-MM-DD HH:mm:ss'), moment(searchForm.endTime, 'YYYY-MM-DD HH:mm:ss')]"
            @change="on_change"
          />
        </div>
      </div>
      <div class="no-left append-handle-btn-input ml20x w-200 position-relative">
        <a-tree-select             
          v-model="searchForm.pageCode"
          show-search
          :tree-data="treeData"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="页面名称"
          allow-clear
          tree-default-expand-all
          treeNodeFilterProp='title' 
        >
        </a-tree-select>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <div class="append-handle-btn-input position-relative ml20x">
        <a-select
          autocomplete
          class="w-140"
          placeholder="操作类型"
          v-model="searchForm.operatType"
          @change="handle_change"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) in operatTypeList"
            :key="index"
          >{{ item.name }}</a-select-option>
        </a-select>
        <div class="position-absolute select-left-border-bet"></div>
      </div>
      <!-- <q-space></q-space> -->
      <div class="ml20x">
        <q-btn
          class="panda-btn-primary-dense bg-primary mr20x"
          style="width:70px; height:30px;"
          @click="handle_search"
        >
          <!-- <q-icon left class="panda-icon panda-icon-cha-kan panda-icon-white"></q-icon> -->
          <div>搜索</div>
        </q-btn>
      </div>
      <div class="mt10x full-width">
        <a-table  
          class="pl10x pr10x"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 1600, y: 673 }"
          :pagination="false"
          :loading="tabledata_loading"
          @change="sorterForTable"
          size="middle"
          rowKey="id"
        >
          <span slot="userName" slot-scope="text, record">
            <span class=" cursor-pointer" @click="handleCopy(record.userName,'操作用户名')">{{record.userName}}</span><br>
          </span>
          <span slot="merchantName" slot-scope="text, record">
            <span class=" cursor-pointer" @click="handleCopy(record.merchantName,'主数据')">
              <a-tooltip v-if="record.merchantName && (getStrLength(record.merchantName)>25)"  placement="top">
                <template slot="title">
                  <div
                    v-html="record.merchantName"
                    :style="`max-width: 200px; word-break:break-all;`"
                  ></div>
                </template>
                <span class="text-over1 cursor-pointer">{{record.merchantName}}</span>
              </a-tooltip>
              <span v-else class="text-over1 cursor-pointer">{{record.merchantName?record.merchantName: '-'}}</span>
            </span>
            <br>
            <span v-if="record.merchantName && record.dataId">& </span><span class=" cursor-pointer" @click="handleCopy(record.dataId,'ID')">{{record.dataId}}</span>
          </span>
          <span slot="operatField" slot-scope="text, record">
            <div class=" position-relative" v-if="record.operatField">
              <span v-for="(item, index) in JSON.parse(record.operatField).slice(0,3)" :key="index"><span class=" cursor-pointer" @click="handleCopy(item,item)">{{item}}</span><br></span>
            </div>
            <div v-else>-</div>
          </span>
          <span slot="beforeValues" slot-scope="text, record">
            <div v-if="record.beforeValues">
              <span v-for="(item, index) in record.beforeValues && JSON.parse(record.beforeValues).slice(0,3)" :key="index">
                <a-tooltip v-if="item && (getStrLength(item)>25)"  placement="top">
                  <template slot="title">
                    <div
                      v-text="item"
                      :style="`max-width: 220px; word-break:break-all;`"
                    ></div>
                  </template>
                  <span class="text-over cursor-pointer">{{item}}<br></span>
                </a-tooltip>
                <span v-else>{{item?item: '-'}}<br></span>
              </span>          
            </div>
            <div v-else>-</div>
          </span>
          <span slot="afterValues" slot-scope="text, record,index">
            <span class="position-relative" v-if="record.afterValues">
              <div>
                <span v-for="(item, ind) in record.afterValues && JSON.parse(record.afterValues).slice(0,3)" :key="ind">
                  <a-tooltip v-if="item && (getStrLength(item)>25)"  placement="top">
                    <template slot="title">
                      <div
                        v-text="item"
                        :style="`max-width: 220px; word-break:break-all;`"
                      ></div>
                    </template>
                    <span class="text-over cursor-pointer">{{item}}<br></span>
                  </a-tooltip>
                  <span v-else>{{item}}<br></span>
                </span>
              </div>
              <my-icon class="cursor-pointer position-absolute add-icon" @click="handle_look_more(index,true)" v-if="record.show" type="p-icon-add" theme="filled"/>
              <my-icon class="cursor-pointer position-absolute add-icon" @click="handle_look_more(index,false)" v-else-if="JSON.parse(record.afterValues).length>3 && !record.show" type="p-icon-dec" theme="filled"/>
              <span v-if="record.afterValues && JSON.parse(record.afterValues).length>3 && !record.show" class=" position-absolute add-more" style="left: -450px; z-index: 99" :style="tabledata.length>8 && index >= 5?'bottom: 20px': 'top: 80px'">
                <div class="flex  pt10x pb10x" style=" width: 660px; ">
                  <div class="w-220">
                    <div class=" flex-block" v-for="(item, ix) in JSON.parse(record.operatField)" :key="ix">
                      <div class="ml5x line-height-32px text-over">{{item?item: '-'}}</div>
                    </div>
                  </div>
                  <div class="w-220">
                    <div v-for="(item, ix) in JSON.parse(record.beforeValues)" :key="ix">
                      <div class="ml5x line-height-32px text-over">{{item?item: '-'}}</div>
                    </div>
                  </div>
                  <div class="w-220">
                    <div v-for="(item, ix) in JSON.parse(record.afterValues)" :key="ix">
                      <span class="ml5x line-height-32px text-over">{{item?item: '-'}}</span>
                    </div>
                  </div>
                </div>
              </span>
            </span>
            <span v-else>-</span>
          </span>
          <span slot="operatTime" slot-scope="text, record">
            <span>{{ format_date(record.operatTime, "-") }}</span>
          </span>
        </a-table>
        <a-pagination
        v-if="tabledata.length>0"
        :total="pagination.total" 
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
  </div>
</template>

<script>
import { api_account, api_base } from "src/api/index.js";
import formartmixin from "src/mixins/module/formartmixin.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import { tablecolumns_config } from "src/pages/set/logquery/config/config.js";
import { getStrLength,handleCopy } from "src/util/module/common.js";
import moment from "moment";

export default {
  mixins: [commonmixin, formartmixin, dataCenterMixin],
  data() {
    return {
      tabledata: [], // 表格数据
      columns: tablecolumns_config, // 表格配置
      tabledata_loading: false, // 表格loading
      searchForm: {
        // 搜索查询条件
        userName: "", // 用户名
        fieldName: '', // 操作字段
        pageCode: undefined, // 页面名称
        dataId: '', // 主数据/ID
        startTime: `${moment(new Date().setDate(new Date().getDate() - 2)).format('YYYY-MM-DD')} 00:00:00`, // 开始日期
        endTime: `${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 23:59:59`, // 结束日期
        operatType: undefined // 操作类型
      },
      operatTypeList: [{id: '', name: '请选择页面名称'}], // 默认操作类型
      treeData: [], // 页面名称树形数据
    };
  },
  created() {
    this.init_log_pages();
    this.initTableData();
  },
  methods: {
    moment,
    getStrLength,
    handleCopy,
    handle_look_more(index,val){
      if(val){
        this.$set(this.tabledata[index],'show',!val)
      }else{
        this.$set(this.tabledata[index],'show',!val)
      }
      console.log(this.tabledata[index],val)
    },
    /**
     * @description 搜索按钮
     * @return {undefined} undefined
     */
    handle_search() {
      this.initTableData();
    },
    /**
     * @description 操作类型切换
     * @return {undefined} undefined
     */
    handle_change() {
      this.handle_search();
    },
    /**
     * @description 日期只能选择近三个月内
     * @return {undefined} undefined
     */
    disabled_date(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(1, 'days'))
    },
    /**
     * @description 日期选择
     * @return {undefined} undefined
     */
    on_change(dates, dateStrings) {
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      // this.initTableData();
    },
    /**
     * @description 递归数组重新打入想要的值
     * @param  {Array} data 后台拉取的页面名称数组
     * @return {Array} 处理之后的页面名称数组
     */
    recursive_treedata(data){
      console.log(data,'需要处理的结构')
      data.length>0 && data.forEach(item => {
        item.title = item.name
        item.key = item.id
        item.value = item.code
        item.children = item.nodes
        delete item.name
        delete item.nodes
        // delete item.code
        item.children && this.recursive_treedata(item.children)
      })
      return data || [];
    },
    /**
     * @description 拉取页面名称
     * @return {undefined} undefined
     */
    async init_log_pages(){
      let res =  await api_base.get_manage_log_getLogPages();
      let { code } = res.data;
      if(code === '0000000'){
        this.treeData = this.recursive_treedata(res.data.data || []);
      }
    },
    /**
     * @description 根据页面名称拉取操作类型
     * @return {undefined} undefined
     */
    async init_log_types(params){
      let res =  await api_base.get_manage_log_getLogTypes();
      let { code } = res.data;
      if(code === '0000000'){
        this.operatTypeList = res.data.data[params] || [];
        this.operatTypeList.unshift({id: '', name: '操作类型'})
        this.searchForm.operatType = undefined;
      }
    },
    initTableData() { 
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      api_base.post_manage_log_findLog(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.records") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.log(this.tabledata,'表结构')
          this.pagination.total = this.$lodash.get(res, "data.data.total");
        }
      });
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
         item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        if( item.afterValues &&JSON.parse(item.afterValues).length>3){
          item.show = true
        }else{
          item.show = false;
        }
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let { userName, dataId, fieldName, startTime, endTime, pageCode, operatType} = this.searchForm;
      let { current, pageSize } = this.pagination;
      return {
        userName,
        dataId,
        fieldName,
        startTime: this.moment(startTime).valueOf(),
        endTime: this.moment(endTime).valueOf(),
        pageCode,
        operatType,
        pageNum: current,
        pageSize
      };
    }
  },
  watch: {
    'searchForm.pageCode'(value) {
      console.warn(value,'values')
      if(value){
        this.init_log_types(value)
      }else{
        this.operatTypeList = [{id: '', name: '请选择页面名称'}]
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 760px;
  min-height: 760px;
}

>>>.ant-empty-normal {
  margin: 314px;
}


.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  display inline-block;
  max-width: 200px;
  white-space: nowrap;
}

.text-over1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display inline-block;
  max-width: 180px;
  white-space: nowrap;
}
.add-icon{
  font-size:14px; 
  border:1px solid #ccc; 
  border-radius: 4px; 
  left: 180px; 
  top: 30px;
}
.add-more{
  background: #F8FAFF;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  border-radius: 4px;
  border-radius: 4px;
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
</style>
