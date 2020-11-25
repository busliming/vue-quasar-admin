export const tablecolumns_config = [
  {
    title: "序号",
    width: 70,
    dataIndex: "_index",
    key: "_index",
    align: "left"
  },
  {
    title: "账务日期",
    width: 150,
    dataIndex: "accountDate",
    key: "accountDate",
    align: "left",
    scopedSlots: { customRender: "accountDate" }
  },
  {
    title: "商户名称",
    width: 150,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots: { customRender: "merchantName" }
  },
  {
    title: "商户类型",
    dataIndex: "merchantType",
    key: "merchantType",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "merchantType" }
  },
  {
    title: "结算币种",
    dataIndex: "settleCurrency",
    key: "settleCurrency",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "settleCurrency" }
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "betAmount" }
  },
  {
    title: "派彩金额",
    dataIndex: "payoutAmount",
    key: "payoutAmount",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "payoutAmount" }
  },
  {
    title: "投注笔数",
    dataIndex: "betNumber",
    key: "betNumber",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "betNumber" }
  },
  {
    title: "有效注单数",
    dataIndex: "validBets",
    key: "validBets",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "validBets" }
  },
  {
    title: "退回注单数",
    dataIndex: "returnedBets",
    key: "returnedBets",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "returnedBets" }
  },
  {
    title: "账变记录数",
    dataIndex: "accountRecords",
    key: "accountRecords",
    width: 150,
    align: "left",
    scopedSlots: { customRender: "accountRecords" }
  },
  {
    title: "操作",
    key: "caozuo",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
