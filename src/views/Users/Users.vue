<template>
  <div class="users">
    <div class="users-admin" @click="admininfo">
      <div class="users-head">
        <img id="m_avatar" src="../../../public/img/ms_ico5.png" alt="">
        <div id="m_user" class="member-info">{{userInfo.name}}<br>账号: {{userInfo.loginid}}</div>
      </div>
      <div class="m-code-box">
        <!-- <img id="m_barcode" src="../../../public/img/codeico.png" alt=""> -->
        <van-icon class="users-icon" name="arrow" />
      </div>
    </div>
    <div class="users-wrap">
      <van-cell-group>
        <van-cell title="修改密码" is-link @click="jumpPwd">
          <template slot="icon">
            <div class="icon">
              <i class="iconfont icon-mima"></i>
            </div>
          </template>
        </van-cell>
        <van-cell title="清除缓存" is-link @click="cleanStore">
          <template slot="icon">
            <div class="icon">
              <i class="iconfont icon-shezhi"></i>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="users-button">
      <van-button type="danger" size="large" @click="exit">退出</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";

export default {
  data() {
    return {};
  },
  methods: {
    //退出到登录页
    exit() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出系统吗？"
        })
        .then(() => {
          users.exit().then(() => {
            this.$router.replace({
              name: "login"
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    jumpPwd() {
      this.$router.push({
        name: "usersPwd"
      });
    },
    cleanStore() {
      localStorage.clear();
      sessionStorage.clear();
      this.$toast("缓存已清除");
    },
    admininfo() {
      this.$router.push({
        name: "usersInfo"
      });
    }
  },
  computed,
  created() {
    users.userInfo().then(res => {
      if (res) {
        this.$store.commit("userInfo", res);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.users {
  .users-admin {
    background: #00a0e9;
    padding: 20px;
    overflow: hidden;
    position: relative;
  }
  .users-head {
    padding-top: 5px;
    position: relative;
    float: left;
    padding-left: 70px;
    height: 60px;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .users-head img {
    width: 60px;
    height: 60px;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .m-code-box {
    margin-top: 20px;
    float: right;
    padding-right: 20px;
    .users-icon {
      color: #fff;
      vertical-align: middle;
      padding-left: 10px;
    }
  }
  .m-code-box img {
    width: 25px;
    vertical-align: middle;
  }
  .users-wrap {
    margin: 10px 0;
    .icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #00a0e9;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .iconfont {
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .users-button {
    padding: 0 15px 60px 15px;
    margin-top: 100px;
  }
}
</style>
