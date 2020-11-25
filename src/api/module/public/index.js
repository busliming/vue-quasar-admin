/*
 * @Desc: 
 * @Date: 2020-02-01 21:19:42
 * @LastEditors: Nice
 * @LastEditTime: 2020-03-16 14:21:58
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;

//上传LOG图片
export const put_manage_merchant_img_upload = (
    params,
    url = "/manage/merchant/img/upload"
  ) => axios.post(`${prefix}${url}`, params);


//上传附件//
export const post_manage_merchant_file_upload = (
  params,
  url = "/manage/merchant/file/upload"
) => axios.post(`${prefix}${url}`, params);


//附件下载//
export const get_manage_merchant_file_download = (
  params,
  url = "/manage/merchant/file/download"
) => axios.get(`${prefix}${url}`, { params: { ...params } });



//赛种列表//
export const get_merchant_sport_list = (
    params,
    url = "/merchant/sport/list"
  ) => axios.get(`${prefix}${url}`, { params: { ...params } });



















