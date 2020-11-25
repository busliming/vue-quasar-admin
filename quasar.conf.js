// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-jszy
console.log("--------------------------开始构建--------------------------");

let current_env = "local_local";

//  个人   开发环境
// current_env= 'local_local'
// 局域网  开发环境
// current_env = "local_dev";
// 局域网  压力测试环境
// current_env = "local_ylcs";
// 局域网  测试环境
current_env = "local_test";
//  IDC  预发布
//  current_env= 'idc_pre'
//  IDC  隔离预发布
//  current_env= 'idc_lspre'

current_env = process.env.FRONT_WEB_ENV || current_env;
let env = {
  // 在构建状态（生产版本）下   process.env.API_PREFIX
  API_PREFIX_MERCHANT: JSON.stringify("yewu6"),
  API_PREFIX_1: JSON.stringify("yewu5"), // API  商户 登录接口  10111
  API_PREFIX_2: JSON.stringify("yewu7"), // #业务  业务商户(panda-merchant-api)   10710
  API_PREFIX_3: JSON.stringify("yewu8"), // #业务  业务商户(panda-merchant-order) 10711
  API_PREFIX_4: JSON.stringify("yewu9"), //#业务  业务商户(merchant-manage)   10712
  API_PREFIX_5: JSON.stringify("yewu10"), //#业务  业务商户(panda-merchant-task) 10713
  API_PREFIX_6: JSON.stringify("yewu14"), //#业务  业务商户(panda-merchant-report-api) 10716
  API_PREFIX_FILE: JSON.stringify("file")
  // API_PREFIX_WBSOCKET: JSON.stringify("yewuws2")
};

let domain = {
  local_dev: "http://api.sportxxxkd1.com",
  local_test: "http://api.sportxxxifbdxm2.com",
  local_ylcs: "http://api.sportxxxvo3.com",
  idc_pre: "http://api.sportxxx278gwf4.com",
  idc_lspre: "http://api.sportxxx14bl5.com",
  idc_online: "https://api.sportxxxwo8.com"
};

let current_request_domain =
  process.env["FRONT_WEB_REQUEST_DOMAIN"] || domain[current_env];

console.log(" ");
console.log(" ");
console.log("------------读取当前配置环境------------------");
console.log("------------读取服务器反代域名配置  开始------------------");
console.log('process.env.NODE_ENV:    ' + process.env.NODE_ENV);
if (process.env.NODE_ENV != "development") {
  console.log("当前环境属于生产环境，将重置 current_request_domain  为空，以适应单个项目多域名运维 ");
  current_request_domain = ''
}

console.log("------------读取服务器反代域名配置  结束------------------");

console.log("------------读取当前代码打包输出环境  开始------------------");
console.log(
  "process.env.FRONT_WEB_ENV：    " +
  (process.env.FRONT_WEB_ENV || "当前环境未设置 FRONT_WEB_ENV")
);
console.log("最终结果：当前环境：  " + current_env);
console.log("最终结果：当前请求域名：  " + current_request_domain);
console.log("------------读取当前代码打包输出环境  结束------------------");

console.log(
  "------------附加输出当前代码内 domain 配置  开始------------------"
);
console.log(domain);

console.log(
  "------------附加输出当前代码内 domain 配置  结束------------------"
);
console.log("请注意以下几点：");
console.log("一： 切换 环境配置 需要 重启 项目");
console.log("二： 更改 quasar.conf.js 中的配置不需要 重启 项目 ");
console.log(" ");
console.log(" ");
console.log("--------------祝大家工作愉快！------------------");
console.log("--------------祝大家心想事成！------------------");
console.log(" ");
console.log(" ");
console.log("------------------------------jinnian----------");
console.log("------------------------------熊猫体育前端团队--");
console.log(" ");
console.log(" ");

