<template>
  <div class="contractlabor">
    <van-cell-group>
      <div class="title-delivery">基本合同信息</div>
      <van-field v-model="item[1]" label="合同编号:" disabled/>
      <van-field v-model="item[2]" label="合同名称:" />
      <van-field v-model="item[3]" label="工程承包人:" />
      <van-field v-model="item[4]" label="劳务分包人:" />
      <van-field v-model="item[0]" label="资质证书号码:" disabled/>
      <van-field v-model="item[0]" label="发证机关:" disabled/>
      <van-field v-model="item[0]" label="资质专业等级:" disabled/>
      <van-field v-model="item[0]" label="复审时间及有效期:" disabled/>
      <van-field v-model="item[11]" label="合同金额:" />
      <van-field v-model="item[8]" label="分包范围:" />
      <van-field v-model="item[57]" label="施工承包方式:" />
      <div class="con-price">
        <span class="con-label">分包开工日期</span>
        <span class="con-select" @click="showDateone=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDateone" type="date" class="contract-date" @confirm="saveDate" @cancel="showDateone=false" />
      <div class="con-price">
        <span class="con-label">分包完工日期</span>
        <span class="con-select" @click="showDatetwo=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatetwo" type="date" class="contract-date" @confirm="wangongDate" @cancel="showDatetwo=false" />
      <van-field v-model="item[17]" label="质量评定等级:" />
      <van-field v-model="item[27]" label="标准规范:" />
      <van-field v-model="item[13]" label="图纸提交期限:" />
      <van-field v-model="item[15]" label="图纸套数:" />
      <van-field v-model="item[20]" label="标准图纸套数:" />
      <van-field v-model="item[58]" label="工程商驻地代表:" />
      <van-field v-model="item[59]" label="劳务分包驻地代表:" />
      <van-field v-model="item[0]" label="材料采购费用:" />
      <div class="con-price">
        <span class="con-label">计价方式</span>
        <span class="con-select" @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div v-if="payment =='第一种计价方式'">
        <span class="explain">说明:固定合同价款</span>
        <van-field v-model="item[0]" label="合同价款共计:" />
      </div>
      <div v-else-if="payment =='第二种计价方式'">
        <span class="explain">说明:约定不同工种施工的计时单价，按确认的工时计算</span>
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
        <van-field v-model="item[0]" label="工种类型:" />
        <van-field v-model="item[0]" label="计时单价:" />
      </div>
      <div v-else-if="payment =='第三种计价方式'">
        <span class="explain">说明:约定不同工作成果的计件单价，按确认的工程量计算</span>
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
        <van-field v-model="item[0]" label="工作成果:" />
        <van-field v-model="item[0]" label="计件单价:" />
      </div>
      <van-field v-model="item[61]" label="约定其他:" />
      <van-field v-model="item[62]" label="预付款:" />
      <div class="con-price">
        <span class="con-label">支付时间:</span>
        <span class="con-select" @click="showDatethree=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatethree" type="date" class="contract-date" @confirm="zhifuDate" @cancel="showDatethree=false" />
      <van-field v-model="item[64]" label="支付金额:" />
      <van-field v-model="item[63]" label="计时支付方法:" />
      <van-field v-model="item[28]" label="分包人违约千分比:" />
      <van-field v-model="item[25]" label="分包人违约金:" />
      <van-field v-model="item[26]" label="索赔天数期限:" />
      <van-field v-model="item[30]" label="诉讼法院:" disabled/>
      <van-field v-model="item[22]" label="停止工作期限:" />
      <van-field v-model="item[64]" label="合同订立时间:" />
      <van-field v-model="item[65]" label="合同订立地点:" />
      <van-field v-model="item[66]" label="生效方式:" />

      <div class="title-delivery">工程承包商信息</div>
      <van-field v-model="item[31]" label="工程承包商签名:" disabled/>
      <van-field v-model="item[32]" label="银行账号:" disabled/>
      <van-field v-model="item[33]" label="开户行:" disabled/>
      <van-field v-model="item[34]" label="纳税识别码:" disabled/>
      <van-field v-model="item[36]" label="电话:" disabled/>
      <van-field v-model="item[37]" label="法定代表人:" disabled/>
      <div class="con-price">
        <span class="con-label">签订日期:</span>
        <span class="con-select" @click="showDatefour=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatefour" type="date" class="contract-date" @confirm="qiandingDate" @cancel="showDatefour=false" />
      <van-field v-model="item[35]" label="地址:" disabled/>

      <div class="title-delivery">劳务分包人信息</div>
      <van-field v-model="item[39]" label="劳务分包人签名:" disabled/>
      <van-field v-model="item[40]" label="银行账号:" disabled/>
      <van-field v-model="item[41]" label="开户行:" disabled/>
      <van-field v-model="item[42]" label="纳税识别码:" disabled/>
      <van-field v-model="item[44]" label="电话:" disabled/>
      <van-field v-model="item[45]" label="法定代表人:" disabled/>
      <div class="con-price">
        <span class="con-label">签订日期:</span>
        <span class="con-select" @click="showDatefive=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatefive" type="date" class="contract-date" @confirm="fenbaoDate" @cancel="showDatefive=false" />

      <van-field v-model="item[43]" label="地址:" disabled/>
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { contractInfo } from "./../../../../assets/js/api.js";

export default {
  data() {
    return {
      item: [],
      columns: ["第一种计价方式", "第二种计价方式", "第三种计价方式"],
      paymentShow: false,
      payment: "请选择计价方式",
      paytime: "请选择时间",
      currentDate: new Date(),
      showDateone: false,
      showDatetwo: false,
      showDatethree: false,
      showDatefour: false,
      showDatefive: false
    };
  },
  computed,
  methods: {
    //选择计价方式
    onConfirm(res) {
      this.payment = res;
      this.paymentShow = false;
    },
    //选择分包开工日期
    saveDate(val) {
      this.paytime = new Date(val).Format("yyyy-MM-dd");
      this.showDateone = false;
    },
    //选择分包完工日期
    wangongDate(val) {
      this.paytime = new Date(val).Format("yyyy-MM-dd");
      this.showDatetwo = false;
    },
    //选择支付时间
    zhifuDate(val) {
      this.paytime = new Date(val).Format("yyyy-MM-dd");
      this.showDatethree = false;
    },
    //选择签订日期
    qiandingDate(val) {
      this.paytime = new Date(val).Format("yyyy-MM-dd");
      this.showDatefour = false;
    },
    fenbaoDate(val) {
      this.paytime = new Date(val).Format("yyyy-MM-dd");
      this.showDatefive = false;
    },
    getData() {
      contractInfo
        .getLaborList(this.contractParams[0], "BC_Labor_Contract")
        .then(res => {
          try {
            if (res.status === 1) {
              const sp = res.text.split("[[");
              const tsp = sp[1].split("]]");
              this.item = eval("[[" + tsp[0] + "]]")[0];
              // console.log(this.item);
            }
          } catch (e) {
            this.$toast(e);
          }
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.contractlabor {
  width: "100%";
  .title-delivery {
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
  .explain {
    font-size: 14px;
    padding: 7px 9px;
    color: #989595;
  }
}
</style>
<style lang="less">
.contractlabor {
  .van-field .van-cell__title {
    min-width: 122px !important;
  }
}
</style>

