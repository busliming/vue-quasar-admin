/*
 * @Desc: 
 * @Date: 2020-01-28 20:08:32
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 10:51:07
 */
// import something here

// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
// }

import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import 'src/css/antd/index.less'


import Vue from 'vue'
import { Button,Table,Menu,Icon,Layout,Col,Row, Dropdown,LocaleProvider,Tooltip,Progress, Tabs, Radio, DatePicker, Select, Upload, message, Badge, Popconfirm, Input, InputNumber, Form, Checkbox, Modal} from 'ant-design-vue';

// Vue.component(Button.name, Button);
// Vue.component(Table.name, Table);
// Vue.component(Menu.name, Menu);
// Vue.component(Icon.name, Icon);

export const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1635903_yghhyrp532c.js', // 在 iconfont.cn 上生成
});

Vue.component('my-icon', MyIcon)

Vue.use(Button)
Vue.use(Table)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(LocaleProvider)
Vue.use(Tooltip)
Vue.use(Progress)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Upload)
Vue.use(message)
Vue.use(Badge)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Row)
Vue.use(Modal)


Vue.use(Antd);
Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;