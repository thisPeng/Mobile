<template>
  <!-- 发货单编辑 -->
  <div class="shippingDetails">
    <van-cell-group>
      <van-field :value="list[2]" label="发货单号：" disabled />
      <van-field :value="list[39]" label="工程名称：" disabled />
      <van-field :value="list[8]" label="发货时间：" disabled v-if="list[41] == '已发货'" />
      <van-cell-group class="con-price" v-else>
        <span class="con-label">发货时间：</span>
        <span class="con-select" @click="showDate=true">{{this.$util.formatDate(list[8])}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showDate" type="date" :min-date="new Date()" class="contract-date" @confirm="fahuoDate" @cancel="showDate=false" />
      <van-field :value="list[7]" label="工程地址：" disabled />
      <cbh-select v-model="list[13]" label="发货方式：" code="CodeTable_Deliver_Type" @change="onDeliverChange" v-if="list.length > 0 && list[41] != '已发货'" />
      <van-field :value="list[13] | codeValue('CodeTable_Deliver_Type')" label="发货方式：" disabled v-else />
      <van-field :value="list[41]" label="单据状态：" disabled />
      <van-field :value="list[22] || userInfo.name" label="审核人：" disabled />
      <van-field :value="list[10]" label="发货数量：" disabled />
      <van-field :value="list[42]" label="签收状态：" disabled />
      <van-field :value="list[27]" label="签收时间：" disabled v-if="list[42] == '已签收'" />
      <van-field :value="list[28]" label="签收人：" disabled v-if="list[42] == '已签收'" />
      <van-field :value="list[11]" label="发货金额：" disabled />
      <van-field v-model="list[29]" label="备注：" type="textarea" :disabled="list[41] == '已发货'" :placeholder="confirmParams[41] == '已发货' ? '' : '请输入备注'" />
      <van-cell title="发货单明细" is-link value="详情" @click="jumpPage(list)" />
    </van-cell-group>
    <div class="con-button" v-if="list[41] != '已发货'">
      <van-button type="primary" @click="sendShipping">发货</van-button>
      <!-- <van-button type="default" @click="saveOrder">保存</van-button> -->
      <van-button type="danger" @click="deleteOrder">删除</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      showDate: false, //交货时间
      currentDate: new Date()
    };
  },
  computed,
  methods: {
    onDeliverChange(res) {
      this.list[13] = res;
    },
    //发货时间
    fahuoDate(val) {
      this.list[8] = this.$util.formatDate(val);
      this.showDate = false;
    },
    // 删除发货单
    deleteOrder() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除该发货单？"
        })
        .then(() => {
          offer.deleteDeliverOrder(this.list[0]).then(res => {
            try {
              if (res.status === 1) {
                this.$toast.success({
                  forbidClick: true, // 禁用背景点击
                  message: "删除成功"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 800);
              }
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //编辑
    getData() {
      return offer.getDeliveryDetail(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0])[0];

          if (this.list[27] === "1900-01-01") {
            this.list[27] = this.$util.formatDate(this.list[27]);
          } else {
            this.list[27] = ""; // 确认时间
          }
          return true;
        }
        return false;
      });
    },
    //发货按钮
    sendShipping() {
      if (!this.list[13]) {
        this.$toast.fail("请选择发货方式");
        return;
      }
      this.$dialog
        .confirm({
          title: "发货",
          message: "确认单据发货？"
        })
        .then(() => {
          this.saveOrder().then(result => {
            if (result) {
              offer.sendDeliveryOption(this.contractParams[0]).then(res => {
                if (res.status === 1 && res.text == "True") {
                  this.$toast.success({
                    forbidClick: true, // 禁用背景点击
                    message: "发货成功"
                  });
                  this.$nextTick().then(() => {
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 800);
                  });
                } else {
                  this.$toast.fail("发货失败");
                }
              });
            }
          });
        });
    },
    //发货保存按钮
    saveOrder() {
      const list = this.list;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Deliver_Master: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Deliver_MasterOID: list[0] }
            ]
          },
          {
            BC_SC_Deliver_Master: [
              { _attr: { UpdateKind: "" } },
              { SC_Order_MasterOID: "null" },
              { Deliver_Date: list[8] },
              { Deliver_Type: list[13] },
              { Remark: list[29] }
            ]
          }
        ]
      });
      return offer.saveGoodsDetail(xmlString).then(res => {
        try {
          if (res.status === 1) {
            return true;
          }
          throw "保存失败，请刷新页面重试";
        } catch (e) {
          this.$toast.fail(e);
          return false;
        }
      });
    },
    pageInit() {
      this.getData();
    },
    jumpPage(list) {
      this.$store.commit("confirmParams", list);
      this.$router.push({
        name: "deliveryDetail"
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.shippingDetails {
  width: 100%;
  .con-button {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      width: 49%;
      padding: 0;
      margin-bottom: 10px;
    }
  }
  .con-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    .con-label {
      min-width: 90px;
      flex: 1;
      // color: #888;
    }
    .con-select {
      flex: 5;
      color: #333;
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
.shippingDetails {
  .van-cell .van-cell__title {
    max-width: 90px;
  }
}
</style>