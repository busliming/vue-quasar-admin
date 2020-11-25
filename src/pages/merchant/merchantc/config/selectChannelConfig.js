/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-16 20:51:46
 */
export const selectChannelConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    // fixed: 'left'
  },
  {
    title: "商户编号",
    width: 110,
    dataIndex: "merchantCode",
    key: "merchantCode",
    align: "left",
    scopedSlots: { customRender: "merchantCode" },
    // fixed: 'left'
  },
  {
    title: "商户名称",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 150,
    align: "left",
    // fixed: 'left'
  },
  {
    title: "商户等级",
    dataIndex: "level",
    key: "level",
    width: 110,
    align: "left",
    sorter: true,
    scopedSlots: { customRender: "level" }
  },
  {
    title: "二级商户数量",
    dataIndex: "childAmount",
    key: "childAmount",
    width: 140,
    align: "left",
    scopedSlots: { customRender: "childAmount" }
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 150,
    align: "left"
  },
  {
    title: "商务联系人",
    dataIndex: "contact",
    key: "contact",
    width: 160,
    align: "left",
    scopedSlots: { customRender: "contact" }
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "phone",
    width: 160,
    align: "left",
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "超级管理员",
    dataIndex: "merchantAdmin",
    key: "merchantAdmin",
    width: 170,
    align: "left",
  },
  {
    title: "入驻时间",
    dataIndex: "createTime",
    key: "createTime",
    // width: 160,
    // sorter: (a, b) =>
    //   new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    sorter: true,
    align: "left"
  },
  {
    title: "操作",
    key: "operation",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: 'right'
  }
];
