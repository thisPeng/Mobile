<template>
  <div class="usersPwd">
    <van-cell-group>
      <van-field v-model="oldPwd" type="password" label="原密码" placeholder="请输入密码" required />
      <van-field v-model="newPwd" type="password" label="新密码" placeholder="请输入密码" required />
      <van-field v-model="cfmPwd" type="password" label="密码确认" placeholder="请输入密码" required />
    </van-cell-group>
    <div class="pwd-button">
      <van-button size="normal" @click="updatePwd">
        <span class="pwd-icon">
          <van-icon name="success" />
        </span>修改密码</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      cfmPwd: ""
    };
  },
  methods: {
    updatePwd() {
      const params = {
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
        cfmPwd: this.cfmPwd
      };
      users.updatePwd(params).then(res => {
        if (res) {
          this.$toast(res.text);
        }
      });
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.usersPwd {
  width: 100%;
  .pwd-button {
    padding-top: 15px;
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


