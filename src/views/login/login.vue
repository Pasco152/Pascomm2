<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt="" />
        <span class="titleName">Pasco面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <!-- prefix-icon是输入框头部图标，后面的值为icon的对应字符串 -->
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="0">
            <el-col :span="16">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="form.code"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" src="@/assets/img/login_code.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="sure">
          <el-checkbox v-model="form.sure">
            <span>
              我已阅读并同意
              <span class="color1">用户协议</span>和
              <span class="color1">隐私条款</span>
            </span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm"
            >登陆</el-button
          >
          <br />
          <el-button class="btn" type="primary" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_img.png" alt />
    </div>
    <register ref="register"></register>
  </div>
</template>
<script>
import register from './register'
export default {
  name: "login",
  components:{
    register
  },
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        sure: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "change" },
        ],
        sure: [
          {
            required: true,
            message: "请阅读并同意不平等条约",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      window.console.log(this.form)
      this.$refs.form.validate((result) => {
        window.console.log(result)
      });
    },
    registerClick() {
      this.$refs.register.dialogFormVisible = true
    }
  },
};
</script>
<style lang="less">
// lang是language的缩写
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background-color: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    // 表单布局
    .form {
      padding-top: 30px;
      .code {
        width: 100%;
        height: 40px;
        padding-top: 3px;
        border: 1px dashed #ccc;
      }
      .color1 {
        color: #3296fa;
      }
      .btn {
        width: 100%;
      }
      .btn:last-child {
        margin-top: 26px;
      }
    }
  }
}
</style>