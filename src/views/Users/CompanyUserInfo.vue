 <template>
  <div class="companyusersinfo">
    <div class="mui-head">
      <!-- <img class="info-img" src="../../../public/img/topbar.jpg" alt=""> -->
      <img src="../../../public/img/ms_ico5.png" alt="" />
      <div id="nName" class="mui-name">{{userInfo.name}}</div>
    </div>
    <div class="info-users">
      <!-- 工程商编号： -->
      <van-cell-group>
        <van-field :value="data[1]" label="工程商编号：" disabled />
        <!-- 工程商名称： -->
        <van-field v-model="data[2]" label="工程商名称：" />
        <!-- 统一社会信用代码 -->
        <van-field v-model="data[5]" label="统一社会信用代码：" placeholder="请输入统一社会信用代码" />
        <!-- 公司类型 -->
        <cbh-select v-model="data[3]" label="公司类型：" code="CodeTable_CoType" @change="comTypeConfirm" v-if="data.length>0" />
        <!-- 纳税人类别 -->
        <cbh-select v-model="data[6]" label="纳税人类别：" code="CodeTable_TaxClass" @change="comUnitConfirm" v-if="data.length>0" />
        <!-- 法人代表 -->
        <van-field v-model="data[27]" label="法人代表：" placeholder="请输入法人代表" />
        <!-- 开户行 -->
        <van-field v-model="data[8]" label="开户行：" placeholder="请输入开户行" />
        <!-- 银行账号 -->
        <van-field v-model="data[9]" label="银行账号：" placeholder="请输入银行账号" />
        <!-- 公司地址 -->
        <cbh-region :prov="data[39]" :city="data[40]" :district="data[41]" @change="onRegionChange" v-if="data.length>0" />
        <!-- 公司电话 -->
        <van-field v-model="data[13]" label="公司电话：" placeholder="请输入公司电话" />
        <!-- 详细地址 -->
        <van-field v-model="data[10]" label="详细地址：" placeholder="请输入详细地址" />
        <!-- 联系人 -->
        <van-field v-model="data[11]" label="联系人：" placeholder="请输入联系人" />
        <!-- 手机号码 -->
        <van-field v-model="data[14]" label="手机号码：" placeholder="请输入手机号码" />
        <!-- 诉讼法院 -->
        <van-field v-model="data[28]" label="诉讼法院：" placeholder="请输入诉讼法院" />
        <!-- 邮箱 -->
        <van-field v-model="data[15]" label="邮箱：" placeholder="请输入邮箱" />
      </van-cell-group>
      <van-cell-group>
        <van-cell class="padding-vertical" title="证照资料" is-link value="" @click="jumpPage('usersInfoAccessory')" />
      </van-cell-group>
      <div class="pwd-button">
        <van-button type="primary" size="large" @click="saveMessage">保 存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    //公司类型
    comTypeConfirm(res) {
      this.data[3] = res;
    },
    comUnitConfirm(res) {
      this.data[6] = res;
    },
    onRegionChange(res) {
      this.data[39] = res.prov;
      this.data[40] = res.city;
      this.data[41] = res.district;
      this.data[33] = res.provStr;
      this.data[34] = res.cityStr;
      this.data[35] = res.districtStr;
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Company: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_CompanyOID: this.data[0] }
            ]
          },
          {
            BC_SC_Company: [
              { _attr: { UpdateKind: "" } },
              { SC_CompanyOID: "null" },
              { CompanyName: this.data[2] || "null" },
              { TaxpayerNo: this.data[5] || "null" },
              { CompanyType: this.data[3] || "null" },
              { TaxpayerType: this.data[6] || "null" },
              { representative: this.data[27] || "null" },
              { BankName: this.data[8] || "null" },
              { BankNo: this.data[9] || "null" },
              { Telephone: this.data[13] || "null" },
              { Address: this.data[10] || "null" },
              { Contacts: this.data[11] || "null" },
              { Moblephone: this.data[14] || "null" },
              { Court_Sue: this.data[28] || "null" },
              { Mailbox: this.data[15] || "null" },
              { prov_ID: this.data[39] || "null" },
              { district_ID: this.data[40] || "null" },
              { city_ID: this.data[41] || "null" },
              { ProvincesName: this.data[33] || "null" },
              { DistrictName: this.data[34] || "null" },
              { CityName: this.data[35] || "null" }
            ]
          }
        ]
      });
      // console.log(xmlString);
      users.saveMessageCompany(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.$toast.success("保存成功");
            return;
          }
          throw "保存失败，请刷新页面重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    //获取用户信息
    getData() {
      //工程商
      users.getCompanyUserInfo(this.userId.UCML_OrganizeOID).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split("]]");
          this.data = eval("[[" + csp[0] + "]]")[0];
        }
      });
    },
    jumpPage(name) {
      this.$router.push({
        name
      });
    }
  },
  computed,
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.companyusersinfo {
  width: 100%;
  .con-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
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
  .mui-head {
    height: 200px;
    background-image: url("../../../public/img/topbar.jpg");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mui-head img {
    display: block;
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
    border-radius: 80px;
    -moz-box-shadow: 0px 0px 3px #999;
    -webkit-box-shadow: 0px 0px 3px #999;
    box-shadow: 0px 0px 3px #999;
  }
  .info-users {
    .info-sex {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .sex-label {
        min-width: 90px;
        flex: 1;
      }
      .sex-select {
        flex: 4;
      }
    }
    .info-gaddress {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .gaddress-label {
        min-width: 90px;
        flex: 1;
      }
      .gaddress-select {
        flex: 5;
      }
    }
  }
  .pwd-button {
    padding: 10px;
    text-align: center;
  }
  .pwd-icon {
    margin-right: 10px;
  }
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
  .task-img {
    .img {
      width: 100%;
      height: 150px;
    }
  }
}
</style>
<style lang="less">
.companyusersinfo {
  .van-cell__title {
    max-width: 130px !important;
  }
}
</style>


