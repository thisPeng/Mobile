<template>
  <div class="login">
    <!-- <div class="login-logo">
      <i class="iconfont icon-leicailiaojiagongx"></i>
    </div> -->
    <div class="logo">
      <img src="img\icons\android-chrome-512x512.png" alt="logo">
    </div>
    <div class="login-title">材博汇供应链系统</div>
    <div class="login-form">
      <form @submit.prevent="userLogin()">
        <div class="login-form-input">
          <span class="input-icon">
            <i class="iconfont icon-zhanghao"></i>
          </span>
          <input v-model="loginName" type="text" name="loginName" placeholder="请输入账号" autocomplete="off">
        </div>
        <div class="login-form-input">
          <span class="input-icon">
            <i class="iconfont icon-mima"></i>
          </span>
          <input v-model="password" type="password" name="password" ref="password" placeholder="请输入密码" autocomplete="off">
          <span class="input-show" @click="pwdShow">
            <i class="iconfont icon-xianshi" v-show="isShow"></i>
            <i class="iconfont icon-yincang" v-show="!isShow"></i>
          </span>
        </div>
        <div class="login-form-input login-form-button">
          <!-- <div class="login-form-check">
            <span class="check-option">
              <router-link :to="{ name:'index' }">忘记密码</router-link>
            </span>
          </div> -->
          <div class="button-option">
            <van-button type="primary">登 录</van-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import computed from "./../../assets/js/computed.js";
import { login, users } from "./../../assets/js/api.js";

export default {
  name: "login",
  data() {
    return {
      banner: "",
      loginName: "",
      password: "",
      isShow: false
    };
  },
  computed,
  methods: {
    // 登录
    userLogin() {
      if (this.loginName.length > 0 && this.password.length > 0) {
        const params = {
          loginName: this.loginName,
          password: this.password
        };
        login.validate(params).then(res => {
          if (res && res.text != "0") {
            users.userInfo().then(result => {
              if (result) {
                this.$store.commit("cleanStore", true);
                this.$store.commit("userInfo", result);
                this.$store.commit("loginInfo", {
                  login: this.loginName,
                  pwd: this.password
                });
                users.userId(result.oid).then(res => {
                  if (res && res.status === 1) {
                    const uId = JSON.parse(res.text)[0];
                    this.$store.commit("userId", uId);
                    this.$parent.isMenu = true;
                    users.userType(uId.UCML_OrganizeOID).then(r => {
                      try {
                        this.$store.commit(
                          "userType",
                          JSON.parse(r.text).UserType
                        );
                        if (r && r.status === 1) {
                          this.$router.replace({
                            name: "index"
                          });
                        }
                      } catch (e) {
                        if (r && r.status === 1) {
                          this.$router.replace({
                            name: "index"
                          });
                        }
                        console.log(e);
                      }
                    });
                  }
                });
              }
            });
          } else {
            this.$toast("用户名或密码错误");
          }
        });
      }
    },
    // 显示隐藏密码
    pwdShow() {
      if (this.isShow) {
        this.$refs.password.setAttribute("type", "password");
        this.isShow = false;
      } else {
        this.$refs.password.setAttribute("type", "text");
        this.isShow = true;
      }
    }
  },
  mounted() {
    if (this.loginInfo.login && this.loginInfo.pwd) {
      this.loginName = this.loginInfo.login;
      this.password = this.loginInfo.pwd;
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  padding-top: 15%;
  .logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .login-logo {
    width: 75px;
    height: 75px;
    border-radius: 75px;
    margin: 0 auto;
    background-color: #00a0e9;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      color: #fff;
      font-size: 50px;
    }
  }
  .login-title {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .login-form {
    width: 100%;
    margin-top: 20px;
    .login-form-input {
      width: 85%;
      margin: 10px auto;
      border-bottom: 1px solid #d2d2d2;
      display: flex;
      align-items: center;
      position: relative;
      > .input-icon {
        flex: 1;
        color: #333;
        font-size: 22px;
        text-align: center;
        .iconfont {
          font-size: 20px;
        }
      }
      > input {
        flex: 12;
        height: 35px;
        border: 0;
        padding-left: 10px;
        font-size: 16px;
        display: inline-block;
        -webkit-appearance: none;
      }
      .input-show {
        font-size: 20px;
        margin-right: 10px;
        .iconfont {
          font-size: 20px;
        }
      }
    }
    .login-form-button {
      border: 0;
      flex-direction: column;
      .login-form-check {
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .check-option {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .active {
          background-color: #fff;
          border-color: #fff;
        }
      }
      .button-option {
        width: 100%;
        > button {
          width: 100%;
          height: 45px;
          font-size: 18px;
          border: 0;
          border-radius: 130px;
          margin-top: 70px;
          color: #fff;
          background-color: #3d95d5;
        }
      }
    }
  }
}
</style>