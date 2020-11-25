/*
 * @Desc: 
 * @Date: 2020-02-25 16:16:58
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-19 21:38:21
 */
export default {
  data() {
    return {
      settleCurrencyList: [
        //结算币种
        { label: "所有币种", value: "" },
        { label: "人民币", value: "CNY" },
        { label: "美元", value: "USD" },
        { label: "欧元", value: "EUR" },
        { label: "新元", value: "SGD" }
      ],
      timeZoneList: [
        // { label: '所有账期', value: ''},
        { label: '自然日', value: 'UTC8'},
        { label: '账务日', value: 'EZ'},
      ],
      merchantTypeList: [
        //商户类型
        { label: "所有商户", value: "" },
        { label: "直营商户", value: 0 },
        { label: "渠道商户", value: 1 },
        // { label: "二级商户", value: 2 }
      ],
    };
  },
  filters: {
    filterComputingStandard(val) {
      let arr = ["投注金额", "盈利金额"];
      return arr[val - 1];
    },
    filterAgentLevel(val) {
      let arr = ["直营商户", "渠道商户", "二级商户"];
      return arr[val];
    }
  },
  methods: {
    
  }
};
