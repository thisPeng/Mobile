<template>
  <div class="task">
    <van-cell-group>
      <van-field :value="projectInfo.ProjectNo" label="工程编号" disabled />
      <van-field :value="projectInfo.ProjectName" label="工程名称" disabled />
      <van-field v-model="data.Supplier_Amt" label="申请方说明" />
      <van-field v-model="dataMoney[3]" label="可用资金(￥)" disabled />
      <van-cell-group class="from-payment">
        <span class="from-label">支付类型</span>
        <span class="from-select" @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar title="支付类型" :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <!--退结余额-->
      <van-field v-model="data.Apply_SheetNO" label="支出名称" required v-if="payment === '其它支出申请'" />
      <van-field v-model="data.Supplier_Amt" label="申请金额(￥)" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="data.Bank_Account" label="收款账号" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="data.Bank_Name" label="开户行" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="data.Remark" label="收款人" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <!--余额转预存-->
      <van-field v-model="data.SupplierID" label="目标项目" disabled v-if="payment === '余额转预存'" />
      <van-field v-model="data.Supplier_Amt" label="转存金额(￥)" v-if="payment === '余额转预存'" />
      <van-field v-model="data.Remark" label="转预存说明" v-if="payment === '余额转预存'" />
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
                <van-field :value="item.info[2]" :disabled="true" />
              </td>
              <td>
                <van-field v-model="item.money" placeholder="请输入金额" />
              </td>
              <td>
                <van-field v-model="item.remake" placeholder="请输入说明" />
              </td>
              <td>
                <van-button size="mini" type="danger" plain @click="supplierList.push(item.info);dataTable.splice(index,1)">删除</van-button>
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
      paymentIndex: 0
    };
  },
  methods: {
    //保存前先获取单号
    onSave() {
      financial.getSheetNo("SQ").then(res => {
        const xml = require("xml");
        const uuidv1 = require("uuid/v1");
        const uuid = uuidv1();
        let xmlString = xml({
          BC_SC_Pay_Apply: [
            { _attr: { UpdateKind: "ukInsert" } },
            { SC_Pay_ApplyOID: uuid },
            { Sheet_NO: res },
            { Pay_Type: this.paymentIndex },
            { Sheet_Amt: this.data.Supplier_Amt },
            { SYS_Created: new Date() },
            { SYS_LAST_UPD_BY: this.userInfo.oid }
          ]
        });
        if (this.paymentIndex == 1) {
          this.dataTable.forEach(val => {
            xmlString += xml([
              {
                BC_SC_Pay_Detail: [
                  { _attr: { UpdateKind: "ukInsert" } },
                  { SC_Pay_DetailOID: uuidv1() },
                  { ApplyOID: uuid },
                  { SupplierID: val[3] },
                  { Supplier_Amt: val[4] },
                  { Remark: val[5] },
                  { Bank_Name: val[6] },
                  { Bank_Account: val[7] },
                  { SupplierName: val[8] },
                  { SYS_Created: new Date() },
                  { SYS_LAST_UPD_BY: this.userInfo.oid }
                ]
              }
            ]);
          });
        }
        xmlString = "<root>" + xmlString + "</root>";
        console.log(xmlString);
      });
    },
    // 提交流程
    onSubmit() {},
    onConfrimItem() {
      this.dataTable.push({
        info: this.currSupp.value,
        money: "",
        remake: ""
      });
      this.supplierList.splice(this.currSupp.key, 1);
      this.currSupp = {
        key: 0,
        value: ""
      };
      this.supplierShow = false;
    },
    getSupplierList() {
      financial.getSupplierList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          const sp = res.text.split(";");
          this.supplierList = eval(sp[0].split("=")[1]);
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