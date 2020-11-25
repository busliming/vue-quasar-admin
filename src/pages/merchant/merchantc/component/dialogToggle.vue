<!--
 * @Desc: 
 * @Date: 2020-01-03 12:23:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-24 17:52
 -->
<template>
  <div>
    <q-card class="bg-white text-black relative-position" style="width: 350px ; height:140px;">
      <div>
        <div class="row justify-center pt30x">
          <div class="dialog-edit-label fs14" style=" color: red;">确认更改当前商户状态吗？</div>
        </div>
        <div class="row justify-center mt28x fs14">
           <q-btn
            label="取消"
            class="panda-btn-white border-1px"
            style="width: 76px; height: 30px; "
            v-close-popup
          />
          <q-btn
            label="确定"
            class="text-white panda-btn-primary-dense q-mr-lg bg-panda-bg-2 fs14 ml20x"
            style="width: 76px; height: 30px;"
            @click="handle_confirm"
            v-close-popup
          />
         
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * @description 确定按钮 子组件向父组件传递该事件
     * @return {undefined} undefined
     */
    handle_confirm() {
      this.$emit("handle_confirm");
    }
  }
};
</script>

<style lang="stylus" scoped></style>
