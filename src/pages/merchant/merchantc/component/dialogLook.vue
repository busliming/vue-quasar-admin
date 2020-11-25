<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-26 20:07
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">{{detailObj.agentLevel == '0'? '查看直营商户': detailObj.agentLevel == '1' ? '查看渠道商户': '查看二级商户'}}</div> 
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-card-section class="no-padding position-relative">
        <div class="row fs14 text-panda-text-7 pr10x">
          <div class="row pl20x mt20x">
            <img
              class="border-2 border-radius-4"
              :src="detailObjImg"
              width="55"
              height="55"
              alt
            />
            <div class="pl20x">
              <div class="fw_600 line-height-24px mt5x">
                {{ currentUser.merchantName }}
              </div>
              <div>{{ currentUser.merchantCode }}</div>
            </div>
          </div>
        </div>
        <div class="col-12 radius-4 pl20x pr20x" style="min-height: 500px;">
          <!-- tab选项卡 -->
          <div class="row text-panda-text-dark mt5x">
            <a-tabs v-model="activeKey" class="col-12">
              <a-tab-pane key="1" tab="基本信息">
                <!-- <user-info v-if="activeKey == 1" :detail="detailObj" @collect_user_info="collect_user_info"></user-info> -->
                <div class="row pt20x pb20x">
                  <div class="col-4 pl20x">
                    <div class="panda-text-1">
                      商务联系人
                      <my-icon
                        type="p-icon-xiala"
                        @click="handle_show_more_contact"
                        class="fs12 cursor-pointer"
                        v-if="currentContact.length > 1"
                      ></my-icon>
                    </div>
                    <div
                      class="text-panda-text-7 line-height-24px"
                      v-if="!showMoreContact"
                    >
                      {{ currentContact[0] }}
                    </div>
                    <div
                      v-else
                      class="text-panda-text-7 line-height-24px"
                      v-for="(item, index) in currentContact"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">
                      联系电话
                      <my-icon
                        type="p-icon-xiala"
                        @click="handle_show_more_contact"
                        class="fs12 cursor-pointer"
                        v-if="currentContact.length > 1"
                      ></my-icon>
                    </div>
                    <div
                      class="text-panda-text-7 line-height-24px"
                      v-if="!showMoreContact"
                    >
                      {{ currentPhone[0] }}
                    </div>
                    <div
                      v-else
                      class="text-panda-text-7 line-height-24px"
                      v-for="(item, index) in currentPhone"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">电子邮件</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.email }}
                    </div>
                  </div>
                </div>
                <q-separator></q-separator>
                <div class="row pt20x pb20x">
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
                <q-separator v-if="currentUser.agentLevel == 2"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.agentLevel == 2">
                  <div class="col-4 pl20x">
                    <div class="panda-text-1">商户类型</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.agentLevel==0?"直营商户": currentUser.agentLevel==1?'渠道商户': '二级商户' }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">渠道商户</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.parentName }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">商户有效期</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.startTime }} ~ {{currentUser.endTime}}
                    </div>
                  </div>
                </div>
                <div v-if="currentUser.agentLevel==2">
                  <q-separator v-if="currentUser.pcDomain"></q-separator>
                  <div class="row pt20x pb20x" v-if="currentUser.pcDomain">
                    <div class="col-12 pl20x">
                      <div class="panda-text-1">Panda PC域名</div>
                      <div class="text-panda-text-7 line-height-24px">
                        {{ currentUser.pcDomain }}
                      </div>
                    </div>
                  </div>
                  <q-separator v-if="currentUser.h5Domain"></q-separator>
                  <div class="row pt20x pb20x" v-if="currentUser.h5Domain">
                    <div class="col-12 pl20x">
                      <div class="panda-text-1">Panda H5域名</div>
                      <div class="text-panda-text-7 line-height-24px">
                        {{ currentUser.h5Domain }}
                      </div>
                    </div>
                  </div>
                  <q-separator v-if="currentUser.appDomain"></q-separator>
                  <div class="row pt20x pb20x" v-if="currentUser.appDomain">
                    <div class="col-12 pl20x">
                      <div class="panda-text-1">Panda App域名</div>
                      <div class="text-panda-text-7 line-height-24px">
                        {{ currentUser.appDomain }}1
                      </div>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="商务信息" v-if="currentUser.agentLevel != 2">
                <div class="row pt20x pb20x">
                  <div class="col-4 pl20x">
                    <div class="panda-text-1">商户等级</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.levelName }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">商户类型</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.agentLevel==0?"直营商户": currentUser.agentLevel==1?'渠道商户': '二级商户' }}
                    </div>
                  </div>
                  <div class="col-4" v-if="currentUser.agentLevel == 1">
                    <div class="panda-text-1">二级商户数量限制</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.childMaxAmount }}
                    </div>
                  </div>
                </div>
                <q-separator></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.agentLevel != 2">
                  <div class="col-4 pl20x">
                    <div class="panda-text-1">平台费率 %</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.terraceRate }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">计算标准</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.computingStandard == 1 ? "盈利金额" : "投注金额" }}
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">缴纳周期</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.paymentCycle | filterPaymentCycle }}
                    </div>
                  </div>
                </div>
                <q-separator></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.agentLevel != 2">
                  <div class="col-4 pl20x">
                    <div class="panda-text-1">会员费 (CNY)</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{
                        currentUser.vipAmount == 0 ? "免费" : currentUser.vipAmount | amount
                      }}
                      <span v-if="currentUser.vipAmount">{{
                        currentUser.vipPaymentCycle | filterPaymentCycle
                      }}</span>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="panda-text-1">技术服务费 (CNY)</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.techniqueAmount == 0 ? "免费": currentUser.techniqueAmount | amount}}
                      <span v-if="currentUser.techniqueAmount">{{currentUser.techniquePaymentCycle | filterPaymentCycle}}</span>
                    </div>
                  </div>
                  <div class="col-4" v-if="currentUser.agentLevel != 2">
                    <div class="panda-text-1">结算币种</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.currency | filterCurrency }}
                    </div>
                  </div>
                </div>
                <q-separator></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.agentLevel != 2">
                  <div class="col-4 pl20x" v-if="currentUser.agentLevel != 2">
                    <div class="panda-text-1">Panda商户</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.commerce }}
                    </div>
                  </div>
                  <div class="col-4" :class="currentUser.agentLevel == 2 ? 'pl20x' : ''">
                    <div class="panda-text-1">商户有效期</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.startTime }} ~ {{ currentUser.endTime }}
                    </div>
                  </div>
                  
                </div>
                <q-separator></q-separator>
                <div class="row pt20x pb20x">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">合作协议文件</div>
                    <div class="row fs12">
                      <a
                        class="panda-text-2 line-height-24px mr20x"
                        v-for="(item, index) in files"
                        :key="index"
                        @click="handle_download(item)"
                        >{{ item.name }}</a
                      >
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="3" tab="技术参数" v-if="currentUser.agentLevel != 2">
                <div class="row pt20x pb20x">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">商户钱包类型</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.transferMode == 1 ? "免转钱包" : "转账钱包" }}
                    </div>
                  </div>
                </div>
                <q-separator v-if="currentUser.transferMode == 1"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.transferMode == 1">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">加扣款接口URL</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.url }}
                    </div>
                  </div>
                </div>
                <q-separator v-if="currentUser.transferMode == 1"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.transferMode == 1">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">加扣款回调URL</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.callbackUrl }}
                    </div>
                  </div>
                </div>
                <q-separator v-if="currentUser.transferMode == 1"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.transferMode == 1">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">余额回调URL</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.balanceUrl }}
                    </div>
                  </div>
                </div>
                <q-separator></q-separator>
                <div class="col-11 pt20x pl20x pb20x" >
                  <div class="panda-text-1">IP白名单</div>
                  <div class="text-panda-text-7 line-height-24px flex-inline">
                    <div class="ellip">{{ currentUser.whiteIp }}</div>
                  </div>
                </div>
                <q-separator v-if="currentUser.pcDomain"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.pcDomain">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">Panda PC域名</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.pcDomain }}
                    </div>
                  </div>
                </div>
                <q-separator v-if="currentUser.h5Domain"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.h5Domain">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">Panda H5域名</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.h5Domain }}
                    </div>
                  </div>
                </div>
                <q-separator v-if="currentUser.appDomain"></q-separator>
                <div class="row pt20x pb20x" v-if="currentUser.appDomain">
                  <div class="col-12 pl20x">
                    <div class="panda-text-1">Panda App域名</div>
                    <div class="text-panda-text-7 line-height-24px">
                      {{ currentUser.appDomain }}
                    </div>
                  </div>
                </div>
              </a-tab-pane>    
            </a-tabs>
          </div>
      </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'
