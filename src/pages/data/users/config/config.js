/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 16:31
 */
const POSITION = 'right';
export const tablecolumns_config = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "日期",
    width: 90,
    dataIndex: "time",
    key: "time",
    fixed: "left",
    align: POSITION,
    scopedSlots:{customRender:"time"},
  },
  {
    title: "用户ID",
    width: 210,
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    align: POSITION,
    scopedSlots:{customRender:"userId"},
  },
  {
    title: "用户名",
    dataIndex: "userName",
    key: "1",
    width: 210,
    align: POSITION,
    scopedSlots:{customRender:"userName"},
  },
  {
    title: "所属商户",
    dataIndex: "merchantName",
    key: "2",
    width: 170,
    align: POSITION,
    scopedSlots:{customRender:"merchantName"},
  },
  {
    title: "投注笔数",
    dataIndex: "betNum",
    key: "betNum",
    width: 150,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betNum"},
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "4",
    width: 150,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"betAmount"},
  },
  {
    title: "盈亏金额",
    dataIndex: "profit",
    key: "5",
    width: 150,
    sorter: true, 
    align: POSITION,
    scopedSlots:{customRender:"profit"},
  },
  {
    title: "盈亏比例",
    dataIndex: "profitRate",
    key: "6",
    width: 150,
    align: POSITION,
    sorter: true, 
    scopedSlots:{customRender:"profitRate"},
  },
  {
    title: "活跃天数",
    dataIndex: "activeDays",
    key: "7",
    // width: 170,
    // sorter: true, 
    align: POSITION,
  },
  {
    title: "操作",
    key: "8",
    width: 155,
    fixed:"right",
    scopedSlots:{customRender:"action"},
    align: "center"
  }
];

