/*
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 今日用户信息-币种明显弹窗表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/betCurrency.js
 */

export const betCurrency_config = [
  {
    title: "币种",
    width: 86,
    dataIndex: "currency",
    key: "currency",
    align: "center"
  },
  {
    title: "投注用户数",
    width: 150,
    dataIndex: "betUserAmount",
    key: "betUserAmount",
    align: "center"
  },
  {
    // title: "活跃投注用户数",
    dataIndex: "briskUser",
    key: "briskUser",
    align: "center",
    width: 160,
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'activeUser' },
  }
];

