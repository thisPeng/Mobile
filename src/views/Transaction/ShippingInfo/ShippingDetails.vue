<template>
  <!-- 发货单编辑 -->
  <div class="shippingDetails">
    <van-cell-group>
      <van-field v-model="list[2]" label="发货单号:" disabled/>
      <van-field v-model="list[39]" label="工程名称:" disabled/>
      <!-- <van-field v-model="list[8]" label="发货时间:" /> -->
      <van-cell-group class="con-price">
        <span class="con-label">发货时间</span>
        <span class="con-select" @click="showDate=true">{{new Date(list[8]).Format("yyyy-MM-dd")}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showDate" type="date" class="contract-date" @confirm="fahuoDate" @cancel="showDate=false" />
      <van-field v-model="list[7]" label="工程地址:" disabled/>
      <!-- <van-field :value="list[13]|codeValue('CodeTable_Deliver_Type')" label="发货方式:" disabled/> -->
      <cbh-select v-model="list[13]" label="发货方式" code="CodeTable_Deliver_Type" @change="onDeliverChange" />
      <van-field v-model="list[41]" label="单据状态:" disabled/>
      <van-field v-model="list[22]" label="审核人:" disabled/>
      <van-field v-model="list[10]" label="发货数量:" disabled/>
      <van-field v-model="list[42]" label="签收状态:" disabled/>
      <van-field v-model="list[27]" label="签收时间:" disabled/>
      <van-field v-model="list[28]" label="签收人:" disabled/>
      <van-field v-model="list[11]" label="发货金额:" disabled/>
      <van-field v-model="list[29]" label="备注:" type="textarea" />
      <van-cell title="发货单明细" is-link value="详情" @click="jumpPage(list)" />
    </van-cell-group>
    <div class="con-button">
      <van-button type="default" plain @click="getButton" v-if="list[41] === '未发货'">发货</van-button>
      <van-button type="default" plain @click="getDeButton" v-if="list[41] === '未发货'">保存</van-button>
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
    //交货时间
    fahuoDate(val) {
      this.list[8] = new Date(val).Format("yyyy-MM-dd");
      this.showDate = false;
    },
    //编辑
    getDetails() {
      offer.getDeliveryDetail(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0])[0];
          // console.log(this.list);
          if (this.list[27] === "1900-01-01") {
            this.list[27] = new Date(this.list[27]).Format("yyyy-MM-dd");
          } else {
            this.list[27] = ""; // 确认时间
          }
        }
      });
    },
    //发货按钮
    getButton() {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除此产品记录？"
        })
        .then(() => {
          offer.getDeliveryButton(this.contractParams[0]).then(res => {
            // console.log(res);
            if (res.status === 1 || res.text === true) {
              this.getDetails();
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$toast.success("发货成功");
                }, 300);
              });
            } else {
              this.$toast.fail("发货失败");
            }
          });
        });
    },
    //发货保存按钮
    getDeButton() {
      const list = this.list;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Deliver_Master: [
              {
                _attr: {
                  UpdateKind: "ukModify"
                }
              },
              {
                SC_Deliver_MasterOID: list[0]
              }
            ]
          },
          {
            BC_SC_Deliver_Master: [
              {
                _attr: {
                  UpdateKind: ""
                }
              },
              {
                SC_Order_MasterOID: "null"
              },
              {
                Deliver_Date: list[8]
              },
              {
                Deliver_Type: list[13]
              },
              {
                Remark: list[29]
              }
            ]
          }
        ]
      });
      this.$dialog
        .confirm({
          title: "保存",
          message: "确认保存该询价单？"
        })
        .then(() => {
          offer.getDeliveryButtons(xmlString).then(res => {
            console.log(res);
            try {
              if (res.status === 1) {
                this.getDetails();
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("保存成功");
                  }, 300);
                });
                return;
              }
              throw "保存失败，请刷新页面重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        });
    },
    pageInit() {
      this.getDetails();
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
      width: 42%;
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
      color: #888;
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
