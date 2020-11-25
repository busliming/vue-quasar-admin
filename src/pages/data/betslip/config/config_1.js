/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-25 12:02:12
 */
export const tablecolumns_config1 = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    scopedSlots:{customRender:"_index"},
    align: "center"
  },
  {
    title: "用户名",
    width: 210,
    dataIndex: "userId",
    key: "userId",
    scopedSlots:{customRender:"userId"},
    align: "left"
  },
  {
    title: "注单信息",
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
    title: "注额(外汇)",
    dataIndex: "settleAmount",
    key: "settleAmount",
    width: 100,
    scopedSlots:{customRender:"settleAmount"},
    align: "left"
  },
  {
    title: "注额(本地)",
    dataIndex: "localBetAmount",
    key: "localBetAmount",
    width: 100,
    scopedSlots:{customRender:"localBetAmount"},
    align: "left"
  },
  {
    title: "输赢(外汇)",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 100,
    scopedSlots:{customRender:"profitAmount"},
    align: "left"
  },
  {
    title: "输赢(本地)",
    dataIndex: "localProfitAmount",
    key: "localProfitAmount",
    width: 100,
    scopedSlots:{customRender:"localProfitAmount"},
    align: "left"
  },
  {
    title: "状态",
    dataIndex: "outcome",
    key: "outcome",
    width: 140,
    scopedSlots:{customRender:"outcome"},
    align: "center"
  },
  {
    title: "设备信息",
    dataIndex: "deviceType",
    key: "deviceType",
    width: 140,
    scopedSlots:{customRender:"deviceType"},
    align: "center"
  },
  {
    title: "注单操作",
    dataIndex: "remark",
    key: "remark",
    width: 140,
    scopedSlots:{customRender:"remark"},
    align: "center"
  }
];

