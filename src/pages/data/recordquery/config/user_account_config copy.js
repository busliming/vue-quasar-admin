/*
 * @Author: Nice
 * @Date: 2020-06-30 10:48:17
 * @Description: 
 * @FilePath: /pandaToB端商户后台/src/pages/data/recordquery/config/user_account_config copy.js
 */

export const userAccountConfig = [
  {
    title: "序号",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "账变时间",
    dataIndex: "createTime",
    key: "5",
    width: 150,
    align: "left",
    sorter: true, 
    scopedSlots:{customRender:"createTime"},
  },
  {
    title: "交易号",
    width: 140,
    dataIndex: "transferId",
    key: "transferId",
    align: "left",
    scopedSlots:{customRender:"transferId"},
  },
  {
    title: "用户名",
    width: 100,
    dataIndex: "userName",
    key: "userName",
    align: "left",
    scopedSlots:{customRender:"userName"},
  },
  {
    title: "用户ID",
    width: 160,
    dataIndex: "uid",
    key: "uid",
    align: "left",
    scopedSlots:{customRender:"uid"},
  },
  {
    title: "所属商户",
    width: 100,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots:{customRender:"merchantName"},
  },
  {
    title: "账变类型",
    width: 90,
    dataIndex: "bizType",
    key: "bizType",
    align: "left",
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
    dataIndex: "amount",
    key: "amount",
    width: 150,
    align: "right",
    scopedSlots:{customRender:"amount"},
  },
  {
    title: "账变前余额",
    dataIndex: "beforeTransfer",
    key: "beforeTransfer",
    width: 150,
    align: "right",
    scopedSlots:{customRender:"beforeTransfer"},
  },
  {
    title: "账变后余额",
    dataIndex: "afterTransfer",
    key: "afterTransfer",
    width: 150,
    scopedSlots:{customRender:"afterTransfer"},
    align: "right",
  },
  {
    title: "账变结果",
    dataIndex: "delFlag",
    key: "delFlag",
    width: 130,
    align: "center",
    scopedSlots:{customRender:"delFlag"},
  },
  
  {
    title: "注单号",
    dataIndex: "orderNo",
    key: "orderNo",
    width: 120,
    align: "center",
    scopedSlots:{customRender:"orderNo"},
  }
];
