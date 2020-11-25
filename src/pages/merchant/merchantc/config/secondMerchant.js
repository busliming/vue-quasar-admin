/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-22 21:25
 */
export const secondMerchantConfig = [
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
    width: 180,
    align: "left",
    scopedSlots: { customRender: "merchantName" },
    // fixed: 'left'
  },
  {
    title: "渠道商户名称",
    dataIndex: "parentName",
    key: "parentName",
    width: 160,
    align: "left",
    // sorter: true,
    // fixed: 'left'
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 160,
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
    width: 160,
    align: "left",
    scopedSlots: { customRender: "merchantAdmin" },
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
    width: 150,
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
