<template>
  <!-- 合同编辑 -->
  <div class="contractwork">
    <van-cell-group>
      <div class="title-delivery">基本合同信息</div>
      <van-field v-model="cspList[1]" label="合同编号" disabled/>
      <van-field v-model="cspList[2]" label="合同名称" />
      <van-field v-model="cspList[11]" label="合同金额" />
      <van-cell-group class="tact-price">
        <span class="tact-label">税率(%)</span>
        <span class="tact-select">
          <van-stepper v-model="cspList[19]" />
        </span>
      </van-cell-group>
      <van-field v-model="cspList[18]" label="合同含税金额" />
      <van-field v-model="cspList[31]" label="甲方" />
      <van-field v-model="cspList[39]" label="乙方" />
      <van-field v-model="cspList[10]" label="验收限期(天)" />
      <van-cell-group class="con-price">
        <span class="con-label">交货时间</span>
        <span class="con-select" @click="showDateone=true">{{cspList[23]}}</span>
        <van-datetime-picker v-model="currentDate" v-show="showDateone" type="date" class="contract-date" @confirm="jiaohuoDate" @cancel="showDateone=false" />
      </van-cell-group>
      <van-field v-model="cspList[8]" label="交货地点" />
      <van-cell-group class="con-price">
        <span class="con-label">付款方式</span>
        <span class="con-select" @click="paymentShow=true">{{item.payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <div v-if="item.payment == '第三种付款方式'">
        <van-field v-model="item.id" label="订金付款期限(天)" />
        <van-field v-model="item.id" label="进场付款期限(天)" />
        <van-field v-model="item.id" label="保质付款期限(天)" />
        <van-field v-model="item.id" label="订金比例(%)" />
        <van-field v-model="item.id" label="进场付款比例(%)" />
        <van-field v-model="item.id" label="保质付款比例(%)" />
      </div>
      <div class="title-delivery">保质与违约</div>
      <van-field v-model="cspList[13]" label="保质期（天）" />
      <van-cell-group class="con-price">
        <span class="con-label">保质开始时间</span>
        <span class="con-select" @click="showDate=true">{{cspList[9]}}</span>
        <van-datetime-picker v-model="currentDate" v-show="showDate" type="date" class="contract-date" @confirm="saveDate" @cancel="showDate=false" />
      </van-cell-group>
      <van-cell-group class="con-price">
        <span class="con-label">保质结束时间</span>
        <span class="con-select" @click="showDatatwo=true">{{cspList[14]}}</span>
        <van-datetime-picker v-model="currentDate" v-show="showDatatwo" type="date" class="contract-date" @confirm="jieshuDate" @cancel="showDatetwo=false" />
      </van-cell-group>
      <van-field v-model="cspList[15]" label="保证金比例(%)" />
      <van-field v-model="cspList[26]" label="保质期处理期限(天)" />
      <van-field v-model="cspList[27]" label="保质期处理备注" />
      <van-field v-model="cspList[28]" label="乙方违约(‰)" />
      <van-field v-model="cspList[29]" label="甲方违约(‰)" />
      <div class="title-delivery">甲方信息</div>
      <van-field v-model="cspList[31]" label="甲方(盖章签名处)" disabled/>
      <van-field v-model="cspList[32]" label="甲方银行账号" disabled/>
      <van-field v-model="cspList[33]" label="甲方开户行" disabled />
      <van-field v-model="cspList[34]" label="甲方纳税识别码" disabled/>
      <van-field v-model="cspList[36]" label="甲方电话" disabled/>
      <van-field v-model="cspList[37]" label="甲方代表人" />
      <van-cell-group class="con-price">
        <span class="con-label">甲方签订日期</span>
        <span class="con-select" @click="showDatathree=true">{{cspList[38]}}</span>
        <van-datetime-picker v-model="currentDate" v-show="showDatathree" type="date" class="contract-date" @confirm="jiafangDate" @cancel="showDatathree=false" />
      </van-cell-group>
      <van-field v-model="cspList[35]" label="甲方地址" disabled/>
      <div class="title-delivery">乙方信息</div>
      <van-field v-model="cspList[39]" label="乙方(盖章签名处)" disabled/>
      <van-field v-model="cspList[40]" label="乙方银行账号" disabled />
      <van-field v-model="cspList[41]" label="乙方开户行" disabled/>
      <van-field v-model="cspList[42]" label="乙方纳税识别码" disabled/>
      <van-field v-model="cspList[44]" label="乙方电话" disabled/>
      <van-field v-model="cspList[45]" label="乙方代表人" />
      <van-cell-group class="con-price">
        <span class="con-label">乙方签订日期</span>
        <span class="con-select" @click="showDatafour=true">{{cspList[46]}}</span>
        <van-datetime-picker v-model="currentDate" v-show="showDatafour" type="date" class="contract-date" @confirm="yifangDate" @cancel="showDatafour=false" />
      </van-cell-group>
      <van-field v-model="cspList[43]" label="乙方地址" disabled/>
    </van-cell-group>
    <!-- <div class="title-delivery">合同附件表</div>  -->
    <div class="button">
      <van-button size="large" type="primary" @click="submitWork">提交</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { conprice, contractInfo } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      cspList: [],
      item: {
        payment: "请选择付款方式"
      },
      currentDate: new Date(),
      columns: ["第一种付款方式", "第二种付款方式", "第三种付款方式"],
      paymentShow: false,
      showDate: false, // 确认时间
      showDateone: false, //交货时间
      showDatatwo: false, //保质结束时间
      showDatathree: false, //甲方
      showDatafour: false //乙方
    };
  },
  computed,
  methods: {
    //付款方式
    onConfirm(res) {
      this.item.payment = res;
      this.paymentShow = false;
    },
    // 确认时间
    saveDate(val) {
      this.cspList[9] = new Date(val).Format("yyyy-MM-dd");
      this.showDate = false;
    },
    //交货时间
    jiaohuoDate(val) {
      this.cspList[23] = new Date(val).Format("yyyy-MM-dd");
      this.showDateone = false;
    },
    //保质结束时间
    jieshuDate(val) {
      this.cspList[14] = new Date(val).Format("yyyy-MM-dd");
      this.showDatatwo = false;
    },
    //甲方
    jiafangDate(val) {
      this.cspList[38] = new Date(val).Format("yyyy-MM-dd");
      this.showDatathree = false;
    },
    //乙方
    yifangDate(val) {
      this.cspList[46] = new Date(val).Format("yyyy-MM-dd");
      this.showDatafour = false;
    },
    conContract() {
      conprice.conContract(this.confirmParams[4]).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          // console.log(res.text);
          const sp = res.text.split("[[");
          // console.log(sp);
          const csp = sp[1].split(";");
          // console.log(csp);
          this.cspList = eval("[[" + csp[0])[0];

          // if (this.cspList[9]) {
          //   this.cspList[9] = "请选择时间"; // 确认时间
          // }
          // if (this.cspList[23]) {
          //   this.cspList[23] = "请选择时间"; //交货时间
          // }
          // if (this.cspList[14]) {
          //   this.cspList[14] = "请选择时间"; //保质结束时间
          // }
          // if (this.cspList[38]) {
          //   this.cspList[38] = "请选择时间"; //甲方
          // }
          // if (this.cspList[46]) {
          //   this.cspList[46] = "请选择时间"; //乙方
          // }
          // console.log(this.cspList);
        }
      });
    },
    // 提交
    submitWork() {
      const cspList = this.cspList;
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_Contract: [
              {
                _attr: {
                  UpdateKind: "ukModify"
                }
              },
              {
                SC_Order_ContractOID: cspList[0]
              },
              {
                Contract_Name: "null"
              },
              {
                Partner_Name: "null"
              },
              {
                Supplier_Name: "null"
              },
              {
                PartnerID: "null"
              },
              {
                SupplierID: "null"
              },
              {
                BusinessID: "null"
              },
              {
                Deliver_Addr: "null"
              },
              {
                Deliver_Time: "null"
              },
              {
                Accept_Valid_Day: "null"
              },
              {
                Contract_Amt: "null"
              },
              {
                Pay_Mode: "null"
              },
              {
                Signt_Valid_Day: "null"
              },
              {
                Signt_Percent: "null"
              },
              {
                In_Valid_Day: "null"
              },
              {
                In_Pay_Percent: "null"
              },
              {
                Payment_Other: "null"
              },
              {
                Contract_Tax_Amt: "null"
              },
              {
                TaxRate: "null"
              },
              {
                Ensure_Valid_Day: "null"
              },
              {
                Ensure_Pay_Percent: "null"
              },
              {
                Ensure_Day: "null"
              },
              {
                Ensure_Begin_Date: "null"
              },
              {
                Ensure_End_Date: "null"
              },
              {
                Ensure_Amt_Percent: "null"
              },
              {
                Ensure_Deal_Day: "null"
              },
              {
                Ensure_Deal_Remark: "null"
              },
              {
                Supplier_Breach: "null"
              },
              {
                Partner_Breach: "null"
              },
              {
                Court_Sue: "null"
              },
              // {
              //   Partner_Sign: null
              // },
              // {
              //   Partner_BankNO: null
              // },
              // {
              //   Partner_BankName: null
              // },
              // {
              //   Partner_TaxNO: null
              // },
              // {
              //   Partner_Addr: null
              // },
              // {
              //   Partner_TaxNO: null
              // },
              // {
              //   Partner_Tel: null
              // },
              // {
              //   Partner_Behalf: null
              // },
              {
                Partner_Sign_Date: "null"
              },
              // {
              //   Supplier_Sign: null
              // },
              // {
              //   Supplier_BankNO: null
              // },
              // {
              //   Supplier_BankName: null
              // },
              // {
              //   Supplier_TaxNO: null
              // },
              // {
              //   Supplier_Addr: null
              // },
              // {
              //   Supplier_Tel: null
              // },
              // {
              //   Supplier_Behalf: null
              // },
              {
                Supplier_Sign_Date: "null"
              },
              {
                ProjectID: "null"
              },
              {
                Approve_Flag: "null"
              },
              {
                Seal_Flag: "null"
              },
              {
                Edit_Flag: "null"
              },
              {
                Contract_Type: "null"
              },
              {
                Return_Flag: "null"
              }
            ]
          },
          {
            BC_SC_Order_Contract: [
              {
                _attr: {
                  UpdateKind: ""
                }
              },
              {
                SC_Order_ContractOID: "null"
              },
              {
                Contract_Name: cspList[2]
              },
              {
                Partner_Name: cspList[31]
              },
              {
                Supplier_Name: cspList[39]
              },
              {
                PartnerID: "null"
              },
              {
                SupplierID: "null"
              },
              {
                BusinessID: "null"
              },
              {
                Deliver_Addr: cspList[8]
              },
              {
                Deliver_Time: cspList[23]
              },
              {
                Accept_Valid_Day: cspList[10]
              },
              {
                Contract_Amt: cspList[11]
              },
              {
                Pay_Mode: "null"
              },
              {
                Signt_Valid_Day: "null"
              },
              {
                Signt_Percent: "null"
              },
              {
                In_Valid_Day: "null"
              },
              {
                In_Pay_Percent: "null"
              },
              {
                Payment_Other: "null"
              },
              {
                Contract_Tax_Amt: "null"
              },
              {
                TaxRate: "null"
              },
              {
                Ensure_Valid_Day: "null"
              },
              {
                Ensure_Pay_Percent: "null"
              },
              {
                Ensure_Day: "null"
              },
              {
                Ensure_Begin_Date: "null"
              },
              {
                Ensure_End_Date: "null"
              },
              {
                Ensure_Amt_Percent: "null"
              },
              {
                Ensure_Deal_Day: cspList[26]
              },
              {
                Ensure_Deal_Remark: "null"
              },
              {
                Supplier_Breach: cspList[28]
              },
              {
                Partner_Breach: cspList[29]
              },
              {
                Court_Sue: "null"
              },
              {
                Partner_Sign_Date: "null"
              },
              {
                Supplier_Sign_Date: "null"
              },
              {
                ProjectID: "null"
              },
              {
                Approve_Flag: "null"
              },
              {
                Seal_Flag: "null"
              },
              {
                Edit_Flag: "null"
              },
              {
                Contract_Type: "null"
              },
              {
                Return_Flag: "null"
              }
            ]
          }
        ]
      });
      // console.log(xmlString);
      this.$dialog
        .confirm({
          title: "提交",
          message: "确认提交该合同？"
        })
        .then(() => {
          contractInfo.saveContract(xmlString).then(res => {
            if(res &&res.status ===1){
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("提交成功");
                  }, 300);
                });
                 this.$router.replace({
                  name:"pricedetails"
                })
            }
          });
        });
    }
  },
  mounted() {
    this.conContract();
  }
};
</script>
<style lang="less" scoped>
.contractwork {
  width: 100%;
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .con-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    color: #999494;
    font-size: 14px;
    overflow: hidden;
    .con-label {
      color: #999494;
      min-width: 130px;
      flex: 1;
    }
    .con-select {
      color: #999494;
      flex: 5;
    }
    .contract-date {
      width: 100%;
      position: fixed;
      z-index: 9999;
      bottom: 0;
      padding-right: 30px;
    }
  }
  .tact-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    color: #999494;
    font-size: 14px;
    overflow: hidden;
  }
  .tact-label {
    color: #999494;
    min-width: 129px;
    flex: 1;
  }
  .tact-select {
    color: #999494;
    flex: 5;
  }
  .button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    button {
      width: 95%;
      text-align: center;
    }
  }
  .van-cell {
    color: #999494;
  }
}
</style>
<style lang="less">
.contractwork {
  .van-field .van-cell__title {
    max-width: 130px;
  }
}
</style>

