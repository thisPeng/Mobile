<template>
  <!-- 确认价格-询价单 -->
  <div class="pricedetails">
    <div class="title-price">询价单</div>
    <van-cell-group v-for="(item,index) in list" :key="index">
      <!--v-for="(item,index) in list" :key="index" -->
      <van-field v-model="item[2]" label="单据编号:" disabled />
      <van-field v-model="item[3]" label="供应商名称:" disabled />
      <van-field v-model="item[5]" label="联系人:" disabled />
      <van-field v-model="item[6]" label="联系电话:" disabled />
      <van-field v-model="item[4]" label="供应商地址:" disabled />
      <van-field v-model="item[9]" label="订单数量:" disabled />
      <van-field v-model="item[10]" label="订单金额:" disabled />
      <van-field v-model="item[39]" label="订单状态:" disabled />
      <van-field v-model="item[17]" label="订货有效期:" disabled />
      <van-field label="业务员:" />
      <van-field v-model="item[26]" label="员工姓名:" disabled />
      <van-field label="备注:" type="textarea" />
    </van-cell-group>
    <div class="title-price">询价单明细</div>
    <div class="con-data">
      <div class="con-card">
        <div class="con-item" v-for="(dspList,index) in dspList" :key="index">
          <div class="item-title">
            <span class="title">品名:{{dspList[4]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>规格/型号:{{dspList[8]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">实际数量:{{dspList[10]}}</span>
              <span class="row-right">赠送数量:{{dspList[12]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单位:{{dspList[28]}}</span>
              <span class="row-right">实价:{{dspList[13]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">小计:{{dspList[15]}}</span>
              <span class="row-right">税率:{{dspList[16]}}</span>
            </div>
            <div class="content-row">
              <span>备注:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title-price">询价单附件</div>
    <van-button  type="primary">确认</van-button>
    <van-button type="danger">提议</van-button>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { conprice } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      dspList: [],
      item: []
    };
  },
  computed,
  methods: {
    getInfo() {
      conprice.getInfo(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          console.log(res.text)
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          //console.log(this.list);
        }
      });
    },
    getDetails() {
      conprice.getDetails(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const dsp = sp[1].split(";");
          this.dspList = eval("[[" + dsp[0]);
          // console.log(this.dspList);
        }
      });
    }
  },
  mounted() {
    this.getInfo();
    this.getDetails();
  }
};
</script>
<style lang="less" scoped>
.pricedetails {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .con-data {
    margin-bottom: 40px;
    .con-card {
      width: 100%;
      .con-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
  .van-cell {
    font-size: 15px;
    color: rgb(153, 148, 148);
  }
  .title-price {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .van-button--normal{
        padding: 0px 73px;
  }
}
</style>

