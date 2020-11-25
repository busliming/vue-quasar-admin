<!--
 * @Author: Nice
 * @Date: 2020-09-02 20:41
 * @Description: 新建和编辑商户总入口
 * @FilePath: /pandaToB端商户后台/src/pages/merchant/merchantc/component/dialogSetMerchant.vue
-->

<template>
  <div
    style="width: 627px ; height:auto;max-width:627px;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <!-- 根据isUpdate来判断是否新建/编辑不同的商户 -->
          <div class="pl20x fw_600" v-if="!isUpdate">{{detailObj.agentLevel === '0'? '新建直营商户': detailObj.agentLevel === '1' && !detailObj.channelToSecond ? '新建渠道商户': '新建二级商户'}}</div>
          <div class="pl20x fw_600" v-else>{{detailObj.agentLevel === '0'? '编辑直营商户': detailObj.agentLevel === '1' ? '编辑渠道商户': '编辑二级商户'}}</div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="col-12 bg-panda-bg-6 radius-4 pl20x pr20x"  style="min-height: 700px;">
      <!-- tab选项卡 -->
        <div class="row text-panda-text-dark">
          <a-tabs v-model="activeKey" class="col-12">
            <!-- 基本信息 -->
            <a-tab-pane key="1" tab="基本信息">
              <keep-alive>
                <component :is="activeComponent" @collect_user_info="collect_user_info" @closeDialog="handle_close"></component>
              </keep-alive>
            </a-tab-pane>
            <!-- 商务信息 -->
            <!-- 新建/编辑二级商户不存在以及渠道商户新建/编辑二级商户不存在这个tab -->
            <a-tab-pane key="2" tab="商务信息" v-if="detailObj.agentLevel !== '2' && !channelToSecond.id  ">
              <keep-alive>
                <component :isUpdate="isUpdate" :detail='detailObj' keep-alive :is="activeComponent" @collect_bus_info="collect_bus_info" @handlePrevious="handlePrevious" @closeDialog="handle_close"></component>
              </keep-alive>
            </a-tab-pane>
            <!-- 技术参数 -->
            <!-- 新建/编辑二级商户不存在以及渠道商户新建/编辑二级商户不存在这个tab -->
            <a-tab-pane key="3" tab="技术参数" v-if="detailObj.agentLevel != '2'  && !channelToSecond.id ">
              <keep-alive>
                <component :is="activeComponent" :isUpdate="isUpdate" :detail='detailObj' :ajaxLoading1="ajaxLoading" @collect_tech_info="collect_tech_info" @handlePrevious="handlePrevious" @closeDialog="handle_close"></component>
              </keep-alive>
            </a-tab-pane>    
          </a-tabs>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { api_merchant } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import userInfo from "src/pages/merchant/merchantc/component/userInfo.vue";
