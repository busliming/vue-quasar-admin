/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-13 16:58
 */
const POSITION = 'right'
export const transfer_config = [
  {
    title: "账变时间",
    width: 150,
    dataIndex: "createTime",
    key: "createTime",
    align: "center",
    scopedSlots: { customRender: 'createTime' },
  },
  {
    title: "账变来源",
    width: 160,
    dataIndex: "remark",
    key: "remark",
    align: 'center',
    scopedSlots: { customRender: 'remark' },
  },
  {
    title: "账变金额",
    width: 100,
    dataIndex: "changeAmount",
    key: "changeAmount",
    align: POSITION,
    scopedSlots: { customRender: 'changeAmount' },
  },
  {
    title: "账变前余额",
    dataIndex: "beforeTransfer",
    key: "beforeTransfer",
    width: 130,
    align: POSITION,
    scopedSlots:{customRender:"beforeTransfer"},
  },
  {
    title: "账变后余额",
    width: 130,
    dataIndex: "afterTransfer",
    key: "afterTransfer",
    align: POSITION,
    scopedSlots: { customRender: 'afterTransfer' },
  }
];

