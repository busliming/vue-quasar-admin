/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-07 14:32:58
 */
export const updateRecordConfig = [
  {
    title: "调整时间",
    width: 150,
    dataIndex: "createTimeStr",
    key: "createTimeStr",
    align: "left"
  },
  {
    title: "操作用户",
    width: 130,
    dataIndex: "createUser",
    key: "createUser",
    align: "left"
  },
  // {
  //   title: "调整前",
  //   width: 130,
  //   dataIndex: "adjustAmountBefore",
  //   key: "adjustAmountBefore",
  //   align: "left",
  //   scopedSlots: { customRender: "adjustAmountBefore" },
  // },
  {
    title: "调整金额",
    width: 180,
    dataIndex: "adjustAmount", 
    key: "adjustAmount",
    align: "left",
    scopedSlots: { customRender: "adjustAmount" },
  },
  {
    title: "调整原因",
    width: 200,
    dataIndex: "adjustCause",
    key: "adjustCause",
    align: "left",
    scopedSlots: { customRender: "adjustCause" },
  },
];

