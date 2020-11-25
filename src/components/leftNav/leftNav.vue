<!--
 * @Desc: 
 * @Date: 2020-05-16 16:38:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-24 17:47
 -->
<template>
  <a-layout-sider
    class="bg-panda-bg-6 border-right position-relative"
    :trigger="null"
    id="components-layout-demo-custom-trigger"
    collapsible
    v-model="collapsed"
  >
    <!-- <div class="logo" /> -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      @click="handlerClick"
      v-if="menuList.length > 0"
      mode="inline"
      theme="light"
      :inlineCollapsed="collapsed"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children && item.isShow" :key="item.path">
          <my-icon type="p-icon-zhuye" theme="filled" />
          <span>{{item.text}}</span>
        </a-menu-item>
      </template>
      <template v-for="item in menuList">
        <a-sub-menu
          :key="item.path"
          v-if="item.children && item.children.length > 0 && item.isShow"
        >
          <span slot="title">
            <my-icon :type="item.icon" theme="filled" style="font-size:16px;" />
            <span>{{item.text}}</span>
          </span>
          <template v-for="item1 in item.children">
            <a-menu-item  :key="item1.path"  v-if="item1.isShow">
              <span class="fs16">●</span>
              <span class="ml5x">{{ item1.text }}</span>
            </a-menu-item> 
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
    <div class="position-absolute ml10x" :style="!collapsed?'bottom:100px;': 'bottom:90px;'">
      <div
        :class="!collapsed ? 'panda-btn-toggle' : ''"
        class="text-center"
        @click="toggleCollapsed"
      >
        <my-icon
          class="trigger"
          style="margin-top: -5px;"
          :type="collapsed ? 'p-icon-zhankai2' : 'p-icon-zhankai1'"
        />
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from "vuex";
import menuList from "src/config/menu.js";
export default {
  data() {
    return {
      menuList,
      collapsed: false,
      rootSubmenuKeys: [], // 有children的menu
      openKeys: [], // //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [] // 当前选中的菜单项 key 数组
    };
  },
  created() {
    this.initRootSubMenu();
    this.get_user_info && this.initMenuList(this.menuList)
  },
  computed: {
    ...mapGetters(["get_user_info"]),
    initMenuList1() {
      // return this.menuList;
     menuList.map(item => {
        // item.isShow =  this.get_user_info.module.indexOf(item.text)> -1?true: false;
        if(!item.children){
          item.isShow = this.get_user_info.module.includes('首页')? true: false;
        }else{
          console.warn(this.get_user_info.module.includes('财务中心-清算管理'),'财务中心-清算管理');
          if(this.get_user_info.module.includes('商户中心-商户管理') || this.get_user_info.module.includes('商户中心-证书管理') || this.get_user_info.module.includes('商户中心-投注用户管理')){
            item.text === '商户中心' && (item.isShow = true);
            item.children.map(item1 => {
              item1.isShow = this.get_user_info.module.includes('商户中心-商户管理')?true: false;
              item1.isShow = this.get_user_info.module.includes('商户中心-证书管理')?true: false;
              item1.isShow = this.get_user_info.module.includes('商户中心-投注用户管理')?true: false;
            })
          }else{
            item.text === '商户中心' && (item.isShow = false);
          }
          
          if(this.get_user_info.module.includes('财务中心-清算管理') || this.get_user_info.module.includes('财务中心-对账单')){
            item.text === '财务中心' &&(item.isShow = true);
            item.children.map(item1 => {
              item1.isShow = this.get_user_info.module.includes('财务中心-清算管理')?true: false;
              item1.isShow = this.get_user_info.module.includes('财务中心-对账单')?true: false;
            })
          }else{
            item.text === '财务中心' && (item.isShow = false);
          }

          if(this.get_user_info.module.includes('数据中心-注单投注查询') || this.get_user_info.module.includes('数据中心-商户注单统计') || this.get_user_info.module.includes('数据中心-用户注单统计') || this.get_user_info.module.includes('数据中心-赛事投注统计')){
            item.text === '数据中心' && (item.isShow = true);
            item.children.map(item1 => {
              item1.isShow = this.get_user_info.module.includes('数据中心-注单投注查询')?true: false;
              item1.isShow = this.get_user_info.module.includes('数据中心-商户注单统计')?true: false;
              item1.isShow = this.get_user_info.module.includes('数据中心-用户注单统计')?true: false;
              item1.isShow = this.get_user_info.module.includes('数据中心-赛事投注统计')?true: false;
            })
          }else{
            item.text === '数据中心' && (item.isShow = false);
          }

          if(this.get_user_info.module.includes('消息中心-公告栏') || this.get_user_info.module.includes('消息中心-我的消息')){
            item.text === '消息中心' && (item.isShow = true);
            item.children.map(item1 => {
              item1.isShow = this.get_user_info.module.includes('消息中心-公告栏')?true: false;
              item1.isShow = this.get_user_info.module.includes('消息中心-我的消息')?true: false;
            })
          }else{
            item.text === '消息中心' && (item.isShow = false);
          }

          if(this.get_user_info.module.includes('设置中心-商户等级设置') || this.get_user_info.module.includes('设置中心-平台费率设置')){
            item.text === '设置中心' && (item.isShow = true);
            item.children.map(item1 => {
              item1.isShow = this.get_user_info.module.includes('设置中心-商户等级设置')?true: false;
              item1.isShow = this.get_user_info.module.includes('设置中心-平台费率设置')?true: false;
            })
          }else{
            item.text === '设置中心' && (item.isShow = false);
          }

        }
      })
      console.log(menuList,'###');
    }
  },
  methods: {
    initMenuList(menuList){
      menuList.forEach(item => {
        console.log(item.text,this.get_user_info.module.toString().includes(item.text) )
        if (this.get_user_info.module.toString().indexOf(item.text) >=0 ) {
          item["isShow"] = true;
        } else {
          item["isShow"] = false;
        }
        if (item.children) {
          this.initMenuList(item.children);  
        }
      })
      return menuList;
    },
    //初始化菜单有展开项的子集菜单
    initRootSubMenu() {
      let arr = this.menuList.filter(
        item => item.children && item.children.length > 0
      );
      arr.map(item => {
        this.rootSubmenuKeys.push(item.name);
      });
      console.log(this.rootSubmenuKeys, "initRootSubMenu");
    },
    // 点击菜单
    handlerClick(e) {
      console.log('click', e)
      this.$router.push({
        name: e.key
      });
    },
    // 切换左边导航的按钮
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // onOpenChange
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (this.openKeys.length > 0) {
          this.openKeys.pop();
        }
        if (this.selectedKeys.length > 0) {
          this.selectedKeys.pop();
        }
        this.openKeys.push(val.matched[1].name);
        this.selectedKeys.push(val.name);
        if (val.meta.father_menu) {
          this.selectedKeys = [...val.meta.father_menu];
        }
        console.log(this.selectedKeys, "当前选中的路由对应高亮菜单");
        console.log(this.openKeys, "需要展开的sub");
        console.log(val.meta, "meta对象");
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>