<template>
  <div class="index">
    <ul class="index-list">
      <li class="list-item" v-for="(item, i) in list" :key="i">
        <div class="item-left">
          <!--图片静态渲染-->
          <img src="@/../public/img/ms_ico1.png" v-if="i==0">
          <img src="@/../public/img/ms_ico2.png" v-else-if="i==1">
          <img src="@/../public/img/ms_ico3.png" v-else-if="i==2">
          <img src="@/../public/img/ms_ico4.png" v-else-if="i==3">
          <img src="@/../public/img/ms_ico5.png" v-else-if="i==4">
          <img src="@/../public/img/ms_ico6.png" v-else-if="i==5">
          <img src="@/../public/img/ms_ico7.png" v-else-if="i==6">
        </div>
        <div :class="i !== 0 ? 'item-right border-top' : 'item-right'">
          <div class="item-title">
            <span>{{item.title}}</span>
            <span class="number">{{item.count}}</span>
          </div>
          <div class="text-gray text-sm">{{item.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  computed,
  mounted() {
    index.getData().then(res => {
      if (res) {
        this.list = res;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  .index-list {
    .list-item {
      background-color: #fff;
      display: flex;
      .item-left {
        flex: 1;
        padding: 10px;
        img {
          width: 100%;
        }
      }
      .item-right {
        flex: 6;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title {
          display: flex;
          justify-content: space-between;
          .number {
            color: #fff;
            background-color: #ff0000;
            font-size: 12px;
            line-height: 1;
            display: inline-block;
            padding: 3px 6px;
            border-radius: 100px;
          }
        }
      }
    }
  }
}
</style>
