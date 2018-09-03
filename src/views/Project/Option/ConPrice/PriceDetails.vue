<template>
  <!-- 确认价格-询价单 -->
  <div class="pricedetails">
    <div class="title-price">询价单</div>
    <van-cell-group>
      <van-field v-model="list[2]" label="单据编号:" disabled />
      <van-field v-model="list[3]" label="供应商名称:" disabled />
      <van-field v-model="list[5]" label="联系人:" disabled />
      <van-field v-model="list[6]" label="联系电话:" disabled />
      <van-field v-model="list[4]" label="供应商地址:" disabled />
      <van-field v-model="list[9]" label="订单数量:" disabled />
      <van-field v-model="list[10]" label="订单金额:" disabled />
      <van-field v-model="list[39]" label="订单状态:" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">订货有效期:</span>
        <span class="con-select" v-if="list[39] === '初始状态'" @click="showData=true">{{list[17]}}</span>
        <span class="con-select text-gray" v-else>{{list[17]}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showData" type="date" class="contract-date" @confirm="dinghuoDate" @cancel="showData=false" />
      <van-field v-model="list[18]" label="业务员:" placeholder="请输入业务员" required :disabled="list[39] !== '初始状态'" :autofocus="true" />
      <van-field v-model="list[26]" label="员工姓名:" disabled />
      <van-field v-model="list[21]" label="备注:" type="textarea" placeholder="请输入备注" :disabled="list[39] !== '初始状态'" />
    </van-cell-group>
    <van-cell title="询价单明细" is-link value="详情" @click="jumpInfo(item)" />
    <van-cell title="询价单附件" is-link value="详情" @click="jumpPage('annexContent')" />
    <!--功能操作-->
    <div class="con-button">
      <van-button type="default" @click="confrimPrice">确认</van-button>
      <van-button type="default" @click="conProposal">提议</van-button>
      <van-button type="default" @click="conAddGoods">添加物资</van-button>
    </div>
    <div class="con-button">
      <van-button type="default" @click="keepWork">保存</van-button>
      <van-button type="default" @click="confirmDelete">删除</van-button>
      <van-button type="default" @click="jumpPage('contractwork')">合同编辑</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { conprice, contractInfo } from "../../../../assets/js/api.js";

export default {
  data() {
    return {
      list: [],
      currentDate: new Date().Format("yyyy-MM-dd"),
      showData: false
    };
  },
  computed,
  methods: {
    //订货有效期
    dinghuoDate(val) {
      this.item[17] = new Date(val).Format("yyyy-MM-dd");
      this.showData = false;
    },
    // 询价单主表
    getInfo() {
      conprice.getInfo(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0])[0];
          console.log(this.list);
        }
      });
    },
    // 询价单明细
    // getDetails() {
    //   conprice.getDetails(this.confirmParams[0]).then(res => {
    //     if (res && res.status === 1) {
    //       const sp = res.text.split("[[");
    //       const dsp = sp[1].split(";");
    //       this.dspList = eval("[[" + dsp[0]);
    //       // console.log(this.dspList);
    //     }
    //   });
    // },
    // 添加物资
    conAddGoods() {
      this.$store.commit("suppParams", {
        id: this.list[11],
        oid: this.list[0]
      });
      this.$router.push({
        name: "supplierType"
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
          conprice.confrimPrice(this.confirmParams[0]).then(res => {
            if (res && res.status === 1) {
              if (res.text === "0") {
                this.$toast.fail("合同并未编辑，请先确定合同内容！");
              } else if (res.text === "1") {
                this.getInfo();
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("生成订单成功");
                  }, 300);
                });
              } else {
                this.$toast.fail("生成订单失败");
              }
            } else if (res && res.text) {
              this.$toast(res.text);
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
          conprice.confrimPrice(this.confirmParams[0]).then(res => {
            if (res && res.text === "1") {
              this.$router.replace({
                name: "conprice"
              });
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
          conprice.confrimPrice(this.confirmParams[0]).then(res => {
            console.log(res);
            if (res && res.text === "1") {
              this.$router.replace({
                name: "conprice"
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    jumpPage(name) {
      this.$router.push({
        name
      });
    },
    jumpInfo(info) {
      this.$store.commit("infoDetails", info);
      this.$router.push({
        name: "inquirydetails"
      });
    },
    //保存
    keepWork() {
      const list = this.list;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_Master: [
              {
                _attr: {
                  UpdateKind: "ukModify"
                }
              },
              {
                SC_Order_MasterOID: list[0]
              },
              {
                Valid_Date: "null"
              },
              {
                Order_Man: "null"
              },
              {
                Remark: "null"
              }
            ]
          },
          {
            BC_SC_Order_Master: [
              {
                _attr: {
                  UpdateKind: ""
                }
              },
              {
                SC_Order_MasterOID: "null"
              },
              {
                Valid_Date: list[17]
              },
              {
                Order_Man: list[18]
              },
              {
                Remark: list[21]
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
          contractInfo.keepContract(xmlString).then(res => {
            if (res && res.status === 1) {
              // console.log(res);
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$toast.success("保存成功");
                }, 300);
              });
              this.$router.replace({
                name: "conprice"
              });
            }
          });
        });
    }
  },
  mounted() {
    this.getInfo();
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

  .title-price {
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
      width: 32%;
      padding: 0;
      // flex: 1;
    }
  }
  .con-data {
    margin-bottom: 12px;
  }
}
</style>

