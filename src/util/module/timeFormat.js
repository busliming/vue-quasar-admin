/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 11:52:53
 */
export function format_date_base_gmt_add_8(value) {
  let time = new Date(parseInt(value + 8 * 60 * 60 * 1000));
  let y = time.getFullYear();
  let m = (time.getMonth() + 1 + "").padStart(2, 0);
  let d = (time.getDate() + "").padStart(2, 0);
  let h = (time.getHours() + "").padStart(2, 0);
  let mm = (time.getMinutes() + "").padStart(2, 0);
  let s = (time.getSeconds() + "").padStart(2, 0);
  return [y, m, d, h, mm, s];
}

export function format_date_time_add_8(opts) {
  if (!opts) {
    return "";
  }
  let { value, type } = opts;
  if (!value) return "";
  let [y, m, d, h, mm, s] = format_date_base_gmt_add_8(value);
  if (type && typeof type === "function") return type({ y, m, d, h, mm, s });
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}

export function format_time_to_m_s(arg) {
  let str = "";
  if (!arg || typeof arg != "object") return str;
  let { value, pattern } = arg;
  if (typeof value != "number" && !Number.isInteger(value)) return str;
  let m = Math.floor(value / 60),
    s = value % 60;
  pattern = pattern || "mm:ss";
  let replace = time => match => {
    let str = "";
    function get_str(raw, compare) {
      if (!raw || !compare) return compare;
      if (raw.length > compare.length) {
        compare = "0" + compare;
        get_str(raw, compare);
      }
      return compare;
    }
    str = time;
    str = get_str(match, str);
    return str;
  };
  str = pattern.replace(/m+/, replace(m + ""));
  str = str.replace(/s+/, replace(s + ""));
  return str;
}

function format_date_base_time(value) {
  let time = new Date(parseInt(value));
  let y = time.getFullYear();
  let m = (time.getMonth() + 1 + "").padStart(2, 0);
  let d = (time.getDate() + "").padStart(2, 0);
  let h = (time.getHours() + "").padStart(2, 0);
  let mm = (time.getMinutes() + "").padStart(2, 0);
  let s = (time.getSeconds() + "").padStart(2, 0);
  return [y, m, d, h, mm, s];
}

export function format_date_time(opts) {
  if (!opts) {
    return "";
  }
  let { value, type } = opts;
  if (!value) return "";
  let [y, m, d, h, mm, s] = format_date_base_time(value);
  if (type && typeof type === "function") return type({ y, m, d, h, mm, s });
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}
export function formatDate(date1, dateFormat) {
  var date = new Date(parseInt(date1));
  if (/(y+)/.test(dateFormat)) {
    dateFormat = dateFormat.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 格式化月、日、时、分、秒
  let o = {
    "y+": date.getFullYear(),
    "m+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "i+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(dateFormat)) {
      // 取出对应的值
      let str = o[k] + "";
      dateFormat = dateFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : (str + "").padStart(2, 0)
      );
    }
  }
  return dateFormat;
}
