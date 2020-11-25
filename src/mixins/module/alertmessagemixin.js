
export default {
    methods: {
        alert_message(res, fnsuccess, fnerror) {

            let code = this.$lodash.get(res, 'data.code')
                // code 值
            if (code == 200) {
                if (fnsuccess) {
                    fnsuccess()
                }
            } else {
                let message = this.$lodash.get(res, 'data.msg') || '操作失败！'
                this.$q.notify({
                    message:      `${message}` ,
                    color: 'negative'
                  })

                if (fnerror) {
                    fnerror()
                }
            }

        },
        alert_message_dev(message){
            this.$q.notify({
                message:      `${message}` ,
                color: 'negative'
              })

        },


        alert_message_default(res, fnsuccess, fnerror) {

            let code = this.$lodash.get(res, 'data.code')
                // code 值
            if (code == 200) {
                let message = this.$lodash.get(res, 'data.msg') || '操作成功！'
                this.$q.notify({
                    message:      `${message}` ,
                    color: 'position'
                  })
                if (fnsuccess) {
                    fnsuccess()
                }
            } else {
                let message = this.$lodash.get(res, 'data.msg') || '操作失败！'
                this.$q.notify({
                    message:      `${message}` ,
                    color: 'negative'
                  })

                if (fnerror) {
                    fnerror()
                }
            }

        },
    },
}

/**
 * {
  "code": 600,
  "msg": "参数校验失败",
  "data": [
    "賽事ID最小值不能小于1",
    "数据供应商编码不能为空",
    "操盘平台不能为空"
  ],
  "sucess": false,
  "fail": true
}
 *
 *
 *
 */