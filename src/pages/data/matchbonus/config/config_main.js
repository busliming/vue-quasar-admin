/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 12:22:27
 */
export const tablecolumns_config = [
  {
    title: "",
    width: 40,
    dataIndex: "expandedbtn",
    key: "expandedbtn",
    align: "center",
    scopedSlots:{customRender:"expandedbtn"},
  },
  {
    title: "序号",
    width: 40,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots:{customRender:"_index"},
  },
  {
    title: "玩法",
    width: 100,
    dataIndex: "playName",
    key: "0",
    scopedSlots:{customRender:"playName"},
    align: "center",
  },
  {
    title: "盘口",
    dataIndex: "marketValue",
    key: "1",
    width: 80,
    scopedSlots:{customRender:"marketValue"},
    align: "center",
  },
  {
    title: "投注笔数",
    dataIndex: "orderAmount",
    key: "2",
    width: 80,
    sorter: true, 
    align: "right",
    scopedSlots:{customRender:"orderAmount"},
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "3",
    width: 80,
    sorter: true, 
    align: "right",
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: "未结算笔数",
    dataIndex: "unSettleOrder",
    key: "unSettleOrder",
    width: 90,
    align: "right",
    scopedSlots:{customRender:"unSettleOrder"},
  },
  {
    title: "未结算金额",
    dataIndex: "unSettleAmount",
    key: "unSettleAmount",
    width: 90,
    // sorter: true, 
    align: "right",
    scopedSlots:{customRender:"unSettleAmount"},
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    key: "4",
    width: 80,
    sorter: true, 
    scopedSlots:{customRender:"profit"},
    align: "right"
  },
  {
    title: "盈利率",
    dataIndex: "profitRate",
    key: "5",
    width: 80,
    sorter: true, 
    align: "right",
    scopedSlots:{customRender:"profitRate"},
  },
];

