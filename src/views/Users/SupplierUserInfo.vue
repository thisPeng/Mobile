 <template>
  <div class="supplierUserInfo">
    <div class="mui-head">
      <img src="../../../public/img/ms_ico5.png" alt="" />
      <div id="nName" class="mui-name">{{userInfo.name}}</div>
    </div>
    <div class="info-users">
      <!-- 供应商编号 -->
      <van-cell-group>
        <van-field :value="data[35]" label="供应商编号：" disabled />
        <!-- 单位名称 -->
        <van-field v-model="data[22]" label="单位名称：" placeholder="请输入单位名称" />
        <!-- 统一社会信用代码 -->
        <van-field v-model="data[25]" label="统一社会信用代码：" placeholder="请输入统一社会信用代码" />
        <!-- 单位类别 -->
        <cbh-select v-model="data[23]" label="单位类别：" code="CodeTable_Unit" @change="unitConfirm" v-if="data.length > 0" />
        <!-- 纳税人类别 -->
        <cbh-select v-model="data[26]" label="纳税人类别：" code="CodeTable_TaxClass" @change="onConfirm" v-if="data.length > 0" />
        <!-- 税率 -->
        <van-field v-model="data[27]" label="税率：" placeholder="请输入联系人税率" />
        <!-- 开户行 -->
        <van-field v-model="data[28]" label="开户行：" placeholder="请输入开户行" />
        <!-- 银行账号 -->
        <van-field v-model="data[29]" label="银行账号：" placeholder="请输入银行账号" />
      </van-cell-group>
      <!-- 公司地址 -->
      <cbh-region :prov="data[58]" :city="data[59]" :district="data[60]" @change="onRegionChange" v-if="data.length > 0" />
      <!-- 可开票税率 -->
      <van-cell-group>
        <van-field v-model="data[49]" label="可开票税率：" placeholder="请输入可开票税率" />
        <!-- 详细地址 -->
        <van-field v-model="data[30]" label="详细地址：" placeholder="请输入详细地址" />
        <van-field v-model="data[31]" label="联系人：" placeholder="请输入联系人" />
        <van-field v-model="data[32]" label="固定电话：" placeholder="请输入固定电话" />
        <van-field v-model="data[33]" label="手机：" placeholder="请输入手机" />
        <van-field v-model="data[34]" label="邮箱：" placeholder="请输入邮箱" />
      </van-cell-group>
      <van-cell-group>
        <van-cell class="padding-vertical" title="证照资料" is-link value="" @click="jumpPage('usersInfoAccessory')" />
        <van-cell class="padding-vertical" title="附件" is-link value="" @click="jumpPage('supplierAnnex')" />
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
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    //纳税人类别
    onConfirm(res) {
      this.data[23] = res;
    },
    //单位类别
    unitConfirm(res) {
      this.data[26] = res;
    },
    //省市区
    onRegionChange(res) {
      this.data[58] = res.prov;
      this.data[59] = res.city;
      this.data[60] = res.district;
      this.data[62] = res.provStr;
      this.data[63] = res.cityStr;
      this.data[64] = res.districtStr;
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Supplier: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_SupplierOID: this.data[2] }
            ]
          },
          {
            BC_SC_Supplier: [
              { _attr: { UpdateKind: "" } },
              { SC_SupplierOID: "null" },
              { SupplierName: this.data[22] || "null" }, //单位名称
              { TaxpayerType: this.data[23] || "null" }, //纳税人类别
              { TaxpayerNo: this.data[25] || "null" }, //统一社会信用代码
              { SupplierType: this.data[26] || "null" }, //单位类别
              { Taxrate: this.data[27] || "null" }, //税率
              { BankName: this.data[28] || "null" }, //开户行
              { BankNo: this.data[29] || "null" }, //银行账号
              { prov_ID: this.data[58] || "null" }, //省ID
              { district_ID: this.data[59] || "null" }, //市ID
              { city_ID: this.data[60] || "null" }, //区ID
              { ProvincesName: this.data[62] || "null" }, //省名
              { DistrictName: this.data[63] || "null" }, //市名
              { CityName: this.data[64] || "null" }, //区名
              { Taxrate_Can: this.data[49] || "null" }, //可开票税率
              { FactoryAddress: this.data[30] || "null" }, //详细地址
              { Contacts: this.data[31] || "null" }, //联系人
              { Telephone: this.data[32] || "null" }, //固定电话
              { Moblephone: this.data[33] || "null" }, //手机
              { Mailbox: this.data[34] || "null" } //邮箱
            ]
          }
        ]
      });

      users.saveMessageSupplier(xmlString).then(res => {
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
      //供应商
      users.getSupplierUserInfo(this.userId.UCML_OrganizeOID).then(res => {
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
.supplierUserInfo {
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
.supplierUserInfo {
  .van-cell__title {
    max-width: 130px !important;
  }
}
</style>


