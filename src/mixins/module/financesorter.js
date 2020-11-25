/*
 * @Desc: 
 * @Date: 2020-02-08 21:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-17 10:51
 */
import { mapGetters } from 'vuex'
import { api_user } from "src/api/index.js";
import { getAutoParams } from "src/util/module/common.js";
import debounce from 'lodash/debounce'
export default {
  data() {
    // 处理当searchForm里面条件改变&&分页器不在第一页，多次触发接口的防抖
    this.initTableData = debounce(this.initTableData, 200);
    return {
      pagination: {
        pageSize: 20,
        current: 1,
        computingStandard: '',
        total: 0,
        start: '', //排序值
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      },
      merchantList: [],
      scrollHeight: 630
    }
  },
  computed: {
    ...mapGetters(['get_window_size_info'])
  },
  mounted() {
    this.get_max_height();
  },
  methods: {
    get_max_height(){
      let top = document.getElementById('top');
      let top1 = document.getElementById('top1');
      let top2 = document.getElementById('top2');
      if(top && top1 && top2){
        console.log(document.documentElement.clientHeight,top.clientHeight,top1.clientHeight,top2.clientHeight);
        this.scrollHeight = document.documentElement.clientHeight - top.clientHeight - top1.clientHeight - top2.clientHeight - 60 - 50;
        console.log(this.scrollHeight)
      }
    },
    sorterForTable(pagination, filter, sorter) {
      console.log(pagination, filter, sorter);
      console.log({...filter},'filter')
      this.pagination = {...this.pagination, ...pagination};
      this.pagination.sort = (sorter.order && sorter.order.replace('end', ''));
      this.pagination.orderBy = sorter.field;
      this.pagination.status = (filter.status && filter.status[0]);
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
      });
      return arr;
    },
    async init_merchant_list(){
      let res = await api_user.post_manage_merchant_queryMerchantListTree({})
      if ((res.data.code = "0000000")) {
        this.merchantList = this.recursive_data(res.data.data || []);
        console.log(this.merchantList,'merchantList')
      }
    },
    recursive_data(data){
      console.log(data,'需要处理的结构')
      data.length>0 && data.forEach(item => {
        item.title = item.merchantName
        item.key = item.id
        item.value = item.merchantCode
        item.children = item.trees
        item.children && this.recursive_data(item.children)
      })
      return data || [];
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    onShowSizeChange(current, pageSize){
      this.pagination.current = 1;
      this.pagination.pageSize = pageSize;
      console.log(current, pageSize)
    },
    onChange(current) {
      console.log(current)
      this.pagination.current = current
    },
  },
  watch: {
    searchForm: {
      handler(val){
        console.log(val);
        this.pagination.current = 1;
      },
      deep: true
    },
    ...getAutoParams({
      keys: ["current", "pageSize","sort","orderBy",],
      obj: "pagination",
      cb: function () {
        return function () {
          this.initTableData()
        }
      }()
    }),
    get_window_size_info(){
      this.get_max_height();
    }
  },
}