<template>
  <section class="register">
    <div class="register-nav">
      <van-nav-bar title="账号注册" left-arrow @click-left="onBack"></van-nav-bar>
    </div>

    <form class="register-form" @submit.prevent="onRegister">
      <van-cell-group>
        <van-field v-model="data.username" clearable label="用户名" placeholder="请输入用户名" required />
        <van-field v-model="data.password" type="password" label="密码" placeholder="请输入密码" required />
        <van-field v-model="data.passwords" type="password" label="确认密码" placeholder="请输入确认密码" required />
        <van-field v-model="data.phone" type="tel" label="手机号码" placeholder="请输入手机号码" required />
        <van-field v-model="data.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" required>
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="button-option">
        <van-button type="main">注 册</van-button>
      </div>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onRegister() {}
  }
};
</script>
<style lang="less" scoped>
.register {
  width: 100%;
  overflow: hidden !important;
  .register-form {
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .button-option {
      width: 95%;
      margin: 0 auto;
      > button {
        width: 100%;
        height: 45px;
        font-size: 18px;
        border: 0;
        border-radius: 5px;
        margin-top: 30px;
      }
    }
  }
}
</style>


