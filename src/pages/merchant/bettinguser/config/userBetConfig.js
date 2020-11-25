/*
 * @Desc: 
 * @Date: 2020-06-24 16:02:47
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-24 16:03:01
 */ 
/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors  : Nice
 * @LastEditTime : 2020-02-01 15:21:17
 */
 export const userBetConfig = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "注单类型",
    width: 210,
    dataIndex: "seriesValue",
    key: "0",
    align: "center"
  },
  {
    title: "注单详情",
    dataIndex: "orderDetailList",
    key: "1",
    width: 300,
    align: "center",
    scopedSlots:{customRender:"orderDetailList"},
  },
  {
    title: "下注金额",
    dataIndex: "productAmountTotal",
    key: "2",
    width: 170,
    sorter: true, 
    align: "center",
    scopedSlots:{customRender:"productAmountTotal"},
  },
  {
    title: "盈利",
    dataIndex: "profitAmount",
    key: "3",
    width: 170,
    sorter: true, 
    scopedSlots:{customRender:"profitAmount"},
    align: "center"
  },
  {
    title: "注单编号",
    dataIndex: "orderNo",
    key: "4",
    width: 170,
    align: "center",
    scopedSlots:{customRender:"orderNo"},
  },
  {
    title: "下注时间",
    dataIndex: "createTimeStr",
    key: "5",
    width: 170,
    align: "center"
  },
  {
    title: "注单状态",
    dataIndex: "settleStatus",
    key: "6",
    width: 170,
    align: "center",
    scopedSlots:{customRender:"settleStatus"},
  }
];

