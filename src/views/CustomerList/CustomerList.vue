<template>
  <div class="customerlist">
    <div class="customerlist-item">
      <!--v-for="(item,index) in list" :key="index" @click="jumpPage(item)" -->
      <div class="customerlist-title">
        <span class="title">客户名称：{{item}}</span>
        <span class="icon">
          <van-icon name="success" color="#00A0E9" />
        </span>
      </div>
      <div class="customerlist-content">
        <span class="content-left">电话：{{item}}</span>
        <span class="content-right">地址：{{item}}</span>
      </div>
      <div class="customerlist-content">
        <span class="content-left">描述：{{item}}</span>
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
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.customerlist {
  width: 100%;
  .customerlist-item {
    background-color: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    border-radius: 5px;
    margin: 10px 0;
    .customerlist-title {
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
    .customerlist-content {
      padding: 10px 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
    }
  }
}
</style>
