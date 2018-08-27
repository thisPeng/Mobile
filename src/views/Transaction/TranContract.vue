<template>
  <!-- 合同信息 -->
  <div class="trancontract">
    <div class="tran-data">
      <div class="tran-card">
        <div class="tran-item" @click="jumpage('inventory')">
          <!-- v-for="(item,index) in list" :key="index" @click="jumpage('pricedetails')" -->
          <div class="item-title">
            <span class="title">项目名称：{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">合同编号{{item}}</span>
              <span class="row-right">发货情况{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">合同名称{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">合同金额{{item}}</span>
              <span class="row-left">签订日期{{item}}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      item: ""
    };
  },
  computed,
  methods: {
    jumpage(name) {
      this.$router.push({
        name
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.trancontract {
  width: 100%;
  padding: 10px;
  .tran-data {
    margin-bottom: 40px;
    .tran-card {
      width: 100%;
      .tran-item {
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
