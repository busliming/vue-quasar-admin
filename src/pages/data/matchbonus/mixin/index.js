/*
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 
 * @FilePath: /pandaToB端商户后台/src/pages/data/matchbonus/mixin/index.js
 */
export default {
  data() {
    return {
      matchStatus:{
        // 赛事状态
        0:"未开赛",
        1:"进行中",
        2:"暂停",
        3:"结束",
        4:"关闭",
        5:"取消",
        6:"比赛放弃",
        7:"延迟",
        8:"未知",
        9:"延期",
        10:"比赛中断",
      },
      matchLevelList: [
        {value: 0, label: '未评级'},
        {value: 1, label: '一级联赛'},
        {value: 2, label: '二级联赛'},
        {value: 3, label: '三级联赛'},
        {value: 4, label: '四级联赛'},
        {value: 5, label: '五级联赛'},
        {value: 6, label: '六级联赛'},
        {value: 7, label: '七级联赛'},
        {value: 8, label: '八级联赛'},
        {value: 9, label: '九级联赛'},
        {value: 10, label: '十级联赛'},
        {value: 11, label: '十一级联赛'},
        {value: 12, label: '十二级联赛'},
        {value: 13, label: '十三级联赛'},
        {value: 14, label: '十四级联赛'},
        {value: 15, label: '十五级联赛'},
        {value: 16, label: '十六级联赛'},
        {value: 17, label: '十七级联赛'},
        {value: 18, label: '十八级联赛'},
        {value: 19, label: '十九级联赛'},
        {value: 20, label: '二十级联赛'},
      ]
    };
  },
  filters: {
    filterMatchLevel(val){
      let str = '';
      if (val == 0) {
        return (str = "未评级");
      } else if (val == 1) {
        return (str = "一级联赛");
      } else if (val == 2) {
        return (str = "二级联赛");
      } else if (val == 3) {
        return (str = "三级联赛");
      } else if (val == 4) {
        return (str = "四级联赛");
      } else if (val == 5) {
        return (str = "五级联赛");
      } else if (val == 6) {
        return (str = "六级联赛");
      } else if (val == 7) {
        return (str = "七级联赛");
      } else if (val == 8) {
        return (str = "八级联赛");
      } else if (val == 9) {
        return (str = "九级联赛");
      } else if (val == 10) {
        return (str = "十级联赛");
      } else if (val == 11) {
        return (str = "十一级联赛");
      } else if (val == 12) {
        return (str = "十二级联赛");
      } else if (val == 13) {
        return (str = "十三级联赛");
      } else if (val == 14) {
        return (str = "十四级联赛");
      } else if (val == 15) {
        return (str = "十五级联赛");
      } else if (val == 16) {
        return (str = "十六级联赛");
      } else if (val == 17) {
        return (str = "十七级联赛");
      } else if (val == 18) {
        return (str = "十八级联赛");
      } else if (val == 19) {
        return (str = "十九级联赛");
      } else if (val == 20) {
        return (str = "二十级联赛");
      }
    }
  }
};
