<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors  : Nice
 * @LastEditTime : 2020-02-13 21:09:45
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding position-relative">
        <div class="row fs14 bg-panda-dialog-sh text-panda-text-7 pr10x">
          <div class="row pl20x mt20x">
            <img
              class="border-2 border-radius-4"
              :src="'data:image/jpg;base64,' + currentUser.logo"
              width="44"
              height="44"
              alt
            />
            <div class="pl20x">
              <div class="fw_600 line-height-24px">
                {{ currentUser.merchantName }}
              </div>
              <div>{{ currentUser.merchantCode }}</div>
            </div>
          </div>
          <q-space></q-space>
          <q-btn
            class="position-absolute"
            style="right:20px; top:20px;"
            flat
            dense
            icon="close"
            v-close-popup
          />
        </div>
        <div class="row bg-panda-dialog-sh pt20x fs12">
          <div class="col-4 pl20x">
            <div class="panda-text-1">商务联系人</div>
            <div
              class="text-panda-text-7 line-height-24px"
              style="word-break: break-all; max-width: 150px;"
            >
              {{ currentUser.contact }}
            </div>
          </div>
          <div class="col-4">
            <div class="panda-text-1">联系电话</div>
            <div
              class="text-panda-text-7 line-height-24px"
              style="word-break: break-all; max-width: 150px;"
            >
              {{ currentUser.phone }}
            </div>
          </div>
          <div class="col-4">
            <div class="panda-text-1">电子邮件</div>
            <div class="text-panda-text-7 line-height-24px">
              {{ currentUser.email }}
            </div>
          </div>
        </div>
        <div class="row bg-panda-dialog-sh pt20x pb20x">
          <div class="col-4 pl20x">
            <div class="panda-text-1">国家</div>
            <div class="text-panda-text-7 line-height-24px">
              {{ currentUser.country }}
            </div>
          </div>
          <div class="col-4">
            <div class="panda-text-1">省市地区</div>
            <div class="text-panda-text-7 line-height-24px">
              {{ currentUser.province }}
            </div>
          </div>
          <div class="col-4">
            <div class="panda-text-1">地址</div>
            <div class="text-panda-text-7 line-height-24px">
              {{ currentUser.address }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="row pt20x pb20x fs12">
        <div class="col-4 pl20x">
          <div class="panda-text-1">商户币种</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.currency | filterCurrency }}
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">兑-人民币汇率</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.rate }}
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">商户钱包类型</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.transferMode == 1 ? "免转钱包" : "转账钱包" }}
          </div>
        </div>
      </div>
      <div class="row pb20x fs12">
        <div class="col-12 pl20x">
          <div class="panda-text-1">加扣款接口URL</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.url }}
          </div>
        </div>
      </div>
      <div class="row pb20x fs12">
        <div class="col-12 pl20x">
          <div class="panda-text-1">加扣款回调URL</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.callbackUrl }}
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row pt20x fs12">
        <div class="col-4 pl20x">
          <div class="panda-text-1">商户等级</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.levelName }}
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">平台费率 %</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.terraceRate }}
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">计算标准</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.computingStandard == 1 ? "盈利" : "投注额" }}
          </div>
        </div>
      </div>
      <div class="row pt20x pb20x fs12">
        <div class="col-4 pl20x">
          <div class="panda-text-1">缴纳周期</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.paymentCycle | filterPaymentCycle }}
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">会员费 (CNY)</div>
          <div class="text-panda-text-7 line-height-24px">
            {{
              currentUser.vipAmount == 0
                ? "免费"
                : currentUser.vipAmount | amount
            }}
            <span v-if="currentUser.vipAmount"
              >/ {{ currentUser.vipPaymentCycle | filterPaymentCycle }}</span
            >
          </div>
        </div>
        <div class="col-4">
          <div class="panda-text-1">技术服务费 (CNY)</div>
          <div class="text-panda-text-7 line-height-24px">
            {{
              currentUser.techniqueAmount == 0
                ? "免费"
                : currentUser.techniqueAmount | amount
            }}
            <span v-if="currentUser.techniqueAmount"
              >/
              {{ currentUser.techniquePaymentCycle | filterPaymentCycle }}</span
            >
          </div>
        </div>
      </div>
      <div class="row pb20x fs12">
        <div class="col-12 pl20x">
          <div class="panda-text-1">商户有效期</div>
          <div class="text-panda-text-7 line-height-24px">
            {{ currentUser.startTime }} 至 {{ currentUser.endTime }}
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row pt20x pb20x fs12">
        <div class="col-12 pl20x">
          <div class="panda-text-1">合作协议文件</div>
          <div class="row">
            <a
              class="panda-text-2 line-height-24px mr20x"
              v-for="(item, index) in files"
              :key="index"
              @click="handle_download(item)"
              >{{ item.slice(item.indexOf("d/") + 2) }}</a
            >
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import log_login_mixin from "src/pages/set/merchantlevel/mixin/index.js";
import { api_merchant, api_public } from "src/api/index.js";
export default {
  mixins: [log_login_mixin],
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      // httpUrl_72: imgSrc
      httpUrl_72: require("../../../../assets/img/bg.png"),
      formData: {
        // level: ''
      },
      currentUser: {}
    };
  },
  computed: {
    files() {
      return this.currentUser.filePath && this.currentUser.filePath.split(";");
    }
  },
  props: {
    detailObj: ""
  },
  created() {
    this.initMerchantDetail();
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    },
    filterCurrency(val) {
      if (!val) return "暂无数据";
      let arr = ["人民币", "积分制"];
      return arr[val - 1];
    }
  },
  methods: {
    // 文件上传
    handle_download(item) {
      console.log(item);
      let params = {
        fileName: item
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          // console.log(res.data);
          this.$message.success(
            `下载${item.slice(item.indexOf("d/") + 2)}成功!`
          );
          // http://172.18.178.165:10712/manage/merchant/file/download?fileName=/opt/merchant/upload/前端文档.txt
          window.open(
            location.host + "/manage/merchant/file/download?fileName=" + item
          );
          //http://test.goodbestpanda.com/yewu9/manage/merchant/file/download?fileName=%2Fopt%2Fmerchant%2Fupload%2Fpackage-lock2373860271.json
          // window.open(
          //   "http://172.18.178.165:10712/manage/merchant/file/download?fileName=" +
          //     item
          // );
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    async initMerchantDetail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_merchant.get_manage_merchant_byid(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data;
      } else {
        this.$message.error(msg);
      }
    },
    upload_avatar(event, num) {
      let inputfile = event.target.files[0];
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("file", inputfile);
      console.log(event);
      // 清空触发change时间
      event.target.value = "";
    },
    // 保存按钮
    handleSave() {}
  }
};
</script>
<style lang="stylus" scoped>
// form表单input样式重写
>>>.q-field--with-bottom {
  padding-bottom: 0;
}

>>>.q-field__bottom--animated {
  bottom: 4px;
}

>>>.q-field__marginal {
  font-size: 16px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 14px;
}

a {
  text-decoration: underline;
}
</style>
