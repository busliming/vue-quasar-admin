<!--
 * @Author: Nice
 * @Date: 2020-09-04 10:43:51
 * @Description: 
 * @FilePath: /pandaToB端商户后台/src/pages/data/recordquery/index.vue
-->
<template>
  <div class="full-width full-height">
    <div class="pl10x pt10x pb10x fs14" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte">
        <q-breadcrumbs-el label="数据中心" class="panda-text-2" />
        <q-breadcrumbs-el label="交易&账变记录查询" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 0 10px 10px 10px" class="bg-panda-bg-6 shadow-3 border-radius-4">
      <div class="col-12 bg-panda-bg-6 radius-4">
        <!-- tab选项卡 -->
        <div class="row text-panda-text-dark position-relative">
          <span class="title-block bg-panda-bg-2 mr5x mt15x position-absolute" style="left: 10px;"></span>
          <a-tabs v-model="activeKey" class="col-12">
            <a-tab-pane key="2" tab="交易记录" force-render>
              <user-record v-if="activeKey == 2"></user-record>
            </a-tab-pane>
            <a-tab-pane key="3" tab="账变记录">
              <user-account v-if="activeKey == 3"></user-account>
            </a-tab-pane> 
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAccount from 'src/pages/data/recordquery/component/user_account.vue'
import userRecord from 'src/pages/data/recordquery/component/user_record.vue'
export default {
  components: {
    userAccount,
    userRecord
  },
  data() {
    return {
      activeKey: '2' // 默认为交易记录
    };
  },
};
</script>

<style lang="stylus" scoped>
>>>.ant-tabs-nav .ant-tabs-tab{
  font-size 14px;
  font-weight 600;
  color #3c4551;
}
>>>.ant-tabs-bar{
  margin 0 0 0 10px;
}
>>>.ant-table-small{
  border none
}
</style>
