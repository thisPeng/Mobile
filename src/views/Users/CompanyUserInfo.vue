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
        <van-field :value="list[1]" label="工程商编号：" disabled />
        <!-- 工程商名称： -->
        <van-field :value="list[2]" label="工程商名称：" />
        <!-- 统一社会信用代码 -->
        <van-field :value="list[5]" label="统一社会信用代码：" placeholder="请输入统一社会信用代码" />
        <!-- 公司类型 -->
        <!-- <van-field :value="list[3]" label="公司类型：" placeholder="请输入公司类型" /> -->
        <van-cell-group class="con-price">
          <span class="con-label">公司类型</span>
          <span class="con-select" @click="comTypeShow=true">{{comType}}</span>
          <van-popup v-model="comTypeShow" position="bottom">
            <van-picker show-toolbar :columns="comTypecolumns" @cancel="comTypeShow=false" @confirm="comTypeConfirm" />
          </van-popup>
        </van-cell-group>
        <!-- 纳税人类别 -->
        <!-- <van-field v-model="list[6]" label="纳税人类别：" placeholder="请输入纳税人类别" /> -->
        <van-cell-group class="con-price">
          <span class="con-label">纳税人类别</span>
          <span class="con-select" @click="comUnitShow=true">{{comUnit}}</span>
          <van-popup v-model="comUnitShow" position="bottom">
            <van-picker show-toolbar :columns="comUnitcolumns" @cancel="comUnitShow=false" @confirm="comUnitConfirm" />
          </van-popup>
        </van-cell-group>
        <!-- 法人代表 -->
        <van-field v-model="list[27]" label="法人代表：" placeholder="请输入法人代表" />
        <!-- 开户行 -->
        <van-field v-model="list[8]" label="开户行：" placeholder="请输入开户行" />
        <!-- 银行账号 -->
        <van-field v-model="list[9]" label="银行账号：" placeholder="请输入银行账号" />
        <!-- 公司地址 -->
        <cbh-region :prov="list[39]" :city="list[40]" :district="list[41]" @change="onRegionChange" v-if="list.length>0" />
        <!-- 公司电话 -->
        <van-field v-model="list[13]" label="公司电话：" placeholder="请输入公司电话" />
        <!-- 详细地址 -->
        <van-field v-model="list[10]" label="详细地址：" placeholder="请输入详细地址" />
        <!-- 联系人 -->
        <van-field v-model="list[11]" label="联系人：" placeholder="请输入联系人" />
        <!-- 手机号码 -->
        <van-field :value="list[14]" label="手机号码：" placeholder="请输入手机号码" />
        <!-- 诉讼法院 -->
        <van-field v-model="list[28]" label="诉讼法院：" placeholder="请输入诉讼法院" />
        <!-- 邮箱 -->
        <van-field v-model="list[15]" label="邮箱：" placeholder="请输入邮箱" />
      </van-cell-group>
      <van-cell-group>
        <van-cell class="padding-vertical" title="工程商" is-link value="用户信息" @click="jumpPage('usersInfoAccessory')" />
      </van-cell-group>
      <div class="pwd-button" @click="saveMessage">
        <van-button type="primary" size="large">保 存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";
import areaList from "./../../assets/js/area.js";
export default {
  data() {
    return {
      list: [],
      areaList,
      comType: "请选择公司类型",
      comTypecolumns: [
        "国资（独资或合资）",
        "有限责任公司",
        "股份有限公司",
        "独资（法人或自然人）",
        "港澳台合资",
        "外商合资",
        "港澳台独资",
        "外商独资"
      ],
      comTypeShow: false,
      comUnit: "请选择纳税人类别",
      comUnitcolumns: ["一般纳税人", "小规模纳税人"],
      comUnitShow: false
    };
  },
  methods: {
    //公司类型
    comTypeConfirm(res) {
      this.comType = res;
      this.comTypeShow = false;
    },
    comUnitConfirm(res) {
      this.comUnit = res;
      this.comUnitShow = false;
    },
    onRegionChange(res) {
      this.list[39] = res.prov;
      this.list[40] = res.city;
      this.list[41] = res.district;
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Company: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_CompanyOID: this.userId.UCML_OrganizeOID }
            ]
          },
          {
            BC_SC_Company: [
              { _attr: { UpdateKind: "" } },
              { SC_CompanyOID: "null" },
              { CompanyName: this.list[2] || "null" },
              { TaxpayerNo: this.list[5] || "null" },
              { CompanyType: this.list[3] || "null" },
              { TaxpayerType: this.list[6] || "null" },
              { representative: this.list[27] || "null" },
              { BankName: this.list[8] || "null" },
              { BankNo: this.list[9] || "null" },
              { Telephone: this.list[13] || "null" },
              { Address: this.list[10] || "null" },
              { Contacts: this.list[11] || "null" },
              { Moblephone: this.list[14] || "null" },
              { Court_Sue: this.list[28] || "null" },
              { Mailbox: this.list[15] || "null" },
              { prov_ID: this.list[39] || "null" },
              { district_ID: this.list[40] || "null" },
              { city_ID: this.list[41] || "null" },
              { ProvincesName: this.list[33] || "null" },
              { DistrictName: this.list[34] || "null" },
              { CityName: this.list[35] || "null" }
            ]
          }
        ]
      });
      // console.log(xmlString);
      users.saveMessageCompany(xmlString).then(res => {
        console.log(res);
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
          this.list = eval("[[" + csp[0] + "]]")[0];
          const t = this.list[3];
          this.comType = this.comTypecolumns[t - 1];
          const c = this.list[6];
          this.comUnit = this.comUnitcolumns[c - 1];
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


