<!--
 * @Desc: 
 * @Date: 2020-02-21 20:12:14
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-21 21:52:20
 -->
 <template>
  <div class="editor_wrap">
    <!-- 图片上传组件辅助-->
    <div class="avatar-uploader">
      <input
        style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:200px;"
        type="file"
        name="inputfile1"
        @change="upload_avatar($event)"
        ref="inputfile1"
        accept="image/jpeg, image/gif, image/png, image/bmp"
      />
    </div>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      :style="{width,height}"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>
 
 <script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { api_public } from "src/api/index.js";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];
export default {
  components: {
    quillEditor
  },
  props: {
    /*编辑器的内容*/
    value: null,
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000 //kb
    },
    width: '',
    height: ''
  },
  data() {
    return {
      files: [],
      content: this.value,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "请输入正文",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {
    value(val) {
      this.content = this.value;
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      // 内容改变事件
      // console.log(editor, html, text)
      this.$emit("input", this.content);
    },
    onEditorBlur() {
      // 失去焦点事件
    },
    onEditorFocus() {
      // 获得焦点事件
    },
    // 上传图片
    upload_avatar(event) {
      let inputFile = event.target.files[0];
      const isLt2M = inputFile && inputFile.size / 1024 / 1024 < 5;
      const isWantImage =
        inputFile.type === "image/jpeg" ||
        inputFile.type === "image/png" ||
        inputFile.type === "image/gif" ||
        inputFile.type === "image/tif" ||
        inputFile.type === "image/bmp";
      if (!isWantImage) {
        this.$message.error("只支持上传png/jpeg/tif/gif/bmp,请重新上传！");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不超过5M,请重新上传");
        return;
      }
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("imageFile", inputFile);
      console.log(event);
      // 清空触发change时间
      event.target.value = "";
      api_public.put_manage_merchant_img_upload(formData).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          let quill = this.$refs.myQuillEditor.quill;
          // 如果上传成功
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(length, "image", 'data:image/jpg;base64,'+data.data);
          // 调整光标到最后
          quill.setSelection(length + 1);
          this.$message.success("上传图片成功");
        } else {
          this.$message.error("上传图片失败！请重新上传！");
        }
      });
    },
  }
};
</script>
 <style lang="stylus" scoped>
 .editor_wrap /deep/ .avatar-uploader {
   display: none;
 }

 .editor_wrap /deep/ .editor {
   line-height: normal !important;
   height: 270px;
   margin-bottom: 60px;
 }

 .editor_wrap /deep/ .editor .ql-bubble .ql-editor a {
   color: #136ec2;
 }

 .editor_wrap /deep/ .editor img {
   max-width: 300px;
   margin: 10px;
 }

 .editor_wrap /deep/ .ql-snow .ql-color-picker .ql-picker-options {
   padding: 3px 5px;
   width: 192px;
 }

 .editor_wrap /deep/ .ql-snow .ql-tooltip[data-mode='link']::before {
   content: '请输入链接地址:';
 }

>>>.ql-snow .ql-tooltip{
  left: 50px !important;
  top: 80px !important;
}

 .editor_wrap /deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
   border-right: 0px;
   content: '保存';
   padding-right: 0px;
 }

 .editor_wrap /deep/ .ql-snow .ql-tooltip[data-mode='video']::before {
   content: '请输入视频地址:';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-label::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-item::before {
   content: '14px';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
   content: '10px';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
   content: '18px';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
   content: '32px';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item::before {
   content: '文本';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
   content: '标题1';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
   content: '标题2';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
   content: '标题3';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
   content: '标题4';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
   content: '标题5';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
   content: '标题6';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-label::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-item::before {
   content: '标准字体';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
   content: '衬线字体';
 }

 .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before, .editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
   content: '等宽字体';
 }
</style>