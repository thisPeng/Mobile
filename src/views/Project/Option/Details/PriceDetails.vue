<template>
<!-- 确认价格-询价单 -->
  <div class="pricedetails">
    <div class="title-price">询价单</div>
     <van-cell-group ><!--v-for="(item,index) in list" :key="index" -->
      <van-field value="" label="单据编号:" disabled />
      <van-field value="" label="供应商名称:" disabled />
      <van-field value="工程名称" label="联系人:" disabled />
      <van-field value="" label="联系电话:" disabled />
      <van-field value="" label="供应商地址:" disabled />
      <van-field value="" label="订单数量:" disabled />
      <van-field value="" label="订单金额:" disabled />
      <van-field value="" label="订单状态:" disabled />
      <van-field value="" label="订货有效期:" disabled />
      <van-field value="" label="业务员:" disabled />
      <van-field value="" label="员工姓名:" disabled />
      <van-field value="" label="备注:" disabled type="textarea" />
    </van-cell-group>
    <div class="title-price">询价单明细</div>
    <div class="con-data">
      <div class="con-card">
        <div class="con-item">
          <div class="item-title">
            <span class="title">品名:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>规格/型号:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">实际数量:{{item}}</span>
              <span class="row-right">赠送数量:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单位:{{item}}</span>
              <span class="row-right">实价:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">小计:{{item}}</span>
              <span class="row-right">税率:{{item}}</span>
            </div>
            <div class="content-row">
              <span>备注:{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title-price">询价单附件</div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
export default {
  data() {
    return {
      list: [],
       item:""
    };
  },
  computed,
  methods: {
    // getList() {
    //   conprice.getList(this.projectInfo.SC_ProjectOID).then(res => {
    //     try {
    //       if (res && res.status === 1) {
    //         console.log(res)
    //         const sp = res.text.split("[[");
    //         const csp = sp[1].split(";");
    //         this.list = eval("[[" + csp[0]);
    //         console.log(this.list);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   });
    // }
  },
  mounted() {}
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
}
</style>

