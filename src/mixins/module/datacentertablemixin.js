/*
 * @Desc: 
 * @Date: 2020-02-08 21:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-01 20:55
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
        pageSize: this.$route.name === 'record_query'? 50: 20,
        current: 1,
        filter: this.$route.name === 'bet_slip'?"1":"3", //tab栏中投注-投注时间
        dateType: "day",  // 日周月年
        total: 0,
        start: '', //排序值
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      },
      allMatches: [
        { label: "全部赛种", value: "" },
        { label: "足球", value: 1 },
        { label: "篮球", value: 2 },
        { label: "棒球", value: 3 },
        { label: "冰球", value: 4 },
        { label: "网球", value: 5 },
        { label: "美式足球", value: 6 },
        { label: "斯诺克", value: 7 },
        { label: "乒乓球", value: 8 },
        { label: "排球", value: 9 },
        { label: "羽毛球", value: 10 },
        { label: "政治娱乐", value: 18 },
        { label: "英雄联盟", value: 100 },
        { label: "dota2", value: 101 },
        { label: "cs", value: 102 },
        { label: "王者荣耀", value: 103 },
        { label: "绝地求生", value: 104 },
      ],
      merchantTypeList: [
        //商户类型
        { label: "全部商户", value: '' },
        { label: "直营商户", value: 0 },
        { label: "渠道商户", value: 1 },
        { label: "二级商户", value: 2 },
      ],
      totalData:[{
        rowkey:'totalData',
        _index: '总计',
        merchantName: '',
        time: '',
        merchantLevel: '',
        agentLevel: '',
        currency: "",
        betAmount: '-',
        orderSum:'-',
        returnAmount:'-',
        profit:'-',
        returnRate:'-',
        betUserSum:'-',
        addUser:'',
        registerTotalUserSum:'',
        betUserRate:'',
      }],
      merchantList: [],
      scrollHeight: 630,
      totalLoading: false, // 统计数据加载阀值
      exportLoading: false,  // 导出按钮阀值
      limitSize: 76000, //限制导出条数
      eKey: '' // 是否是导出账变记录
    }
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
      this.pagination = {...this.pagination,...pagination};
      this.pagination.sort = (sorter.order && sorter.order.replace('end', ''));  // 表格排序
      this.pagination.orderBy = sorter.field; // 表格排序
      this.pagination.outComeList = (filter.outcome && filter.outcome);   // 注单查询-状态
      this.pagination.amountTag = filter.afterTransfer && (filter.afterTransfer[0]*1 == 0? "0": "1");  // 交易记录查询需要用到的参数
    },
    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        item._id =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
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
    handle_error(){
      this.$message.error('暂无数据！')
    }
  },
  created() {
    console.warn(this.$route,'路由')
  },
  mounted() {
    this.get_max_height();
  },
  computed: {
    ...mapGetters(['get_user_info','get_window_size_info'])
  },
  watch: {
    searchForm: {
      handler(val){
        console.log(val,this.pagination,'searchForm');
        this.pagination.current = 1;
        console.log(this.pagination,'searchForm1');
      },
      deep: true
    },
    ...getAutoParams({
      keys: ["current", "pageSize","sort","orderBy","filter","dateType","outComeList", 'amountTag'],
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
  filters: {
    filterAgentLevel(val) {
      let arr = ["直营商户", "渠道商户", "二级商户"];
      return arr[val];
    }
  }
}