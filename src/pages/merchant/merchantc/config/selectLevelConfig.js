/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 21:37:13
 */
const position = 'left';
export const selectLevelConfig = [
  {
    title: "等级",
    width: 45,
    dataIndex: "level",
    key: "level",
    align: "center",
    scopedSlots: { customRender: "level" },
  },
  {
    title: "计算标准",
    width: 75,
    dataIndex: "computingStandard",
    key: "computingStandard",
    align: position,
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "金额范围(CNY)",
    dataIndex: "rangeAmountBegin",
    key: "rangeAmountBegin",
    width: 140,
    align: position,
    sorter: (a, b) => a.rangeAmountBegin - b.rangeAmountBegin,
    scopedSlots: { customRender: "rangeAmountBegin" },
  },
  {
    title: "平台费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 95,
    align: position,
    sorter: (a, b) => a.terraceRate - b.terraceRate,
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "缴纳周期",
    dataIndex: "paymentCycle",
    key: "paymentCycle",
    width: 75,
    align: position,
    scopedSlots: { customRender: "paymentCycle" },
  },
  {
    title: "会员费(CNY)",
    dataIndex: "vipAmount",
    key: "vipAmount",
    width: 100,
    align: position,
    scopedSlots: { customRender: "vipAmount" },
  },
  {
    title: "技术服务费(CNY)",
    dataIndex: "techniqueAmount",
    key: "techniqueAmount",
    width: 125,
    align: position,
    scopedSlots: { customRender: "techniqueAmount" },
  },
  {
    title: "最后更新时间",
    dataIndex: "modifyTime",
    key: "modifyTime",
    width: 148,
    align: position,
    scopedSlots: { customRender: "modifyTime" },
  },
  {
    title: "最后更新人",
    dataIndex: "modifyUser",
    key: "modifyUser",
    // width: 130,
    align: position,

  },
  {
    title: "操作",
    key: "operation",
    width: 80,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

