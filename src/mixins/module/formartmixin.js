export default {
  methods: {
    format_date_by_manage(value) {
      let time = new Date(parseInt(value));
      let y = time.getFullYear();
      // let m = (time.getMonth() + 1 + "").padStart(2, 0);
      let m = time.getMonth() + 1 + "";
      // let d = (time.getDate() + "").padStart(2, 0);
      let d = time.getDate() + "";
      let h = (time.getHours() + "").padStart(2, 0);
      let mm = (time.getMinutes() + "").padStart(2, 0);
      let s = (time.getSeconds() + "").padStart(2, 0);
      let arr = ["日", "一", "二", "三", "四", "五", "六"];
      let i = time.getDay();
      let weekday = "周" + arr[i];
      console.log(y,m,d,h,mm,s)
      return `${m}月${d}日 (${weekday})`;
    },
    format_day(value, separator) {
      if (!value) {
        return "";
      }
      let [y, m, d] = this.format_date_base_gmt_add_8(value);
      separator = separator || "/";
      return `${y}${separator}${m}${separator}${d}`;
    },
    format_month(value, separator) {
      if (!value) {
        return "";
      }
      // utc转成gmt+8
      let time = parseInt(value) + 0 * 60 * 60 * 1000;
      let [m, d, h, mm, s] = this.format_date_base_gmt_add_8(time);
      separator = separator || "/";
      return `${m}${separator}${d} ${h}:${mm}:${s}`;
    },
    format_date(value) {
      if (!value) {
        return "";
      }
      let [y, m, d, h, mm, s] = this.format_date_base_gmt_add_8(value);
      return `${y}-${m}-${d} ${h}:${mm}:${s}`;
    },
    format_data_by_chinese(value, type) {
      if (!value) {
        return "";
      }
      let [y, m, d, h, mm, s] = this.format_date_base_gmt_add_8(value);
      let date = `${y}年${m}月${d}日`;
      let month = `${m}月${d}日`;
      let time = `${h}:${mm}:${s}`;
      let month_by_separator = `${m}/${d}`;
      let time_no_need_second = `${h}:${mm}`;
      switch (type) {
        case 1:
          return date;
        case 2:
          return month;
        case 3:
          return time;
        case 4:
          return `${month} ${time}`;
        case 5:
          return `${month_by_separator} ${time_no_need_second}`;
        case 6:
          return `${y}-${m}-${d} ${time}`;
        default:
          return `${date} ${time}`;
      }
    },
    format_date_base_gmt_add_8(value) {
      /**
       * 传入的 是 UTC 时间戳
       * 在内部 转换为当地时间
       * 例如中国时间  实际上 内部 自动加了 8个小时
       *
       */

      let time = new Date(parseInt(value));
      let y = time.getFullYear();
      let m = (time.getMonth() + 1 + "").padStart(2, 0);
      let d = (time.getDate() + "").padStart(2, 0);
      let h = (time.getHours() + "").padStart(2, 0);
      let mm = (time.getMinutes() + "").padStart(2, 0);
      let s = (time.getSeconds() + "").padStart(2, 0);
      return [y, m, d, h, mm, s];
    },
    format_week(value) {
      let arr = ["日", "一", "二", "三", "四", "五", "六"];
      let i = new Date(parseInt(value)).getDay();
      return "周" + arr[i];
    },
    utc_to_gmt_8(value) {
      if (!value) {
        return "";
      }
      let time = parseInt(value) + 8 * 60 * 60 * 1000;
      let [m, d, h, mm] = this.format_date_base_gmt_add_8(time);
      return `${m}月${d}日 ${h}:${mm}`;
    }
  }
};
