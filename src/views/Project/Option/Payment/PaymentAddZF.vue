<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field :value="projectInfo.ProjectNo" label="工程编号" :disabled="true" />
      <van-field :value="projectInfo.ProjectName" label="工程名称" :disabled="true" />
      <van-field v-model="data.Supplier_Amt" label="申请方说明" :disabled="edit" />
      <van-field v-model="dataMoney[3]" label="可用资金(￥)" :disabled="true" />
      <van-cell-group class="from-payment">
        <span class="from-label">支付类型</span>
        <span class="from-select" @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <!--退结余额-->
      <van-field v-model="dataTable.name" label="支出名称" :required="!edit" :disabled="edit" v-if="payment === '其它支出申请'" />
      <van-field v-model="dataTable.name" label="申请金额(￥)" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable.name" label="收款账号" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable.name" label="开户行" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable.name" label="收款人" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <!--余额转预存-->
      <van-field v-model="dataTable.name" label="目标项目" :disabled="true" v-if="payment === '余额转预存'" />
      <van-field v-model="dataTable.name" label="转存金额(￥)" :disabled="edit" v-if="payment === '余额转预存'" />
      <van-field v-model="dataTable.name" label="转预存说明" :disabled="edit" v-if="payment === '余额转预存'" />
      <!--员工姓名、创建时间-->
      <van-field :value="userInfo.name" label="制单人" :disabled="true" />
      <van-field :value="new Date().Format('yyyy-MM-dd')" label="制单日期" :disabled="true" />
      <div class="task-table" v-if="payment === '支付供应商'">
        <table>
          <thead>
            <tr>
              <td>单位名称</td>
              <td>分配金额</td>
              <td>款项说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataTable" :key="item[0]">
              <td>
                <van-field v-model="item[8]" :disabled="true" />
              </td>
              <td>
                <van-field v-model="item[4]" :disabled="edit" />
              </td>
              <td>
                <van-field v-model="item[5]" :disabled="edit" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b class="padding-left-sm" v-if="payment === '余额转预存'">
        说明：转预存是由一个项目的余额转给另一个项目的资金池中,供另一个项目使用, 不用通过银行,直接项目间产生资金的转移流水。</b>
    </van-cell-group>
    <div class="con-button">
      <van-button @click="preKeep">保存</van-button>
      <van-button>提交</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { task } from "../../../../assets/js/api.js";
import { arrival } from "../../../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      data: {
        Supplier_Amt: ""
      },
      dataTable: {},
      dataMoney: [],
      taskTabs: {
        codeJson: []
      },
      columns: ["支付供应商", "退结余额", "余额转预存", "其它支出申请"],
      paymentShow: false,
      payment: "请选择支付类型"
    };
  },
  methods: {
    //保存
    preKeep(){
      arrival.payKeep(this.contractParams[0]).then(res =>{
        console.log(res);
      })
    },
    onConfirm(res) {
      this.payment = res;
      this.paymentShow = false;
    }
  },
  computed,
  mounted() {
    // 获取数据
    task.getTaskZFInfo(this.taskParams).then(result => {
      try {
        if (result && result.status === 1) {
          let sp = result.text.split(";");
          this.data = eval(sp[0].split("=")[1])[0];
          this.dataTable = eval(sp[2].split("=")[1]);
          this.payment = this.columns[this.data[9] - 1];
          this.taskTabs.InstanceID = this.data[34];
          this.taskTabs.FlowID = this.data[35];
          this.taskTabs.payment = this.payment;
          // console.log(this.dataTable);

          this.taskTabs.params = {
            SC_Pay_ApplyOID: this.data[0],
            Partner_memo: this.data[10],
            Pay_Type: this.data[9],
            SYS_LAST_UPD: this.data[16],
            SYS_LAST_UPD_BY: this.data[23]
          };
          this.taskTabs.arrays = [0, 10, 9, 16, 23];

          if (this.payment === "支付供应商") {
            const tmp = [];
            this.dataTable.forEach(val => {
              tmp.push({
                SC_Pay_DetailOID: val[0],
                SupplierID: val[1],
                Supplier_Amt: val[4],
                Remark: val[5],
                Bank_Account: val[7],
                Bank_Name: val[6]
              });
            });
            this.taskTabs.paramsChild = tmp;
            this.taskTabs.arrs = [0, 1, 4, 5, 7, 6];
          } else if (this.payment === "退结余额") {
            this.taskTabs.paramsChild = {
              SC_Pay_DetailOID: this.dataTable[0][0],
              Remark: this.dataTable[0][5],
              Supplier_Amt: this.dataTable[0][4],
              Bank_Account: this.dataTable[0][7],
              Bank_Name: this.dataTable[0][6]
            };
            this.taskTabs.arrs = [0, 5, 4, 7, 6];
          } else if (this.payment === "余额转预存") {
            this.taskTabs.paramsChild = {
              SC_Pay_DetailOID: this.dataTable[0][0],
              Supplier_Amt: this.dataTable[0][4],
              Remark: this.dataTable[0][5]
            };
            this.taskTabs.arrs = [0, 4, 5];
          } else if (this.payment === "其它支出申请") {
            this.taskTabs.paramsChild = {
              SC_Pay_DetailOID: this.dataTable[0][0],
              Apply_SheetNO: this.dataTable[0][2],
              Remark: this.dataTable[0][5],
              Supplier_Amt: this.dataTable[0][4],
              Bank_Account: this.dataTable[0][7],
              Bank_Name: this.dataTable[0][6]
            };
            this.taskTabs.arrs = [0, 2, 5, 4, 7, 6];
          }

          task.getTaskZFMoney(this.data[2]).then(res => {
            if (res && res.status === 1) {
              this.dataMoney = res.text.split(",");
              // console.log(this.dataMoney);
            }
          });

          task.getFlowAssignData(this.data[34]).then(res => {
            if (res && res.status === 1) {
              sp = res.text.split(";");
              const tmp = eval(sp[1].split("=")[1])[0];
              this.taskTabs.TaskOID = tmp[0];
              this.taskTabs.ActivityID = tmp[5];
              if (tmp[13]) {
                this.taskTabs.codeJson = JSON.parse(tmp[13]);
              } else if (this.taskModel === "我的待办") {
                this.edit = false;
              }
            }
          });
        }
      } catch (e) {
        // this.$router.go(-1);
        console.log(e);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
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
  .task-button {
    padding: 10px 0;
    .button {
      margin: 0 10px;
      color: #fff;
      border-radius: 5px;
      background-color: #3d95d5;
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
        tr:nth-child(2n) {
          background-color: #e9f8ff;
        }
        td {
          height: 50px;
        }
        .visited {
          background-color: #b3e7ff !important;
        }
      }
    }
  }
  .con-button {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      width: 48%;
      padding: 0;
      margin-bottom: 10px;
    }
  }
}
</style>