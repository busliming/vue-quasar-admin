/*
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 今日投注信息-币种明显弹窗表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/userCurrency.js
 */

const POSITION = 'left'
export const userCurrency_config = [
  {
    title: "币种",
    width: 102,
    dataIndex: "currency",
    key: "currency",
    align: "center"
  },
  {
    title: "投注金额",
    width: 120,
    dataIndex: "betAmount",
    key: "betAmount",
    align: POSITION,
    scopedSlots: { customRender: 'betAmount' },
  },
  {
    title: "派彩金额",
    width: 120,
    dataIndex: "settleAmount",
    key: "settleAmount",
    align: POSITION,
    scopedSlots: { customRender: 'settleAmount' },
  },
  {
    title: "盈利金额",
    width: 120,
    dataIndex: "profit",
    key: "profit",
    align: POSITION,
    scopedSlots: { customRender: 'profit' },
  },
  {
    title: "投注笔数",
    width: 120,
    dataIndex: "betNum",
    key: "betNum",
    align: POSITION,
    scopedSlots: { customRender: 'betNum' },
  },
  // {
  //   title: "活跃投注用户数",
  //   dataIndex: "activeUser",
  //   key: "1",
  //   align: "center",
  //   slots: { title: 'customTitle' },
  //   scopedSlots: { customRender: 'activeUser' },
  // }
];

