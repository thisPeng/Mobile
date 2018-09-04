<template>
  <!--报价单编辑 -->
  <div class="tranrial">
    <div class="title-delivery">发货单</div>
    <van-cell-group v-for="(item,index) in list" :key="index">
      <van-field v-model="item[2]" label="单据编号:" disabled />
      <van-field v-model="item[33]" label="工程名称:" disabled />
      <van-field v-model="item[5]" label="联系人:" disabled />
      <van-field v-model="item[6]" label="联系电话:" disabled />
      <van-field v-model="item[34]" label="工程地址:" disabled />
      <van-field v-model="item[9]" label="订单数量:" disabled />
      <van-field v-model="item[10]" label="订单金额:" disabled />
      <van-field v-model="item[39]" label="订单状态:" disabled />
      <van-field v-model="item[17]" label="订货有效期:" disabled />
      <van-field v-model="item[18]" label="业务员:" disabled />
      <van-field v-model="item[25]" label="创建日期:" disabled />
      <van-field v-model="item[21]" label="备注:" disabled type="textarea" />
      <van-cell title="报价单明细" is-link value="详情" @click="jumpPage(item)" />
      <van-cell title="报价单附件" is-link value="详情" />
    </van-cell-group>
    <div class="con-button">
      <van-button type="default">合同编辑</van-button>
      <van-button type="default" @click="getPrice">提交报价</van-button>
      <van-button type="default">添加物质</van-button>
      <van-button type="default">保存</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  computed,
  methods: {
    getOffer() {
      offer.getTranrial(this.confirmParams[0]).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          // console.log(sp);
          const csp = sp[1].split(";");
          //  console.log(csp);
          this.list = eval("[[" + csp[0]);
          //  console.log(this.list);
        }
      });
    },
    //提交报价
    getPrice() {
      this.$dialog
        .confirm({
          title: "提交报价",
          message: "是否确认提交报价？"
        })
        .then(() => {
          offer.getPriceButton(this.confirmParams[0]).then(res => {
            console.log(res);
            try {
              if (res && res.status === 1 && res.text === "True") {
                this.$toast.success("提交报价成功");
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 1500);
                });
                return;
              }
              throw "提交报价失败，请刷新页面重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        });
    },
    pageInit() {
      this.getOffer();
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "tranrialDetail"
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
