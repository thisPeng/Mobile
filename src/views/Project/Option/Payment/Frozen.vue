<template>
<!-- 冻结信息 -->
  <div class="frozen">
    <div class="fro-data">
      <div class="fro-card">
        <div class="fro-item">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">单号:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">冻结说明:{{item}}</span>
              <span class="row-right">交易金额:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">审核日期:{{item}}</span>
              <span class="row-right">单据状态:{{item}}</span>
            </div>
            <div class="content-row">
              <span>经手人:{{item}}</span>
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
      list:[],
      item:""
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.frozen {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .fro-data {
    margin-bottom: 40px;
    .fro-card {
      width: 100%;
      .fro-item {
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


