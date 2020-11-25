<!--
 * @Desc: 
 * @Date: 2020-01-28 21:54:06
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-29 20:12:32
 -->
<template>
  <a-table
    style="height: 832px;"
    class="bg-panda-bg-2"
    :columns="columns"
    :dataSource="data"
    :scroll="{ x: 1800, y: 1000 }"
  >
    <a slot="action" slot-scope="text" href="javascript:;">action</a>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
    fixed: "left"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1", width: 150 },
  { title: "Column 2", dataIndex: "address", key: "2", width: 150 },
  { title: "Column 3", dataIndex: "address", key: "3", width: 150 },
  { title: "Column 4", dataIndex: "address", key: "4", width: 150 },
  { title: "Column 5", dataIndex: "address", key: "5", width: 150 },
  { title: "Column 6", dataIndex: "address", key: "6", width: 150 },
  { title: "Column 7", dataIndex: "address", key: "7", width: 150 },
  { title: "Column 8", dataIndex: "address", key: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" }
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns
    };
  }
};
</script>
