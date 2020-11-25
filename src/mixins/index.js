/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-07 17:38:04
 */


// module
import baseconfigmixin from 'src/mixins/module/baseconfigmixin.js'

//一些工具函数
import commontoolmixin from 'src/mixins/common/commontoolmixin.js'

//对cookie增删改查
import cookiemixin from 'src/mixins/common/cookiemixin.js'

//币种常量
import constantmixin from 'src/mixins/common/constantmixin.js'

//后台排序
import sortertablemixin from 'src/mixins/module/sortertablemixin.js'
export default [
    baseconfigmixin,
    commontoolmixin,
    cookiemixin,
    sortertablemixin,
    constantmixin
]