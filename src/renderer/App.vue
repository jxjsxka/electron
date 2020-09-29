<template>
  <div id="app">
    <div class="fix-header">
      <span style="-webkit-app-region: drag" class="title">
        <img class="logo" src="./assets/logo.png" alt srcset />
        <span>logo</span>
        <el-button type="text" @click="open1">我的信息</el-button>
        <el-button type="text" @click="logout">退出登录</el-button>
      </span>
      <!-- <i @click="close" class="el-icon-close"></i> -->
    </div>

    <div class="container">
      <el-menu router :default-active="active">
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/prolist">项目管理</el-menu-item>
        <el-menu-item index="/addpro">添加项目</el-menu-item>
        <el-menu-item index="/about">关于本狗</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import store from "./store";
export default {
  name: "deploy-dog",
  data() {
    return {
      active: "/login",
      input: ""
    };
  },
  methods: {
    close() {
      ipcRenderer.send("close");
    },
    logout() {
      sessionStorage.setItem("token", "false");
      this.$router.push("/login");
    },
    open1() {
      this.$alert("zymm", "我的信息", {
        confirmButtonText: "确定"
      });
    },
    open() {
      this.$confirm("此操作将退出账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(() => {
            this.$message.success("退出成功!");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.fix-header {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  padding: 0 26px;
}
.logo {
  width: 30px;
  height: 30px;
}
.title {
  flex: 1;
  text-align: center;
  vertical-align: middle;
}
.title img {
  vertical-align: middle;
}
.container {
  display: flex;
  padding-top: 50px;
  height: calc(100vh - 50px);
}
.pro-list {
  margin-left: 10px;
  padding-left: 10px;
  flex: 1;
}
.logo {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  font-family: "微软雅黑";
  color: #ffffff;
}
userinfo {
  text-align: right;
  float: right;
  line-height: 60px;
}
</style>
