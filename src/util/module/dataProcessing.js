// 删除对象中无用数据
export function delete_no_need_data(obj) {
  if (obj && typeof obj == "object") {
    Object.keys(obj).forEach(x => {
      obj[x] || (obj[x] !== 0 && delete obj[x]);
    });
  }
}

export function delete_data(obj, property) {
  if (obj && typeof obj == "object") {
    delete obj[property];
  }
}

export function only_need_data(obj, property) {
  if (obj && typeof obj == "object") {
    let keys = Object.keys(obj);
    if (property && typeof property == "string") {
      keys.forEach(x => {
        if (x !== property) {
          delete obj[x];
        }
      });
    }
    if (property && Array.isArray(property)) {
      keys.forEach(x => {
        if (!property.includes(x)) {
          delete obj[x];
        }
      });
    }
  }
}
