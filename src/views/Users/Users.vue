<template>
  <div class="users">
    <!-- <div class="users-admin">
      <div class="users-box">
      <div class="users-img">
        <img src="../../../public/img/ms_ico2.png">
      </div>
      <div class="users-name">
        <div class="text-md">系统管理员</div>
        <div class="text-md">账号:admin</div>
      </div>
      </div>
      <div class="users-icon">
        <img src="../../../public/img/codeico.png">
      </div>
    </div> -->
    <div class="users-admin">
      <div class="users-head">
        <img id="m_avatar" src="../../../public/img/ms_ico2.png" alt="">
        <!--<div id="m_user" class="member-info">刘烨<br>ID: liuye01</div>-->
        <div id="m_user" class="member-info">系统管理员<br>账号: ADMIN</div>
      </div>
      <div class="m-code-box">
        <img id="m_barcode" src="../../../public/img/codeico.png" alt="">
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
        <van-cell title="设置" is-link>
          <template slot="icon">
            <div class="icon">
              <i class="iconfont icon-shezhi"></i>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-button type="primary" bottom-action @click="exit">退出</van-button>
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
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.users {
  .users-admin {
    background: #00a0e9;
    padding: 20px;
    overflow: hidden;
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
      padding-right: 10px;
    }
  }
}
</style>