let final_config = "";
if (current_env == "local_local") {
  final_config = {};
} else {
  let proxy = {
    "/yewu5": {
      target: `${current_request_domain}/yewu5`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu5": ""
      }
    },
    "/yewu6": {
      target: `${current_request_domain}/yewu6`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu6": ""
      }
    },
    "/yewu7": {
      target: `${current_request_domain}/yewu7`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu7": ""
      }
    },
    "/yewu8": {
      target: `${current_request_domain}/yewu8`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu8": ""
      }
    },
    "/yewu9": {
      target: `${current_request_domain}/yewu9`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu9": ""
      }
    },
    "/yewu10": {
      target: `${current_request_domain}/yewu10`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu10": ""
      }
    },
    "/yewu14": {
      target: `${current_request_domain}/yewu14`,
      changeOrigin: true,
      pathRewrite: {
        "^/yewu14": ""
      }
    },
    "/yewuws2": {
      target: `${current_request_domain}/yewuws2`,
      ws: true,
      pathRewrite: {
        "^/yewuws2": ""
      }
    }
  };



  /**
   * 这里附加其他 不用   组合前缀的 env  两个环境都要
   * 例如   env.AAAAA_AAAAA_CCC='/SS/VV'
   */



  env.API_PREFIX_URL_PREFIX =  JSON.stringify(
    "/v1/admin"
  );
  env.FRONT_WEB_ENV =  JSON.stringify(`${current_env}`)
  env.API_DOMAIN_PREFIX =  JSON.stringify("api");
  env.CURRENT_REQUEST_DOMAIN =  JSON.stringify(
    current_request_domain
  );


  final_config = {
    proxy: eval(proxy),
    env: eval(env),

  };
}

console.log("------------最终输出配置 开始------------------");
console.log(final_config);
console.log("------------最终输出配置 结束------------------");
console.log("------------查看当前服务器环境变量 开始------------------");
console.log(process.env);
console.log("------------查看当前服务器环境变量 结束------------------");
//  使用 方式
//  env: final_config.env ,
//  proxy: final_config.proxy

// console.log(process.env);
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"

    boot: ["i18n", "axios", "lodash", "vcharts"],
    //	preFetch	Boolean	Enable PreFetch Feature. 预加载 字辈路由  孙子辈的 不加载
    // preFetch: true,
    //css	Array	Global CSS/Stylus/… files from /src/css/, except for theme files, which are included by default.
    css: [
      /**
 *     'app.styl', // referring to /src/css/app.styl
     '~some-library/style.css' // referring to node_modules/some-library/style.css
 */
      "app.styl",
      "panda.styl",
      "common.styl",
      "panda_table.styl",
      "panda_button.styl",
      "pandaicon/variables.styl",
      "pandaicon/style.styl",
      "scrollbar.styl"
    ],
    //extras	Array	What to import from @quasar/extras package. Example: [‘material-icons’, ‘roboto-font’, ‘ionicons-v4’]
    extras: [
      "roboto-font",
      "material-icons" // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    //supportIE	Boolean	Add support for IE11+.
    supportIE: true,
    // htmlVariables	Object	Add variables that you can use in index.template.html.
    // htmlVariables: {},
    //animations	Object/String	What CSS animations to import. Example: [‘bounceInLeft’, ‘bounceOutRight’]
    animations: [],
    //framework	Object/String	What Quasar components/directives/plugins to import,
    // what Quasar language pack to use, what Quasar icon set to use for Quasar components.
    framework: {
      all: true, // --- includes everything; for dev only!

      // components: [
      //   'QLayout',
      //   'QHeader',
      //   'QDrawer',
      //   'QPageContainer',
      //   'QPage',
      //   'QToolbar',
      //   'QToolbarTitle',
      //   'QBtn',
      //   'QIcon',
      //   'QList',
      //   'QItem',
      //   'QItemSection',
      //   'QItemLabel',
      //   'QPageSticky',
      //   'QItem',
      //   'QCollapsible',

      // ],

      // directives: [
      //   'Ripple'
      // ],

      // plugins: ['Notify' /* ... */],

      // // Quasar config
      // // You'll see this mentioned for components/directives/plugins which use it

      config: {
        //https://quasar.dev/quasar-plugins/loading-bar
        loadingBar: {
          skipHijack: true
        }
      }
      // iconSet: 'material-icons', // default material-icons  requires icon library to be specified in "extras" section too,
      // https://github.com/quasarframework/quasar/tree/dev/ui/lang
      // lang: 'zh-hans', // Tell Quasar which language pack to use for its own components

      // cssAddon: true // Adds the flex responsive++ CSS classes (noticeable bump in footprint)
    },
    // https://quasar.dev/options/animations
    //https://daneden.github.io/animate.css/
    // animations: 'all', // --- includes all animations
    animations: [],
    // <!-- src/index.template.html -->
    // <%= htmlWebpackPlugin.options.title %>
    //这里的 htmlWebpackPlugin.options 可以直接读取到  package.json 里面的 数值
    htmlVariables: {
      title: "ToB商户后台管理系统",
      version_date: new Date().toLocaleString(),
      version_branch: process.env.GIT_BRANCH,
      version_tag: process.env.TAG,
      version_build_tag: process.env.BUILD_TAG,
      description: "ToB商户后台管理系统"
      // icon:"statics/favicon-icon.png",
    },
    //Use this property to change the default names of some files of your website/app if you have to.
    // All paths must be relative to the root folder of your project.
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router',
    //   store: 'src/store',
    //   indexHtmlTemplate: 'src/index.template.html',
    //   registerServiceWorker: 'src-pwa/register-service-worker.js',
    //   serviceWorker: 'src-pwa/custom-service-worker.js',
    //   electronMainDev: 'src-electron/main-process/electron-main.dev.js',
    //   electronMainProd: 'src-electron/main-process/electron-main.js'
    // },
    build: {
      // publicPath: '',
      //scopeHoisting: true,//	Boolean	Default: true. Use Webpack scope hoisting for slightly better runtime performance.
      // vueCompiler: true, //Include vue runtime + compiler version, instead of default Vue runtime-only
      //gzip: true,//	Boolean	Gzip the distributables. Useful when the web server with which you are serving the content does not have gzip.

      // analyze: true, //Show analysis of build bundle with webpack-bundle-analyzer. If using as Object, it represents the webpack-bundle-analyzer config Object.
      // extractCSS: false,
      /**
       * env: Add properties to process.env that you can use in your website/app JS code.
       *  Each property needs to be JSON encoded. Example: { SOMETHING: JSON.stringify(‘someValue’) }.
       */

      env:  final_config.env ,
      //https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) { },
      // afterBuild() {
      // 打包后 可以直接 通过插件上传 Git ftp 等
      // },
      // vueRouterMode:'hash', // 默认 hash  history 模式需要服务端配合
      // htmlFilename:'index.html',	//String	Default is ‘index.html’.
      //productName	:'',//String	Default value is taken from package.json > productName field.
      // distDir:'',//Default is ‘dist/{ctx.modeName}’ // Applies to all Modes except for Cordova (which is forced to src-cordova/www).
      //https://webpack.js.org/configuration/devtool/
      //  devtool:'',//	String	Source map strategy to use.
      //https://github.com/webpack-contrib/terser-webpack-plugin/#minify
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: false, //console
          pure_funcs: ["console.log",'alert','prompt','comfirm', "window.confirm"] //移除console
        }
      }
      // stylusLoaderOptions	Object	Options to supply to stylus-loader.
      // scssLoaderOptions	Object	Options to supply to sass-loader for .scss files.
      // sassLoaderOptions	Object	Options to supply to sass-loader for .sass files.
      // lessLoaderOptions	Object	Options to supply to less-loader.

      //preloadChunks:"true",//	Boolean	Default is “true”. Preload chunks when browser is idle to improve user’s later navigation to the other pages.

      // 以下 配置 默认，不要更改
      /**
       * The following properties of build are automatically configured by Quasar CLI depending on dev/build
       * commands and Quasar mode. But if you like to override some (make sure you know what you are doing), you can do so:
       */
      // extractCSS	Boolean	Extract CSS from Vue files
      // sourceMap	Boolean	Use source maps
      // minify	Boolean	Minify code (html, js, css)
      // webpackManifest	Boolean	Improves caching strategy. Use a webpack manifest (runtime) file to avoid cache bust on vendor chunk changing hash on each build.
    },
    /**
     * Webpack dev server options. Some properties are overwritten based on the Quasar mode you’re using in order to ensure a correct config.
     *  Note: if you’re proxying the development server (i.e. using a cloud IDE), set the public setting to your public application URL.
     */
    devServer: {
      // https://webpack.js.org/configuration/dev-server/

      // https: true,
      /**
       * When you set devServer > https: true in your quasar.conf.js file,
       * Quasar will auto-generate a SSL certificate for you. However,
       *  if you want to create one yourself for your localhost, then check out this blog post by Filippo.
       * Then your quasar.conf.js > devServer > https should look like this:
       */
      // const fs = require('fs')
      // https: {
      //   key: fs.readFileSync('/path/to/server.key'),
      //   cert: fs.readFileSync('/path/to/server.crt'),
      //   ca: fs.readFileSync('/path/to/ca.pem'),
      // }
      // port: 8080,
      // public:'',//	String	Public address of the application (for use with reverse proxies)
      host: "www.panda.com", //String	Local IP/Host to use for dev server
      open: true, // opens browser window automatically
      port: 8090,
      proxy: final_config.proxy
    },
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "statics/common/icons/icon-128_128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/common/icons/icon-192_192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "statics/common/icons/icon-256_256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "statics/common/icons/icon-384_384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "statics/common/icons/icon-512_512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  };
};
