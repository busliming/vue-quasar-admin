/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 21:28:29
 */
const position = 'left'
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
    title: "IP地址",
    width: 140,
    dataIndex: "ip",
    key: "ip",
    fixed: "left",
    align: position
  },
  {
    title: "地区",
    dataIndex: "ipAddress",
    key: "1",
    width: 150,
    align: position
  },
  {
    title: "注单数量",
    dataIndex: "betNumber",
    key: "2",
    align: position
  },
  {
    title: "登录次数",
    dataIndex: "loginNumber",
    key: "3",
    width: 100,
    align: position
  },
  {
    title: "最后登录时间",
    dataIndex: "endTime",
    key: "4",
    width: 150,
    align: "center"
  },
];

