<template>
  <div class="loginForm">
    <el-container>
      <el-main>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      user: {
        username: null,
        password: null,
        Identity: null
      },
      // ruleForm: {
      //   username: '',
      //   password: ''
      // },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        // alert(this.ruleForm.username == 'admin')
        // alert(this.$db.read().get('user').find({'userId': 'admin','password': '12345'}).value());
        // alert(this.$db.read().get('user').find({'userId': 'admin','password': '123456'}).value());
        if (valid) {
          // 如果表单拿到值了,数据库查用户信息
          let user = this.$db.read().get("user").find({username: this.ruleForm.username,password: this.ruleForm.password}).value();
          if (user) {
            this.user = user;
            sessionStorage.setItem("token", "true");
            sessionStorage.setItem("username", this.user.username);
            sessionStorage.setItem("Identity", this.user.Identity);
            // var obj = JSON.stringify(user)
            // var obj1 = JSON.parse(obj);
            // alert(sessionStorage.getItem("username"))     
            // alert(sessionStorage.getItem("Identity"))      
            _this.$router.push({ path: "/addpro" });
          } else {
            this.$message("你他妈连密码都记不住?????");
          }
        } else {
          this.$message("嘿嘿嘿,系统错误请联系帅哥管理员");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.$notify({
      title: "hello：",
      message: "what's your name",
      duration: 500
    });
  }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.zymmlogo {
  height: 100%;
  margin-top: 1px;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}

.loginForm {
  padding: 20px;
  width: 100vw;
  margin: 0 auto;
}
</style>
