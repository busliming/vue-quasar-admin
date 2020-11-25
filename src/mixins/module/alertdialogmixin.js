export default {
    methods: {
        show_alert_dialog (message) {
            // this.show_alert_dialog(message)
            this.$q.dialog({
              title: '',
              message: message,
              html: true,
              persistent: true,
              ok: {
                  label: "确定",
                  color: 'panda-primary'
              },

            })
          },
    },
}

