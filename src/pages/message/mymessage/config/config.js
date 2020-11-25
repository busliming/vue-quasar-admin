/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-18 10:08:11
 */
const POSITION = 'left';
export const tablecolumns_config = [
  {
    title: "序号",
    width: 100,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: "_index" }
  },
  {
    title: "消息标题",
    width: 450,
    dataIndex: "newTitle",
    key: "newTitle",
    align: POSITION,
    scopedSlots: { customRender: "newTitle" }
  },
  {
    title: "正文",
    dataIndex: "context",
    key: "context",
    width: 600,
    align: POSITION,
    scopedSlots: { customRender: "context" }
  },
  
  {
    title: "发送时间",
    dataIndex: "sendTime",
    key: "sendTime",
    // width: 150,
    align: POSITION,
    scopedSlots: { customRender: "sendTime" }
  },

  {
    title: "操作",
    key: "caozuo",
    width: 150,
    scopedSlots: { customRender: "action" },
    fixed: 'right',
    align: "center"
  }
];
