/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:38
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 10:32:49
 */
// import something here
import lodash from 'lodash';

// leave the export, even if you don't use it
export default async  ({ Vue }) => {
    // app, router, store,
    // something to do
    Vue.prototype.$lodash = lodash;
    // router.beforeEach((to, from, next) => {
    //   //现在您需要在这里添加验证逻辑，比如调用一个API
    // })
}