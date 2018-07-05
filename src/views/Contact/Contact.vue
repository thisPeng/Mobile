<template>
  <div class="contact">
    <van-search placeholder="请输入商品名称" v-model="value" />
    <van-row type="flex" justify="space-around">
      <van-col span="6">组织机构</van-col>
    </van-row>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item name="1">
        <div slot="title">
          <van-icon name="cash-on-deliver" /> 工程商
          <br>
          <span slot="label">组织机构</span>
        </div>
        <van-cell title="美科企业" is-link value="0" />
        <van-cell title="惠州市晨希网络科技有限公司" is-link value="0" />
        <van-cell title="易隆工程设计公司" is-link value="0" />
      </van-collapse-item>
      <van-collapse-item name="2">
        <div slot="title">
          <van-icon name="send-gift" /> 供应商
          <br>
          <span slot="label">组织机构</span>
        </div>
        <van-cell title="美科企业" is-link value="0" />
        <van-cell title="叶子" is-link value="0" />
        <van-cell title="惠州市顺泰建材有限公司" is-link value="0" />
        <van-cell title="惠州市惠城区合兴装饰材料市部" is-link value="0" />
        <van-cell title="广东凯旺盛实业发展有限公司" is-link value="0" />
        <van-cell title="惠州市鑫龙钢铁贸易有限公司" is-link value="0" />
        <van-cell title="佛山市南海联兴得利装饰材料有限公司" is-link value="0" />
        <van-cell title="惠城区辉阳建材商行" is-link value="0" />
      </van-collapse-item>
      <van-collapse-item name="3">
        <div slot="title">
          <van-icon name="setting" /> 运营商
          <br>
          <span slot="label">组织机构</span>
        </div>
        <van-cell title="供应商管理" is-link value="0" />
      </van-collapse-item>
      <van-collapse-item name="4">
        <div slot="title">
          <van-icon name="wechat" /> 合作商
          <br>
          <span slot="label">组织机构</span>
        </div>
        <van-cell title="易隆合作商测试06" is-link value="0" />
        <van-cell title="马骏" is-link value="0" />
        <van-cell title="易隆合作商测试07" is-link value="0" />
        <van-cell title="惠州市晨希合作商测试2" is-link value="0" />
        <van-cell title="惠州易隆软件" is-link value="0" />
        <van-cell title="惠州市晨希合作商测试" is-link value="0" />
        <van-cell title="惠州市晨希网络科技有限公司" is-link value="0" />
        <van-cell title="合作商测试05" is-link value="0" />
        <van-cell title="曽渊" is-link value="0" />
        <van-cell title="李家诚" is-link value="0" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {},
  computed,
  mounted() {
    this.$axios({
      url: "/ucml_mobile/getMenuCount_new.ashx",
      method: "get"
    }).then(res => {
      if (res) {
        console.log(res);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.contact {
  width: 100%;
}
span {
  font-size: 8px;
  color: darkgray;
  margin-left: 15px;
}
.van-row {
  height: 5%;
  line-height: 30px;
}
.van-col {
  font-size: 20px;
  color: cornflowerblue;
}
</style>
