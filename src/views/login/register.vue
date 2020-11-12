<template>
  <el-dialog
    title="注册"
    class="register"
    center
    :visible.sync="dialogFormVisible"
    :show-close="false"
    width="600px"
  >
    <div slot="title" class="dialogTitle">用户注册</div>
    <el-form
      :model="form"
      :label-width="formLabelWidth"
      ref="rulesForm"
      :rules="rulesForm"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.avatar"
            :src="baseUrl + '/' + form.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="code" :src="codeUrl" alt @click="changeCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- <el-button @click="getRcodeClick">获取用户验证码</el-button> -->
            <el-button
              v-if="this.count > 0 && this.count <= 60"
              class="count"
              :disabled="this.count > 0 && this.count <= 60"
              >距离获取还有{{ count }} s</el-button
            >
            <el-button v-else @click="getRcodeClick" style="width: 100%"
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userSendsms, codeUrl, userRegister } from "@/api/register";
export default {
  username: "register",
  data() {
    return {
      imgUrl: "",
      count: "",
      timer: null,
      codeUrl: codeUrl(),
      dialogFormVisible: false,
      form: {
        username: "",
        phone: "",
        email: "",
        password: "",
        code: "",
        rcode: "",
        avatar: "",
      },
      rulesForm: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式有误",
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式格式有误",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "change" },
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "change" },
        ],
      },
      formLabelWidth: "70px",
      baseUrl: process.env.VUE_APP_BASEURL,
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      // console.log(file);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      // file.type === 'image/png'||
      // file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是JPG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      window.console.log(res);
      this.form.avatar = res.data.file_path;
      // 上传成功后由于该组件内部没有执行它的表单验证,所以我们要人为触发
      // 父传子(父调用字方法)1: 在子组件标签定义ref
      // this.imageUrl = res.data.file_path
      this.$refs.rulesForm.validateField(["avatar"]);
    },
    changeCode() {
      this.codeUrl = codeUrl() + `${Date.now()}`;
    },
    getRcodeClick() {
      // validateField可以检查form里面的数据是否符合样式,form自带的方法
      let num = 0;
      this.$refs.rulesForm.validateField(["phone", "code"], (err) => {
        // console.log(err);
        if (!err) {
          num++;
        }
      });
      if (num == 2) {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        userSendsms({
          code: this.form.code,
          phone: this.form.phone,
        }).then((res) => {
          console.log(res);
          this.$message.success("你的验证码是" + res.data.data.captcha);
        });
      } else {
        this.$message.error("数据格式有误,请检查");
      }
    },
    submitRegister() {
      // let num1 = 0
      this.$refs.rulesForm.validate((result) => {
        if (result) {
          userRegister(this.form).then((res) => {
            console.log(res);
            this.$message.error(res.data.message);
          });
        } else {
          this.$message.error("数据格式有误,请检查");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialogTitle {
  height: 53px;
  background: rgba(3, 192, 249, 1);
  color: #fff;
  text-align: center;
  line-height: 53px;
}
</style>

<style lang="less">
.el-dialog__header {
  padding: 0;
}
.code {
  width: 142px;
  height: 40px;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>