/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 10:31:36
 */
import axios from "src/api/common/axioswarpper.js";
let prefix1 = process.env.API_PREFIX_3;

//财务-清算管理列表// 716
export const post_report_financeMonth_queryFinanceMonthList = (
  params,
  url = "/order/financeMonth/queryFinanceMonthList"
) => axios.post(`${prefix1}${url}`, params);

//财务-清算管理-电子账单// 716
export const post_report_financeMonth_queryFinanceMonthDetail = (
  params,
  url = "/order/financeMonth/queryFinanceMonthDetail"
) => axios.post(`${prefix1}${url}`, params, {type: 5});

//财务-清算管理-费率修改记录// 716
export const post_report_financeMonth_getFinanceOperateRecordList = (
  params,
  url = "/order/financeMonth/getFinanceOperateRecordList"
) => axios.post(`${prefix1}${url}`, params,{type: 1});

//财务-清算管理-电子账单-update// 716
export const post_report_financeMonth_updateFinanceMonthDetail = (
  params,
  url = "/order/financeMonth/updateFinanceMonthDetail"
) => axios.post(`${prefix1}${url}`, params);

//财务-日对账单// 716
export const post_report_financeMonth_queryFinanceDay = (
  params,
  url = "/order/financeMonth/queryFinanceDay"
) => axios.post(`${prefix1}${url}`, params);

// 财务-日对账单-总计 // 713
export const post_report_financeMonth_queryFinanceDayTotal = (
  params,
  url = "/order/financeMonth/queryFinanceDayTotal"
) => axios.post(`${prefix1}${url}`, params);

//财务-清算管理二级-总计 716
export const post_report_financeMonth_queryFinanceMonthCount = (
  params,
  url = "/order/financeMonth/queryFinanceMonthCount"
) => axios.post(`${prefix1}${url}`, params);
















