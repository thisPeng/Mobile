<template>
  <!-- 发货信息 -->
  <div class="shippinginfo">
    <div class="info-data">
      <div class="info-card">
        <div class="info-item">
          <!-- v-for="(item,index) in list" :key="index" @click="jumpage('pricedetails')" -->
          <div class="item-title">
            <span class="title">项目名称：{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">发货日期{{item}}</span>
              <span class="row-right">发货状态{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">签收日期{{item}}</span>
              <span class="row-left">签收状态{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
export default {
  data() {
    return {
      item: ""
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.shippinginfo {
  width: 100%;
  padding: 10px;
  .info-data {
    margin-bottom: 40px;
    .info-card {
      width: 100%;
      .info-item {
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
}
</style>

