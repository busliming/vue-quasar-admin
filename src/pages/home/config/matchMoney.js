/*
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 多币种弹窗表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/matchMoney.js
 */

export const matchMoney = [
  {
    title: "币种",
    width: 80,
    dataIndex: "currency",
    key: "currency",
    align: "center"
  },
  {
    title: "投注金额",
    width: 130,
    dataIndex: "betNumber",
    key: "betNumber",
    align: "center"
  },
  {
    title: "盈利金额",
    width: 150,
    dataIndex: "profit",
    key: "profit",
    align: "center"
  },
  {
    // title: "活跃投注用户数",
    dataIndex: "activeUser",
    key: "1",
    width: 150,
    align: "center",
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'activeUser' },
  }
];

