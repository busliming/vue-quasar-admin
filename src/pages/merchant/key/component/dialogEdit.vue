<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-24 19:43
 -->
<template>
  <div
    style="width: 496px ; height:auto;max-width:496px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x">
          <div class="pl20x fw_600">编辑商户KEY</div>
          <q-space></q-space>
          <q-btn class="mr5x text-panda-dialog-close" flat dense icon="close" @click="handle_close(false)" />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="row pl20x pt20x">
        <div>
          <div class="text-panda-text-7 fw_600">商户名称</div>
          <div>{{ detailObj.merchantName || detailObj.merchantCode }}</div>
        </div>
      </div>
      <div class="row pl20x pt20x">
        <div>
          <div class="row flex just-between">
            <div class="text-panda-text-7 mb12x fw_600">
              KEY信息
              <span class="panda-text-red">*</span>
            </div>
            <q-btn
              @click="handle_generate_password"
              class="panda-btn-upload fs12"
              style="width: 72px; height: 30px; margin-top: -10px; box-sizing: content-box"
              :disable="detailObj.statusDescription !== '已过期'"
            >重新生成</q-btn>
          </div>

          <div class="append-handle-btn-input row">
            <q-input
              style=" width:456px;"
              outlined
              ref="key"
              type="textarea"
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-36px"
              v-model.trim="detailObj.key"
              placeholder="请输入公钥字符串"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') ||
                  '生成密码不能为空！请点击生成密码！'
              ]"
              disable
            ></q-input>
          </div>
        </div>
      </div>
      <div class="row pl20x pt20x">
        <div>
          <div class="row flex just-between">
            <div class="text-panda-text-7 mb12x fw_600">
              商户有效期
              <span class="panda-text-red">*</span>
            </div>
          </div>
          <div class="append-handle-btn-input">
            <a-range-picker
              ref="time"
              disabled
              v-if="
                detailObj.startTime !== undefined &&
                  detailObj.endTime !== undefined
              "
              :defaultValue="[
                moment(detailObj.startTime),
                moment(detailObj.endTime)
              ]"
              :placeholder="['开始时间', '结束时间']"
              @change="on_change"
            ></a-range-picker>
          </div>
        </div>
      </div>
      <q-card-section class="fs14">
        <div class="row mt10x">
          <q-space></q-space>
          <div class="row mb10x mr5x">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handle_save"
              label="保存"
              :loading="loading"
            />
            <q-btn
              class="panda-btn-white"
              style="width:80px;height:32px; border: 1px solid #8A92A5; "
              @click="handle_close(false)"
              label="取消"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { api_merchant } from "src/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      formData: {
        // level: ''
        startTime: "", //开始日期
        endTime: "" //结束日期
      },
      loading: false
    };
  },
  created() {
    this.formData.merchantAdmin = this.detailObj.merchantAdmin;
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(["get_data",'get_user_info'])
  },
  methods: {
    moment,
    ...mapActions(["clear_data"]),
    /**
     * @description 保存按钮
     * @return {undefined} undefined
     */
    handle_save() {
      this.validate();
      if (this.$refs.key.hasError) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          merchantCode: this.detailObj.merchantCode,
          key: this.detailObj.key,
          startTime: this.detailObj.startTime,
          endTime: this.detailObj.endTime,
          updatedBy: this.get_user_info.userCode
        };
        this.init_save_user_key(params);
      }
    },
    /**
     * @description 前后端联调
     * @param  {Object} params 传给后台参数
     * @return {undefined} undefined
     */
    init_save_user_key(params) {
      this.loading = true
      api_merchant.get_manage_merchant_updateKey(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          
          this.$message.success("编辑商户KEY成功");
          this.handle_close(true);
          
        } else {
          this.$message.error(msg, 5);
        }
        this.loading = false;
      });
    },
    validate() {
      this.$refs.key.validate();
    },
    /**
     * @description 生成KEY
     * @return {undefined} undefined
     */
    handle_generate_password() {
      api_merchant.get_manage_merchant_generateKey({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.detailObj.key = res.data.data;
          this.$message.success("生成KEY" + msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    /**
     * @description 关闭弹窗
     * @param  {Boolean} val 是-需要刷新列表 否-不刷新列表  都需要关闭弹窗
     * @return {undefined} undefined
     */
    handle_close(val) {
      val?this.$emit("closeDialog",val): this.$emit('closeDialog')
      if (this.get_data) {
        this.clear_data();
      }
    },
    /**
     * @description 选择日期
     * @param  {Array} value moment时间数组
     * @param  {Array} dateString 格式化时间数组
     * @return {undefined} undefined
     */
    on_change(value, dateString) {
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
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

>>>.q-field__append {
  border-left: 0px;
}

// 复写日期组件样式
>>>.ant-input {
  height: 36px;
  line-height: 36px;
  border-color: #c1c1c1;
  padding: 0 11px;
}

>>>.ant-input:hover {
  box-shadow: 0 2px 4px 0 rgba(97, 128, 239, 0.2);
}

>>>.ant-input-disabled{
  background-color #f1f1f1;
  color rgba(0, 0, 0, 0.8)
}
</style>
