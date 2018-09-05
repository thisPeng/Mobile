<template>
  <div class="taskgysFrom">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[35]" label="供应商编号：" :disabled="true" />
      <van-field v-model="data[22]" label="单位名称：" :disabled="true" />
      <van-field v-model="data[25]" label="统一社会信用码：" :disabled="edit" />
      <van-field v-model="data[23]" label="单位类别：" :disabled="edit" v-if="edit" />
      <cbhSelect v-model="data[23]" label="单位类别：" code="CodeTable_Unit" @change="onUnitChange" v-else />
      <van-field v-model="data[26]" label="纳税人类别：" :disabled="edit" v-if="edit" />
      <cbhSelect v-model="data[26]" label="纳税人类别：" code="CodeTable_TaxClass" @change="onTaxChange" v-else />
      <van-field v-model="data[27]" label="税率：" :disabled="edit" />
      <van-field v-model="data[28]" label="开户行：" :disabled="edit" />
      <van-field v-model="data[29]" label="银行账号：" :disabled="edit" />
      <van-field v-model="data[49]" label="可开票税率：" :disabled="edit" />
      <!--省市区组件-->
      <van-field :value="data[62]+data[63]+data[64]" label="公司地址：" :disabled="edit" v-if="edit" />
      <regionSelect :prov="data[58]" :city="data[59]" :district="data[60]" @change="onRegionChange" v-else />
      <van-field v-model="data[30]" label="详细地址：" :disabled="edit" />
      <van-field v-model="data[31]" label="联系人：" :disabled="edit" />
      <van-field v-model="data[32]" label="固定电话：" :disabled="edit" />
      <van-field v-model="data[33]" label="手机：" :disabled="edit" />
      <van-field v-model="data[34]" label="邮箱：" :disabled="edit" />
      <van-cell title="附件" is-link value="详情" @click="jumpPage" />
    </van-cell-group>
    <van-cell-group v-if="data[3] === '1' && data[9] === 'false'" class="margin-vertical-xl">
      <van-button type="primary" size="large" @click="onSubmit">提交审核</van-button>
    </van-cell-group>
    <van-cell-group v-else-if="data[3] === '1' && taskTabs.codeJson">
      <taskTabs :data="taskTabs" />
    </van-cell-group>
    <van-cell-group v-else-if="data[3] === '1' && data[9] === 'true'" class="margin-vertical-xl">
      <van-button size="large" disabled>审核中</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import taskTabs from "./../../components/TaskWait/Tabs";
import regionSelect from "./../../components/Select/Region";
import cbhSelect from "./../../components/Select/Select";
import { task } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      edit: true,
      taskTabs: {
        codeJson: []
      },
      data: []
    };
  },
  computed,
  components: {
    taskTabs,
    regionSelect,
    cbhSelect
  },
  methods: {
    jumpPage() {
      this.$router.push({
        name: "taskgysDetails"
      });
    },
    onUnitChange(res) {
      this.data[23] = res;
    },
    onTaxChange(res) {
      // console.log(res);
      this.data[26] = res;
    },
    onRegionChange(res) {
      console.log(res);
      this.data[58] = res.prov;
      this.data[59] = res.city;
      this.data[60] = res.district;
    },
    // 提交审核供应商
    onSubmit() {
      const params = {
        FlowID: "FLow_10604VER10",
        DeltaXml: "<root></root>",
        BusinessKey: this.data[0]
      };
      task.submitInquiry(params).then(res => {
        try {
          if (res.status === 1 && res.text === "True") {
            this.$toast.success("提交成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1500);
          }
        } catch (e) {
          this.$toast.fail(e);
        }
        console.log(res);
      });
    },
    pageInit() {
      this.$parent.title = this.taskParams.name;
      task.getInquiry(this.taskParams.TaskGYSID).then(res => {
        try {
          if (res && res.status === 1) {
            let sp = res.text.split("[[");
            const tsp = sp[1].split("]]");
            this.data = eval("[[" + tsp[0] + "]]")[0];
            this.taskTabs.InstanceID = this.data[10];
            this.taskTabs.FlowID = this.data[11];
            this.taskTabs.BCName = "BC_SC_Supplier";

            this.taskTabs.params = {
              SC_SupplierOID: this.data[0],
              TaxpayerNo: this.data[25],
              SupplierType: this.data[23],
              TaxpayerType: this.data[26],
              Taxrate: this.data[27],
              BankName: this.data[28],
              BankNo: this.data[29],
              prov_ID: this.data[58],
              district_ID: this.data[59],
              city_ID: this.data[60],
              Taxrate_Can: this.data[49],
              FactoryAddress: this.data[30],
              Contacts: this.data[31],
              Telephone: this.data[32],
              Moblephone: this.data[33],
              Mailbox: this.data[34],
              SYS_LAST_UPD_BY: this.data[20],
              SYS_LAST_UPD: this.data[13]
            };
            this.taskTabs.arrays = [
              0,
              25,
              23,
              26,
              27,
              28,
              29,
              58,
              59,
              60,
              49,
              30,
              31,
              32,
              33,
              34,
              20,
              13
            ];
            task.getFlowAssignData(this.data[10]).then(res => {
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
          console.log(e);
        }
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.taskgysFrom {
  width: 100%;
}
</style>
<style lang="less">
.taskgysFrom {
  .van-cell .van-cell__title {
    max-width: 120px;
  }
}
</style>