import { api_merchant, api_public,FILE_PREFIX } from "src/api/index.js";

export default {
  props: {
    detailObj: ""
  },
  data() {
    return {
      httpUrl_72: require("../../../../assets/img/bg.png"),  // 默认图片
      currentUser: {}, //当前弹窗数据容器
      showMoreContact: false, //是否展示多个联系人
      showMorePhone: false,  // 是否展示多个联系电话
      activeKey: '1',  // 默认tab为基本信息
    };
  },
  computed: {
    ...mapGetters(['get_data','get_user_info']),
    files() {
      let arr =
        (this.detailObj.filePath && this.detailObj.filePath.split(";")) || [];
      let arr1 = [];
      if (this.detailObj.fileName) {
        arr1 = this.detailObj.fileName.split(";");
      }
      let newArr = [];
      if (arr.length > 0) {
        arr.map((item, i) => {
          newArr.push({
            name: arr1[i] || item.slice(item.indexOf("d/") + 2),
            file: item
          });
        });
      }
      return newArr || [];
    },
    detailObjImg() {
      return this.currentUser.logo
        ? "data:image/jpg;base64," + this.currentUser.logo
        : this.httpUrl_72;
    },
    currentContact() {
      let arr =
        (this.currentUser.contact && this.currentUser.contact.split(",")) || [];
      return arr;
    },
    currentPhone() {
      let arr = (this.currentUser.phone && this.currentUser.phone.split(",")) || [];
      return arr;
    }
  },
  created() {
    this.init_merchant_detail();
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    },
    filterCurrency(val){
      if (!val) return "暂无数据";
      let arr = ['人民币','美元','港币','越南盾','新加坡币','英镑','欧元','比特币'];
      return arr[val-1]
    },
  },
  methods: {
    ...mapActions(['clear_data']),
    /**
     * @description 点击出现多个联系人
     * @return {undefined} undefined
     */
    handle_show_more_contact() {
      this.showMoreContact = !this.showMoreContact;
    },
    // 文件上传
    handle_download(item) {
      let params = {
        fileName: item.name,
        filePath: item.file
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          this.$message.success(`下载${item.name}成功!`);
          // http://172.18.178.165:10712/manage/merchant/file/download?fileName=/opt/merchant/upload/前端文档.txt
          window.open(FILE_PREFIX + item.name + "&filePath=" + item.file+ "&user-id="+this.get_user_info.userId+"&app-id="+this.get_user_info.appId);
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
    /**
     * @description 初始化弹窗数据
     * @return {undefined} undefined
     */
    async init_merchant_detail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_merchant.get_manage_merchant_byid(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data || {}
      } else {
        this.$message.error(msg);
      }
    }
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

.ellip{
  width: 100%;
  // max-width: 580px;
  word-wrap:break-word; 
  word-break:break-all;
  overflow: hidden;   
}
</style>
