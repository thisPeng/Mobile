<template>
  <div class="task" :style="buttonValue.length > 0 ? 'padding-bottom: 75px;' : ''">
    <div class="task-content">
      <van-cell-group>
        <van-field :value="data.id || '系统生成'" label="单号" :disabled="true" />
        <van-field :value="data.Project_No" label="工程编号" :disabled="true" />
        <div class="van-cell van-field">
          <div class="van-cell__title">工程名称</div>
          <div class="van-cell__value flex-between">
            <span :class="edit ? 'text-truncate text-left text-gray' : 'text-truncate text-left'">{{data.Project_Name || '请选择工程项目'}}</span>
            <van-button type="primary" size="mini" @click="projectShow=true" v-if="!edit">选择</van-button>
          </div>
        </div>
        <van-field v-model="data.Partner_memo" label="申请说明" required placeholder="请输入申请说明" />
        <van-field :value="dataMoney[3]" label="可用资金(￥)" disabled />
        <van-field v-model="data.Sheet_Amt" label="单据金额(￥)" disabled v-if="payment === '支付供应商'" />
        <div class="van-cell van-cell--required van-field">
          <div class="van-cell__title">支付类型</div>
          <div class="van-cell__value flex-between" @click="edit ? '' : paymentShow=true">
            <span :class="edit ? 'text-gray from-select' : 'from-select'">{{payment}}</span>
          </div>
        </div>

        <!--退结余额-->
        <van-field v-model="dataChild.Apply_SheetNO" label="支出名称" placeholder="请输入支出名称" required v-if="payment === '其它支出申请'" />
        <van-field v-model="dataChild.Supplier_Amt" label="申请金额(￥)" placeholder="请输入申请金额" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
        <van-field v-model="dataChild.Bank_Account" label="收款账号" placeholder="请输入收款账号" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
        <van-field v-model="dataChild.Bank_Name" label="开户行" placeholder="请输入开户行" required v-if="payment === '退结余额' || payment === '其它支出申请'" />
        <van-field v-model="dataChild.Remark" label="收款人" placeholder="请输入收款人" required v-if="payment === '退结余额' || payment === '其它支出申请'" />

        <!--余额转预存-->
        <van-cell-group class="from-payment" v-if="payment === '余额转预存'">
          <span class="from-label">目标项目</span>
          <span class="from-select">{{dataChild.SupplierName}}
            <van-button type="primary" size="mini" @click="onShowForProject">选择</van-button>
          </span>
        </van-cell-group>
        <van-field v-model="dataChild.Supplier_Amt" label="转存金额(￥)" placeholder="请输入转存金额" required v-if="payment === '余额转预存'" />
        <van-field v-model="dataChild.Remark" label="转预存说明" placeholder="请输入转预存说明" required v-if="payment === '余额转预存'" />

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
                  <van-field :value="item.name" type="textarea" :disabled="true" />
                </td>
                <td>
                  <van-field v-model="item.money" placeholder="请输入金额" @change="onChangeMoney" />
                </td>
                <td>
                  <van-field v-model="item.remark" placeholder="请输入说明" />
                </td>
                <td>
                  <van-button size="mini" type="danger" plain @click="onDeleteItem(item,index)">删除</van-button>
                </td>
              </tr>
              <!--选择-->
              <tr>
                <td>
                  <van-button size="mini" type="primary" plain @click="onShowSuppList">选择</van-button>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="padding" v-if="payment === '余额转预存'">
          <span>转预存是由一个项目的余额转给另一个项目的资金池中,供另一个项目使用, 不用通过银行,直接项目间产生资金的转移流水。</span>
        </div>
      </van-cell-group>
    </div>
    <van-popup v-model="paymentShow" position="bottom">
      <van-picker show-toolbar title="支付类型" :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
    </van-popup>
    <!--功能操作-->
    <div class="payment-button" v-if="buttonValue.length > 0">
      <div class="button-value" v-for="(item,index) in buttonValue" :key="index" v-if="item.Allowvisible === '1'">
        <van-button @click="onSave" v-if="item.text === '保存'" :disabled="item.Enabled !== '1'">保存</van-button>
        <van-button type="primary" @click="onSubmit" v-if="item.text === '提交'" :disabled="item.Enabled !== '1'">提交</van-button>
      </div>
    </div>

    <!--客户列表-->
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
              <span class="row-left">联系人：{{item[6]}}</span>
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

    <!--项目列表-->
    <van-popup v-model="projectShow" position="right">
      <div class="supplier">
        <div class="supplier-item" v-for="(item,index) in projectList" :key="index" @click="currProject=item">
          <!--标题-->
          <div class="item-title">
            <span class="title">{{item.ProjectName}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item.SC_ProjectOID === currProject.SC_ProjectOID" />
            </span>
          </div>
          <!--内容-->
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">联系人：{{item.Contact}}</span>
              <span class="row-right text-right">联系电话：{{item.Telephone}}</span>
            </div>
          </div>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click.stop="onConfrimProItem">确 定</van-button>
        </div>
      </div>
    </van-popup>

    <!--目标项目-->
    <van-popup v-model="projectForShow" position="right">
      <div class="supplier">
        <div class="supplier-item" v-for="(item,index) in projectForList" :key="index" @click="currForProject=item">
          <!--标题-->
          <div class="item-title">
            <span class="title">{{item[1]}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item[0] === currForProject[0]" />
            </span>
          </div>
          <!--内容-->
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">联系人：{{item[21]}}</span>
              <span class="row-right text-right">联系电话：{{item[21]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">备注：{{item[7]}}</span>
            </div>
          </div>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click.stop="onConfrimProForItem">确 定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, task, project, financial } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      data: {
        Sheet_Amt: 0,
        Partner_memo: ""
      },
      dataChild: {
        SC_Pay_DetailOID: "",
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
      delTable: [],
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
      projectShow: false,
      projectForShow: false,
      projectList: [],
      projectForList: [],
      currProject: [],
      currForProject: [],
      edit: false,
      buttonValue: []
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

            if (!this.data.SC_ProjectOID) {
              this.$toast.fail("请选择工程项目");
              return;
            }
            if (!this.data.Partner_memo.trim()) {
              this.$toast.fail("请输入申请说明");
              return;
            } else if (this.paymentIndex === "") {
              this.$toast.fail("请选择支付类型");
              return;
            }
            let xmlString = "";
            if (this.edit) {
              xmlString += xml({
                BC_SC_Pay_Apply: [
                  { _attr: { UpdateKind: "ukModify" } },
                  { SC_Pay_ApplyOID: this.businessKey }
                ]
              });
            }
            xmlString += xml({
              BC_SC_Pay_Apply: [
                { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                { SC_Pay_ApplyOID: this.edit ? "null" : this.businessKey },
                { Sheet_NO: result.text },
                { ProjectID: this.currProject.SC_ProjectOID },
                { PartnerID: this.userId.UCML_OrganizeOID },
                { DemandID: this.currProject.DemandID },
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
            const uuidv4 = require("uuid/v4");
            const uuid = uuidv4();
            if (this.paymentIndex == 1) {
              if (this.dataTable.length == 0) {
                this.$toast.fail("请选择需分配资金的供应商");
                return;
              }
              this.dataTable.forEach(val => {
                if (!val.money || isNaN(val.money)) {
                  this.$toast.fail("请输入正确的分配金额");
                  throw "请输入正确的分配金额";
                } else if (!val.remark.trim()) {
                  this.$toast.fail("请输入款项说明");
                  throw "请输入款项说明";
                }
                if (val.isEdit) {
                  xmlString += xml([
                    {
                      BC_SC_Pay_Detail: [
                        { _attr: { UpdateKind: "ukModify" } },
                        { SC_Pay_DetailOID: val.id }
                      ]
                    }
                  ]);
                }

                xmlString += xml([
                  {
                    BC_SC_Pay_Detail: [
                      { _attr: { UpdateKind: val.isEdit ? "" : "ukInsert" } },
                      { SC_Pay_DetailOID: val.isEdit ? "null" : val.id },
                      { ApplyOID: this.businessKey || "null" },
                      { SupplierID: val.sid || "null" },
                      { Supplier_Amt: val.money || "null" },
                      { Remark: val.remark || "null" },
                      { Bank_Name: val.bName || "null" },
                      { Bank_Account: val.bAcount || "null" },
                      { SupplierName: val.name || "null" },
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

              this.delTable.forEach(val => {
                xmlString += xml([
                  {
                    BC_SC_Pay_Detail: [
                      { _attr: { UpdateKind: "ukDelete" } },
                      { SC_Pay_DetailOID: val.id }
                    ]
                  }
                ]);
              });
            } else {
              if (this.paymentIndex == 2) {
                if (
                  !this.dataChild.Supplier_Amt ||
                  !this.dataChild.Bank_Account ||
                  !this.dataChild.Bank_Name ||
                  !this.dataChild.Remark
                ) {
                  this.$toast.fail("请输入完整数据");
                  return;
                }
              } else if (this.paymentIndex == 3) {
                if (!this.dataChild.Supplier_Amt || !this.dataChild.Remark) {
                  this.$toast.fail("请输入完整数据");
                  return;
                } else if (!this.dataChild.SupplierID) {
                  this.$toast.fail("请选择目标项目");
                  return;
                }
              } else if (this.paymentIndex == 4) {
                if (
                  !this.dataChild.Apply_SheetNO ||
                  !this.dataChild.Supplier_Amt ||
                  !this.dataChild.Bank_Account ||
                  !this.dataChild.Bank_Name ||
                  !this.dataChild.Remark
                ) {
                  this.$toast.fail("请输入完整数据");
                  return;
                }
              }

              if (this.dataChild.SC_Pay_DetailOID) {
                xmlString += xml([
                  {
                    BC_SC_Pay_Detail: [
                      { _attr: { UpdateKind: "ukDelete" } },
                      { SC_Pay_DetailOID: this.dataChild.SC_Pay_DetailOID }
                    ]
                  }
                ]);
              }
              xmlString += xml([
                {
                  BC_SC_Pay_Detail: [
                    { _attr: { UpdateKind: "ukInsert" } },
                    { SC_Pay_DetailOID: uuid },
                    { ApplyOID: this.businessKey || "null" },
                    { Apply_SheetNO: this.dataChild.Apply_SheetNO || "null" },
                    { SupplierID: this.dataChild.SupplierID || "null" },
                    { Supplier_Amt: this.dataChild.Supplier_Amt || "null" },
                    { Remark: this.dataChild.Remark || "null" },
                    { Bank_Name: this.dataChild.Bank_Name || "null" },
                    { Bank_Account: this.dataChild.Bank_Account || "null" },
                    { SupplierName: this.dataChild.SupplierName || "null" },
                    { SYS_POSTN: this.userId.UCML_PostOID || "null" },
                    { SYS_DIVISION: this.userId.UCML_DivisionOID || "null" },
                    { SYS_ORG: this.userId.UCML_OrganizeOID || "null" },
                    { SYS_Created: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                    { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                    { SYS_LAST_UPD_BY: this.userInfo.oid }
                  ]
                }
              ]);
            }
            xmlString = "<root>" + xmlString + "</root>";
            financial.payConservation(xmlString).then(res => {
              if (res.status === 1) {
                this.delTable = [];
                this.edit = true;
                this.dataChild.SC_Pay_DetailOID = uuid;
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
    // 删除表格子项
    onDeleteItem(item, index) {
      this.delTable.push(item);
      this.dataTable.splice(index, 1);
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
      task
        .submitAuditSheet(this.businessKey, this.userInfo.oid)
        .then(result => {
          try {
            if (result.status === 1) {
              task.submitPayment(this.businessKey).then(res => {
                if (res.status === 1) {
                  this.$toast.success({
                    forbidClick: true, // 禁用背景点击
                    message: "提交成功"
                  });
                  this.$nextTick().then(() => {
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 800);
                  });
                  return;
                } else {
                  this.$toast.fail(res.text);
                }
              });
            } else {
              this.$toast.fail("提交失败，请先保存内容再提交");
            }
          } catch (e) {
            this.$toast.fail(e);
          }
        });
    },
    // 确认供应商选择
    onConfrimItem() {
      try {
        if (this.edit) {
          this.dataTable.forEach(val => {
            if (val.sid == this.currSupp.value[0]) {
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
        this.currSupp = {
          key: 0,
          value: ""
        };
        this.supplierShow = false;
      } catch (e) {
        this.$toast.fail(e);
      }
    },
    // 确认项目选择
    onConfrimProItem() {
      this.data.SC_ProjectOID = this.currProject.SC_ProjectOID;
      this.data.Project_No = this.currProject.ProjectNo;
      this.data.Project_Name = this.currProject.ProjectName;
      this.projectShow = false;
      this.dataChild.SupplierID = "";
      this.dataChild.SupplierName = "";
      this.dataTable = [];
      this.getProjectMoney();
      this.getSupplierList();
      this.getProjectForList();
    },
    // 显示选择目标项目
    onShowForProject() {
      if (this.data.SC_ProjectOID) {
        this.projectForShow = true;
      } else {
        this.$toast.fail("请先选择工程项目");
      }
    },
    // 确认目标项目
    onConfrimProForItem() {
      this.dataChild.SupplierID = this.currForProject[0];
      this.dataChild.SupplierName = this.currForProject[1];
      this.projectForShow = false;
    },
    onShowSuppList() {
      if (this.data.SC_ProjectOID) {
        this.supplierShow = true;
      } else {
        this.$toast.fail("请先选择工程项目");
      }
    },
    // 获取供应商列表
    getSupplierList() {
      financial.getSupplierList(this.data.SC_ProjectOID).then(res => {
        try {
          const sp = res.text.split(";");
          const supplierList = eval(sp[0].split("=")[1]);
          this.supplierList = supplierList;
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 获取项目资金
    getProjectMoney() {
      // 获取数据
      return task.getTaskZFMoney(this.data.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            this.dataMoney = res.text.split(",");
            return true;
          }
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      });
    },
    // 获取项目列表
    getProjectList() {
      const params = {
        oid: this.userInfo.oid,
        type: 1
      };
      project.getProjectList(params).then(res => {
        if (res.status) {
          const sp = res.text.split(";");
          this.projectList = eval(sp[0]);
        }
      });
    },
    // 获取目标项目
    getProjectForList() {
      financial
        .getProjectList(this.userId.UCML_OrganizeOID, this.data.SC_ProjectOID)
        .then(res => {
          try {
            const sp = res.text.split(";");
            const projectForList = eval(sp[0].split("=")[1]);
            this.projectForList = projectForList;
            if (this.edit) {
              projectForList.forEach(val => {
                if (val[0] == this.dataChild.SupplierID) {
                  this.dataChild.SupplierName = val[1];
                }
              });
            }
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
    },
    // 页面初始化
    pageInit() {
      if (this.taskParams.InstanceID) {
        this.edit = true;
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
                id: data[1],
                SC_ProjectOID: data[2],
                Project_No: data[25],
                Project_Name: data[24],
                Sheet_Amt: data[12],
                Partner_memo: data[10]
              };
              this.currProject.SC_ProjectOID = data[2];
              this.getProjectMoney();
              if (this.paymentIndex == 1) {
                // 1.支付供应商
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
                this.getSupplierList();
              } else {
                // 2.退结余额、3.余额转预存、4.其它支出申请
                dataTable.forEach(val => {
                  this.dataChild = {
                    SC_Pay_DetailOID: val[0],
                    Supplier_Amt: val[4],
                    Apply_SheetNO: val[2],
                    Bank_Account: val[7],
                    Bank_Name: val[6],
                    Remark: val[5],
                    SupplierID: val[3],
                    SupplierName: val[8]
                  };
                });
              }
              if (this.paymentIndex == 3) {
                // 获取目标项目
                this.getProjectForList();
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
      }
      this.getProjectList();

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Start_Apply_Info")
        .then(res => {
          if (res.status) {
            this.buttonValue = JSON.parse(res.text);
          } else {
            this.buttonValue = [];
          }
        });
    }
  },
  computed,
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  overflow: hidden !important;
  .task-content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
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
            .van-field--min-height {
              height: 50px;
              padding: 0 2.5px;
            }
          }
        }
      }
    }
  }
  .payment-button {
    width: 100%;
    padding: 5px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .button-value {
      display: inline-block;
      button {
        width: 191.5px;
        margin: 5px;
      }
    }
  }
}
</style>