/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-09-05 20:29:02
 */
export default [
  //  首页
  {
    path: "home",
    name: "home",
    text: "首页",
    icon: "panda-icon-shang-hu"
  },
  {
    // 商户中心
    path: "merchant_centre",
    name: "merchant_centre",
    text: "商户中心",
    // icon: 'panda-icon-shang-hu',
    icon: "p-icon-shanghu",
    children: [
      {
        path: "merchantc",
        name: "merchantc",
        text: "商户管理",
        icon: "panda-icon-zuzhi-jiagou"
      },
      {
        path: "key_management",
        name: "key_management",
        text: "证书管理",
        icon: "panda-icon-zuzhi-jiagou"
      },
      {
        path: "betting_user",
        name: "betting_user",
        text: "投注用户管理",
        icon: "panda-icon-zuzhi-jiagou"
      }
    ]
  },
  //  财务中心
  {
    path: "finance",
    name: "finance",
    text: "财务中心",
    // icon: 'panda-icon-caiwu-zhongxin',
    icon: "p-icon-caiwu",
    children: [
      {
        path: "liquidation",
        name: "liquidation",
        text: "清算管理",
        parent_name: "finance"
      },
      {
        path: "statements",
        name: "statements",
        text: "对账单",
        parent_name: "finance"
      }
    ]
  },
  //数据中心
  {
    path: "data_center",
    name: "data_center",
    text: "数据中心",
    icon: "p-icon-shuju",
    children: [
      
      {
        path: "bet_slip",
        name: "bet_slip",
        text: "注单查询",
        parent_name: "data_center"
      },
      {
        path: "record_query",
        name: "record_query",
        text: "交易记录查询",
        parent_name: "data_center"
      },
      {
        path: "merchant_note",
        name: "merchant_note",
        text: "商户注单统计",
        parent_name: "data_center"
      },
      {
        path: "users",
        name: "users",
        text: "用户投注统计",
        parent_name: "data_center"
      },
      {
        path: "match_bonus",
        name: "match_bonus",
        text: "赛事投注统计",
        parent_name: "data_center"
      }
    ]
  },

  //消息中心

  {
    path: "message_center",
    name: "message_center",
    text: "消息中心",
    icon: 'p-icon-gonggao',
    // icon: "p-icon-gong-gao",
    children: [
      {
        path: "bulletin",
        name: "bulletin",
        text: "公告栏",
        parent_name: "message_center"
      },
      {
        path: "mymessage",
        name: "mymessage",
        text: "我的消息",
        parent_name: "message_center"
      }
    ]
  },
  //设置中心
  {
    path: "setting",
    name: "setting",
    text: "设置中心",
    icon: "p-icon-shezhi",
    children: [
      {
        path: "merchantlevel",
        name: "merchantlevel",
        text: "商户等级设置",
        parent_name: "setting"
      },
      {
        path: "platformrate",
        name: "platformrate",
        text: "平台费率设置",
        parent_name: "setting"
      },
      {
        path: "logquery",
        name: "logquery",
        text: "操作日志查询",
        parent_name: "setting"
      }
    ]
  }
];
