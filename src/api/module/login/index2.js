/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-21 13:32:11
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_1;
let url_prefix = process.env.API_PREFIX_URL_PREFIX + "/login";

// 登录
export const postLogin = (params, url = "/login") =>
  axios.post(`${prefix}${url_prefix}${url}`, params);

// 修改密码
export const postChangePwd = (params, url = "/updatePassword") =>
  axios.post(`${prefix}${url_prefix}${url}`, params);

// 修改密码
export const postSetPwd = (params, url = "/setPassword") =>
  axios.post(`${prefix}${url_prefix}${url}`, params);

// 账号码有效校验
export const postValidCode = (params, url = "/validCode") =>
  axios.post(`${prefix}${url_prefix}${url}`, params);

// 退出
export const getLogout = (params, url = "/logout") =>
  axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 子后台进行切换
export const getSetApp = (params, url = "/setApp") =>
  axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });
