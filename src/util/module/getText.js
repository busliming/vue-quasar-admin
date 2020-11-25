/*
 * @Desc: 
 * @Date: 2020-04-05 09:43:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-05 09:49:36
 */
// 将获取的富文本编辑器转过来的html格式转文字
export const getText =(content) => {
    let description = content
//   1。/pattern/是正则表达式的界定符，里面的内容(pattern)是要匹配的内容，就是本例中的/\//；
//   2。\是转义的意思，\/代表的是/字符。
// 3。JavaScript中应该是字符串的replace() 方法如果直接用str.replace(/\//g, '')只会替换第一个匹配的字符. 而str.replace(/\//g, '')则可以替换掉全部匹配的字符（g为全局标志）。
    description = description.replace(/(\n)/g, '');
    description = description.replace(/(\t)/g, '');
    description = description.replace(/(\r)/g, '');
 
    description = description.replace(/<\/?[^>]*>/g, ''); // 找到所有的<>的标签，都替换为空格
    description = description.replace(/\s*/g, ''); // 表示替换字符串中所有的空字符串
    description = description.replace(/[ ]|[&nbsp;]/g, ''); // 去掉&nbsp;标签
    return description
}