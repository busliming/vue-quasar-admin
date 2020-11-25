/*
 * @Desc: 
 * @Date: 2020-02-07 21:45:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-08 16:20:47
 */
export function getAutoParams(opts) {
  let res = {};
  let { keys, obj, cb } = opts;
  keys.forEach(x => {
    if (x) {
      res[`${obj}.${x}`] = cb;
    }
  });
  return res;
}
// 复制
export function handleCopy(name,text) {
  var oInput = document.createElement("input");
  oInput.value = name;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = "oInput";
  oInput.style.display = "none";
  if (oInput.value) {
    this.$message.info(`复制${text}：${name} 成功！`);
    oInput.parentNode.removeChild(oInput);
  }
}
// 检测中英文长度字符
export function getStrLength(str){
  var len = 0;
  for (var i=0; i<str.length; i++) {
   var c = str.charCodeAt(i);
  //单字节加1
   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
     len++;
   }
   else {
    len+=2;
   }
  }
  return len;
}

// 传参、调接口，下载文件
export const download = (res) => {
  const content = res.data;
  const blob = new Blob([content]);
  let cName = res.headers['content-disposition'].split(';')[1].split('=')[1].replace(/"/g, '')
  cName = window.decodeURI(cName);
  console.log(window.decodeURI(cName));
  const fileName = `${cName}`
  // let URIstring = "panda%E6%B3%A8%E5%8D%95.csv"
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}