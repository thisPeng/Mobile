<template>
  <!-- 到货信息-发货单 -->
  <div class="deliverydetails">
    <van-cell-group>
      <div class="task-title">基础信息</div>
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
      <van-datetime-picker v-model="currentDate" v-show="showDateone" type="date" :min-date="new Date()" class="contract-date" @confirm="arrivalDate" @cancel="showDateone=false" />
      <van-field :value="info[28] || userInfo.name" label="签收人：" disabled />
      <van-field v-model="info[11]" label="发货金额：" disabled />
      <van-field v-model="info[29]" label="备注：" type="textarea" :disabled="info[25] == '1' || info[20] == '1'" :placeholder="info[25] != '1' && info[20] != '1' ? '请输入备注' : ''" />

      <!--附加信息-->
      <div class="task-title">附加信息</div>
      <van-cell title="物资列表" is-link value="" @click="jumpInfo" />
      <!-- <van-cell title="附件" is-link value="" @click="jumpPage('arrivaAnnex')" /> -->
    </van-cell-group>
    <div class="con-button" v-if="info && info[25] != '1' && info[20] != '1'">
      <van-button type="primary" @click="DeliverySign" v-if="info[47] == '0'">签收</van-button>
      <!-- <van-button type="default" @click="saveDelivery" v-if="info[25] != '1' && info[20] != '1'">保存</van-button> -->
      <van-button type="danger" @click="DeliveryOffer">提议</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { arrival } from "../../../assets/js/api.js"; //index
export default {
  data() {
    return {
      info: [],
      currentDate: "",
      showDateone: false //交货时间,
    };
  },
  computed,
  methods: {
    onDeliverChange(res) {
      this.info[13] = res;
    },
    //签收
    DeliverySign() {
      this.$dialog
        .confirm({
          title: "签收",
          message: "是否确认签收？"
        })
        .then(() => {
          this.saveDelivery().then(result => {
            try {
              if (result) {
                arrival.signOrder(this.confirmParams[0]).then(res => {
                  if (res && res.status == 1) {
                    if (res.text == 1) {
                      this.$toast.success({
                        forbidClick: true,
                        message: "签收成功"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.$router.go(-1);
                        }, 800);
                      });
                    } else if (res.text == -2) {
                      this.$toast.fail("订单已修改，不能签收，请提议");
                    } else {
                      this.$toast.fail("签收失败，请刷新重试");
                    }
                  }
                });
                return;
              }
              throw "操作失败，请重试";
            } catch (e) {
              this.$toast.fail(e);
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
          this.saveDelivery().then(result => {
            try {
              if (result) {
                arrival.getOffer(this.confirmParams[0]).then(res => {
                  if (res && res.status === 1) {
                    this.$toast.success({
                      forbidClick: true,
                      message: "提议成功"
                    });
                    this.$nextTick().then(() => {
                      setTimeout(() => {
                        this.$router.go(-1);
                      }, 800);
                    });
                  } else {
                    this.$toast.fail(res.text);
                  }
                });
                return;
              }
              throw "操作失败，请重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        });
    },
    pageInit() {
      arrival.getInvoice(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.info = eval("[[" + csp[0])[0];
          if (this.info[27] === "1900-01-01 00:00:00") {
            if (this.info[25] != "1" && this.info[20] != "1") {
              this.info[27] = this.$util.formatDate(new Date());
            } else {
              this.info[27] = "";
            }
          } else {
            this.info[27] = this.$util.formatDate(this.info[27]); // 签收时间
          }
        }
      });
    },
    // 跳转页面
    jumpPage(name) {
      this.$router.push({
        name
      });
    },
    jumpInfo() {
      this.$store.commit("confirmParams", this.info);
      this.$router.push({
        name: "arrivalDetails"
      });
    },
    arrivalDate(val) {
      this.info[27] = this.$util.formatDate(val);
      this.showDateone = false;
    },
    //保存
    saveDelivery() {
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
              { Remark: info[29] },
              { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
              { SYS_LAST_UPD_BY: this.userInfo.oid } // 最后修改用户
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
  .task-title {
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
    padding-top: 30px;
    padding-bottom: 10px;
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
