/*
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 注单查询的复用的mixin
 * @FilePath: /1028-ToB端商户后台/src/pages/data/betslip/mixin/index.js
 */

export default {
  data() {
    return {
      filterType: [
        { label: "投注时间", value: '1' },
        { label: "开赛时间", value: '2' },
        { label: "结算时间", value: '3' },
      ],
      settleTypeName: [
        { label: "投注方式", value: '' },
        { label: "单关投注", value: 1 },
        { label: "串关投注", value: 2 },
      ],
      matchTypeList: [
        { label: "注单类型", value: "" },
        { label: "赛前", value: 1 },
        { label: "滚球盘", value: 2 },
        { label: "冠军盘", value: 3 }
      ],
      loseOrWinStatus: [
        { label: "输赢状态", value: "" },
        { label: "走水", value: "2" },
        { label: "输", value: "3" },
        { label: "赢", value: "4" },
        { label: "赢半", value: "5" },
        { label: "输半", value: "6" },
      ],
      settleStatusName: [
        // { label: "注单状态", value: "" },
        { value: 0, label: '未结算' },
        { value: 1, label: '已结算' },
        { value: 2, label: '注单取消' },
        { value: 3, label: '确认中' },
        { value: 4, label: '投注失败' },
      ],
      // 设备信息
      deviceTypeName: { 1: "H5", 2: "PC", 3: "Android", 4: "IOS" },
      // 注单类型
      matchTypeName: { 1: "赛前", 2: "滚球盘", 3: "冠军盘" },
      // 结算状态
      settleStatusNameObj: {
        0: "未结算", 1: "已结算", 2: '注单取消', 3: '确认中', 4: '投注失败'
      },
      filterstatues: {
        2: "走水",
        3: "输",
        4: "赢",
        5: "赢半",
        6: "输半",
        // 7: "赛事取消",
        // 8: "赛事延期",
      }
    };
  },
  filters: {
    filterUserLevel(val) {
      let arr = ['正常用户', 'UFO-蛇', 'UFO-$', 'UFO-资讯客', 'UFO', '蛇-1级', '蛇-2级', '蛇-3级', '水军', '资讯客', '好脚', '赢家', '专家', '投资家'];
      return arr[val - 1];
    },
    filterStatues(val) {
      // 2是走水，3-输，4-赢，5-半赢，6-半输，7赛事取消，8赛事延期
      if (!val) return "-";
      let str = "";
      console.log(str);
      if (val == 0) {
        return (str = "--");
      } else if (val == 2) {
        return (str = "走水");
      } else if (val == 3) {
        return (str = "输");
      } else if (val == 4) {
        return (str = "赢");
      } else if (val == 5) {
        return (str = "赢半");
      } else if (val == 6) {
        return (str = "输半");
      } else if (val == 7) {
        return (str = "赛事取消");
      } else if (val == 8) {
        return (str = "赛事延期");
      }
    },
    filterCancelType(val) {
      // 0未取消，1比赛取消，2比赛延期， 3比赛中断，4比赛重赛，5比赛腰斩，6比赛放弃，7盘口错误，8赔率错误，9队伍错误，10联赛错误，11比分错误，12电视裁判， 13主客场错误，14赛制错误，15赛程错误，16时间错误，17赛事提前，18自定义原因，19数据源取消，20比赛延迟，40PA手动拒单，41PA自动拒单，42业务拒单，43MTS拒单 
      // if (!val) return "-";
      let str = "";
      console.log(str);
      if (val == 0) {
        return (str = "注单取消");
      } else if (val == 1) {
        return (str = "比赛取消");
      } else if (val == 2) {
        return (str = "比赛延期");
      } else if (val == 3) {
        return (str = "比赛中断");
      } else if (val == 4) {
        return (str = "比赛重赛");
      } else if (val == 5) {
        return (str = "比赛腰斩");
      } else if (val == 6) {
        return (str = "比赛放弃");
      } else if (val == 7) {
        return (str = "盘口错误");
      } else if (val == 8) {
        return (str = "赔率错误");
      } else if (val == 9) {
        return (str = "队伍错误");
      } else if (val == 10) {
        return (str = "联赛错误");
      } else if (val == 11) {
        return (str = "比分错误");
      } else if (val == 12) {
        return (str = "电视裁判");
      } else if (val == 13) {
        return (str = "主客场错误");
      } else if (val == 14) {
        return (str = "赛制错误");
      } else if (val == 15) {
        return (str = "赛程错误");
      } else if (val == 16) {
        return (str = "事件错误");
      } else if (val == 17) {
        return (str = "赛事提前");
      } else if (val == 18) {
        return (str = "自定义原因");
      } else if (val == 19) {
        return (str = "数据源取消");
      } else if (val == 20) {
        return (str = "比赛延迟");
      } else if (val == 40) {
        return (str = "PA手动拒单");
      } else if (val == 41) {
        return (str = "PA自动拒单");
      } else if (val == 42) {
        return (str = "业务拒单");
      } else if (val == 43) {
        return (str = "MTS拒单");
      }
    },
  }
};
