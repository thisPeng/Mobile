<template>
  <div class="task">
    <van-cell-group>
      <van-field :value="projectInfo.ProjectNo" label="工程编号" disabled />
      <van-field :value="projectInfo.ProjectName" label="工程名称" disabled />
      <van-field v-model="data.Partner_memo" label="申请说明" />
      <van-field v-model="dataMoney[3]" label="可用资金(￥)" disabled />
      <van-field v-model="data.Sheet_Amt" label="单据金额(￥)" disabled v-if="payment === '支付供应商'" />
      <van-cell-group class="from-payment">
        <span class="from-label">支付类型</span>
        <span class="from-select" @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar title="支付类型" :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <!--退结余额-->
      <van-field v-model="dataChildApply_SheetNO" label="支出名称" required v-if="payment === '其它支出申请'" />
      <van-field v-model="dataChildSupplier_Amt" label="申请金额(￥)" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataChildBank_Account" label="收款账号" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataChildBank_Name" label="开户行" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataChildRemark" label="收款人" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <!--余额转预存-->
      <van-field v-model="dataChildSupplierID" label="目标项目" disabled v-if="payment === '余额转预存'" />
      <van-field v-model="dataChildSupplier_Amt" label="转存金额(￥)" v-if="payment === '余额转预存'" />
      <van-field v-model="dataChildRemark" label="转预存说明" v-if="payment === '余额转预存'" />
      <!--员工姓名、创建时间-->
      <van-field :value="userInfo.name" label="制单人" disabled />
      <van-field :value="new Date().Format('yyyy-MM-dd')" label="制单日期" disabled />
      <div class="task-table" v-if="payment === '支付供应商'">
        <table>
          <thead>
            <tr>
              <td>单位名称</td>
              <td>分配金额</td>
              <td>款项说明</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataTable" :key="index">
              <td>
                <van-field :value="item.name" :disabled="true" />
              </td>
              <td>
                <van-field v-model="item.money" placeholder="请输入金额" @change="onChangeMoney" />
              </td>
              <td>
                <van-field v-model="item.remark" placeholder="请输入说明" />
              </td>
              <td>
                <van-button size="mini" type="danger" plain @click="dataTable.splice(index,1)">删除</van-button>
              </td>
            </tr>
            <tr>
              <td>
                <van-button size="mini" type="primary" plain @click="supplierShow=true">选择</van-button>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <b class="padding-left-sm" v-if="payment === '余额转预存'">说明：转预存是由一个项目的余额转给另一个项目的资金池中,供另一个项目使用, 不用通过银行,直接项目间产生资金的转移流水。</b>
    </van-cell-group>
    <van-popup v-model="supplierShow" position="right">
      <div class="supplier">
        <div class="supplier-item" v-for="(item,index) in supplierList" :key="index" @click="currSupp={key:index,value:item}">
          <!--标题-->
          <div class="item-title">
            <span class="title">{{item[2]}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item[0] === currSupp.value[0]" />
            </span>
          </div>
          <!--内容-->
          <div class="item-content">
            <div class="content-row">
              <span class="row-left flex-3">联系人：{{item[6]}}</span>
              <span class="row-right text-right">
                <van-tag type="danger" v-if="item[9] == '-1'">{{item[9] | supplierStatus}}</van-tag>
                <van-tag type="primary" v-else-if="item[9] === '2'">{{item[9] | supplierStatus}}</van-tag>
                <van-tag type="success" v-else-if="item[9] == '1'">{{item[9] | supplierStatus}}</van-tag>
                <van-tag v-else>{{item[9] | supplierStatus}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">联系电话：{{item[7]}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">固定电话：{{item[8]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">开户行：{{item[4]}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">银行账户：{{item[3]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">详细地址：{{item[5]}}</span>
            </div>
          </div>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click.stop="onConfrimItem">确 定</van-button>
        </div>
      </div>
    </van-popup>
    <div class="payment-button">
      <van-button @click="onSave">保存</van-button>
      <van-button type="primary" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { task, financial } from "../../../../assets/js/api.js";

export default {
  data() {
    return {
      data: {
        Sheet_Amt: 0,
        Partner_memo: ""
      },
      dataChild: {
        Supplier_Amt: "",
        Apply_SheetNO: "",
        Bank_Account: "",
        Bank_Name: "",
        Remark: "",
        SupplierID: "",
        SupplierName: ""
      },
      supplierShow: false,
      dataTable: [],
      dataMoney: [],
      currSupp: {
        key: 0,
        value: ""
      },
      supplierList: [],
      columns: ["支付供应商", "退结余额", "余额转预存", "其它支出申请"],
      paymentShow: false,
      payment: "请选择支付类型",
      paymentIndex: "",
      businessKey: "",
      edit: false
    };
  },
  methods: {
    //保存前先获取单号
    onSave() {
      financial.getSheetNo("SQ").then(result => {
        try {
          if (result && result.status === 1) {
            const xml = require("xml");
            if (this.businessKey == "") {
              const uuidv1 = require("uuid/v1");
              this.businessKey = uuidv1();
            }

            if (this.data.Partner_memo.trim() == "") {
              this.$toast.fail("请输入申请说明");
              return;
            } else if (this.paymentIndex === "") {
              this.$toast.fail("请选择支付类型");
              return;
            }
            let xmlString = "";
            if (this.edit) {
              xmlString = xml({
                BC_SC_Pay_Apply: [
                  {
                    _attr: { UpdateKind: "ukModify" }
                  },
                  { SC_Pay_ApplyOID: this.businessKey }
                ]
              });
            }
            xmlString += xml({
              BC_SC_Pay_Apply: [
                { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                { SC_Pay_ApplyOID: this.edit ? "null" : this.businessKey },
                { Sheet_NO: result.text },
                { ProjectID: this.projectInfo.SC_ProjectOID },
                { PartnerID: this.projectInfo.PartnerID },
                { DemandID: this.projectInfo.DemandID },
                { Sheet_Type: "SQ" },
                { Approve_Flag: 0 },
                { Pay_Type: this.paymentIndex },
                { Sheet_Amt: this.data.Sheet_Amt },
                { Partner_memo: this.data.Partner_memo },
                { SYS_CreatedBy: this.userId.UCML_UserOID },
                { SYS_POSTN: this.userId.UCML_PostOID },
                { SYS_DIVISION: this.userId.UCML_DivisionOID },
                { SYS_ORG: this.userId.UCML_OrganizeOID },
                { EmployeeName: this.userId.PersonName },
                { Print_Flag: "0000000000" },
                { SYS_Created: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                { SYS_LAST_UPD_BY: this.userInfo.oid }
              ]
            });
            if (this.paymentIndex == 1) {
              if (this.dataTable.length == 0) {
                this.$toast.fail("请选择需分配资金的供应商");
                return;
              }
              this.dataTable.forEach(val => {
                if (isNaN(parseInt(val.money))) {
                  this.$toast.fail("请输入正确的分配金额");
                  throw "请输入正确的分配金额";
                } else if (val.remark.trim() == "") {
                  this.$toast.fail("请输入款项说明");
                  throw "请输入款项说明";
                }
                if (val.isEdit) {
                  xmlString += xml([
                    {
                      BC_SC_Pay_Detail: [
                        {
                          _attr: {
                            UpdateKind: "ukModify"
                          }
                        },
                        { SC_Pay_DetailOID: val.id }
                      ]
                    }
                  ]);
                }
                // console.log(val);
                xmlString += xml([
                  {
                    BC_SC_Pay_Detail: [
                      {
                        _attr: {
                          UpdateKind: val.isEdit ? "" : "ukInsert"
                        }
                      },
                      { SC_Pay_DetailOID: val.isEdit ? "null" : val.id },
                      { ApplyOID: this.businessKey || "null" },
                      { SupplierID: val.sid },
                      { Supplier_Amt: val.money },
                      { Remark: val.remark },
                      { Bank_Name: val.bName },
                      { Bank_Account: val.bAcount },
                      { SupplierName: val.name },
                      { SYS_POSTN: this.userId.UCML_PostOID },
                      { SYS_DIVISION: this.userId.UCML_DivisionOID },
                      { SYS_ORG: this.userId.UCML_OrganizeOID },
                      { SYS_Created: val.time },
                      {
                        SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss")
                      },
                      { SYS_LAST_UPD_BY: this.userInfo.oid }
                    ]
                  }
                ]);
              });
            }
            xmlString = "<root>" + xmlString + "</root>";
            console.log(xmlString);

            financial.payConservation(xmlString).then(res => {
              if (res.status === 1) {
                this.$toast.success("保存成功");
                return;
              }
              this.$toast.fail(res.text);
            });
          } else {
            this.$toast.fail(result.text);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 计算单据金额
    onChangeMoney() {
      let sum = 0;
      this.dataTable.forEach(val => {
        sum += parseFloat(val.money);
      });
      this.data.Sheet_Amt = sum;
    },
    // 提交流程
    onSubmit() {
      task.submitPayment(this.businessKey).then(res => {
        if (res.status === 1) {
          this.$toast.success("提交成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }
      });
    },
    // 确认供应商选择
    onConfrimItem() {
      try {
        if (this.edit) {
          this.dataTable.forEach(val => {
            if (val.sid == this.currSupp.value[0]) {
              // this.supplierList.splice(this.currSupp.key, 1);
              this.$toast.fail("列表已存在供应商");
              throw "列表已存在供应商";
            }
          });
        }
        const uuidv4 = require("uuid/v4");
        this.dataTable.push({
          id: uuidv4(),
          sid: this.currSupp.value[0],
          name: this.currSupp.value[2],
          bName: this.currSupp.value[4],
          bAcount: this.currSupp.value[3],
          time: new Date().Format("yyyy-MM-dd hh:mm:ss"),
          money: "",
          remark: "",
          isEdit: false,
          info: this.currSupp
        });
        // this.supplierList.splice(this.currSupp.key, 1);
        this.currSupp = {
          key: 0,
          value: ""
        };
        this.supplierShow = false;
      } catch (e) {
        console.log(e);
      }
    },
    // 获取供应商列表
    getSupplierList() {
      financial.getSupplierList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          const sp = res.text.split(";");
          let supplierList = eval(sp[0].split("=")[1]);
          this.supplierList = supplierList;
          // console.log(this.supplierList);
        } catch (e) {
          console.log(e);
        }
      });
    },
    //支付类型
    onConfirm(value, index) {
      this.payment = value;
      this.paymentIndex = index + 1;
      this.paymentShow = false;
    }
  },
  computed,
  mounted() {
    if (this.taskParams.InstanceID) {
      this.edit = true;
      this.$parent.title = this.taskParams.name;
      this.businessKey = this.taskParams.InstanceID;
      financial.getPayInfo(this.taskParams).then(result => {
        try {
          if (result && result.status === 1) {
            let sp = result.text.split(";");
            const data = eval(sp[0].split("=")[1])[0];
            const dataTable = eval(sp[2].split("=")[1]);
            this.payment = this.columns[data[9] - 1];
            this.paymentIndex = parseInt(data[9]);
            this.data = {
              Sheet_Amt: data[12],
              Partner_memo: data[10]
            };
            dataTable.forEach(val => {
              this.dataTable.push({
                id: val[0],
                sid: val[3],
                name: val[8],
                bName: val[6],
                bAcount: val[4],
                time: val[9],
                money: val[4],
                remark: val[5],
                isEdit: true
              });
            });
            // console.log(this.dataTable);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
    // 获取数据
    task.getTaskZFMoney(this.projectInfo.SC_ProjectOID).then(res => {
      try {
        if (res && res.status === 1) {
          this.dataMoney = res.text.split(",");
          // console.log(this.dataMoney);
        }
      } catch (e) {
        console.log(e);
      }
    });
    this.getSupplierList();
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  padding-bottom: 75px;
  .task-title {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .center {
      margin: 0 auto;
    }
  }
  /* 选择供应商 */
  .van-popup--right {
    width: 90%;
    height: 100%;
    .supplier {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      background-color: #f6f6f6;
      padding-bottom: 50px;
      .supplier-item {
        background-color: #fff;
        padding: 5px 10px;
        margin-bottom: 10px;
        .item-title {
          height: 40px;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .option {
            padding: 10px 15px;
            font-size: 12px;
            color: #00a0e9;
            text-decoration: underline;
          }
        }
        .item-content {
          font-size: 12px;
          color: #666;
          padding: 5px 0;
          .content-row {
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .row-left {
              flex: 1;
            }
            .row-right {
              flex: 1;
            }
          }
        }
      }
      .screen-button {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
      }
    }
  }
  .from-payment {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .from-label {
      min-width: 90px;
      flex: 1;
    }
    .from-select {
      flex: 5;
    }
  }
  .task-table {
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      thead {
        tr {
          background-color: #e9f8ff;
          font-weight: 600;
        }
        td {
          padding: 10px 0;
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid #eee;
          td {
            height: 50px;
          }
        }
      }
    }
  }
  .payment-button {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    button {
      width: 49%;
    }
  }
}
</style>