const businessInfo = () => import ("src/pages/merchant/merchantc/component/businessInfo.vue");
const techInfo = () => import ("src/pages/merchant/merchantc/component/techInfo.vue");
const userInfoSecond = () => import ("src/pages/merchant/merchantc/component/userInfoSecond.vue");
const userInfoUpdate = () =>  import ("src/pages/merchant/merchantc/component/userInfoUpdate.vue");
const userInfoSecondUpdate = () => import('src/pages/merchant/merchantc/component/userInfoSecondUpdate.vue')
export default {
  mixins: [commontoolmixin],
  data() {
    return {
      httpUrl_72: require("../../../../assets/img/bg.png"), // 默认上传logo图片导入
      currentUser: {}, // 当前点击某一行的商户数据
      activeKey: '1', // 当前tab默认值 基本信息
      activeComponent: '', // 动态组件 默认是新建的相关组件
      submitParams: {}, // 收集提交给后台的参数
      ajaxLoading: false // 按钮loading阀值
    };
  },
  components: {
    userInfo,
    businessInfo,
    techInfo,
    userInfoSecond,
    userInfoUpdate,
    userInfoSecondUpdate
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    },
    isUpdate: ''
  },
  computed:{
    ...mapGetters(['get_channel','get_detail']),
    /**
     * @description 区分新建/编辑 无-取默认的图片 有-取后台给的图片
     * @return {undefined} undefined
     */
    detailObjImg() {
      return this.currentUser.logo? "data:image/jpg;base64," + this.currentUser.logo: this.httpUrl_72;
    },
    channelToSecond() {
      return this.$q.sessionStorage.getItem('channelToSecond') || {};
    }
  },
  watch: {
    activeKey: {
      handler(val){
        console.log(val,'val')
        if(val === '1'){
          if(this.isUpdate){
            // this.activeComponent = this.detailOb.agentLevel === ''
            this.activeComponent = this.detailObj.agentLevel === '2'? 'userInfoSecondUpdate': 'userInfoUpdate';
            // this.activeComponent = 'userInfoUpdate'
          }else{
            this.activeComponent = this.channelToSecond.id || this.detailObj.agentLevel === '2'? 'userInfoSecond': 'userInfo';
          }
        }else if(val === '2'){
          this.activeComponent ='businessInfo'    
        }else{
          this.activeComponent = 'techInfo';
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "setMerchant" });
  },
  created(){
    this.isUpdate && this.init_merchant_detail();
  },
  destroyed(){
    this.get_channel && this.clear_channel();
    this.get_detail && this.clear_detail();
    this.channelToSecond.id && this.$q.sessionStorage.remove('channelToSecond')
  },
  methods: {
    ...mapActions(['clear_channel','set_detail','clear_detail']),
    /**
     * @description 关闭新建/编辑商户的弹窗
     * @param  {Boolean} val 是否成功 成功-需要重新拉取数据  失败-关闭弹窗
     * @return {undefined} undefined
     */
    handle_close(val){ 
      val?this.$emit('closeDialogSetMerchantShow', val): this.$emit('closeDialogSetMerchantShow');
    },
    /**
     * @description 点击某行根据id拉取对应的数据对象
     * @return {undefined} undefined
     */
    async init_merchant_detail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_merchant.get_manage_merchant_byid(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data || {};
        this.set_detail(this.currentUser);
      } else {
        this.$message.error(msg);
      }
    },
    /**
     * @description 新建时点击下一步收集商务信息
     * @param  {Object} busInfo 商务信息对象
     * @return {undefined} undefined
     */
    collect_bus_info(busInfo){
      console.log(busInfo);
      this.submitParams = {...this.submitParams,...busInfo};
      this.activeKey = '3'
    },
    /**
     * @description 新建时点击下一步收集基本信息
     * @param  {Object} busInfo 基本信息对象
     * @param  {Boolean} val 是否从二级商户过来
     * @return {undefined} undefined
     */
    collect_user_info(userInfo,val){
      console.log(this.channelToSecond.id,this.detailObj.agentLevel,val,'userInfo')
      this.submitParams = {...this.submitParams,...userInfo};
      console.log(this.submitParams,'submitParams')
      if(this.detailObj.agentLevel == 0){
        this.activeKey = '2'
      }else if((this.channelToSecond.id && (this.detailObj.agentLevel == 1)) || val){
        this.activeKey = '3'
      }else{
        this.activeKey = '2'
      }
      // if(this.channelToSecond || this.detailObj.agentLevel === '2'){
      //   this.activeKey = '3'
      // }else if(this.detailObj.agentLevel === '1'){
      //   this.activeKey = '2'
      // }else{
      //   this.activeKey = '2'
      // }
    },
    /**
     * @description 新建时点击下一步收集技术信息
     * @param  {Object} techInfo 技术信息对象
     * @return {undefined} undefined
     */
    collect_tech_info(techInfo){
      this.submitParams = {...this.submitParams,...techInfo};
      console.log(this.submitParams)
      if(this.isUpdate){
        // 编辑
        this.handle_validate_params_edit(this.submitParams);
      }else{
        // 新建
        this.handle_validate_params(this.submitParams);
      }
      console.log(this)
      console.log(this.submitParams)
    },
    /**
     * @description 根据不同商户提交的数据进行不同的验证
     * @param  {Object} values 提交的数据
     * @return {undefined} undefined
     */
    accord_merchant_validate_params(values){
      console.log(values,'提交参数')
      if(this.detailObj.agentLevel == 0){
        if(!values.merchantName || !values.email || !values.contact || !values.level || !values.terraceRate || !values.computingStandard || !values.commerce || !values.paymentCycle || !values.currency || !values.startTime || !values.endTime){
          return true;
        }else{
          return false
        }
      }else if(this.detailObj.agentLevel == 1 && !this.channelToSecond.id){
        if(!values.merchantName || !values.email || !values.contact || !values.level || !values.terraceRate || !values.computingStandard || !values.commerce || !values.paymentCycle || !values.childMaxAmount || !values.startTime || !values.endTime){
          return true;
        }else{
          return false
        }
      }else{
        if(!values.merchantName || !values.email || !values.contact || !values.parentName || !values.startTime || !values.endTime){
          return true;
        }else{
          return false
        }
      }
    },
    /**
     * @description 编辑时前后端交互之前验证参数，发送请求
     * @param  {Object} values 提交参数
     * @return {undefined} undefined
     */
    handle_validate_params_edit(values){
      if(this.accord_merchant_validate_params(values)){
        this.$message.warn('请补充相关信息再提交！')
      }else{
        values.id = this.currentUser.id
        values.agentLevel = this.currentUser.agentLevel;
        let params = this.delete_empty_property_with_exclude(values);
        this.ajaxLoading = true;
        api_merchant.post_manage_merchant_update(params).then(res => {
          let { code, msg } = res.data;
          if (code == "0000000") {
            this.ajaxLoading = false;
            let message = this.detailObj.agentLevel === '0'? '编辑直营商户': this.detailObj.agentLevel === '1' && !this.detailObj.channelToSecond ? '编辑渠道商户': '编辑二级商户'
            this.$message.success(`${message}成功！`);
            this.$emit('closeDialogSetMerchantShow',true)
          } else {
            this.$message.error(msg);
            this.ajaxLoading = false;
          }
        });
      }
    },
    /**
     * @description 新建时前后端交互之前验证参数，发送请求
     * @param  {Object} values 提交参数
     * @return {undefined} undefined
     */
    handle_validate_params(values){
      if(this.accord_merchant_validate_params(values)){
        this.$message.warn('请补充相关信息再提交！')
      }else{
        values.agentLevel = this.channelToSecond.id?'2':this.detailObj.agentLevel; //商户类型
        let params = this.delete_empty_property_with_exclude(values);
        this.ajaxLoading = true;
        api_merchant.post_manage_merchant_create(params).then(res => {
          let { code, msg } = res.data;
          if (code == "0000000") {
            this.ajaxLoading = false;
            let message = this.detailObj.agentLevel === '0'? '新建直营商户': this.detailObj.agentLevel === '1' && !this.detailObj.channelToSecond ? '新建渠道商户': '新建二级商户'
            this.$message.success(`${message}成功！`);
            this.$emit('closeDialogSetMerchantShow',true)
          } else {
            this.$message.error(msg);
            this.ajaxLoading = false;
          }
        });
      }
    },
    /**
     * @description 商务信息上一步下一步处理
     * @param  {String} var 标识是从哪里来的，决定上一步或者下一步走向
     * @return {undefined} undefined
     */
    handlePrevious(val){
      console.log(val)
      if(val === 'techInfo'){
        this.activeKey = '2'
      }else if(val === 'userInfo' || val === 'businessUpdate' || val === 'business' || val === 'techInfoSecond'){
        this.activeKey = '1'
      }else{
        this.activeKey = '3'
      } 
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
