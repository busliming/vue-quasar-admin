/*
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 本月入驻商户信息-渠道商户表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/channelConfig.js
 */

const POSITION = 'left';
export const channelConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
  },
  {
    title: "商户名称",
    width: 120,
    dataIndex: "merchantName",
    key: "merchantName",
    align: POSITION,
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: "商户等级",
    dataIndex: "level",
    key: "1",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: 'level' },
  },
  {
    title: "Panda商务",
    dataIndex: "commerce",
    width: 98,
    key: "commerce",
    align: POSITION
  },
  {
    title: "入驻时间",
    dataIndex: "createTime",
    key: "3",
    width: 100,
    align: POSITION,
    scopedSlots: { customRender: 'createTime' },
  },
  {
    title: "下级数量",
    dataIndex: "childAmount",
    key: "childAmount",
    width: 110,
    align: POSITION,
    scopedSlots: { customRender: 'childAmount' },
  },
  {
    title: "证书状态",
    dataIndex: "status",
    key: "4",
    width: 120,
    align: POSITION,
    scopedSlots: { customRender: 'status' },
  },
  {
    title: "管理员设置",
    dataIndex: "merchantAdmin",
    key: "5",
    width: 120,
    align: "center",
    scopedSlots: { customRender: 'merchantAdmin' },
  },
];

