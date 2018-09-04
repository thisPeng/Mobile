<template>
  <!-- 到货信息-发货单 -->
  <div class="deliverydetails">
    <div class="title-delivery">发货单</div>
    <van-cell-group v-for="(item,index) in list" :key="index">
      <van-field v-model="item[2]" label="发货单号:" disabled />
      <van-field v-model="item[39]" label="工程名称:" disabled />
      <van-field v-model="item[8]" label="发货时间:" disabled />
      <van-field v-model="item[40]" label="工程地址:" disabled />
      <van-field v-model="item[13]" label="发货方式:" disabled />
      <van-field v-model="item[41]" label="单据状态:" disabled />
      <van-field v-model="item[19]" label="审核人:" disabled />
      <van-field v-model="item[10]" label="发货数量:" disabled />
      <van-field v-model="item[42]" label="签收状态:" disabled />
      <van-field v-model="item[27]" label="签收时间:" disabled />
      <van-field v-model="item[28]" label="签收人:" disabled />
      <van-field v-model="item[11]" label="发货金额:" disabled />
      <van-field v-model="item[29]" label="备注:" disabled type="textarea" />
      <van-cell title="发货单明细" is-link value="详情" @click="jumpPage(item)" />
    </van-cell-group>
    <div class="con-button">
      <van-button type="default" @click="DeliverySign">签收</van-button>
      <van-button type="default" @click="DeliveryOffer">提议</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import {  arrival } from "./../../../../assets/js/api.js"; //index
export default {
  data() {
    return {
      item: [],
      list: []
    };
  },
  computed,
  methods: {
    getData() {
      arrival.getInvoice(this.confirmParams[0]).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          //  console.log(csp);
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    getConfig() {
      // const params ={
      //   uid:this.confirmParams[0]
      // };
      // index.getConfig(this.confirmParams[0]).then(res => {
      //   console.log(JSON.parse(res.text));
      // });
    },
    //签收
    DeliverySign() {
      this.$dialog
        .confirm({
          title: "签收",
          message: "是否确认签收？"
        })
        .then(() => {
          arrival.getSign(this.confirmParams[0]).then(res => {
            if (res && res.status === 1) {
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$toast.success("签收成功");
                }, 300);
              });
              this.$router.replace({
                name: "arrivalinformation"
              });
            }
          });
        });
    },
    //提议
    DeliveryOffer() {
      this.$dialog
        .confirm({
          title: "提议",
          message: "是否确认提议？"
        })
        .then(() => {
          arrival.getOffer(this.confirmParams[0]).then(res => {
            if (res && res.status === 1) {
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$toast.success("提议成功");
                }, 300);
              });
            }
          });
        });
    },
    pageInit() {
      this.getData();
      this.getConfig();
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "arrivalDetails"
      });
    },
    jumpInfo(name) {
      this.$router.push({
        name
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.deliverydetails {
  width: 100%;
  .delivery-data {
    .delivery-card {
      width: 100%;
      .delivery-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
  .van-cell {
    font-size: 15px;
    // color: rgb(153, 148, 148);
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
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px 0;
    button {
      width: 48%;
      padding: 0;
      // flex: 1;
    }
  }
}
</style>
