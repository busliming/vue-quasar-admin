/*
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 本月商户投注金额排行-表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/merchantBetNumber.js
 */

export const merchant_bet_config = [
  {
    title: "排名",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "商户名称",
    width: 120,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: "上月排名",
    width: 76,
    dataIndex: "lastBy",
    key: "lastBy",
    align: "center",
    scopedSlots: { customRender: 'lastBy' },
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 130,
    align: "right",
    scopedSlots: { customRender: 'betAmount' },
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    width: 130,
    key: "profit",
    align: "right",
    scopedSlots: { customRender: 'profit' }
  },
];

