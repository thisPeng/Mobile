<template>
  <!--报价单编辑 -->
  <div class="tranrial">
    <van-cell-group>
      <div class="task-title">基础信息</div>
      <van-field v-model="info[2]" label="单据编号：" disabled />
      <van-field v-model="info[33]" label="工程名称：" disabled />
      <van-field v-model="info[5]" label="联系人：" disabled />
      <van-field v-model="info[6]" label="联系电话：" disabled />
      <van-field v-model="info[34]" label="工程地址：" disabled />
      <van-field v-model="info[9]" label="订单数量：" disabled />
      <van-field v-model="info[10]" label="订单金额：" disabled />
      <van-field v-model="info[39]" label="订单状态：" disabled />
      <van-field v-model="info[17]" label="订货有效期：" v-if="info[15] == '2'" :disabled="info[15] == '2'" />
      <van-cell-group class="con-price" v-else>
        <span class="con-label">订货有效期：</span>
        <span class="con-select" @click="showDate=true">{{this.$util.formatDate(info[17])}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showDate" type="date" :min-date="new Date()" class="contract-date" @confirm="fahuoDate" @cancel="showDate=false" />
      <van-field v-model="info[18]" label="业务员：" :disabled="info[15] == '2'" :placeholder="info[15] != '2' ? '请输入业务员' : ''" />
      <van-field v-model="info[25]" label="创建日期：" disabled />
      <van-field v-model="info[21]" label="备注：" type="textarea" :disabled="info[15] == '2'" :placeholder="info[15] != '2' ? '请输入备注' : ''" />
      <div class="task-title">附加信息</div>
      <van-cell title="物资列表" is-link value="" @click="jumpPage('tranrialDetail')" />
      <van-cell title="附件" is-link value="" @click="jumpPage('comfrimAnnex')" />
    </van-cell-group>
    <div class="con-button">
      <van-button type="primary" @click="onSubmit" v-if="info[15] != '2' && buttonValue.submit.show" :disabled="buttonValue.submit.disabled">提交报价</van-button>
      <!-- <van-button type="primary" @click="saveTranDetails" v-if="info[15] != '2'">保存</van-button> -->
      <van-button type="main" @click="jumpInfo" v-if="info[15] != '3' && buttonValue.edit.show" :disabled="buttonValue.edit.disabled">编辑合同</van-button>
      <van-button type="default" @click="onAddItem" v-if="info[15] != '2' && buttonValue.add.show" :disabled="buttonValue.add.disabled">添加物资</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { index, offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      info: [],
      showDate: false, //交货时间
      currentDate: new Date(),
      buttonValue: {
        add: {
          show: false,
          disabled: true
        },
        edit: {
          show: false,
          disabled: true
        },
        submit: {
          show: false,
          disabled: true
        }
      }
    };
  },
  computed,
  methods: {
    // 添加物资
    onAddItem() {
      this.$store.commit("suppParams", {
        id: this.userInfo.oid,
        oid: this.confirmParams[0]
      });
      this.$router.push({
        name: "tranrialAdd"
      });
    },
    getOffer() {
      offer.getTranrial(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.info = eval("[[" + csp[0])[0];
          this.$store.commit("confirmParams", this.info);
          if (this.info[25]) {
            this.info[25] = this.$util.formatDate(this.info[25]);
          }
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
          this.saveTranDetails().then(result => {
            try {
              if (result) {
                offer.getPriceButton(this.confirmParams[0]).then(res => {
                  if (res && res.status === 1) {
                    if (res.text == "1") {
                      this.$toast.success({
                        forbidClick: true, // 禁用背景点击
                        message: "提交报价成功"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.$router.go(-1);
                        }, 800);
                      });
                      return;
                    } else if (res.text == "0") {
                      this.$toast.fail({
                        forbidClick: true, // 禁用背景点击
                        message: "合同未编辑，请先编辑合同"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.jumpInfo();
                        }, 800);
                      });
                      return;
                    }
                  }
                  throw "提交报价失败，请刷新页面重试";
                });
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

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Order_SetPrice_Edit")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.Allowvisible === "1") {
                switch (val.text) {
                  case "添加物资":
                    this.buttonValue.add.show = true;
                    this.buttonValue.add.disabled = val.Enabled !== "1";
                    break;
                  case "提交报价":
                    this.buttonValue.submit.show = true;
                    this.buttonValue.submit.disabled = val.Enabled !== "1";
                    break;
                  case "合同编辑":
                    this.buttonValue.edit.show = true;
                    this.buttonValue.edit.disabled = val.Enabled !== "1";
                    break;
                }
              }
            });
          }
        });
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
        name: "tranContractWork"
      });
    },
    //订货有效期
    fahuoDate(val) {
      this.info[17] = this.$util.formatDate(val);
      this.showDate = false;
    },
    //保存
    saveTranDetails() {
      const info = this.info;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_Master: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Order_MasterOID: info[0] }
            ]
          },
          {
            BC_SC_Order_Master: [
              { _attr: { UpdateKind: "" } },
              { SC_Order_MasterOID: "null" },
              { Valid_Date: info[17] },
              { Order_Man: info[18] },
              { Remark: info[21] },
              { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
              { SYS_LAST_UPD_BY: this.userInfo.oid } // 最后修改用户
            ]
          }
        ]
      });

      return offer.saveTranDetails(xmlString).then(res => {
        try {
          if (res.status === 1) return true;
          else return false;
        } catch (e) {
          return false;
        }
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
    .contract-date {
      width: 100%;
      position: fixed;
      z-index: 9999;
      bottom: 0;
      padding-right: 30px;
    }
  }
  .van-cell {
    font-size: 15px;
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
    width: 100%;
    padding: 10px;
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      width: 32%;
      padding: 0;
      margin-bottom: 5px;
    }
  }
}
</style>
