/*
 * @Desc: 
 * @Date: 2020-02-08 21:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-15 15:24
 */
import { mapGetters } from 'vuex';
import { api_user } from "src/api/index.js";
import { getAutoParams } from "src/util/module/common.js";
import debounce from 'lodash/debounce'
export default {
  data() {
    // 处理当searchForm里面条件改变&&分页器不在第一页，多次触发接口的防抖  首页不需要执行
    this.$route.name !== 'login' && (this.initTableData = debounce(this.initTableData, 200));
    return {
      pagination: {
        pageSize: 20,
        current: 1,
        agentLevel: this.$route.params.agent? this.$route.params.agent: '0' ,
        total: 0,
        start: '', //排序值
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      },
      merchantList: [],
      scrollHeight: 630
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
        item._index =this.pagination.start===0?this.pagination.start+ index +1:this.pagination.start+index;  
      });
      return arr;
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
      keys: ["current", "pageSize","sort","orderBy","status"],
      obj: "pagination",
      cb: function () {
        // let timer = null
        return function () {
          this.initTableData()
          // clearTimeout(timer)
          // timer = setTimeout(() => this.initTableData(), 100)
        }
      }()
    }),
    "pagination.agentLevel"(val){
      this.pagination.current = 1
      this.initTableData();
    },
    get_window_size_info(){
      this.get_max_height();
    },
  },
}