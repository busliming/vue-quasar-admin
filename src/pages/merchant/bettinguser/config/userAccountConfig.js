/*
 * @Author: Nice
 * @Date: 2020-06-30 10:48:17
 * @Description: 
 * @FilePath: \pandaToB端商户后台\src\pages\merchant\bettinguser\config\userAccountConfig.js
 */

export const userAccountConfig = [
  {
    title: "序号",
    width: 100,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "账变类型",
    width: 150,
    dataIndex: "bizType",
    key: "bizType",
    align: "center",
    scopedSlots:{customRender:"bizType"},
  },
  {
    title: "交易来源",
    width: 150,
    dataIndex: "remark",
    key: "remark",
    align: "center",
    scopedSlots:{customRender:"remark"},
  },
  {
    title: "账变金额",
    dataIndex: "changeAmount",
    key: "changeAmount",
    width: 150,
    align: "right",
    scopedSlots:{customRender:"changeAmount"},
  },
  {
    title: "账变前余额",
    dataIndex: "beforeTransfer",
    key: "beforeTransfer",
    width: 170,
    align: "right",
    scopedSlots:{customRender:"beforeTransfer"},
  },
  {
    title: "账变后余额",
    dataIndex: "afterTransfer",
    key: "afterTransfer",
    width: 170,
    scopedSlots:{customRender:"afterTransfer"},
    align: "right",
  },
  {
    title: "账变结果",
    dataIndex: "delFlag",
    key: "delFlag",
    width: 150,
    align: "right",
    scopedSlots:{customRender:"delFlag"},
  },
  {
    title: "账变时间",
    dataIndex: "createTime",
    key: "5",
    width: 200,
    align: "center",
    sorter: true, 
    scopedSlots:{customRender:"createTime"},
  },
  {
    title: "注单号",
    dataIndex: "orderNo",
    key: "orderNo",
    width: 130,
    align: "center",
    scopedSlots:{customRender:"orderNo"},
  }
];

