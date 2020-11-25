<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-28 16:12:26
 -->
<template>
  <div
    style="width: 1144px ; height:auto;max-width:1144px;"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding position-relative">
        <div class="row fs14 bg-panda-dialog text-panda-text-7 pr10x pb10x">
          <div class="row pl20x mt10x fw_600">公告详情</div>
          <q-space></q-space>
          <q-btn
            class="position-absolute text-panda-dialog-close"
            style="right:20px; top:5px;"
            flat
            dense
            icon="close"
            @click="handleClose"
            v-close-popup
          />
        </div>
      </q-card-section>
      <!-- <q-separator></q-separator> -->
      <div class="content">
        <div class="top text-center mt20x pb40x">
          <div class="title text-panda-text-7 fw_600">
            <span v-if="currentUser.isTag" class="mr5x">
              <my-icon type="p-icon-biaoji"></my-icon>
            </span>
            {{currentUser.title}}
          </div>
          <div class="title text-panda-text-4 fs12 mt5x line-height-20px">
            <span>
              <a-icon type="clock-circle" />
            </span>
            <span class="ml10x">{{moment(currentUser.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
            <span class="ml20x">
              <my-icon type="p-icon-chakan" style="font-size: 14px;"></my-icon>
            </span>
            <span class="ml10x">{{currentUser.visitNumber}}次</span>
            <span class="ml20x">赛事ID: {{currentUser.standardMatchId != 0? currentUser.standardMatchId: '--'}}</span>
          </div>
        </div>
        <div class="middle text-panda-text-7">
          <span class="line-height-30px">
            <span v-html="currentUser.context"></span>
          </span>
        </div>
        <div class="line-height-30px mt20x flex">
          <div class="cursor-pointer fs14 mr20x" v-for="(item, index) in files" :key="index">
            <span @click="handle_download(item)">{{item.name}}</span>
          </div>
        </div>
        <div class="line-height-30px flex mt30x">
          <q-space></q-space>
          <div class="text-right text-panda-text-4 fs12">
            <div>{{currentUser.createdBy?currentUser.createdBy: 'Panda'}}</div>
            <div>{{moment(currentUser.sendTime).format('LL')}}</div>
          </div>
        </div>
        <div class="footer mt20x pb20x position-fixed flex justify-center">
          <q-btn
            class="panda-btn-primary-dense bg-primary"
            style="width:100px;height:32px; "
            label="确定"
            @click="handleClose"
            v-close-popup
          />
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import editOrupdateMixin from "src/pages/message/bulletin/mixin/index.js";
import { api_message } from "src/api/index.js";
import moment from "moment";
export default {
  mixins: [editOrupdateMixin],
  data() {
    return {
      httpUrl_72: require("../../../../assets/img/bg.png"),
      currentUser: {},
      files: []
    };
  },
  props: {
    detailObj: ""
  },
  created() {
    this.initBulletinDetail();
  },
  methods: {
    moment,
    async initBulletinDetail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_message.post_manage_notice_detail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data;
        if (data.upload) {
          let filesArr = data.upload.split(";");
          let namesArr = data.uploadName.split(";");
          filesArr.map((item,index) => {
            this.files.push({
              file: item,
              name: namesArr[index]
            })
          })
        }
      } else {
        this.$message.error(msg);
      }
    },
    handleClose(){
      this.$emit('closeDialog');
    }
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 94%;
  margin: 0 auto;
}

.middle {
  max-height: 500px;
  overflow: auto;
  // overflow-y: scroll
}

>>>.middle img {
  max-width: 100%;
}

>>>.ql-align-left{
  text-align left;
}

>>>.ql-align-center{
  text-align center;
}

>>>.ql-align-right{
  text-align right;
}
</style>
