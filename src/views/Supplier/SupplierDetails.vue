<template>
  <div class="supplierDetails">
    <van-cell-group class="supplierDetails-data">
      <van-field :value="data[35]" label="供应商编号:" disabled />
      <van-field :value="data[22]" label="单位名称:" disabled />
      <van-field :value="data[25]" label="统一社会信用代码:" disabled />
      <van-field :value="data[26] | codeValue('CodeTable_TaxClass')" label="纳税人类别：" :disabled="edit" v-if="edit" />
      <cbh-select v-model="data[26]" label="纳税人类别：" code="CodeTable_TaxClass" @change="onTaxChange" v-else-if="data.length > 0" />
      <van-field :value="data[27]" label="税率:" disabled />
      <van-field :value="data[28]" label="开户行:" disabled />
      <van-field :value="data[29]" label="银行账号:" disabled />
      <van-field :value="data[62]" label="省:" disabled />
      <van-field :value="data[63]" label="市:" disabled />
      <van-field :value="data[64]" label="区：" disabled />
      <van-field :value="data[49]" label="可开票税率：" disabled />
      <van-field :value="data[30]" label="详细地址：" disabled />
      <van-field :value="data[31]" label="联系人：" disabled />
      <van-field :value="data[32]" label="固定电话：" disabled />
      <van-field :value="data[33]" label="手机：" disabled />
      <van-field :value="data[34]" label="邮箱：" disabled />
      <van-field :value="data[52]" label="证书号码：" disabled />
      <van-field :value="data[53]" label="发证机关：" disabled />
      <van-field :value="data[54]" label="专业资质等级：" disabled />
      <van-field :value="data[55]" label="复核时间及有效期：" disabled />
      <van-cell title="证照资料" is-link value="" @click="jumpPage" />
      <van-cell title="附件" is-link value="" @click="jumpInfo" />
    </van-cell-group>
    <div class="info-button" v-if="data[9] == 'false'">
      <van-button size="large" type="primary" @click="onSubmit">提交供应商审核</van-button>
    </div>
  </div>
</template>
<script>
import { supplier } from "./../../assets/js/api.js";
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      edit: true,
      data: []
    };
  },
  computed,
  methods: {
    getData() {
      supplier.getSuppInfo(this.suppParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split("]]");
          this.data = eval("[[" + csp[0] + "]]")[0];
          if (this.data[55] && this.data[55] != "1900-01-01 00:00:00") {
            this.data[55] = this.$util.formatDate(this.data[55]);
          } else {
            this.data[55] = "";
          }
        }
      });
    },
    pageInit() {
      this.getData();
    },
    // 提交供应商审核
    onSubmit() {
      supplier.SubmitSupplier(this.data[0]).then(res => {
        if (res.status === 1) {
          this.$toast.success({
            forbidClick: true, // 禁用背景点击
            message: "提交成功"
          });
          this.$nextTick().then(() => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 800);
          });
          return;
        } else {
          this.$toast.fail(res.text);
        }
      });
    },
    jumpPage() {
      this.$router.push({
        name: "supplierAccessory"
      });
    },
    jumpInfo() {
      this.$store.commit("confirmParams", this.data);
      this.$router.push({
        name: "supplierDetailsAnnex"
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.supplierDetails {
  width: 100%;
  .supplierDetails-data {
    margin-bottom: 80px;
  }
  .info-button {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    padding: 10px;
    background-color: #fff;
    text-align: center;
  }
}
</style>
