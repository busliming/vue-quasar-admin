/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 16:51
 */
export const tablecolumns_config = [
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
    key: "seriesValue",
    align: "center"
  },
  {
    title: "注单详情",
    dataIndex: "orderDetailList",
    key: "orderDetailList",
    width: 300,
    align: "center",
    scopedSlots:{customRender:"orderDetailList"},
  },
  {
    title: "下注金额",
    dataIndex: "productAmountTotal",
    key: "productAmountTotal",
    width: 170,
    sorter: true, 
    align: "right",
    scopedSlots:{customRender:"productAmountTotal"},
  },
  {
    title: "盈利",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 170,
    sorter: true, 
    scopedSlots:{customRender:"profitAmount"},
    align: "right"
  },
  {
    title: "注单编号",
    dataIndex: "orderNo",
    key: "orderNo",
    width: 170,
    align: "center",
    scopedSlots:{customRender:"orderNo"},
  },
  {
    title: "下注时间",
    dataIndex: "createTimeStr",
    key: "createTimeStr",
    width: 170,
    align: "center"
  },
  {
    title: "注单状态",
    dataIndex: "settleStatus",
    key: "settleStatus",
    width: 170,
    align: "center",
    scopedSlots:{customRender:"settleStatus"},
  }
];

