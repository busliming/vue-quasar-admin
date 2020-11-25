<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-24 17:44
 -->
<template>
  <div
    style="width: 627px ; height:auto;max-width:627px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">IP白名单设置</div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <a-form
        id="components-form-set-ip"
        class="set-ip"
        :form="form"
        @submit="handle_submit_ip"
      >
        <div class="row fs14 bg-panda-dialog-sh text-panda-text-7 pr10x">
          <div class="row pl50x mt20x">
            <img
              class="border-2 border-radius-4"
              :src="detailObjImg"
              width="60"
              height="60"
              alt
            />
            <div class="pl20x fs14">
              <div class="fw_600 line-height-24px  mt5x">
                {{ currentUser.merchantName }}
              </div>
              <div class="panda-text-1">{{ currentUser.merchantCode }}</div>
            </div>
          </div>
        </div>
        <div class="row mt20x">
          <div class="col-11">
            <div class="pl50x">
              <div class="text-panda-text-7 mb12x fw_600">
                IP白名单(多个IP白名单以英文“,”分割)
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input">
                <a-form-item>
                  <a-textarea
                    allow-clear
                    placeholder="请输入IP白名单"
                    autocomplete="off"
                    :rows="4"
                    size='large'
                    v-decorator="[
                      'whiteIp',
                      { rules: [
                        {validator: checkedWhiteIp}
                      ] },
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
        </div>

        <q-card-section class="fs14">
          <div class="row flex justify-center">
            <!-- <q-space></q-space> -->
            <div class="row mb10x mr5x">
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width:100px;height:32px; "
                @click.once="handle_submit_ip"
                :loading='loading'
                label="保存"
              />
              <q-btn
                class="panda-btn-white border-1px"
                style="width:80px;height:32px; "
                v-close-popup
                label="取消"
              />
            </div>
          </div>
        </q-card-section>
      </a-form>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
export default {
  data() {
    return {
      httpUrl_72: require("../../../../assets/img/bg.png"),
      currentUser: {},
      loading: false
    };
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
    detailObjImg() {
      return this.currentUser.logo
        ? "data:image/jpg;base64," + this.currentUser.logo
        : this.httpUrl_72;
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "setIp" });
  },
  created(){
    this.init_merchant_detail();
  },
  mounted() {
    this.detailObj && this.form.setFieldsValue({
      whiteIp: this.detailObj.whiteIp,
    });
  },
  methods: {
    /**
     * @description 初始化数据
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
    },
    // 验证ip白名单
    checkedWhiteIp(rule, value, callback){
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if(!value){
        callback('IP白名单不能为空！')
      }else{
        callback();
      }
    },
    // 提交参数
    handle_submit_ip(e) {
      e.stopPropagation();
      e.preventDefault();
      console.warn(e);
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          console.log("Received values of form: ", values);
          let params = {
            id: this.detailObj.id,
            whiteIp: values.whiteIp
          }
          api_merchant.post_manage_merchant_update_ip(params).then(res => {
            this.loading = false;
            let { code, msg, data } = res.data;
            if (code == "0000000") {
              this.$message.success("设置IP白名单成功");
              this.$emit("handle_close_dialog_ip");
            } else {
              this.$message.error(msg, 5);
            }
          })
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.ant-input-lg {
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-form-explain, .ant-form-extra {
  font-size: 12px;
}

>>>.ant-input-disabled {
  background-color: #fff;
  color: #666;
}
</style>
