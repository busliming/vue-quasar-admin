export default {
  methods: {
    padStart_with_length_module(val, len, module) {
      String(val).padStart(len, String(module));
    },
    find_value_in_url_query(str, name) {
      let value = "";
      let n = str.indexOf("?");
      str = str.substr(n + 1); //取得所有参数
      let arr = str.split("&"); //各个参数放到数组里
      for (let i = 0; i < arr.length; i++) {
        let num = arr[i].indexOf("=");
        if (num > 0) {
          if (name == arr[i].substring(0, num)) {
            value = arr[i].substr(num + 1);
          }
        }
      }
      let mm = value.indexOf("#");
      if (mm >= 0) {
        value = value.substring(0, mm);
      }
      return decodeURIComponent(value);
    },
    find_value_in_obj_bypath(obj, pathstr) {
      if (!obj) {
        return "";
      }
      if (!pathstr) {
        return JSON.stringify(obj);
      }
      let patharr = pathstr.split(".").slice(1);
      let result = this.find_value_in_obj_bypatharr(obj, patharr);
      return result;
    },
    deep_clone(obj) {
      let newObj;
      if (Array.isArray(obj)) {
        newObj = [];
        obj.map(x => {
          newObj.push(this.deep_clone(x));
        });
      } else if (typeof obj === "object") {
        newObj = {};
        for (let item in obj) {
          if (Object.prototype.hasOwnProperty.call(obj,item)) {
            if (obj[item] && typeof obj[item] === "object") {
              newObj[item] = this.deep_clone(obj[item]);
            } else {
              newObj[item] = obj[item];
            }
          }
        }
      } else {
        newObj = obj;
      }
      return newObj;
    },
    getZoneTime(offset) {
      // 取本地时间
      var localtime = new Date();
      // 取本地毫秒数
      var localmesc = localtime.getTime();
      // 取本地时区与格林尼治所在时区的偏差毫秒数
      var localOffset = localtime.getTimezoneOffset() * 60000;
      // 反推得到格林尼治时间
      var utc = localOffset + localmesc;
      // 得到指定时区时间
      var calctime = utc + 3600000 * offset;
      var nd = new Date(calctime);
      return nd;
      // return nd.toDateString()+" "+nd.getHours()+":"+nd.getMinutes()+":"+nd.getSeconds();
    },
    window_open(url) {
      if (url) {
        window.open(url);
      }
    },
    format_date(value) {
      let time = new Date(parseInt(value));
      let y = time.getFullYear();
      let m = (time.getMonth() + 1 + "").padStart(2, 0);
      let d = (time.getDate() + "").padStart(2, 0);
      let h = (time.getHours() + "").padStart(2, 0);
      let mm = (time.getMinutes() + "").padStart(2, 0);
      let s = (time.getSeconds() + "").padStart(2, 0);
      return `${y}/${m}/${d} ${h}:${mm}:${s}`;
    },
    compote_xingqi(str) {
      if (!str) {
        return "";
      }
      // let arr1=[0,1,2,3,4,5,6]
      let arr2 = ["日", "一", "二", "三", "四", "五", "六"];
      let n = new Date(str).getDay();
      return arr2[Number(n)];
    },
    change_time_to_ios(str) {
      if (str) {
        return str.replace(/-/g, "/");
      }
    },
    format_date_ios(value) {
      let time = new Date(parseInt(value));
      let y = time.getFullYear();
      let m = (time.getMonth() + 1 + "").padStart(2, 0);
      let d = (time.getDate() + "").padStart(2, 0);
      let h = (time.getHours() + "").padStart(2, 0);
      let mm = (time.getMinutes() + "").padStart(2, 0);
      let s = (time.getSeconds() + "").padStart(2, 0);
      return `${y}/${m}/${d} ${h}:${mm}:${s}`;
    },
    delete_empty_property_with_exclude(obj, arr) {
      // 此方法 值针对一层 或者 2层 结构
      console.log(obj);
      let newobj = {};
      arr = arr ? arr : [];
      for (let item in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,item)) {
          let bufferobj = obj[item];
          if (arr.includes(item)) {
            // 排除在外的 ,一定要赋值
            newobj[item] = bufferobj;
          } else {
            // 没有排除的
            if (Array.isArray(bufferobj) && bufferobj.length > 0) {
              // 数组情况

              newobj[item] = [...bufferobj];
            } else if (typeof bufferobj == "boolean") {
              newobj[item] = bufferobj;
            } else if (bufferobj !== "" && bufferobj != null) {
              newobj[item] =
                typeof bufferobj === "string" ? bufferobj.trim() : bufferobj;
            }
          }
        }
      }
      return newobj;
    },
    click_menu_item(item) {
      if (item.url.includes("http://")) {
        window.open(item.url);
      } else {
        console.log(item);
        console.log(this.$route);
        this.$router.push(item.url);
      }
    },
    // 将多维数组转为一维数组
    jsonToArray(nodes) {
      var r = [];
      if (Array.isArray(nodes)) {
        for (var i = 0, l = nodes.length; i < l; i++) {
          r.push(nodes[i]); // 取每项数据放入一个新数组
          if (
            Array.isArray(nodes[i]["children"]) &&
            nodes[i]["children"].length > 0
          )
            // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
            r = r.concat(this.jsonToArray(nodes[i]["children"]));
          delete nodes[i]["children"];
        }
      }
      return r;
    },
    // 判断日期格式是否为YYYY-MM-DD
    isDate8(sDate) {
      if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
      }
      var year, month, day;
      year = sDate.substring(0, 4);
      month = sDate.substring(4, 6);
      day = sDate.substring(6, 8);
      var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (year < 1700 || year > 2500) return false
      if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
      if (month < 1 || month > 12) return false
      if (day < 1 || day > iaMonthDays[month - 1]) return false
      return true
    },
    //获取一年中第几周
    getYearWeek(date) {
      // date = formatTimebytype(date, 'yyyy-MM-dd');//将日期转换成yyyy-mm-dd格式
      if (!this.isDate8(date)) {
        date = new Date(date);
        var date2 = new Date(date.getFullYear(), 0, 1);
        var day1 = date.getDay();
        if (day1 == 0) day1 = 7;
        var day2 = date2.getDay();
        if (day2 == 0) day2 = 7;
        date = Math.round(
          (date.getTime() -
            date2.getTime() +
            (day2 - day1) * (24 * 60 * 60 * 1000)) /
          86400000
        );
        return Math.ceil(date / 7) + 1;
      } else {
        return date;
      }
    },
  }
};
