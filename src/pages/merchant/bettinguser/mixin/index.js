/*
 * @Desc: 
 * @Date: 2020-05-13 16:33:09
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-24 21:15:44
 */ 
export default {
  data() {
    return {
      deviceTypeName:{1:"H5",2:"PC",3:"Android",4:"IOS"},
      matchTypeName:{1:"赛前",2:"滚球盘",3:"冠军盘"},
      settleStatusName:{
        1:"已结算",0:"未结算",2:'注单取消',3:'确认中',4:'投注失败' 
      },
      betResultName:{0:"无结果",  2:"走水",  3:"输", 4:"赢", 5:"赢一半", 6:"输一半"}
    };
  },
  methods: {
    compute_constant_value(key, value) {
      if (!key) {
        return "";
      }
      if (!Array.isArray(this[key])) {
        return "";
      }

      let rv = "";
      let len = this[key].length;
      for (let i = 0; i < len; i++) {
        if (this[key][i].value == value) {
          rv = this[key][i].label;
          break;
        }
      }
      return rv;
    }
  }
};
