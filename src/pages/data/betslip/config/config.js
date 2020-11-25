/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-09 15:36
 */
export const tablecolumns_config = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots:{customRender:"_index"}
  },
  {
    title: "用户名",
    width: 190,
    dataIndex: "userId",
    key: "userId",
    scopedSlots:{customRender:"userId"},
    align: "left"
  },
  {
    title: "赛事信息",
    dataIndex: "betNoInfo",
    key: "betNoInfo",
    width: 250,
    scopedSlots:{customRender:"betNoInfo"},
    align: "left"
  },
  {
    title: "注单详情",
    dataIndex: "betNoDetail",
    key: "betNoDetail",
    width: 300,
    scopedSlots:{customRender:"betNoDetail"},
    align: "left"
  },
  {
    title: "赔率",
    dataIndex: "oddsValue",
    key: "oddsValue",
    width: 130,
    scopedSlots:{customRender:"oddsValue"},
    align: "center"
  },
  {
    title: "注额(外汇)",
    dataIndex: "settleAmount",
    key: "settleAmount",
    width: 120,
    scopedSlots:{customRender:"settleAmount"},
    align: "left"
  },
  {
    title: "注额(本地)",
    dataIndex: "localBetAmount",
    key: "localBetAmount",
    width: 120,
    scopedSlots:{customRender:"localBetAmount"},
    align: "left"
  },
  {
    title: "输赢(外汇)",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 120,
    scopedSlots:{customRender:"profitAmount"},
    align: "left"
  },
  {
    title: "输赢(本地)",
    dataIndex: "localProfitAmount",
    key: "localProfitAmount",
    width: 120,
    scopedSlots:{customRender:"localProfitAmount"},
    align: "left"
  },
  {
    // title: "状态1",
    dataIndex: "outcome",
    key: "outcome",
    width: 150,
    filters: [
      { text: "走水", value: "2" },
      { text: "输", value: "3" },
      { text: "赢", value: "4" },
      { text: "赢半", value: "5" },
      { text: "输半", value: "6" },
    ],
    onFilter: (value, record) => record.outcome == value,
    filterMultiple: true,
    align: "center",
    slots: { title: 'outcomeTitle' },
    scopedSlots:{customRender:"outcome"},
  },
  {
    title: "设备信息",
    dataIndex: "deviceType",
    key: "deviceType",
    width: 130,
    scopedSlots:{customRender:"deviceType"},
    align: "center"
  },
  // {
  //   title: "注单操作",
  //   dataIndex: "remark",
  //   key: "remark",
  //   width: 140,
  //   scopedSlots:{customRender:"remark"},
  //   align: "center"
  // }
];

