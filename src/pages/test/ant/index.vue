<template>
  <div>
    <div class="row q-gutter-x-md">
      <q-btn color="primary" @click="rebase_arr()"> 还原</q-btn>
      <q-btn color="primary" @click="change_arr()"> 测试改变</q-btn>
      <q-btn color="primary" @click="concat()"> concat</q-btn>
      <q-btn color="primary" @click="copyWithin()"> copyWithin</q-btn>
      <q-btn color="primary" @click="concat()"> concat</q-btn>
      <q-btn color="primary" @click="entries()"> entries</q-btn>
      <q-btn color="primary" @click="every()"> every</q-btn>
      <q-btn color="primary" @click="fill()"> fill</q-btn>
      <q-btn color="primary" @click="filter()"> filter</q-btn>
      <q-btn color="primary" @click="filter()"> filter</q-btn>
      <q-btn color="primary" @click="find()"> find</q-btn>
      <q-btn color="primary" @click="forEach()"> forEach</q-btn>
      <q-btn color="primary" @click="from()"> from</q-btn>
      
    </div>

    <div>{{ arr }}</div>
    <hr />
<div> LODASH</div>
<!-- <div class="row q-gutter-x-md">
  <q-btn color="primary" @click="lodash_chunk()"> lodash_chunk</q-btn>

</div> -->



    <div v-for="(item, index) in arr" :key="index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2]
    };
  },
  methods: {
    lodash_chunk(){
    let nn=  this.$lodash.chunk(['a', 'b', 'c', 'd'], 2)
    console.log('nn',nn);
    },
     lodash_compact(){
    let cc=  this.$lodash.compact(['a', 'b', 'c', 'd'], 2)
    console.log('cc',cc);
    },
    rebase_arr() {
      this.arr = [1, 2];
    },
    change_arr() {
      this.arr = [
        "Banana",
        "Orange",
        "Apple",
        "Mango",
        "xsxs",
        "sxsxcccc",
       
      ];
    },
    concat() {
      this.arr = this.arr.concat([999999, 8888, 5]);
    },
    copyWithin() {
      this.arr.copyWithin(2, 0);
    },
    entries() {
      this.arr = this.arr.entries();
    },
    every() {
      this.arr = [56, 78, 36, 39, 98];
    },
    fill() {
      // this.arr=["Banana", "Orange", "Apple", "Mango"];
      this.arr = new Array(30).fill(99999999999999);
    },
    filter() {
      this.arr = [62, 35, 29, 36];
    },
    find() {
      let aa = [16, 19, 18, 26, 37];
      let ss = aa.find(x => {
        return x > 20;
      });
      console.log("ss", ss);
    },
    findIndex() {
      let nn = [9, 15, 28, 39];
      let cc = nn.findIndex(y => {
        return y > 26;
      });
      console.log(`cc`, cc);
    },
    forEach() {
      let arr = [6, 8, 9, 7];
    },
from(){
 let a = [{name:`tom`,age:20,hh:`ph`},{name:`tom2`,age:22}];

},



  }
};
</script>

<style lang="scss" scoped></style>
