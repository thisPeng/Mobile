<template>
<!-- 合同清单详情 -->
  <div class="contractdetails">
      <div class="title-contract">合同清单详情</div>
    <div class="contract-data">
      <div class="contract-card">
        <div class="contract-item">
          <div class="item-title">
            <span class="title">品名:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>规格型号:{{item}}</span>
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
              <div class="content-row">
              <span>产品编码:{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
export default {
  data() {
    return {
      item:""
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.contractdetails {
  width: 100%;
   padding: 10px;
  background-color: #eee;
  .contract-data {
    margin-bottom: 40px;
    .contract-card {
      width: 100%;
      .contract-item {
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
  .title-contract {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
}
</style>

