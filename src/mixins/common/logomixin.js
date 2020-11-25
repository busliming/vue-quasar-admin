/*
 * @Desc: 
 * @Date: 2020-05-22 16:13:19
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-23 11:16:32
 */
import local_dev from 'src/assets/logo/local_dev.svg'
import local_test from 'src/assets/logo/local_test.svg'
import idc_pre from 'src/assets/logo/idc_pre.svg'
import idc_lspre from 'src/assets/logo/idc_lspre.svg'
import idc_online from 'src/assets/logo/idc_online.svg'
import online from 'src/assets/logo/online.svg'
export default {
  data() {
    return {
      logo: online
    }
  },
  methods: {
    initLogo() {
      switch (process.env.FRONT_WEB_ENV) {
        case 'local_dev':
          this.logo = local_dev;
          break;
        case 'local_test':
          this.logo = local_test;
          break;
        case 'idc_pre':
          this.logo = idc_pre;
          break;
        case 'idc_lspre':
          this.logo = idc_lspre;
          break;
        case 'idc_online':
          this.logo = idc_online;
          break;
        default:
          this.logo = online;
          break;
      }
    }
  },
}