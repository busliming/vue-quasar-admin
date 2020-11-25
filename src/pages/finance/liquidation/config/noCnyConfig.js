/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-08 11:02
 */
const POSITION = 'left'
export const noCnyConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: 'left'
  },
  {
    title: "账期",
    width: 110,
    dataIndex: "financeDate",
    key: "financeDate",
    align: POSITION,
  },
  
  {
    title: "商户名称",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 180,
    align: POSITION,
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "商户类型",
    dataIndex: "agentLevel",
    key: "agentLevel",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: "agentLevel" },
  },
  {
    title: "结算币种",
    dataIndex: "currencyStr",
    key: "currencyStr",
    width: 120,
    align: 'center',
  },
  {
    title: "账单金额",
    dataIndex: "billAmount",
    key: "billAmount",
    width: 135,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "billAmount" },
  },
  {
    title: "投注金额",
    dataIndex: "orderAmountTotal",
    key: "orderAmountTotal",
    width: 145,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "orderAmountTotal" },
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 145,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "profitAmount" },
  },
  {
    title: "盈利率",
    dataIndex: "profitRate",
    key: "profitRate",
    width: 100,
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: "profitRate" },
  },
  {
    title: "分成方式",
    dataIndex: "computingStandard",
    key: "computingStandard",
    width: 120,
    align: 'center',
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "标准费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 110,
    align: 'right',
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "执行费率",
    dataIndex: "executeRate",
    key: "executeRate",
    width: 110,
    align: 'right',
    scopedSlots: { customRender: "executeRate" },
  },
  {
    title: "调整额",
    dataIndex: "adjustAmount",
    key: "adjustAmount",
    width: 100,
    align: 'right',
    scopedSlots: { customRender: "adjustAmount" },
  },
  {
    title: "操作",
    key: "action",
    width: 80,
    fixed: 'right',
    scopedSlots: { customRender: "action" },
    align: "center"
  },
  {
    title: "二级商户",
    dataIndex: "merchantNum",
    key: "merchantNum",
    width: 80,
    fixed: 'right',
    scopedSlots: { customRender: "merchantNum" },
    align: "center"
  }
];
