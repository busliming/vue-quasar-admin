export function c_is_object(obj) {
  return obj !== null && typeof obj === "object";
}

const _to_string = Object.prototype.toString;
// 判断是否是对象不包过数组等
export function c_is_true_object(obj) {
  return _to_string.call(obj) == "[object Object]";
}

export function c_is_string(str) {
  return typeof str == "string";
}

export function c_is_function(fn) {
  return typeof fn == "function";
}

export function c_is_null(nu) {
  return nu === null;
}

export function c_is_undefined(udf) {
  return udf === undefined;
}