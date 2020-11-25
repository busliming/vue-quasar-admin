/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors  : Nice
 * @LastEditTime : 2020-02-12 12:50:57
 */
export const selectLevelConfig = [
  {
    title: "等级",
    width: 50,
    dataIndex: "level",
    key: "level",
    align: "center",
    scopedSlots: { customRender: "level" },
  },
  {
    title: "计算标准",
    width: 80,
    dataIndex: "computingStandard",
    key: "computingStandard",
    align: "center",
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "金额范围(CNY)",
    dataIndex: "rangeAmountBegin",
    key: "rangeAmountBegin",
    width: 130,
    align: "center",
    scopedSlots: { customRender: "rangeAmountBegin" },
  },
  {
    title: "平台费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 80,
    align: "center",
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "缴纳周期",
    dataIndex: "paymentCycle",
    key: "paymentCycle",
    width: 80,
    align: "center",
    scopedSlots: { customRender: "paymentCycle" },
  },
  {
    title: "会员费(CNY)",
    dataIndex: "vipAmount",
    key: "vipAmount",
    width: 100,
    align: "center",
    scopedSlots: { customRender: "vipAmount" },
  },
  {
    title: "技术服务费(CNY)",
    dataIndex: "techniqueAmount",
    key: "techniqueAmount",
    width: 100,
    align: "center",
    scopedSlots: { customRender: "techniqueAmount" },
  },
  {
    title: "最后更新时间",
    dataIndex: "modifyTime",
    key: "modifyTime",
    width: 150,
    align: "center",
    scopedSlots: { customRender: "modifyTime" },
  },
  {
    title: "最后更新人",
    dataIndex: "modifyUser",
    key: "modifyUser",
    // width: 130,
    align: "center",

  },
  {
    title: "操作",
    key: "operation",
    width: 80,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

