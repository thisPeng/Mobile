<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field :value="data[1]" label="单号" :disabled="true" />
      <van-field :value="data[25]" label="工程编号" :disabled="true" />
      <van-field :value="data[24]" label="工程名称" :disabled="true" />
      <van-field v-model="data[10]" label="申请方说明" :disabled="edit" />
      <van-field :value="dataMoney[3]" label="可用资金(￥)" :disabled="true" />
      <van-field :value="payment" label="支付类型" :disabled="true" />
      <!--退结余额-->
      <van-field v-model="dataTable[0][2]" label="支出名称" :required="!edit" :disabled="edit" v-if="payment === '其它支出申请'" />
      <van-field v-model="dataTable[0][4]" label="申请金额(￥)" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable[0][7]" label="收款账号" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable[0][6]" label="开户行" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <van-field v-model="dataTable[0][5]" label="收款人" :required="!edit" :disabled="edit" v-if="payment === '退结余额' || payment === '其它支出申请'" />
      <!--余额转预存-->
      <van-field v-model="dataMoney[2]" label="目标项目" :disabled="true" v-if="payment === '余额转预存'" />
      <van-field v-model="dataTable[0][4]" label="转存金额(￥)" :disabled="edit" v-if="payment === '余额转预存'" />
      <van-field v-model="dataTable[0][5]" label="转预存说明" :disabled="edit" v-if="payment === '余额转预存'" />
      <!--员工姓名、创建时间-->
      <van-field v-model="data[31]" label="制单人" :disabled="true" />
      <van-field :value="$util.formatDate(data[15])" label="制单日期" :disabled="true" />
      <van-field :value="$util.formatDate(data[16])" label="修改日期" :disabled="true" />
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
    <van-cell-group v-if="taskTabs.codeJson">
      <taskTabs :data="taskTabs" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import taskTabs from "./../../components/TaskList/Tabs";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      data: [],
      dataTable: [],
      dataMoney: [],
      taskTabs: {
        codeJson: []
      },
      columns: ["支付供应商", "退结余额", "余额转预存", "其它支出申请"],
      payment: ""
    };
  },
  methods: {
    onConfirm(res) {
      this.payment = res;
      this.paymentShow = false;
    },
    pageInit() {
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
              }
            });

            if (this.data[32] == 0) {
              task.getFlowAssignData(this.data[34]).then(res => {
                try {
                  if (res && res.status === 1) {
                    sp = res.text.split(";");
                    const tmp = eval(sp[1].split("=")[1])[0];
                    this.taskTabs.TaskOID = tmp[0];
                    this.taskTabs.ActivityID = tmp[5];
                    if (tmp[13]) {
                      this.taskTabs.codeJson = JSON.parse(tmp[13]);
                    } else {
                      this.edit = false;
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed,
  components: {
    taskTabs
  },
  mounted() {
    this.pageInit();
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
  .task-button {
    padding: 10px 0;
    .button {
      margin: 0 10px;
      color: #fff;
      border-radius: 5px;
      background-color: #3d95d5;
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
}
</style>