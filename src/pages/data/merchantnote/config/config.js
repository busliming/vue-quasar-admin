/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-08 11:48
 */
const POSITION = 'left';
export const tablecolumns_config = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    // fixed: "left",
    align: "center"
  },
  {
    title: "日期",
    width: 95,
    dataIndex: "time",
    // fixed: "left",
    align: POSITION,
    scopedSlots:{customRender:"time"},
  },
  {
    title: "商户名称",
    width: 230,
    dataIndex: "merchantName",
    key: "0",
    // fixed: "left",
    align: POSITION,
    scopedSlots:{customRender:"merchantName"},
  },  
  {
    title: "商户等级",
    dataIndex: "merchantLevel",
    key: "1",
    width: 100,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"merchantLevel"},
  },
  {
    title: "商户类型",
    dataIndex: "agentLevel",
    key: "agentLevel",
    width: 110,
    align: 'center',
    scopedSlots:{customRender:"agentLevel"},
  },
  {
    title: "币种",
    dataIndex: "currency",
    key: "currency",
    width: 120,
    align: 'center',
    scopedSlots:{customRender:"currency"},
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "2",
    width: 140,
    sorter: true, 
    align: 'right',
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: "投注笔数",
    dataIndex: "orderSum",
    key: "3",
    width: 110,
    sorter: true, 
    align: 'right',
    scopedSlots:{customRender:"orderSum"},
  },
  // {
  //   title: "派彩金额",
  //   dataIndex: "returnAmount",
  //   key: "4",
  //   width: 130,
  //   sorter: true, 
  //   scopedSlots:{customRender:"returnAmount"},
  //   align: POSITION
  // },
  {
    title: "平台盈利金额",
    dataIndex: "profit",
    key: "5",
    width: 130,
    sorter: true, 
    align: 'right',
    scopedSlots:{customRender:"profit"},
  },
  {
    title: "盈利率",
    dataIndex: "returnRate",
    key: "6",
    width: 120,
    sorter: true, 
    align: 'right',
    scopedSlots:{customRender:"returnRate"},
  },
  {
    title: "投注用户数",
    dataIndex: "betUserSum",
    key: "7",
    width: 130,
    sorter: true, 
    align: 'right',
    scopedSlots:{customRender:"betUserSum"},
  },
  { 
    title: "新增用户数", 
    dataIndex: "addUser", 
    key: "8", 
    align: 'right', 
    width: 115, 
    sorter: true, 
  },
  { 
    title: "注册用户数", 
    dataIndex: "registerTotalUserSum", 
    key: "9", 
    align: 'right', 
    width: 115, 
    sorter: true, 
  },
  {
    title: "投注率",
    dataIndex: "betUserRate",
    key: "operation",
    width: 90,
    sorter: true, 
    scopedSlots:{customRender:"betUserRate"},
    align: 'right'
  }
];

