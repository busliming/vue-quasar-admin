/*
 * @Author: Nice
 * @Date: 2020-09-04 10:43
 * @Description: 
 * @FilePath: /pandaToB端商户后台/src/pages/data/recordquery/mixin/index.js
 */
import { api_user } from "src/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      merchantList: [],  // 商户列表
      transferTypeList: [
        // 交易类型/账变类型
        { value: "1", label: "转入" },
        { value: "2", label: "转出" },
        { value: "3", label: "下注" },
        { value: "4", label: "结算" },
        { value: "5", label: "退款" },
        { value: "6", label: "冻结" },
        { value: "7", label: "礼金" },
        { value: "8", label: "拒单" },
        { value: "9", label: "结算回滚" },
        { value: "10", label: "下注取消" },
        { value: "11", label: "下注取消回滚" },
      ],
    };
  },
  methods: {
    disabledDate(current) {
      return (
        current.isBefore(moment(Date.now()).add(-90, "days")) ||
        current.isAfter(moment(Date.now()).add(1, "days"))
      );
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
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
        // delete item.merchantName
        // delete item.trees
        // delete item.code
        item.children && this.recursive_data(item.children)
      })
      return data || [];
    },
  },
  filters: {
    filterTransferType(val) {
      let arr = ["转入", "转出", "投注", "结算", "撤单"];
      return arr[val - 1];
    }
  }
};
