<template>
  <div class="contractlabor">
    <van-cell-group>
      <div class="title-delivery">基本合同信息</div>
      <van-field v-model="item" label="合同编号:" disabled/>
      <van-field v-model="item" label="合同名称:" />
      <van-field v-model="item" label="工程承包人:" />
      <van-field v-model="item" label="劳务分包人:" />
      <van-field v-model="item" label="资质证书号码:" disabled/>
      <van-field v-model="item" label="发证机关:" disabled/>
      <van-field v-model="item" label="资质专业等级:" disabled/>
      <van-field v-model="item" label="复审时间及有效期:" disabled/>
      <van-field v-model="item" label="合同金额:" />
      <van-field v-model="item" label="分包范围:" />
      <van-field v-model="item" label="施工承包方式:" />
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
      <van-field v-model="item" label="质量评定等级:" />
      <van-field v-model="item" label="标准规范:" />
      <van-field v-model="item" label="图纸提交期限:" />
      <van-field v-model="item" label="图纸套数:" />
      <van-field v-model="item" label="标准图纸套数:" />
      <van-field v-model="item" label="工程商驻地代表:" />
      <van-field v-model="item" label="劳务分包驻地代表:" />
      <van-field v-model="item" label="材料采购费用:" />
      <div class="con-price">
        <span class="con-label">计价方式</span>
        <span class="con-select" @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div v-if="payment =='第一种计价方式'">
        <span class="explain">说明:固定合同价款</span>
        <van-field v-model="item" label="合同价款共计:" />
      </div>
      <div v-else-if="payment =='第二种计价方式'">
        <span class="explain">说明:约定不同工种施工的计时单价，按确认的工时计算</span>
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
        <van-field v-model="item" label="工种类型:" />
        <van-field v-model="item" label="计时单价:" />
      </div>
      <div v-else-if="payment =='第三种计价方式'">
        <span class="explain">说明:约定不同工作成果的计件单价，按确认的工程量计算</span>
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
        <van-field v-model="item" label="工作成果:" />
        <van-field v-model="item" label="计件单价:" />
      </div>
      <van-field v-model="item" label="约定其他:" />
      <van-field v-model="item" label="预付款:" />
      <div class="con-price">
        <span class="con-label">支付时间:</span>
        <span class="con-select" @click="showDatethree=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatethree" type="date" class="contract-date" @confirm="zhifuDate" @cancel="showDatethree=false" />
      <van-field v-model="item" label="支付金额:" />
      <van-field v-model="item" label="计时支付方法:" />
      <van-field v-model="item" label="分包人违约千分比:" />
      <van-field v-model="item" label="分包人违约金:" />
      <van-field v-model="item" label="索赔天数期限:" />
      <van-field v-model="item" label="诉讼法院:" disabled/>
      <van-field v-model="item" label="停止工作期限:" />
      <van-field v-model="item" label="合同订立时间:" />
      <van-field v-model="item" label="合同订立地点:" />
      <van-field v-model="item" label="生效方式:" />

      <div class="title-delivery">工程承包商信息</div>
      <van-field v-model="item" label="工程承包商签名:" disabled/>
      <van-field v-model="item" label="银行账号:" disabled/>
      <van-field v-model="item" label="开户行:" disabled/>
      <van-field v-model="item" label="纳税识别码:" disabled/>
      <van-field v-model="item" label="电话:" disabled/>
      <van-field v-model="item" label="法定代表人:" disabled/>
      <div class="con-price">
        <span class="con-label">签订日期:</span>
        <span class="con-select" @click="showDatefour=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatefour" type="date" class="contract-date" @confirm="qiandingDate" @cancel="showDatefour=false" />
      <van-field v-model="item" label="地址:" disabled/>

      <div class="title-delivery">劳务分包人信息</div>
      <van-field v-model="item" label="劳务分包人签名:" disabled/>
      <van-field v-model="item" label="银行账号:" disabled/>
      <van-field v-model="item" label="开户行:" disabled/>
      <van-field v-model="item" label="纳税识别码:" disabled/>
      <van-field v-model="item" label="电话:" disabled/>
      <van-field v-model="item" label="法定代表人:" disabled/>
      <div class="con-price">
        <span class="con-label">签订日期:</span>
        <span class="con-select" @click="showDatefive=true">{{paytime}}</span>
      </div>
      <van-datetime-picker v-model="currentDate" v-show="showDatefive" type="date" class="contract-date" @confirm="fenbaoDate" @cancel="showDatefive=false" />

      <van-field v-model="item" label="地址:" disabled/>
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { contractInfo } from "./../../../../assets/js/api.js";

export default {
  data() {
    return {
      item: "",
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
          console.log(res);
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
    min-width: 122px;
  }
}
</style>

