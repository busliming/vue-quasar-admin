<!--
 * @Desc: 
 * @Date: 2020-02-21 14:18:03
 * @LastEditors: Nice
 * @LastEditTime: 2020-07-11 13:28:54
 -->
<template>
  <vue-seamless :data="newsList" class="seamless-warp" :class-option="classOption">
    <ul class="item fs14" style="min-width: 560px;">
      <li v-for="(item,index) in newsList" :key="index" class="line-height-40px fs14 cursor-pointer">
        <span class="title text-panda-text-7 fw_600" @click="goToPage(item)">
          <!-- 【系统消息{{index+1}}】<span v-html="item.context"></span> -->
          <span v-if="item.type===2">【系统消息{{index+1}}】</span>
          <span v-else>{{index+1}} 【活动公告】</span>
          <span v-html="item.title"></span>
        </span>
        <span class="date text-panda-text-4 ml20x">{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
      </li>
    </ul>
  </vue-seamless>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import vueSeamless from "vue-seamless-scroll";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import moment from "moment";
import { api_message } from "src/api/index.js";
export default {
  mixins: [commonmixin],
  data() {
    return {
      newsList: [],
    };
  },
  components: {
    vueSeamless
  },
  computed: {
    ...mapGetters(['get_user_info']),
    classOption() {
      return {
        waitTime: 3000,
        step: 0.48,
        limitMoveNum: 1,
        switchDelay: 2000
      };
    }
  },
  created() {
    this.initLightNews();
    this.ajaxInitData();
  },
  destroyed(){
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions(['set_message','set_amount']),
    moment,
    goToPage(item){
      if(!this.get_user_info.userCode.includes('BW')){
         this.set_message(item);
        item.type === 2? this.$router.push({name: 'mymessage'}): this.$router.push({name: 'bulletin'})   
      }   
    },
    ajaxInitData(){
      this.timer = setInterval(() => {
        this.initLightNews();
      }, 60*60*1000);
    },
    initLightNews() {
      api_message.post_manage_news_getLightNews().then(res => {
        let {code,msg} = res.data;
        if (code == "0000000") {
          this.newsList = res.data.data.list || [];
          let message = res.data.data.nen; //消息数量
          let bulletin = res.data.data.non; //消息数量
          this.set_amount({message,bulletin})
        } else {
          if(msg){
            this.$message.error(msg, 5);
          }
        }
      });
    },
    compute_init_tabledata_params() {
      let params = {
        pgNum: 1, //分页，查询第几页数据。
        pgSize: 10 //分页，每页查询多少条，默认20条。可不传
      };
      return params;
    }
  }
};
</script>

<style lang="stylus" scoped>
ul, li {
  list-style: none;
}
</style>