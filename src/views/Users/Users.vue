<template>
  <div class="users">
    <div class="users-admin" @click="jumpInfo">
      <div class="users-head">
        <img id="m_avatar" src="../../../public/img/ms_ico5.png" alt="">
        <div id="m_user" class="member-info">{{userInfo.name}}<br>账号: {{userInfo.loginid}}</div>
      </div>
      <div class="m-code-box">
        <img id="m_barcode" src="../../../public/img/codeico.png" alt="">
        <van-icon class="users-icon" name="arrow" />
      </div>
    </div>
    <div class="users-wrap">
      <van-cell-group class="margin-bottom-sm" v-if="userType <= 2">
        <van-cell title="材料供应商" is-link @click="jumpPage('supplier')">
          <template slot="icon">
            <div class="icon">
              <i class="iconfont icon-gongkaobei"></i>
            </div>
          </template>
        </van-cell>
        <!-- <van-cell title="劳务供应商" is-link @click="jumpPage('supplierList')">
          <template slot="icon">
            <div class="icon">
              <i class="iconfont icon-laowuhetong"></i>
            </div>
          </template>
        </van-cell> -->
      </van-cell-group>
      <van-cell-group>
        <van-cell title="修改密码" is-link @click="jumpPage('usersPwd')">
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
          users.exit();
          this.$router.replace({
            name: "login"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    jumpPage(name) {
      this.$router.push({
        name
      });
    },
    cleanStore() {
      localStorage.clear();
      sessionStorage.clear();
      users.userInfo().then(result => {
        try {
          if (result) {
            this.$parent.isMenu = true;
            this.$store.commit("cleanStore", true);
            this.$store.commit("userInfo", result);
            users.userId(result.oid).then(res => {
              if (res && res.status === 1) {
                this.$store.commit("userId", JSON.parse(res.text)[0]);
                this.$toast("缓存已清除");
                // setTimeout(() => {
                //   location.reload();
                // }, 800);
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpInfo() {
      if (this.userType == 1) {
        this.$router.push({
          name: "companyUserInfo"
        });
      } else if (this.userType == 2) {
        this.$router.push({
          name: "usersInfo"
        });
      } else if (this.userType == 3) {
        this.$router.push({
          name: "supplierUserInfo"
        });
      }
    }
  },
  computed
};
</script>
<style lang="less" scoped>
.users {
  .users-admin {
    background: #00a0e9;
    padding: 20px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .users-head {
    position: relative;
    float: left;
    padding-left: 70px;
    padding-top: 5px;
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
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #00a0e9;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .iconfont {
        color: #fff;
        font-size: 23px;
      }
    }
  }

  .van-cell {
    padding: 10px 15px;
    display: flex;
    align-items: center;
  }
  .users-button {
    padding: 0 15px 60px 15px;
    margin-top: 100px;
  }
}
</style>
