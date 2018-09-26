<template>
  <!-- 到货信息-发货单 -->
  <div class="deliverydetails">
    <div class="title-delivery">发货单</div>
    <van-cell-group>
      <van-field v-model="info[2]" label="发货单号：" disabled />
      <van-field v-model="info[39]" label="工程名称：" disabled />
      <van-field :value="info[8]" label="发货时间：" disabled />
      <van-field v-model="info[40]" label="工程地址：" disabled />
      <cbh-select v-model="info[13]" label="发货方式：" code="CodeTable_Deliver_Type" @change="onDeliverChange" v-if="info.length > 0 && info[25] != '1' && info[20] != '1'" />
      <van-field :value="info[13] | codeValue('CodeTable_Deliver_Type')" label="发货方式：" disabled v-else />
      <van-field :value="info[41]" label="单据状态：" disabled />
      <van-field v-model="info[19]" label="审核人：" disabled />
      <van-field v-model="info[10]" label="发货数量：" disabled />
      <van-field v-model="info[42]" label="签收状态：" disabled />
      <van-cell-group class="con-price" v-if="info[25] != '1' && info[20] != '1'">
        <span class="con-label">签收时间：</span>
        <span class="con-select" @click="showDateone=true">{{info[27]}}</span>
      </van-cell-group>
      <van-field v-model="info[27]" label="签收时间：" disabled v-else />
      <van-datetime-picker v-model="currentDate" v-show="showDateone" type="date" :min-date="new Date()" class="contract-date" @confirm="jiaohuoDate" @cancel="showDateone=false" />
      <van-field v-model="info[28]" label="签收人：" disabled/>
      <van-field v-model="info[11]" label="发货金额：" disabled />
      <van-field v-model="info[29]" label="备注：" type="textarea" :disabled="info[25] == '1' || info[20] == '1'" :placeholder="info[25] != '1' && info[20] != '1' ? '请输入备注' : ''" />
      <van-cell title="发货单明细" is-link value="详情" @click="jumpPage" />
    </van-cell-group>
    <div class="con-button" v-if="info && info[25] != '1' && info[20] != '1'">
      <van-button type="primary" @click="DeliverySign">签收</van-button>
      <van-button type="danger" @click="DeliveryOffer">提议</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { arrival } from "./../../../../assets/js/api.js"; //index
export default {
  data() {
    return {
      info: [],
      currentDate: new Date(),
      showDateone: false //交货时间,
    };
  },
  computed,
  methods: {
    onDeliverChange(res) {
      this.info[13] = res;
    },
    getData() {
      arrival.getInvoice(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.info = eval("[[" + csp[0])[0];
          console.log(this.info);
          if (this.info[27] === "1900-01-01 00:00:00") {
            if (this.info[25] != "1" && this.info[20] != "1") {
              this.info[27] = "请选择签收时间";
            } else {
              this.info[27] = "";
            }
          } else {
            this.info[27] = this.$util.formatDate(this.info[27]); // 签收时间
          }
        }
      });
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
              this.$toast.success({
                forbidClick: true,
                message: "签收成功"
              });
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$router.go(-1);
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
      this.keepDelivery().then(result => {
        try {
          if (result) {
            this.$dialog
              .confirm({
                title: "提议",
                message: "是否确认提议？"
              })
              .then(() => {
                arrival.getOffer(this.confirmParams[0]).then(res => {
                  if (res && res.status === 1) {
                    this.$toast.success({
                      forbidClick: true,
                      message: "提议成功"
                    });
                    this.$nextTick().then(() => {
                      setTimeout(() => {
                        this.$router.go(-1);
                      }, 1500);
                    });
                  }
                });
              });
            return;
          }
          throw "保存失败，请重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    pageInit() {
      this.getData();
    },
    jumpPage() {
      this.$store.commit("confirmParams", this.info);
      this.$router.push({
        name: "arrivalDetails"
      });
    },
    jumpInfo(name) {
      this.$router.push({
        name
      });
    },
    jiaohuoDate(val) {
      this.info[27] = this.$util.formatDate(val);
      this.showDateone = false;
    },
    //保存
    keepDelivery() {
      const info = this.info;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Deliver_Master: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Deliver_MasterOID: info[0] }
            ]
          },
          {
            BC_SC_Deliver_Master: [
              { _attr: { UpdateKind: "" } },
              {
                Receive_Date:
                  info[27] && info[27] != "请选择签收时间" ? info[27] : "null"
              },
              { Remark: info[29] }
            ]
          }
        ]
      });
      return arrival.saveKeepRevise(xmlString).then(res => {
        if (res.status) return true;
        else return false;
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
    margin: 10px 0;
    button {
      width: 48%;
      padding: 0;
      // flex: 1;
    }
  }
  .con-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .con-label {
      min-width: 90px;
      flex: 1;
    }
    .con-select {
      flex: 5;
    }
  }
  .contract-date {
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    padding-right: 30px;
  }
}
</style>
<style lang="less">
.deliverydetails {
  .van-cell__title {
    max-width: 90px !important;
  }
}
</style>
