/*
 * @Author: Nice
 * @Date: 2020-02-25 16:16
 * @Description: 今日投注金额TOP10赛事-表格配置
 * @FilePath: /1028-ToB端商户后台/src/pages/home/config/betTopTen.js
 */

export const bet_top_ten_config = [
  {
    title: "排名",
    width: 50,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    scopedSlots: { customRender: '_index' },
  },
  {
    title: "赛事对阵",
    width: 180,
    dataIndex: "matchInfo",
    key: "matchInfo",
    align: "left",
    scopedSlots: { customRender: 'matchInfo' },
  },
  {
    title: "赛事状态",
    dataIndex: "matchStatus",
    key: "1",
    width: 80,
    align: "left",
    scopedSlots: { customRender: 'matchStatus' },
  },
  {
    title: "开赛时间",
    dataIndex: "beginTime",
    key: "beginTime",
    align: "left",
    width: 100,
    scopedSlots: { customRender: 'beginTime' },
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 100,
    align: "right",
    scopedSlots: { customRender: 'betAmount' },
  },
  {
    title: "盈利金额",
    dataIndex: "profit",
    key: "profit",
    width: 100,
    align: "right",
    scopedSlots: { customRender: 'profit' },
  },
  {
    title: "投注用户数",
    dataIndex: "userAmount",
    key: "userAmount",
    width: 100,
    align: "center",
    scopedSlots: { customRender: 'userAmount' },
  },
];

