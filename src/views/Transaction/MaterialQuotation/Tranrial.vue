<template>
  <!--报价单编辑 -->
  <div class="tranrial">
    <div class="title-delivery">发货单</div>
    <van-cell-group>
      <van-field v-model="info[2]" label="单据编号:" disabled />
      <van-field v-model="info[33]" label="工程名称:" disabled />
      <van-field v-model="info[5]" label="联系人:" disabled />
      <van-field v-model="info[6]" label="联系电话:" disabled />
      <van-field v-model="info[34]" label="工程地址:" disabled />
      <van-field v-model="info[9]" label="订单数量:" disabled />
      <van-field v-model="info[10]" label="订单金额:" disabled />
      <van-field v-model="info[39]" label="订单状态:" disabled />
      <van-field v-model="info[17]" label="订货有效期:" disabled />
      <van-field v-model="info[18]" label="业务员:" disabled />
      <van-field v-model="info[25]" label="创建日期:" disabled />
      <van-field v-model="info[21]" label="备注:" disabled type="textarea" />
      <van-cell title="报价单明细" is-link value="详情" @click="jumpPage('tranrialDetail')" />
      <van-cell title="报价单附件" is-link value="详情" @click="jumpPage('tranrialAnnex')" />
    </van-cell-group>
    <div class="con-button">
      <van-button @click="jumpInfo">编辑合同</van-button>
      <van-button type="primary" @click="onSubmit">提交报价</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      info: []
    };
  },
  computed,
  methods: {
    onAddItem() {},
    getOffer() {
      offer.getTranrial(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.info = eval("[[" + csp[0])[0];
          this.$store.commit("confirmParams", this.info);
          //  console.log(this.info);
        }
      });
    },
    //提交报价
    onSubmit() {
      this.$dialog
        .confirm({
          title: "提交报价",
          message: "是否确认提交报价？"
        })
        .then(() => {
          offer.getPriceButton(this.confirmParams[0]).then(res => {
            try {
              if (res && res.status === 1) {
                if (res.text === "1") {
                  this.$toast.success("提交报价成功");
                  this.$nextTick().then(() => {
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 1500);
                  });
                  return;
                } else if (res.text === "0") {
                  this.$toast.fail("合同未编辑，请先编辑合同");
                  this.$nextTick().then(() => {
                    setTimeout(() => {
                      this.jumpInfo();
                    }, 1500);
                  });
                  return;
                }
              }
              throw "提交报价失败，请刷新页面重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        });
    },
    // 页面初始化
    pageInit() {
      this.getOffer();
    },
    // 跳转页面
    jumpPage(name) {
      this.$router.push({
        name
      });
    },
    // 编辑合同
    jumpInfo() {
      this.$router.push({
        name: "tranContractDetail"
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.tranrial {
  width: 100%;
  .van-cell {
    font-size: 15px;
  }
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .van-button--normal {
    padding: 0px 30px;
  }
  .con-button {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      width: 49%;
      padding: 0;
      margin-bottom: 5px;
    }
  }
}
</style>
