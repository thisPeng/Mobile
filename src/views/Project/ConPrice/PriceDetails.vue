<template>
  <!-- 确认价格-询价单 -->
  <div class="pricedetails">
    <van-cell-group>
      <div class="task-title">基础信息</div>
      <van-field v-model="list[2]" label="单据编号：" disabled />
      <van-field v-model="list[3]" label="供应商名称：" disabled />
      <van-field v-model="list[5]" label="联系人：" disabled />
      <van-field v-model="list[6]" label="联系电话：" disabled />
      <van-field v-model="list[4]" label="供应商地址：" disabled />
      <van-field v-model="list[9]" label="订单数量：" disabled />
      <van-field v-model="list[10]" label="订单金额：" disabled />
      <van-field v-model="list[39]" label="订单状态：" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">订货有效期：</span>
        <span class="con-select" v-if="list[39] === '初始状态'" @click="showData=true">{{list[17]}}</span>
        <span class="con-select text-gray" v-else>{{list[17]}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showData" :min-date="new Date()" type="date" class="contract-date" @confirm="dinghuoDate" @cancel="showData=false" />
      <van-field v-model="list[18]" label="业务员：" :placeholder="list[39] === '待报价' || list[39] === '待确认' ? '' : '请输入业务员'" :disabled="list[39] === '待报价' || list[39] === '待确认'" :autofocus="true" />
      <van-field v-model="list[26]" label="员工姓名：" disabled />
      <van-field v-model="list[21]" label="备注：" type="textarea" :placeholder="list[39] === '待报价' || list[39] === '待确认' ? '' : '请输入备注'" :disabled="list[39] === '待报价' || list[39] === '待确认'" />
      <div class="task-title">附加信息</div>
      <van-cell title="物资列表" is-link value="" @click="jumpPage('inquirydetails')" />
      <van-cell title="附件" is-link value="" @click="jumpPage('comfrimAnnex')" />
    </van-cell-group>
    <!--功能操作-->
    <div class="con-button" v-if="buttonValue.length > 0">
      <div class="button-value" v-for="(item,index) in buttonValue" :key="index" v-if="item.Allowvisible === '1'">
        <van-button type="primary" @click="confrimPrice" v-if="list[39] === '已报价' && list[16] !== '1' && item.text === '确认'" :disabled="item.Enabled !== '1'">确认</van-button>
        <van-button type="primary" @click="sendOrder" v-if="list[39] === '初始状态' && item.text === '提议'" :disabled="item.Enabled !== '1'">发送</van-button>
        <van-button type="warning" @click="conProposal" v-if="list[39] === '已报价' && item.text === '提议'" :disabled="item.Enabled !== '1'">提议</van-button>
        <van-button type="main" @click="jumpPage('contractwork')" v-if="list[39] !== '待报价' && list[39] !== '待确认' && item.text === '编辑'" :disabled="item.Enabled !== '1'">编辑合同</van-button>
        <van-button type="default" @click="jumpPage('inquirydetails')" v-if="list[39] !== '待报价' && list[39] !== '待确认' && item.text === '添加物资'" :disabled="item.Enabled !== '1'">添加物资</van-button>
        <van-button type="danger" @click="confirmDelete" v-if="item.text === '删除'" :disabled="item.Enabled !== '1'">删除</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, conprice, contractInfo } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      list: [],
      currentDate: new Date().Format("yyyy-MM-dd"),
      showData: false,
      buttonValue: []
    };
  },
  computed,
  methods: {
    //订货有效期
    dinghuoDate(val) {
      this.list[17] = this.$util.formatDate(val);
      this.showData = false;
    },
    // 询价单主表
    getInfo() {
      conprice.getInfo(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0])[0];
          if (this.list[17]) {
            this.list[17] = this.$util.formatDate(this.list[17]);
          } else {
            this.list[17] = "请选择时间";
          }
        }
      });
    },
    // 添加物资
    conAddGoods() {
      this.$store.commit("suppParams", {
        id: this.list[11],
        oid: this.list[0]
      });
      this.$router.push({
        name: "supplierInfo"
      });
    },
    //确认按钮
    confrimPrice() {
      this.$dialog
        .confirm({
          title: "确认",
          message: "是否确认订单？"
        })
        .then(() => {
          this.saveOrder().then(result => {
            try {
              if (result) {
                conprice.confrimPrice(this.confirmParams[0]).then(res => {
                  if (res && res.status === 1) {
                    if (res.text == "0") {
                      this.$toast.fail({
                        forbidClick: true, // 禁用背景点击
                        message: "合同并未编辑，请先确定合同内容！"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.jumpPage("contractwork");
                        }, 800);
                      });
                    } else if (res.text == "1") {
                      this.$toast.success({
                        forbidClick: true, // 禁用背景点击
                        message: "生成订单成功，等待供应商发货"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.$router.go(-1);
                        }, 800);
                      });
                    } else {
                      this.$toast.fail("生成订单失败");
                    }
                  } else if (res && res.text) {
                    this.$toast(res.text);
                  }
                });
                return;
              }
              throw "操作失败，请重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 发送询价单
    sendOrder() {
      this.$dialog
        .confirm({
          title: "发送订单",
          message: "确认发送订单给供应商？"
        })
        .then(() => {
          this.saveOrder().then(result => {
            try {
              if (result) {
                conprice.sendOrder(this.confirmParams[0]).then(res => {
                  if (res && res.status === 1 && res.text == "True") {
                    this.$toast.success({
                      forbidClick: true, // 禁用背景点击
                      message: "发送成功"
                    });
                    this.$nextTick().then(() => {
                      setTimeout(() => {
                        this.$router.go(-1);
                      }, 800);
                    });
                    return;
                  }
                  throw "发送失败，请刷新页面重试";
                });
              }
              throw "操作失败，请重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //提议
    conProposal() {
      this.$dialog
        .confirm({
          title: "提议",
          message: "是否确认提议？"
        })
        .then(() => {
          this.saveOrder().then(result => {
            try {
              if (result) {
                conprice.conProposal(this.confirmParams[0]).then(res => {
                  try {
                    if (res && res.status === 1) {
                      this.$toast.success({
                        forbidClick: true, // 禁用背景点击
                        message: "已提议，订单返回供应商"
                      });
                      this.$nextTick().then(() => {
                        setTimeout(() => {
                          this.$router.go(-1);
                        }, 800);
                      });
                      return;
                    }
                    throw "单据已经审核，不能重复审核!";
                  } catch (e) {
                    this.$toast.fail(e);
                  }
                });
                return;
              }
              throw "操作失败，请重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //删除
    confirmDelete() {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删除此单号记录？"
        })
        .then(() => {
          const params = {
            BillOID: this.confirmParams[0],
            ContractID: this.list[23]
          };
          conprice.confirmDelete(params).then(res => {
            try {
              if (res && res.status === 1 && res.text == "True") {
                this.$toast.success({
                  forbidClick: true, // 禁用背景点击
                  message: "已删除"
                });
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 800);
                });
                return;
              }
              throw "删除失败，请刷新页面重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 跳转页面
    jumpPage(name) {
      this.$router.push({
        name
      });
    },
    //保存
    saveOrder() {
      const list = this.list;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_Master: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Order_MasterOID: list[0] }
            ]
          },
          {
            BC_SC_Order_Master: [
              { _attr: { UpdateKind: "" } },
              { SC_Order_MasterOID: "null" },
              { Valid_Date: list[17] },
              { Order_Man: list[18] },
              { Remark: list[21] },
              { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
              { SYS_LAST_UPD_BY: this.userInfo.oid } // 最后修改用户
            ]
          }
        ]
      });
      return contractInfo.keepContract(xmlString).then(res => {
        try {
          if (res && res.status === 1) return true;
          else return false;
        } catch (e) {
          return false;
        }
      });
    },
    pageInit() {
      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Order_XJ")
        .then(res => {
          if (res.status) {
            this.buttonValue = JSON.parse(res.text);
          }
        });
      this.getInfo();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.pricedetails {
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
      min-width: 92px;
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
  }
  .con-data {
    margin-bottom: 40px;
    .con-card {
      width: 100%;
      .con-item {
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
  .van-button--normal {
    padding: 0px 30px;
  }
  .con-button {
    width: 100%;
    padding: 20px 0;
    .button-value {
      display: inline-block;
      button {
        width: 127.5px;
        padding: 0;
        margin: 5px;
      }
    }
  }
  .con-data {
    margin-bottom: 12px;
  }
  .task-title {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
}
</style>

