<template>
  <a-layout id="components-layout-demo-custom-trigger" class="full-width full-height">
    <q-resize-observer />
    <a-layout-header id="top" class="bg-panda-bg-6 height-80px border-bottom" style="padding: 0;">
      <q-toolbar>
        <!-- 左边logo -->
        <img class="ml35x" :src="logo" height="52px" alt srcset />
        <q-toolbar-title class="fs20 fw_600"></q-toolbar-title>
        <div class="flex items-center q-gutter-lg fs20 text-black">
          <!-- 跑马灯组件 -->
          <marquee></marquee>
          <a-badge
            v-if="get_amount && get_amount.bulletin>0"
            style="margin-top: 25px;margin-right: 20px"
            class="text-panda-text-4 cursor-pointer"
            dot
            @click="go_to_page('bulletin')"
          >
            <a-icon style="font-size: 22px;"  theme="filled" type="sound" />
          </a-badge>
          <a-icon  type="sound" @click="go_to_page('bulletin')" class="mr20x" theme="filled" style="font-size: 22px; color: #8a92a5" v-else />
          <a-badge
            v-if="get_amount && get_amount.message > 0"
            style="margin-top: 25px;"
            class="text-panda-text-4 cursor-pointer"
            dot
            @click="go_to_page('mymessage')"
          >
            <q-icon class="panda-icon panda-icon-gong-gao fs20"></q-icon>
          </a-badge>
          <q-icon
            @click="go_to_page('mymessage')"
            style="margin-left: 0px"
            v-else
            class="panda-icon panda-icon-gong-gao fs20 cursor-pointer"
          ></q-icon>
          <div class="username text-black fs16">{{get_user_info.userCode}}</div>
          <!-- 下拉菜单 -->
          <a-dropdown :trigger="['click']" class="mr20x">
            <a class="ant-dropdown-link" href="#">
              <img
                class="border_radius mr20x"
                src="~assets/img/yong-hu.svg"
                width="42"
                height="42"
                alt
              />
              <a-icon type="down" style="fontSize: 16px; color: #838CA1" />
            </a>
            <a-menu slot="overlay" class="fs14" @click="handle_menu_click">
              <a-menu-item v-for="(item, index) in menuList" :key="index">
                <a>
                  <a-icon :type="item.type" class="mr10x"></a-icon>
                  {{item.label}}
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </q-toolbar>
    </a-layout-header>
    <a-layout>
      <!-- 左边菜单栏 -->
      <left-nav></left-nav>
      <a-layout-content>
        <!-- 中间内容页面 -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="stylus" scoped>
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  background: #1890ff;
  margin: 16px;
}

// 分页
>>> .ant-table-pagination.ant-pagination {
  // margin-right: 30px;
  // margin-top 5px;
  // margin-bottom 10px;
}

>>>.ant-badge-dot {
  margin-top: 2px;
  margin-right: 2px;
}

.seamless-warp {
  height: 35px;
  overflow: hidden;
}

ul, li {
  list-style: none;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import { api_login } from "src/api/index.js";
import menu from "src/config/menu.js";
import merchantMenu from "src/config/merchantMenu.js";
import marquee from "src/components/header/marquee.vue";
import leftNav from "src/components/leftNav/leftNav.vue";
import logomixin from 'src/mixins/common/logomixin.js'

export default {
  name: "MyLayout",
  components: {
    marquee,
    leftNav
  },
  mixins: [logomixin],
  data() {
    return {
      menu: menu,   // 菜单配置项
      collapsed: false, //是否展开
      rootSubmenuKeys: [], // 有children的menu
      openKeys: [], // //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [], // 当前选中的菜单项 key 数组
      menuList: [
        // { label: "修改密码", type: "lock" },
        { label: "退出登录", type: "poweroff" }
      ],
      logo: ''
    };
  },
  created() {
    window.$router = this.$router;
    this.initRootSubMenu();
    this.initLogo();
  },
  mounted() {
    window.onresize = () => {
      this.set_window_size_info({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    }
  },
  watch: {
    /**
     * @description 进入页面默认展开子菜单，并且高亮
     * @param  {Object} 路由对象
     * @return {undefined} undefined
     */
    $route: {
      handler(val) {
        if (this.openKeys.length > 0) {
          // 展开
          this.openKeys.pop();
        }
        if (this.selectedKeys.length > 0) {
          // 选中高亮
          this.selectedKeys.pop();
        }
        this.openKeys.push(val.matched[1].name);
        this.selectedKeys.push(val.name);
        if (val.meta.father_menu) {
          this.selectedKeys = [...val.meta.father_menu];
        }
        // 不在用户投注页面时清除session
        if (val.name != "users" && val.name != "users_user_detail") {
          this.$q.sessionStorage.getItem("selectedDate") &&
            this.$q.sessionStorage.remove("selectedDate");
          this.$q.sessionStorage.getItem("cachParams") &&
            this.$q.sessionStorage.remove("cachParams");
        }
        console.log(this.selectedKeys, "当前选中的路由对应高亮菜单");
        console.log(this.openKeys, "需要展开的sub");
        console.log(val.meta, "meta对象");
      },
      immediate: true,
      deep: true
    },
  },
  computed: {
    ...mapGetters(["get_user_info", "get_amount", 'get_window_size_info']),
  },
  methods: {
    ...mapActions({
      set_window_size_info: "set_window_size_info",
      clear_user_info: "clear_user_info"
    }),
    /**
     * @description 点击icon跳转对应的路由
     * @param  {String} 路由名称
     * @return {undefined} undefined
     */
    go_to_page(val) {
      this.$router.push({ name: val });
    },
    /**
     * @description 初始化菜单有展开项的子集菜单
     * @return {undefined} undefined
     */
    initRootSubMenu() {
      let arr = this.menu.filter(
        item => item.children && item.children.length > 0
      );
      arr.map(item => {
        this.rootSubmenuKeys.push(item.name);
      });
      console.log(this.rootSubmenuKeys, "initRootSubMenu");
    },
    /**
     * @description 退出登录
     * @param  {Object} 点击事件对象
     * @return {undefined} undefined
     */
    handle_menu_click(e) {
      if (this.menuList[e.key].label === "退出登录") {
        let params = {
          appId: 10008
        };
        api_login.getLogout(params).then(res => {
          let { code, message } = res.data;
          if (code == "00000000") {
            // 登出成功，清除本地和vuex
            this.$q.sessionStorage.remove("userInfo");
            this.clear_user_info();
            this.$router.push({ name: "login" });
            this.$message.success("退出登录成功！");
          } else {
            this.$message.error("服务异常！请联系管理员！");
          }
        });
      }
    }
  }
};
</script>
