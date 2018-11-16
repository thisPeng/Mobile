<template>
  <!-- 自营项目 -->
  <div class="projectSelf">
    <van-cell-group>
      <van-field :value="info[2] || no" label="系统编号：" disabled />

      <van-field v-model="info[55]" label="项目编号：" />

      <van-field v-model="info[1]" label="工程名称：" required />

      <div class="van-cell van-cell--required van-field">
        <div class="van-cell__title"><span>工程类别：</span>
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

      <van-field v-model="info[21]" label="联系人：" />

      <cbh-select :value="info[23]" label="业务类型：" code="CodeTable_BusinessType" @change="comTypeConfirm" />

      <van-field v-model="info[18]" label="工程地址：" />

      <van-field v-model="info[24]" label="联系电话：" />

      <van-field v-model="info[25]" label="登记时间：" required readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" title="登记时间" v-show="dateShow" :min-date="new Date()" type="date" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
      <van-field v-model="info[31]" label="工程单位：" />

      <cbh-select :value="info[20]" label="项目类型：" code="CodeTable_ProjectType" @change="comProConfirm" />

      <van-field v-model="info[26]" label="合作方式：" />

      <van-field v-model="info[27]" label="工程造价：" />

      <cbh-select :value="info[28]" label="计征方式：" code="CodeTable_CalType" @change="comCalConfirm" />

      <cbh-select :value="info[29]" label="计征区域：" code="CodeTable_CalArea" @change="comAreaConfirm" />

      <van-field v-model="info[30]" label="税务组织：" />

      <cbh-select :value="info[6]" label="项目状态：" code="CodeTable_opening" @change="comOpenConfirm" />

      <van-field v-model="info[3]" label="工期：" />

      <cbh-select :value="info[17]" label="公开状态：" code="CodeTable_YesNo" @change="comYesNoConfirm" />

      <van-field v-model="info[4]" label="开通时间：" readonly @click="showDateone" />
      <van-datetime-picker v-model="currentDate" title="开通时间" v-show="dateShowone" :min-date="new Date()" type="date" class="task-date" @confirm="saveDateone" @cancel="dateShowone=false" />

      <van-field v-model="info[5]" label="到期时间：" readonly @click="showDatetwo" />
      <van-datetime-picker v-model="currentDate" title="到期时间" v-show="dateShowtwo" :min-date="new Date()" type="date" class="task-date" @confirm="saveDatetwo" @cancel="dateShowtwo=false" />

      <van-field v-model="info[22]" label="建设单位：" />

      <van-field v-model="info[7]" label="备注：" />
    </van-cell-group>
    <div class="project-button">
      <van-button type="primary" size="large" @click="keepSelf">保 存</van-button>
    </div>
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
      dateShow: false,
      dateShowone: false,
      dateShowtwo: false,
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
    showDateone() {
      this.currentDate = this.info[4] || new Date();
      this.dateShowone = true;
    },
    showDatetwo() {
      this.currentDate = this.info[5] || new Date();
      this.dateShowtwo = true;
    },
    // 确认时间
    saveDate(val) {
      this.info[25] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    },
    saveDateone(val) {
      this.info[4] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShowone = false;
    },
    saveDatetwo(val) {
      this.info[5] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShowtwo = false;
    },
    getData() {
      project.getParojectInfo(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split(";");
            this.info = eval(sp[0].split("=")[1])[0];
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
        this.$toast("请选择登记时间：");
        return;
      }

      const xml = require("xml");
      let uuidv1 = require("uuid/v1");
      let xmlString = "";
      if (this.edit) {
        xmlString = xml({
          BC_SC_Project: [
            { _attr: { UpdateKind: "ukModify" } },
            { SC_ProjectOID: this.info[0] }
          ]
        });
      }
      xmlString += xml({
        BC_SC_Project: [
          { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
          { SC_ProjectOID: this.edit ? "null" : uuidv1() },
          { Project_SubNo: this.info[55] || "null" }, //项目编号
          { ProjectName: this.info[1] || "null" }, //工程名称
          { BusinessType: this.info[23] || "null" }, //业务类型
          { Address: this.info[18] || "null" }, //工程地址
          { Contact: this.info[21] || "null" }, //联系人
          { Telephone: this.info[24] || "null" }, //联系电话
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
          { Remark: this.info[7] || "null" }, //备注
          { SYS_Created: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 创建日期
          { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
          { SYS_CreatedBy: this.userId.UCML_UserOID }, // 创建用户
          { SYS_POSTN: this.userId.UCML_PostOID }, // 所属岗位
          { SYS_DIVISION: this.userId.UCML_DivisionOID }, // 所属部门
          { SYS_ORG: this.userId.UCML_OrganizeOID }, // 所属组织
          { SYS_LAST_UPD_BY: this.userInfo.oid }, // 最后修改用户
          { DemandID: this.userId.UCML_OrganizeOID }, // 最后修改用户
          { PartnerID: this.userId.UCML_OrganizeOID }, // 最后修改用户
          { OrgName: this.userId.OrgName }, // 最后修改用户
          { ConstructionUnit: "null" } // 最后修改用户
        ]
      });
      xmlString = "<root>" + xmlString + "</root>";
      project.saveProjectSelf(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.$toast.success("保存成功");
            this.$router.push({
              name: "projectList"
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
      let len = str.length;
      if (len > 10) {
        str = str.substr(str.length - 10);
      }
      str = str.substr(0, 5) + "-" + str.substr(5);
      return str;
    }
  },
  mounted() {
    this.edit = this.$route.query.edit || false;
    this.projectType = this.$route.query.type
      ? this.$route.query.type + ""
      : "1";
    if (this.edit) {
      this.getData();
    } else {
      project.getProjectNO(this.userId.UCML_OrganizeOID).then(res => {
        if (res.status === 1) {
          const tmp = res.text.split(",");
          const timestamp = Date.parse(tmp[1]) / 1000;
          this.no = tmp[0] + "-" + this.formatNo(timestamp);
          this.info[55] = this.no;
          this.info[25] = new Date().Format("yyyy-MM-dd hh:mm:ss");
        } else {
          this.$toast.fail("生成编号失败，请重试");
          this.$route.go(-1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.projectSelf {
  width: 100%;
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
  .project-button {
    padding: 10px;
    text-align: center;
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



