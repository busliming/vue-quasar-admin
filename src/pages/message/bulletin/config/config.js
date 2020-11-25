/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 12:29:47
 */
const POSITION = 'left'
export const tablecolumns_config = [
  {
    title: "序号",
    width: 120,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "公告标题",
    width: 380,
    dataIndex: "bulletinTitle",
    key: "bulletinTitle",
    align: POSITION,
    scopedSlots: { customRender: "bulletinTitle" },
  },
  
  {
    title: "公告状态",
    dataIndex: "status",
    key: "status",
    width: 150,
    align: POSITION,
    scopedSlots: { customRender: "status" },
  },
  {
    title: "正文",
    dataIndex: "context",
    key: "context",
    width: 450,
    align: POSITION,
    scopedSlots: { customRender: "context" },
  },
  {
    title: "浏览次数",
    dataIndex: "visitNumber",
    key: "visitNumber",
    // width: 100,
    align: POSITION,
    scopedSlots: { customRender: "visitNumber" }
  },
  {
    title: "发送时间",
    dataIndex: "sendTime",
    key: "sendTime",
    width: 200,
    align: POSITION,
    scopedSlots: { customRender: "sendTime" },
  },
  
  {
    title: "操作",
    key: "caozuo",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: 'right'
  }
];
