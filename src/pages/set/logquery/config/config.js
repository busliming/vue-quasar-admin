/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-25 13:54
 */
const position = "right";
export const tablecolumns_config = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "操作用户名",
    width: 120,
    dataIndex: "userName",
    key: "userName",
    fixed: "left",
    align: "left",
    scopedSlots: { customRender: "userName" }
  },
  {
    title: "页面名称",
    dataIndex: "pageName",
    key: "pageName",
    width: 300,
    align: "left",
    // scopedSlots: { customRender: "pageName" }
  },
  {
    title: "操作类型",
    dataIndex: "typeName",
    key: "typeName",
    // width: 150,
    align: 'left',
    // scopedSlots: { customRender: "operatType" }
  },
  {
    title: "主数据&ID",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 200,
    align: 'left',
    scopedSlots: { customRender: "merchantName" }
  },
  
  {
    title: "操作字段",
    dataIndex: "operatField",
    key: "operatField",
    width: 220,
    align: 'left',
    scopedSlots: { customRender: "operatField" }
  },
  {
    title: "操作前数据",
    dataIndex: "beforeValues",
    key: "beforeValues",
    scopedSlots: { customRender: "beforeValues" },
    width: 220,
    align: "left"
  },
  {
    title: "操作后数据",
    dataIndex: "afterValues",
    key: "afterValues",
    // fixed: "right",
    width: 220,
    scopedSlots: { customRender: "afterValues" },
    align: "left"
  },
  {
    title: "操作时间",
    dataIndex: "operatTime",
    key: "operatTime",
    width: 150,
    align: 'left',
    // sorter: (a, b) => a.operatTime - b.operatTime,
    scopedSlots: { customRender: "operatTime" }
  },
];
