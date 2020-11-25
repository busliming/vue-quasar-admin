const routes = [
  // {
  //   path: "/",
  //   component: () => import("src/pages/login2/login.vue")
  // },
  {
    path: "/",
    redirect: { name: "login" },
    component: () => import(/* webpackChunkName: "login" */ "src/pages/login/index.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/login.vue")
      },

      {
        path: "newpassword",
        name: "newpassword",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/newpassword.vue")
      },
      {
        path: "password",
        name: "password",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/password.vue")
      },
      {
        path: "no_auth",
        name: "no_auth",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/permission/index.vue")
      },

    ]
  },
  {
    path: "/main",
    name: "main_container",
    component: () => import("src/layouts/MyLayout.vue"),
    children: [
      //  首页
      {
        path: "home",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "src/pages/home/index.vue")
      },

      //商户中心
      {
        path: "merchant_centre",
        name: "merchant_centre",
        component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/index.vue"),
        children: [
          {
            path: "merchantc",
            name: "merchantc",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/index.vue"),
          },
          {
            path: "merchantc_edit",
            name: "merchantc_edit",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/edit.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "merchantc_update",
            name: "merchantc_update",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/update.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "merchantc_channel_edit",
            name: "merchantc_channel_edit",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/channelEdit.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "merchantc_channel_update",
            name: "merchantc_channel_update",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/channelUpdate.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "merchantc_second_edit",
            name: "merchantc_second_edit",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/secondEdit.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "merchantc_second_update",
            name: "merchantc_second_update",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/merchantc/secondUpdate.vue"),
            meta: {
              father_menu: ['merchantc']
            }
          },
          {
            path: "key_management",
            name: "key_management",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/key/index.vue")
          },

          {
            path: "betting_user",
            name: "betting_user",
            component: () => import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/bettinguser/index.vue")
          },
          // 折线图
          {
            path: "betting_user_detail",
            name: "betting_user_detail",
            component: () =>
              import(/* webpackChunkName: "merchant_centre" */ "src/pages/merchant/bettinguser/user_detail.vue"),
            meta: {
              father_menu: ['betting_user']
            }
          }
        ]
      },
      //  财务中心
      {
        path: "finance",
        name: "finance",
        component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/index.vue"),
        children: [
          {
            path: "liquidation",
            name: "liquidation",
            component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/liquidation/index.vue"),
          },
          {
            path: "statements",
            name: "statements",
            component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/statements/index.vue"),

          },
        ]
      },
      //数据中心
      {
        path: "data_center",
        name: "data_center",
        component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/index.vue"),
        children: [
          {
            path: "match_bonus",
            name: "match_bonus",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/matchbonus/index.vue")
          },
          {
            path: "bet_slip",
            name: "bet_slip",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/betslip/index.vue")
          },
          {
            path: "record_query",
            name: "record_query",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/recordquery/index.vue")
          },
          {
            path: "merchant_note",
            name: "merchant_note",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/merchantnote/index.vue")
          },
          {
            path: "users",
            name: "users",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/users/index.vue")
          },
          {
            path: "users_user_detail",
            name: "users_user_detail",
            component: () => import(/* webpackChunkName: "data_center" */ "src/pages/data/userdetail/index.vue"),
            meta: {
              father_menu: ['users']
            }
          }
        ]
      },
      //消息中心
      {
        path: "message_center",
        name: "message_center",
        component: () => import(/* webpackChunkName: "message_center" */ "src/pages/message/index.vue"),
        children: [
          {
            path: "bulletin",
            name: "bulletin",
            component: () => import(/* webpackChunkName: "message_center" */ "src/pages/message/bulletin/index.vue")
          },
          {
            path: "bulletin_edit",
            name: "bulletin_edit",
            component: () => import(/* webpackChunkName: "message_center" */ "src/pages/message/bulletin/edit.vue"),
            meta: {
              father_menu: ['bulletin']
            }
          },
          {
            path: "bulletin_update",
            name: "bulletin_update",
            component: () => import(/* webpackChunkName: "message_center" */ "src/pages/message/bulletin/update.vue"),
            meta: {
              father_menu: ['bulletin']
            }
          },
          {
            path: "mymessage",
            name: "mymessage",
            component: () => import(/* webpackChunkName: "message_center" */ "src/pages/message/mymessage/index.vue")
          },

        ]
      },
// 测试页面
// {
//   path: "test",
//   name: "test",
//   component: () => import("src/pages/test/ant/index.vue")

// },


      //设置中心
      {
        path: "setting",
        name: "setting",
        component: () => import(/* webpackChunkName: "setting" */ "src/pages/data/index.vue"),
        children: [
          {
            path: "merchantlevel",
            name: "merchantlevel",
            component: () => import(/* webpackChunkName: "setting" */ "src/pages/set/merchantlevel/index.vue")
          },
          {
            path: "platformrate",
            name: "platformrate",
            component: () => import(/* webpackChunkName: "setting" */ "src/pages/set/platformrate/index.vue")
          },
          {
            path: "logquery",
            name: "logquery",
            component: () => import(/* webpackChunkName: "setting" */ "src/pages/set/logquery/index.vue")
          },
        ]
      }
    ]
  }
];

// Always leave this as last one
if (process.env.mOde !== "ssr") {
  routes.push({
    path: "*",
    component: () => import(/* webpackChunkName: "login" */ "src/pages/error/error404.vue")
  });
}

export default routes;
