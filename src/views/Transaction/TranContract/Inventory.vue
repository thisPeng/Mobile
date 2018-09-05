<template>
  <!-- 清单详情 -->
  <div class="inventory">
    <div class="inv-data">
      <div class="inv-card">
        <div class="inv-item">
          <!-- v-for="(item,index) in list" :key="index" @click="jumpage('pricedetails')" -->
          <div class="item-title">
            <span class="title">品名：{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">规格型号：{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">实际数量{{item}}</span>
              <span class="row-left">赠送数量{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单位{{item}}</span>
              <span class="row-left">小计{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">税率{{item}}</span>
              <span class="row-left">产品编号{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">备注{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      item: ""
    };
  },
  computed,
  methods: {
    getData(){
      offer.getContractDetail(this.confirmParams[0]).then(res =>{
        console.log(res);
      })
    },
    pageInit(){
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.inventory {
  width: 100%;
  padding: 10px;
  .inv-data {
    margin-bottom: 40px;
    .inv-card {
      width: 100%;
      .inv-item {
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
