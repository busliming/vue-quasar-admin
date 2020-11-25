/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-07 16:03:23
 */
export default [
  //数据中心
  {
    path: "data_center",
    name: "data_center",
    text: "数据中心",
    icon: "p-icon-shuju",
    children: [
      // {
      //   path: "match_bonus",
      //   name: "match_bonus",
      //   text: "赛事投注统计",
      //   parent_name: "data_center"
      // },
      {
        path: "bet_slip",
        name: "bet_slip",
        text: "注单投注查询",
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
      }
    ]
  }
];
