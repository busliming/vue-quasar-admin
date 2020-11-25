<!--
 * @Author: Nice
 * @Date: 2020-10-28 13:49
 * @Description: 
 * @FilePath: /1028-ToB端商户后台/src/App.vue
-->

<template>
   <a-locale-provider :locale="locale">
    <div id="q-app"> 
      <router-view />
    </div>
   </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN,
    }
  },
  created(){
    this.initUser()
  },
  mounted(){
    if (window.performance.navigation.type == 1) {
      console.log("页面被刷新")
    }else{
      console.log("首次被加载")
    }
  },
  methods: {
    ...mapActions(['set_user_info']),
    initUser(){
      let value = this.$q.sessionStorage.getItem('userInfo');
      value && this.set_user_info(value);
    }
  }
}
</script>

<style lang="stylus" scoped>
#q-app{
  width: 100%;
  height: 100%;
}
>>>.ant-table-thead > tr > th{
  color: #3C4551;
  font-weight: bold;
  background #fff;
}
>>>.ant-table-tbody > tr > td{
  color: #3C4551;
}
</style>
