/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-09 11:39:54
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;
let prefix1 = process.env.API_PREFIX_3;

//商户分布信息//
export const get_manage_merchant_queryAgentCount = (
  params,
  url = "/manage/merchant/queryAgentCount"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


//本月入驻商户信息
export const get_manage_merchant_month_list = (
  params,
  url = "/manage/merchant/month/list"
) => axios.get(`${prefix}${url}`, { params: { ...params } });
  
//今日投注信息// 716
export const post_report_home_queryBetToday = (
  params,
  url = "/order/home/queryBetToday"
) => axios.post(`${prefix1}${url}`, params);

//今日用户信息// 716
export const post_report_home_queryUserToday = (
  params,
  url = "/order/home/queryUserToday"
) => axios.post(`${prefix1}${url}`, params);

//今日投注金额 TOP10赛事// 716
export const post_report_home_matchTop10 = (
  params,
  url = "/order/home/matchTop10"
) => axios.post(`${prefix1}${url}`, params);


//本月商户投注金额排行// 716
export const post_report_home_merchantOrderTop10 = (
  params,
  url = "/order/home/merchantOrderTop10"
) => axios.post(`${prefix1}${url}`, params);

//14天投注金额趋势// 716
export const post_report_home_userOrderDay14 = (
  params,
  url = "/order/home/userOrderDay14"
) => axios.post(`${prefix1}${url}`, params);

//本月商户投注金额排行// 716
export const post_report_home_userDay14 = (
  params,
  url = "/order/home/userDay14"
) => axios.post(`${prefix1}${url}`, params);




















