/*
 * @Desc: 
 * @Date: 2020-05-07 17:36:00
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-05 19:02:02
 */
export default {
  data() {
    return {
      currencyList: [
        //商户币种
        { label: "全部币种", value: '' },
        { label: "人民币", value: 1 },
        { label: "美元", value: 2 },
        { label: "港币", value: 3 },
        { label: "越南盾", value: 4 },
        { label: "新加坡币", value: 5 },
        { label: "英镑", value: 6 },
        { label: "欧元", value: 7 },
        { label: "比特币", value: 8 },
      ],
      currencyBusList: [
        //商户币种
        { label: "人民币", value: 1 },
        { label: "美元", value: 2 },
        { label: "港币", value: 3 },
        { label: "越南盾", value: 4 },
        { label: "新加坡币", value: 5 },
        { label: "英镑", value: 6 },
        { label: "欧元", value: 7 },
        { label: "比特币", value: 8 },
      ],
    }
  },
  filters: {
    filterCurrency(val){
      let arr = ['人民币','美元','港币','越南盾','新加坡币','英镑','欧元','比特币'];
      return arr[val-1]
    },
  }
}