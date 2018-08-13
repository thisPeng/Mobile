<template>
  <!-- 预存列表 -->
  <div class="prememory">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">汇款账号:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">经手人:{{item}}</span>
              <span class="row-right">预存金额:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单据状态:{{item}}</span>
              <span class="row-right">审核日期:{{item}}</span>
            </div>
            <div class="content-row">
              <span>单号:{{item}}</span>
            </div>
            <div class="content-row">
              <span>备注:{{item}}</span>
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
      list: [],
      item: "1"
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.prememory {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .pre-data {
    margin-bottom: 40px;
    .pre-card {
      width: 100%;
      .pre-item {
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


