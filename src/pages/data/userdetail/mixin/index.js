/*
 * @Author: Nice
 * @Date: 2020-02-25 16:10
 * @Description: 
 * @FilePath: /pandaToB端商户后台/src/pages/data/userdetail/mixin/index.js
 */
export default {
  data() {
    return {
      deviceTypeName:{1:"H5",2:"PC",3:"Android",4:"IOS"},
      matchTypeName:{1:"赛前",2:"滚球盘",3:"冠军盘"},
      settleStatusName:{
        1:"已结算",0:"未结算",2:'注单取消',3:'确认中',4:'投注失败' 
      },
    };
  }
};
