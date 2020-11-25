/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 10:32:05
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;


//跑马灯消息
export const post_manage_news_getLightNews = (params={}, url = "/manage/news/getLightNews") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//公告栏列表
export const post_manage_notice_list = (params, url = "/manage/notice/list") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//删除公告栏
export const post_manage_notice_delete = (params, url = "/manage/notice/delete") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//公告栏详情
export const post_manage_notice_detail = (params, url = "/manage/notice/detail") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//添加公告栏
export const post_manage_notice_add = (params, url = "/manage/notice/add") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//编辑公告栏
export const post_manage_notice_editPost = (params, url = "/manage/notice/editPost") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//我的消息列表
export const post_manage_news_list = (params, url = "/manage/news/list") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//我的消息列表删除
export const post_manage_news_delete = (params, url = "/manage/news/delete") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//我的消息列表查看
export const post_manage_news_findById = (params, url = "/manage/news/findById") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//公告类型名称
export const post_manage_notice_noticeType = (params, url = "/manage/notice/noticeType") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//取消公告 
export const post_manage_notice_cancelNotice = (params, url = "/manage/notice/cacelNotice") =>
  axios.post(`${prefix}${url}`, params, {type: 1});

//恢复公告 
export const post_manage_notice_backNotice = (params, url = "/manage/notice/backNotice") =>
axios.post(`${prefix}${url}`, params, {type: 1});