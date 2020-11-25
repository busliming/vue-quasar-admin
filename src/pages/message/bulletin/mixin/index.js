/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 18:20
 */
import { mapGetters } from 'vuex'
import { api_public,FILE_PREFIX,api_message } from "src/api/index.js";

export default {
  data() {
    return {
      merchantList: [
        // 商户种类
        { label: "直营商户", value: "1" },
        { label: "渠道商户", value: "2" },
        { label: "二级商户", value: "3" },
        { label: "投注用户", value: "4" },
        { label: "panda内部用户", value: "5" },
      ],
      loginList: [
        //登录弹出
        { label: "是", value: 1 },
        { label: "否", value: 0 }
      ],
      files: [], //文件路径
      noticeList: this.$q.sessionStorage.getItem('noticeList') || []
    };
  },
  methods: {
    //文件上传限制
    before_upload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("单个文件大小不能超过20M！请重新上传");
      }
      return isLt2M;
    },
    // 文件上传
    custom_upload(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      // formData.append("token", "aiufpaidfupipiu"); //随便写一个token示例
      console.log(formData, "formData");
      this.save_file(formData);
    },
    // 文件上传前后端联调
    save_file(formData) {
      if (this.files.length < 5) {
        api_public
          .post_manage_merchant_file_upload(formData)
          .then(res => {
            console.log(res)
            let { code } = res.data;
            if (code === "0000000") {
              let { fileName, filePath } = res.data.data;
              this.files.push({
                name: fileName,
                file: filePath
              });
              this.$message.success(`${fileName}文件上传成功！`);
              this.$q.localStorage.set("files",this.files);
            }else{
              this.$message.error("文件上传失败！请重试！");
            }
          })
      } else {
        this.$message.error("文件上传最多不超过5个！");
      }
    },
    // 下载文件
    handle_download(item) {
      console.log(item);
      let params = {
        fileName: item.name,
        filePath: item.file
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          console.log(res)
          this.$message.success(`下载${item.name}成功!`);
          window.open(FILE_PREFIX + item.name + "&filePath=" + item.file+ "&user-id="+this.get_user_info.userId+"&app-id="+this.get_user_info.appId);
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    handle_remove(item, index) {
      this.files.splice(index, 1);
      this.$q.localStorage.set("files",this.files);
      this.$message.warn("删除" + item.name + "成功！");
    },
    async init_notice_list(){
      let res = await api_message.post_manage_notice_noticeType({})
      console.log(res)
      if(res.data.code === '0000000'){
        this.noticeList = this.computedNeededData(res.data.data);
      }else{
        this.noticeList = [];
      }
    },
  },
  computed: {
    ...mapGetters(['get_user_info'])
  }
};
