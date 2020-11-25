/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-22 21:26
 */
export const directlyMerchantConfig = [
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
    width: 100,
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
    width: 180,
    align: "left",
    scopedSlots: { customRender: "merchantName" },
    // sorter: true
    // fixed: 'left'
  },
  {
    title: "商户等级",
    dataIndex: "level",
    key: "level",
    width: 100,
    align: "left",
    sorter: true,
    scopedSlots: { customRender: "level" }
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 180,
    align: "left",
    scopedSlots: { customRender: "email" }
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
    width: 130,
    align: "left",
    scopedSlots: { customRender: "merchantAdmin" }
  },
  {
    title: "Panda商务",
    dataIndex: "commerce",
    key: "commerce",
    width: 120,
    align: "left",
  },
  {
    title: "入驻时间",
    dataIndex: "createTime",
    key: "createTime",
    // width: 200,
    // sorter: (a, b) =>
    //   new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    sorter: true,
    align: "left"
  },
  {
    title: "商户状态",
    dataIndex: "status",
    key: "status",
    align: "left",
    width: 130,
    scopedSlots: { customRender: "enabled" },
    filters: [
      { text: "启用", value: "1" },
      { text: "禁用", value: "0" }
    ],
    onFilter: (value, record) => record.status == value,
    filterMultiple: false
  },
  {
    title: "操作",
    key: "operation",
    width: 160,
    scopedSlots: { customRender: "action" },
    align: "center",
    fixed: 'right'
  }
];
