<!--
 * @Desc: 
 * @Date: 2020-01-06 12:06:11
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-06 16:29:19
 -->
<template>
  <q-card style="height:140px;width:350px;">
    <div class="text-center text-red mt30x fs14">{{title}}</div>

    <div class="row justify-center q-gutter-x-md full-width mt30x">
      <q-btn
        label="立即登录"
        @click="handleConfirm"
        class="text-white bg-panda-bg-2"
        style="width:76px; height:30px;"
        v-close-popup
      />
      <q-btn label="取消" color="grey" style="width:76px; height:30px;" v-close-popup />
    </div>
  </q-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title:{
      type: String,
      default() {
        return '恭喜你，密码修改成功！'
      }
    }
  },
  methods: {
    handleConfirm(){
      this.$emit('goToMain')
    }
  }
};
</script>
<style lang="stylus" scoped></style>
