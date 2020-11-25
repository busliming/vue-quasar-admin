/*
 * @params {}
 * @return undefined
 * reg 是待验证正则，model是绑定路径，val是输入值, context是待修改的对象
 * @input="valid_({ context: data, reg: /\w/, val: $event, model: 'test.test1' })"  mixins: [{ methods: { valid_ } }],
 */
function valid_(arg) {
  if (!arg || typeof arg !== "object") return;
  let { reg, model, val, context } = arg;
  if (!model || typeof model !== "string" || typeof val !== "string") return;
  reg = reg || /^(0|[1-9]\d{0,2})$/;
  let model_arr = model.split("."),
    model_arr_len = model_arr.length;
  let valid = arg => {
    let len = arg.length;
    if (!reg.test(arg) && arg !== "" && len > 0) {
      return valid(arg.slice(0, len - 1));
    } else {
      return arg;
    }
  };
  let value = valid(val);
  if (!context || typeof context != 'object') {
    context = this
  }
  model_arr.reduce((obj, x, i) => {
    if (i === model_arr_len - 1) {
      obj[x] = value;
    }
    return obj[x];
  }, context);
}
export { valid_ };
