<template>
  <div class="usersinfo">
    <div class="mui-head">
      <!-- <img class="info-img" src="../../../public/img/topbar.jpg" alt=""> -->
      <img src="../../../public/img/ms_ico2.png" alt="" />
      <div id="nName" class="mui-name">系统管理员</div>
    </div>
    <div class="info-users">
      <van-cell-group>
        <van-field value="" label="" disabled />
      </van-cell-group>
      <van-cell-group>
        <van-field value="系统管理员" label="姓名" disabled />
      </van-cell-group>
      <van-cell-group>
        <van-field value="" label="性别" />
        <!-- <select class="idex">
          <option value="0">男</option>
           <option value="1">女</option>
        </select> -->
      </van-cell-group>
      <van-cell-group>
        <van-field value="" label="手机" />
      </van-cell-group>
      <van-cell-group>
        <van-field value="" label="E-mail" />
      </van-cell-group>
      <van-cell-group>
        <van-field value="" label="公司电话" />
      </van-cell-group>
      <van-cell-group>
        <van-field value="" label="部门" />
      </van-cell-group>
      <div class="pwd-button">
      <van-button size="normal">
        <span class="pwd-icon">
          <van-icon name="success" />
        </span>修改密码</van-button>
    </div>

    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {};
  },
  methods: {},
  computed,
  mounted() {}
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
}
</style>


