<template>
  <!-- 自营项目 -->
  <div class="projectSelf">
    <div class="projectSelf-content">
      <van-cell-group>
        <div class="task-title">基本信息</div>
        <!-- <van-field :value="info[2] || no" label="系统编号：" disabled v-if="edit" /> -->
        <van-field v-model="info[1]" label="工程名称：" required placeholder="请输入工程名称" />
        <van-field v-model="info[55]" label="项目编号：" required placeholder="请输入项目编号" />
        <div class="van-cell van-cell--required van-field">
          <div class="van-cell__title">
            <span>工程类别：</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body">
              <van-radio-group v-model="projectType" class="flex" :disabled="edit">
                <van-radio name="1" class="margin-right-xl">自营项目</van-radio>
                <van-radio name="2">合作项目</van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
        <van-field :value="info[25]" label="登记时间：" placeholder="请选择登记时间" required readonly @click="showDate" />
        <!--合作商列表-->
        <van-cell-group class="from-payment van-cell--required" v-if="projectType == 2">
          <span class="from-label">合作商：</span>
          <span class="from-select">
            <span :class="info[34] ? '' : 'text-gray'">{{info[34] || "请选择合作商"}}</span>
            <van-button type="primary" size="mini" @click="partnerShow=true">选择</van-button>
          </span>
        </van-cell-group>

        <div class="task-title">联系方式</div>
        <van-field v-model="info[21]" label="联系人：" placeholder="请输入联系人" />
        <van-field v-model="info[24]" label="联系电话：" placeholder="请输入联系电话" />
        <van-field v-model="info[18]" label="工程地址：" placeholder="请输入工程地址" />

        <div class="task-title">工程信息</div>
        <van-field :value="info[31] || this.userId.OrgName" label="工程单位：" disabled />
        <van-field v-model="info[35]" label="单位电话：" placeholder="请输入单位电话" v-if="projectType == 2" />
        <van-field v-model="info[27]" label="工程造价：" placeholder="请输入工程造价" />
        <van-field v-model="info[22]" label="建设单位：" placeholder="请输入建设单位" />
        <van-field v-model="info[3]" label="工期：" placeholder="请输入工期" />
        <cbh-select :value="info[23]" label="业务类型：" code="CodeTable_BusinessType" @change="comTypeConfirm" />
        <van-field v-model="info[30]" label="税务组织：" placeholder="请输入税务组织" />
        <cbh-select :value="info[28]" label="计征方式：" code="CodeTable_CalType" @change="comCalConfirm" />
        <cbh-select :value="info[29]" label="计征区域：" code="CodeTable_CalArea" @change="comAreaConfirm" />

        <div class="task-title">项目信息</div>
        <cbh-select :value="info[20]" label="项目类型：" code="CodeTable_ProjectType" @change="comProConfirm" />
        <van-field v-model="info[26]" label="合作方式：" placeholder="请输入合作方式" />
        <cbh-select :value="info[6]" label="项目状态：" code="CodeTable_opening" @change="comOpenConfirm" />
        <cbh-select :value="info[17]" label="公开状态：" code="CodeTable_YesNo" @change="comYesNoConfirm" />
        <van-field :value="info[4]" label="开通时间：" placeholder="请选择开通时间" readonly @click="showDateStart" />
        <van-field :value="info[5]" label="到期时间：" placeholder="请选择到期时间" readonly @click="showDateEnd" />
        <van-field v-model="info[7]" label="备注：" type="textarea" placeholder="请选择备注" />
      </van-cell-group>
    </div>
    <van-datetime-picker v-model="currentDate" title="登记时间" v-show="dateShow" :min-date="new Date()" type="date" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
    <van-datetime-picker v-model="currentDate" title="开通时间" v-show="dateShowone" :min-date="new Date()" type="date" class="task-date" @confirm="saveDateStart" @cancel="dateShowone=false" />
    <van-datetime-picker v-model="currentDate" title="到期时间" v-show="dateShowtwo" :min-date="new Date()" type="date" class="task-date" @confirm="saveDateEnd" @cancel="dateShowtwo=false" />

    <div class="project-button">
      <van-button type="primary" size="large" @click="keepSelf">保 存</van-button>
    </div>

    <!--合作商列表-->
    <van-popup v-model="partnerShow" position="right">
      <div class="supplier">
        <div class="supplier-item" v-for="(item,index) in partnerList" :key="index" @click="currPartner=item">
          <!--标题-->
          <div class="item-title">
            <span class="title">{{item[2]}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item[0] === currPartner[0]" />
            </span>
          </div>
          <!--内容-->
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">联系人：{{item[4]}}</span>
              <span class="row-right text-right">联系电话：{{item[3] || item[5]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">备注：{{item[11]}}</span>
            </div>
          </div>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click.stop="onConfrimPartner">确 定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import computed from "../../assets/js/computed.js";
import { project } from "../../assets/js/api.js";
export default {
  data() {
    return {
      no: "",
      info: [],
      edit: false,
      projectType: "1",
      businessKey: "",
      dateShow: false,
      dateShowone: false,
      dateShowtwo: false,
      partnerShow: false,
      currPartner: [],
      partnerList: [],
      currentDate: new Date()
    };
  },
  computed,
  methods: {
    //公司类型
    comTypeConfirm(res) {
      this.info[23] = res;
    },
    comProConfirm(res) {
      this.info[20] = res;
    },
    comCalConfirm(res) {
      this.info[28] = res;
    },
    comAreaConfirm(res) {
      this.info[29] = res;
    },
    comOpenConfirm(res) {
      this.info[6] = res;
    },
    comYesNoConfirm(res) {
      this.info[17] = res;
    },
    // 显示时间选择
    showDate() {
      this.currentDate = this.info[25] || new Date();
      this.dateShow = true;
    },
    showDateStart() {
      this.currentDate = this.info[4] || new Date();
      this.dateShowone = true;
    },
    showDateEnd() {
      this.currentDate = this.info[5] || new Date();
      this.dateShowtwo = true;
    },
    // 确认时间
    saveDate(val) {
      this.info[25] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    },
    saveDateStart(val) {
      this.info[4] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShowone = false;
    },
    saveDateEnd(val) {
      this.info[5] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShowtwo = false;
    },
    // 确认合作商选择
    onConfrimPartner() {
      this.info[19] = this.currPartner[8];
      this.info[34] = this.info[31] = this.currPartner[2];
      this.info[35] = this.currPartner[3] || this.currPartner[5];
      this.partnerShow = false;
    },
    getData() {
      project.getParojectInfo(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split(";");
            this.info = eval(sp[0].split("=")[1])[0];
            this.businessKey = this.info[0];
            const defaultDate = "1900-01-01 00:00:00";
            if (this.info[4] === defaultDate) this.info[4] = "";
            if (this.info[5] === defaultDate) this.info[5] = "";
            if (this.info[45] === defaultDate) this.info[45] = "";
            if (this.info[46] === defaultDate) this.info[46] = "";
            if (this.info[47] === defaultDate) this.info[47] = "";
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    keepSelf() {
      if (!this.projectType) {
        this.$toast("请选择项目类型");
        return;
      }
      if (!this.info[1]) {
        this.$toast("请输入项目名称");
        return;
      }

      if (!this.info[25] || this.info[25] == "1900-01-01 00:00:00") {
        this.$toast("请选择登记时间");
        return;
      }

      if (!this.info[19] && this.projectType == 2) {
        this.$toast("请选择合作商");
        return;
      }

      const xml = require("xml");
      let xmlString = "";
      if (this.edit) {
        xmlString = xml({
          BC_SC_Project: [
            { _attr: { UpdateKind: "ukModify" } },
            { SC_ProjectOID: this.businessKey }
          ]
        });
      } else {
        const uuidv4 = require("uuid/v4");
        this.businessKey = uuidv4();
      }
      xmlString += xml({
        BC_SC_Project: [
          { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
          { SC_ProjectOID: this.edit ? "null" : this.businessKey },
          { ProjectNo: this.info[2] || this.no || "null" }, //项目编号
          { Project_SubNo: this.info[55] || "null" }, //项目编号
          { ProjectName: this.info[1] || "null" }, //工程名称
          { BusinessType: this.info[23] || "null" }, //业务类型
          { Address: this.info[18] || "null" }, //工程地址
          { Contact: this.info[21] || "null" }, //联系人
          { Telephone: this.info[24] || "null" }, //联系电话
          { UnitTelphone: this.info[35] || "null" }, //联系电话
          { RegisterTime: this.info[25] || "null" }, //登记时间
          { Project_Type: this.edit ? this.info[20] : this.projectType }, //项目类型
          { CooperationType: this.info[26] || "null" }, //合作方式
          { ProjectAmt: this.info[27] || "null" }, //工程造价
          { Cal_Type: this.info[28] || "null" }, //计征方式
          { Cal_Area: this.info[29] || "null" }, //计征区域
          { Tax_Organize: this.info[30] || "null" }, //税务组织
          { Status: this.info[6] || "null" }, //项目状态
          { Limittime: this.info[3] || "null" }, //工期
          { Openness: this.info[17] || "null" }, //公开状态
          { StartDate: this.info[4] || "null" }, //开通时间
          { EndDate: this.info[5] || "null" }, //到期时间
          { CreateDepartName: this.info[22] || "null" }, //建设单位
          { Trigger_Status: "0" }, // 写入状态
          { Remark: this.info[7] || "null" }, //备注
          {
            SYS_Created:
              this.info[8] || new Date().Format("yyyy-MM-dd hh:mm:ss")
          }, // 创建日期
          { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
          { SYS_CreatedBy: this.userId.UCML_UserOID }, // 创建用户
          { SYS_POSTN: this.userId.UCML_PostOID }, // 所属岗位
          { SYS_DIVISION: this.userId.UCML_DivisionOID }, // 所属部门
          { SYS_ORG: this.userId.UCML_OrganizeOID }, // 所属组织
          { SYS_LAST_UPD_BY: this.userInfo.oid }, // 最后修改用户
          { DemandID: this.info[53] || this.userId.UCML_OrganizeOID }, // 供应商ID
          { OrgName: this.info[31] || this.userId.OrgName }, // 工程单位
          { PartnerID: this.info[19] || this.userId.UCML_OrganizeOID }, // 合作商ID
          { ConstructionUnit: this.info[34] || "null" } // 合作商名称
        ]
      });
      xmlString = "<root>" + xmlString + "</root>";
      project.saveProjectSelf(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.edit = true;
            this.$toast.success({
              forbidClick: true, // 禁用背景点击
              message: "保存成功"
            });
            this.$nextTick().then(() => {
              setTimeout(() => {
                this.$router.go(-1);
              }, 800);
            });
            return;
          }
          throw "保存失败，请刷新页面重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    formatNo(str) {
      str = str.toString();
      if (str.length >= 10) {
        str = str.substr(str.length - 10);
      } else {
        str = new Date().getTime().toString();
        str = str.substr(str.length - 10);
      }
      str = str.substr(0, 5) + "-" + str.substr(5);
      return str;
    },
    pageInit() {
      this.edit = this.$route.query.edit || false;
      this.projectType = this.$route.query.type
        ? this.$route.query.type.toString()
        : "1";

      // 获取合作商列表
      project.getParojectPartner(this.userId.UCML_OrganizeOID).then(res => {
        try {
          if (res.status) {
            const sp = res.text.split(";");
            this.partnerList = eval(sp[0].split("=")[1]);
          }
        } catch (e) {
          console.log(e);
        }
      });

      if (this.edit) {
        this.getData();
      } else {
        project.getProjectNO(this.userId.UCML_OrganizeOID).then(res => {
          try {
            if (res.status) {
              const tmp = res.text.split(",");
              const timestamp =
                Date.parse(
                  this.$util.formatDate(tmp[1], "yyyy/MM/dd hh:mm:ss")
                ) / 1000;
              this.no = tmp[0] + "-" + this.formatNo(timestamp);
              this.info[55] = this.no;
              this.info[25] = new Date().Format("yyyy-MM-dd hh:mm:ss");
            }
          } catch (e) {
            const timestamp = new Date().getTime();
            this.no =
              Math.floor(Math.random() * 90000) +
              10000 +
              "-" +
              this.formatNo(timestamp);
            this.info[55] = this.no;
            this.info[25] = new Date().Format("yyyy-MM-dd hh:mm:ss");
          }
        });
      }
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.projectSelf {
  width: 100%;
  overflow: hidden !important;
  padding-bottom: 70px;
  .projectSelf-content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .task-title {
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
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .con-label {
        min-width: 130px;
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
      padding-right: 30px;
    }
    .task-date {
      width: 100%;
      position: fixed;
      z-index: 9999;
      bottom: 0;
    }
  }

  .project-button {
    padding: 10px;
    text-align: center;
  }

  /* 供应商列表 */
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
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style lang="less">
.projectSelf {
  .select {
    .van-cell__title {
      max-width: 90px;
    }
  }
}
</style>



