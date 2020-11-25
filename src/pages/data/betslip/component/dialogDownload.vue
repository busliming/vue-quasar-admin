<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 21:24
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding position-relative">
        <div class="row fs14 bg-panda-dialog text-panda-text-7 pr10x pb10x">
          <div class="row pl20x mt10x fw_600">下载信息</div>
          <q-space></q-space>
          <q-btn
            class="position-absolute text-panda-dialog-close"
            style="right:20px; top:5px;"
            flat
            dense
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <div class="content">
        <div class="middle text-panda-text-7 mb30x mt30x">
          <div class="line-height-20px fw_600">尊敬的用户：</div>
          <div class="line-height-30px mt20x ml20x">
            <span>导出数据超过<span class="text-red">{{eKey==2?'4万条': '7万6千条'}}</span>数据，请点击前往<a>文件服务器</a>进行下载！</span><br>
            <span>该功能正在开发中！敬请期待！</span>
          </div>
          <div class="line-height-20px mt10x flex">
            <q-space></q-space>
            <div class="text-right text-panda-text-4">
              <div>Panda</div>
              <div>{{moment(Date.now()).format('LL')}}</div>
            </div>
          </div>
        </div>
        <div class="footer pb20x position-fixed flex justify-center">
          <q-btn
            class="panda-btn-primary-dense bg-primary"
            style="width:65px;height:32px; "
            label="确定"
            v-close-popup
          />
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    eKey: {
      type: String,
      default: '1'
    }  
  },
  data() {
    return {
    };
  },
  methods: {
    moment
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 86%;
  margin: 0 auto;
}
a{
  text-decoration: underline
}
</style>
