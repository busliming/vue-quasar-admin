export function rebuild_table_columns_list(columns, map, options) {
  if (Array.isArray(columns) && Array.isArray(map)) {
    let show_list = columns.map((el, index) => {
      let item = {
        name: el,
        label: map[index] ? map[index] : ""
      };
      if (options && typeof options == "object") {
        item = Object.assign(item, options);
      }
      return item;
    });
    return show_list;
  }
  return [];
}
