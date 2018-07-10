<template>
  <div class="usersinfo">
    <div class="mui-head">
      <!-- <img class="info-img" src="../../../public/img/topbar.jpg" alt=""> -->
      <img src="../../../public/img/ms_ico2.png" alt="" />
      <div id="nName" class="mui-name">{{userInfo.name}}</div>
    </div>
    <div class="info-users">
      <van-cell-group>
        <van-field value="" label="" disabled />
      </van-cell-group>
      <!-- 姓名 -->
      <van-cell-group>
        <van-field :value="userInfo.loginid" label="姓名" disabled />
      </van-cell-group>
      <!-- 性别 -->
      <van-cell-group class="info-sex">
        <span class="sex-label">性别</span>
        <span class="sex-select" @click="sexShow=true">{{userInfo.sex}}</span>
        <van-popup v-model="sexShow" position="bottom">
          <van-picker show-toolbar title="请选择" :columns="columns" @cancel="sexShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <!-- 手机号 -->
      <van-cell-group>
        <van-field v-model="userInfo.telno" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <!-- 邮箱 -->
      <van-cell-group>
        <van-field v-model="userInfo.email" label="E-mail" placeholder="请输入邮箱" />
      </van-cell-group>
      <!-- 公司电话 -->
      <van-cell-group>
        <van-field v-model="userInfo.worktelno" label="公司电话" placeholder="请输入公司电话" />
      </van-cell-group>
      <!-- 部门
      <van-cell-group>
        <van-field v-model="userInfo.email" label="部门" placeholder="请输入部门" />
      </van-cell-group>-->
      <div class="pwd-button" @click="saveInfo">
        <van-button size="normal">
          <span class="pwd-icon">
            <van-icon name="success" />
          </span>保存</van-button>
      </div>

    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      sexShow: false,
      columns: ["男", "女"]
    };
  },
  methods: {
    onConfirm(res) {
      const info = this.userInfo;
      info.sex = res;
      this.$store.commit("userInfo", info);
      this.sexShow = false;
    },
    saveInfo() {
      const params = {
        sex: this.userInfo.sex,
        telno:this.userInfo.telno,
        email:this.userInfo.email,
        worktelno:this.userInfo.worktelno,
      };
      users.saveInfo(params).then(res => {
        if (res) {
          this.$toast(res);
        }
      });
    }
  },
  computed,
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.usersinfo {
  width: 100%;
  .mui-head {
    height: 200px;
    background-image: url("../../../public/img/topbar.jpg");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mui-head img {
    display: block;
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
    border-radius: 80px;
    -moz-box-shadow: 0px 0px 3px #999;
    -webkit-box-shadow: 0px 0px 3px #999;
    box-shadow: 0px 0px 3px #999;
  }
  .info-users {
    .info-sex {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .sex-label {
        min-width: 90px;
        flex: 1;
      }
      .sex-select {
        flex: 5;
      }
    }
  }
  .pwd-button {
    padding-top: 10px;
    text-align: center;
    button {
      color: #fff;
      background-color: #3d95d5;
    }
  }
  .pwd-icon {
    margin-right: 10px;
  }
}
</style>


