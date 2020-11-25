/*
 * @Desc:
 * @Date: 2020-02-08 20:48:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-09 11:31
 */
import axios from "src/api/common/axioswarpper.js";
axios.prototype.HTTP_ROOT_DOMAIN

let prefix1 =
 process.env.NODE_ENV != "development"? axios.defaults.baseURL+  '/'+ process.env.API_PREFIX_4 : process.env.CURRENT_REQUEST_DOMAIN+'/'+ process.env.API_PREFIX_4;
let prefix3 =
 process.env.NODE_ENV != "development"? axios.defaults.baseURL+  '/'+ process.env.API_PREFIX_3 : process.env.CURRENT_REQUEST_DOMAIN+'/'+ process.env.API_PREFIX_3;





export const post_excel_export = (params, which) => {
  console.log(
    "=====================================ALAIR============================================"
  );
  console.log(params,which);
  console.log(process.env);
  let prefix = "";
  if (!which) {
    prefix = prefix3;
  } else if (which) {
    prefix = prefix1;
  }

  let urlp = `${prefix}${params.url}?`;
  let keys = Object.keys(params);
  keys.map(x => {
    if (x != "url") {
      if (params[x]) {
        urlp += `${x}=${params[x]}&`;
      }
      if (params[x] === 0) {
        urlp += `${x}=${params[x]}&`;
      }
    }
  });
  urlp = urlp.substring(0, urlp.length - 1);
  console.log(keys);
  console.log(urlp);
  console.log(
    "=====================================ALAIR============================================"
  );
  // return false
  window.open(urlp, "_self");
  // window.open('http://172.18.178.165:10711/order/merchantFileExport?pageNum=1&pageSize=50&dateType=day&filter=1', "_self");
};

export const post_exportTicketList = (params, url = "/order/user/exportTicketList", which) => {
  let prefix = !which? prefix3: prefix1;
  return axios.post(`${prefix}${url}`, params, { responseType:"blob" })
}


