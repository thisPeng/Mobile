<template>
  <div class="task">
    <div class="task-content">
      <van-cell-group>
        <van-field :value="data[1] || '系统生成'" label="单号" :disabled="true" />
        <van-field :value="data[27]" label="工程编号" :disabled="true" />
        <div class="van-cell van-cell--required van-hairline van-field">
          <div class="van-cell__title">工程名称</div>
          <div class="van-cell__value flex-between">
            <span class="text-truncate text-left">{{data[28] || '请选择工程项目'}}</span>
            <van-button type="primary" size="mini" @click="projectShow=true">选择</van-button>
          </div>
        </div>
        <van-field :value="new Date(data[10]).Format('yyyy-MM-dd') || '请选择到款日期'" label="到款日期" readonly required @click="showDate" />
        <van-datetime-picker v-model="currentDate" v-show="dateShow" :min-date="new Date()" type="date" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
        <van-field v-model="data[34]" label="到款金额(￥)" required placeholder="请输入到款金额" />
        <van-field v-model="data[12]" label="到款账号" required placeholder="请输入到款账号" />
        <van-field v-model="data[11]" label="开户行" required placeholder="请输入开户行" />
        <van-field v-model="data[13]" label="经手人" required placeholder="请输入经手人" />
        <van-field v-model="data[9]" label="批款金额(￥)" required placeholder="请输入批款金额" />
        <van-field v-model="data[16]" label="批款说明" type="textarea" required placeholder="请输入批款说明" />
        <van-field :value="data[29] || userId.PersonName" label="制单人" :disabled="true" />
        <van-field :value="new Date(data[17]).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd')" label="制单日期" :disabled="true" />
        <van-field :value="new Date(data[18]).Format('yyyy-MM-dd')" label="修改日期" :disabled="true" v-if="data[18]" />
      </van-cell-group>
      <div class="payment-button">
        <van-button @click="onSave">保存</van-button>
        <van-button type="main" @click="onSubmit">提交</van-button>
      </div>
    </div>

    <!--目标项目-->
    <van-popup v-model="projectShow" position="right">
      <div class="supplier">
        <div class="supplier-item" v-for="(item,index) in projectList" :key="index" @click="currProject=item">
          <!--标题-->
          <div class="item-title">
            <span class="title">{{item[1]}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item[0] === currProject[0]" />
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
          <van-button type="primary" size="large" @click.stop="onConfrimProItem">确 定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { financial } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      edit: false,
      dateShow: false,
      currentDate: new Date(),
      bpoName: "BPO_Start_PK_InOutFormService",
      data: [],
      projectShow: false,
      projectList: [],
      currProject: []
    };
  },
  methods: {
    // 确认目标项目
    onConfrimProItem() {
      this.data[28] = this.currProject[1];
      this.data[27] = this.currProject[2];
      this.projectShow = false;
    },
    // 获取项目列表
    getProject() {
        financial.getProject(this.userId.UCML_OrganizeOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            const projectList = eval(sp[0].split("=")[1]);
            this.projectList = projectList;
            projectList.forEach(val => {
              if (val[0] == this.data[2]) {
                this.currProject = val;
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 显示时间选择
    showDate() {
      this.currentDate = this.$util.formatDate(this.data[10]);
      this.dateShow = true;
    },
    // 确认时间
    saveDate(val) {
      this.data[10] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    },
    //保存先获取单号
    onSave() {
      if (!this.currProject[0]) {
        this.$toast("请选择项目");
        return;
      }
      if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
        this.$toast("请选择到款日期");
        return;
      }
      if (isNaN(parseInt(this.data[34]))) {
        this.$toast("请输入正确的到款金额");
        return;
      }
      if (!this.data[12] || this.data[12].length < 12) {
        this.$toast("请输入正确的到款账号");
        return;
      }
      if (!this.data[11]) {
        this.$toast("请输入开户行");
        return;
      }
      if (!this.data[13]) {
        this.$toast("请输入经手人");
        return;
      }
      if (isNaN(parseInt(this.data[9]))) {
        this.$toast("请输入正确的批款金额");
        return;
      }
      if (parseInt(this.data[9]) > parseInt(this.data[34])) {
        this.$toast("批款金额不得大于到款金额");
        return;
      }
      if (!this.data[16]) {
        this.$toast("请输入汇款说明");
        return;
      }
      financial.getMemorySheetNo("PK").then(result => {
        try {
          if (result && result.status === 1) {
            const xml = require("xml");
            if (!this.businessKey) {
              const uuidv1 = require("uuid/v1");
              this.businessKey = uuidv1();
            }
            let xmlString = "";
            if (this.edit) {
              xmlString = xml({
                BC_SC_Money_InOut: [
                  { _attr: { UpdateKind: "ukModify" } },
                  { SC_Money_InOutOID: this.businessKey }
                ]
              });
            }
            xmlString += xml({
              BC_SC_Money_InOut: [
                { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                {
                  SC_Money_InOutOID: this.edit ? "null" : this.businessKey
                },
                { InOut_SheetNO: result.text },
                { ProjectID: this.currProject[0] },
                { ProjectNo: this.currProject[2] },
                { PartnerID: this.currProject[53] },
                { DemandID: this.userId.UCML_DivisionOID },
                { Sheet_Type: "PK" },
                { Approve_Flag: 0 },
                { InOut_Date: this.data[10] },
                { InOut_Amt: this.data[9] },
                { Bank_Account: this.data[12] },
                { Bank_Name: this.data[11] },
                { Operator: this.data[13] },
                { Project_InAmt: this.data[34] },
                { Remark: this.data[16] },
                { ProjectName: this.currProject[1] },
                { SYS_CreatedBy: this.userId.UCML_UserOID },
                { SYS_POSTN: this.userId.UCML_PostOID },
                { SYS_DIVISION: this.userId.UCML_DivisionOID },
                { SYS_ORG: this.userId.UCML_OrganizeOID },
                { EmployeeName: this.userId.PersonName },
                {
                  SYS_Created:
                    this.data[17] || new Date().Format("yyyy-MM-dd hh:mm:ss")
                },
                { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                { SYS_LAST_UPD_BY: this.userInfo.oid }
              ]
            });
            xmlString = "<root>" + xmlString + "</root>";
            financial.saveOrder(this.bpoName, xmlString).then(res => {
              if (res.status === 1) {
                this.$toast.success("保存成功");
                return;
              }
              throw res.text;
            });
          }
          throw result.text;
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    onSubmit() {
      try {
        financial
          .submitPremomery(this.businessKey, this.userId.UCML_DivisionOID)
          .then(result => {
            if (result.status === 1) {
              financial
                .submitOrder(this.bpoName, "FLow_10101VER10", this.businessKey)
                .then(res => {
                  if (res.status === 1) {
                    this.$toast.success({
                      forbidClick: true, // 禁用背景点击
                      message: "提交成功"
                    });
                    setTimeout(() => {
                      this.$router.replace({
                        name: "index"
                      });
                    }, 800);
                  } else {
                    this.$toast.fail(res.text);
                  }
                });
            } else {
              this.$toast.fail("提交失败，请先保存内容再提交");
            }
          });
      } catch (e) {
        this.$toast.fail(e);
        console.log(e);
      }
    },
    pageInit() {
      if (this.taskParams) {
        // 获取数据
        financial.getTaskYCInfo(this.taskParams).then(result => {
          try {
            if (result && result.status === 1) {
              let sp = result.text.split(";");
              this.data = eval(sp[0].split("=")[1])[0];
              this.businessKey = this.data[0];
              this.edit = true;
            }
            if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
              this.data[10] = new Date().Format("yyyy-MM-dd hh:mm:ss");
            }
            this.getProject();
          } catch (e) {
            console.log(e);
          }
        });
      } else {
        this.getProject();
      }
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
  padding-bottom: 75px;
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
    .task-date {
      width: 100%;
      position: fixed;
      z-index: 9999;
      bottom: 0;
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
  /* 选择项目 */
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
          word-wrap: normal;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
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
}
</style>