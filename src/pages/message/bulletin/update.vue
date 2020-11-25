<template>
  <div class="full-width full-height">
    <div class="pl10x mt10x">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="消息中心"/>
        <q-breadcrumbs-el label="公告栏"/>
        <q-breadcrumbs-el label="更新公告" class="panda-text-1" />
      </q-breadcrumbs>
    </div>
    <div class="bg-panda-bg-6 shadow-3 border-radius-4px mall">
      <div class="pl20x pt10x">
        <a-form
          id="components-form-bullentin-edit"
          class="edit"
          :form="form"
          :layout="formLayout"
          @submit="handle_submit"
        >
          <a-form-item :style="{ width: '580px' }">
            <div class="text-panda-text-7 fw_600 mb10x">
              公告标题
              <span class="panda-text-red">*</span>
            </div>
            <div class="flex justify-between">
              <a-input
                placeholder="请输入公告标题"
                autocomplete="off"
                :style="{ width: '420px' }"
                v-decorator="[
                'title',
                { rules: [{ required: true, message: '公告标题不能为空！' }] },
              ]"
              />
              <a-checkbox
                class="height-36px line-height-36px"
                v-if="currentBulletin.isTag == 1"
                defaultChecked
                @change="handlerIsTag"
              >重要标记</a-checkbox>
              <a-checkbox
                class="height-36px line-height-36px"
                 v-if="currentBulletin.isTag == 0"
                @change="handlerIsTag"
              >重要标记</a-checkbox>
            </div>
          </a-form-item>
          <div class="flex">
            <a-form-item :style="{ width: '200px'}">
              <div class="text-panda-text-7 fw_600 mb10x">
                公告类型
                <span class="panda-text-red">*</span>
              </div>
              <a-select
                v-decorator="[
                  'noticeTypeId',
                  { rules: [{ required: true, message: '公告类型不能为空！' }] },
                ]"
                class="position-relative"
                placeholder="请选择公告类型"
              >
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in noticeList"
                  :key="index"
                >{{item.typeName}}</a-select-option>
              </a-select>
              <div class="position-absolute select-left-border"></div>
            </a-form-item>
            <a-form-item :style="{ width: '200px', marginLeft: '20px'}">
              <div class="text-panda-text-7 fw_600 mb10x">
                登录弹出
                <span class="panda-text-red">*</span>
              </div>
              <a-select
                v-decorator="[
                  'isPop',
                  { rules: [{ required: true, message: '登录弹出不能为空！' }] },
                ]"
                class="position-relative"
                placeholder="请选择"
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in loginList"
                  :key="index"
                >{{item.label}}</a-select-option>
              </a-select>
              <div class="position-absolute select-left-border"></div>
            </a-form-item>
          </div>
          <a-form-item>
            <div class="text-panda-text-7 fw_600 mb10x">
              发布范围
              <span class="panda-text-red">*</span>
            </div>
            <a-checkbox-group
              v-decorator="['releaseRange',{ rules: [{ required: true, message: '发布范围不能为空！' }] }]"
              :style="{ width: '750px' }"
            >
              <a-checkbox
                v-for="(item, index) in merchantList"
                :key="index"
                :value="item.value"
              >{{item.label}}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item :style="{ width: '580px' }">
            <div class="text-panda-text-7 fw_600 mb10x">
              赛事ID
            </div>
            <div class="flex justify-between">
              <a-input
                placeholder="请输入赛事ID"
                autocomplete="off"
                :style="{ width: '420px' }"
                v-decorator="[
                'standardMatchId',
              ]"
              />
            </div>
          </a-form-item>
          <!-- <a-form-item :style="{ width: '200px'}">
            <div class="text-panda-text-7 fw_600 mb10x">
              登录弹出
              <span class="panda-text-red">*</span>
            </div>
            <a-select
              v-decorator="[
                'isPop',
                { rules: [{ required: true, message: '登录弹出不能为空！' }] },
              ]"
              class="position-relative"
              placeholder="请选择"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in loginList"
                :key="index"
              >{{item.label}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border"></div>
          </a-form-item> -->
          <a-form-item>
            <div class="text-panda-text-7 fw_600 mb10x">
              正文
              <span class="panda-text-red">*</span>
            </div>
            <div>
              <quill-editor v-model="formData.context" width="800px" height="257px"></quill-editor>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="text-panda-text-7 fw_600 mb10x mt50x">上传</div>
            <div class="append-handle-btn-input flex">
              <a-upload
                name="file"
                :multiple="true"
                :custom_upload="custom_upload"
                :before_upload="before_upload"
              >
                <a-button>
                  <a-icon type="plus" />
                </a-button>
              </a-upload>
              <div class="ml20x height-36px flex" style="width: 600px;">
                <div
                  class="text-panda-text-3 cursor-pointer fs12 ml10x"
                  v-for="(item, index) in files"
                  :key="index"
                >
                  <span @click="handle_download(item)">{{item.name}}</span>
                </div>
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="mr20x mb20x" html-type="submit" :loading="loading">发布公告</a-button>
            <a-button type="primary" class="mr20x" @click="handle_save" :loading="loading1">保存</a-button>
            <a-button type="default" @click="handle_cancel">取消</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { api_base, api_message } from "src/api/index.js";
import editOrupdateMixin from "src/pages/message/bulletin/mixin/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import quillEditor from "src/components/bulletin/quillEditor.vue";
export default {
  mixins: [commontoolmixin, editOrupdateMixin],
  components: {
    quillEditor
  },
  data() {
    return {
      loading: false, // 发布公告loading
      loading1: false, // 保存草稿loading
      val: false,
      formData: {
        isTag: "",
        context: "",
        filePath: "" //文件路径
      }, //表单
      ajaxLoading: false,
      formLayout: "vertical",
      currentBulletin: {}
    };
  },
  watch: {
    "currentBulletin.uploadName"(val) {
      // console.log(val)
      if (val) {
        let names = val.split(";");
        let uploads = this.currentBulletin.upload.split(";");
        names.forEach((name, index) => {
          this.files.push({
            name: names[index],
            file: uploads[index]
          });
        });
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "bulletinUpdate" });
  },
  created() {
    this.init_bullentin_detail();
  },
  methods: {
    async init_bullentin_detail() {
      let params = {
        id: this.$route.query.id
      };
      let res = await api_message.post_manage_notice_detail(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentBulletin = data;
        let { title, isTag, releaseRange, isPop, context,noticeTypeId,standardMatchId  } = data;
        releaseRange = releaseRange && releaseRange.split(",");
        this.formData.context = context;
        this.formData.isTag = isTag;
        console.log(releaseRange, "releaseRange");
        let initValues = {
          title,
          noticeTypeId,
          releaseRange,
          isPop,
          standardMatchId
        };
        console.log(initValues, "initValues");
        this.$nextTick(() => {
          // this.formData.selection = releaseRange;
          this.form.setFieldsValue(initValues);
        });
      } else {
        this.$message.error(msg);
      }
    },
    /**
     * @description 发布公告
     * @return {undefined} undefined
     */
    handle_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.handle_need_to_params(values);
          values.isPublish = true;
          this.loading = true
          console.log("Received values of form: ", values, values.isTag);
          api_message.post_manage_notice_editPost(values).then(res => {
            this.loading = false;
            let { code, msg } = res.data;
            if (code === "0000000") {
              this.$message.success("发布公告成功！");
              this.handle_cancel();
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    handle_need_to_params(values) {
      let filePath = "";
      let fileName = "";
      this.files.map(item => {
        item.file && (filePath += item.file + ";");
        item.name && (fileName += item.name + ";");
      });
      values.id = this.$route.query.id;
      values.isTag = this.formData.isTag? this.formData.isTag: 0;
      values.context = this.formData.context;
      values.upload = filePath.slice(0, filePath.lastIndexOf(";"));
      values.uploadName = fileName.slice(0, fileName.lastIndexOf(";"));
      values.createdBy = this.get_user_info.userCode;
      return values;
    },
    /**
     * @description 保存按钮
     * @return {undefined} undefined
     */
    handle_save(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.handle_need_to_params(values);
          values.isPublish = false;
          console.log("Received values of form: ", values);
          this.loading1 = true
          api_message.post_manage_notice_editPost(values).then(res => {
            this.loading1 = false
            let { code, msg } = res.data;
            if (code === "0000000") {
              this.$message.success("保存草稿成功！");
              this.handle_cancel();
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    /**
     * @description 是否标记重要
     * @return {undefined} undefined
     */
    handlerIsTag(e) {
      this.formData.isTag = e.target.checked ? 1 : 0;
    },
    /**
     * @description 取消按钮
     * @return {undefined} undefined
     */
    handle_cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
// 复写antd中的input select样式
>>>.ant-input {
  height: 36px;
  line-height: 36px;
  padding: 0 11px;
}

>>>.ant-select-selection--single {
  height: 36px;
}

>>>.ant-select-selection__rendered {
  line-height: 36px;
}

>>>.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}

>>>.ant-form-explain {
  font-size: 12px;
}

// #components-form-bullentin-edit.edit {
// max-width: 480px;
// }
>>>.ant-checkbox-wrapper {
  margin-right: 30px;
}

// >>>.ant-input:hover {
// border-color: #3263FF;
// }

// >>>.ant-input:focus {
// border-color: #3263FF;
// }

// 复写input框
>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__control {
  min-height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 36px;
}

// form表单input样式重写
>>>.q-field__bottom--animated {
  bottom: 6px;
}

>>>.q-field__marginal {
  font-size: 14px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 12px;
}

>>>.ant-upload-list {
  display: none;
}
</style>
