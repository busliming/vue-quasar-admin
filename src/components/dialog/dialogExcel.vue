<!--
 * @Desc: 
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-03 16:36:22
 -->
<template>
  <div>
    <q-card class="bg-white text-black" style="width: 420px ; height:auto">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">报表下载</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="fs14 mt34x pb40x ml30x mr20x">
        <div class="text-panda-text-7 mb20x">正在生成报表，请稍后~</div>
        <a-progress :percent="percent" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      timer: null
    };
  },
  created() {
    this.addPercent();
  },
  methods: {
    addPercent() {
      this.timer = setInterval(() => {
        if (this.percent < 101) {
          this.percent = +this.percent + 50;
        } else {
          clearInterval(this.timer);
        }
      }, 100);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="stylus" scoped></style>
