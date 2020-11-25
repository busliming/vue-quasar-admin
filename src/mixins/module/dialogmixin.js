import alertdialogmixin from "src/mixins/module/alertdialogmixin.js";
let style;
export default {
  mixins: [alertdialogmixin], // show_alert_dialog
  methods: {
    init_dialog_base(name, title) {
      this[`dialog_${name}_visiable`] = true;
      this[`dialog_${name}_title`] = title;
    },

    close_dialog_base(name) {
      this[`dialog_${name}_visiable`] = false;
    },

    begin_script_dialog_process(message, fnonOk, fnonCancel, oklabel = '确定', cancellabel = '取消') {
      this.$q
        .dialog({
          title: "",
          message: message,
          html: true,
          persistent: true,
          cancel: {
            color: "panda-base-grey",
            label: cancellabel,
            textColor: "white"
          },
          ok: {
            // color: 'panda-primary',
            label: oklabel
          },
        })
        .onOk(() => {
          if (fnonOk) {
            fnonOk();
          }
        })
        .onCancel(() => {
          console.log("Cancel");
          if (fnonCancel) {
            fnonCancel();
          } else {
            this.finish_script_dialog_process_default();
          }
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    finish_script_dialog_process_default() {
      this.$q.notify({
        message: "您已选择取消操作。",
        color: "info",
        position: "bottom",
        timeout: 1500,
        color: "grey-5",
        textColor: "white"
      });
    },
    handle_dialog_onOk_callback_success(msg, fnonOK) {
      let message = `<div >${msg}</div>`;
      this.$q
        .dialog({
          title: "",
          message: message,
          html: true,
          persistent: true,
          ok: {
            color: 'panda-primary',
            label: "确定"
          }
        })
        .onOk(() => {
          if (fnonOK) {
            fnonOK();
          }
        });
    },
    //切换黑名单   用户管理界面
    confirm_black_user_dialog(message, fnonOk, fnonCancel, cancellabel = '取消', oklabel = '确定') {
      this.$q
        .dialog({
          title: "",
          message: message,
          html: true,
          persistent: true,
          cancel: {
            color: "panda-primary",
            label: oklabel,
            textColor: "white"
          },
          ok: {
            color: 'panda-base-grey',
            label: cancellabel
          },
        })
        .onOk(() => {
          if (fnonCancel) {
            fnonCancel();
          } else {
            this.finish_script_dialog_process_default();
          }
        })
        .onCancel(() => {
          if (fnonOk) {
            fnonOk();
          }
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    //用户管理页面
    handle_dialog_operate_onOk_callback_success(msg, text, fnonOK) {
      let message = `<div >${msg}</div>`;
      this.$q
        .dialog({
          title: "",
          message: message,
          html: true,
          persistent: true,
          ok: {
            color: 'panda-primary',
            label: text
          }
        })
        .onOk(() => {
          if (fnonOK) {
            fnonOK();
          }
        });
    },
    handle_dialog_onOk_callback_error(msg, fnonOK) {
      let message = `<div >${msg}</div>`;
      this.$q
        .dialog({
          title: "",
          message: message,
          html: true,
          persistent: true,
          ok: {
            color: 'panda-primary',
            label: "确定"
          }
        })
        .onOk(() => {
          if (fnonOK) {
            fnonOK();
          }
        });
    },
    // 注入样式表
    inject_dynamic_style(cssText) {
      this.delete_injected_dynamic_style(style);
      style = document.createElement("style");
      document.body.append(style);
      if (style.styleSheet) {
        style.styleSheet.cssText = cssText;
      } else {
        style.appendChild(document.createTextNode(cssText));
      }
    },
    // 删除样式表
    delete_injected_dynamic_style() {
      if (style) {
        style.remove();
      }
    },
  }
};
