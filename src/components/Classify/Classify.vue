<template>
  <div class="classify">
    <div class="left">
      <van-badge-group :active-key="active">
        <van-badge v-for="(item, index) in topList" :key="index" :title="item.name" @click="onNavClick" />
      </van-badge-group>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in detailedList" :key="index" v-if="item.pid == topList[active].id">
          <div class="class-title"> {{item.name}} </div>
          <div v-for="(ite,idx) in item.list" :key="idx" class="class-item">
            <div class="item" @click="onItemClick(ite.id)">
              <div class="image"><img :src="ite.img" alt=""></div>
              <div class="title">{{ite.name}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {
      active: 0,
      activeNames: []
    };
  },
  props: {
    topList: {
      type: Array,
      default: () => []
    },
    detailedList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onNavClick(index) {
      this.active = index;
    },
    onItemClick(id) {
      this.$store.commit("goodsParams", { id });
      this.$router.push({
        name: "goodsList"
      });
    }
  },
  computed
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  font-size: 14px;
  .left {
    width: 25%;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 101;
    background-color: #f6f6f6;
    .van-badge--select {
      border-color: #00a0e9;
    }
    .van-badge-group {
      width: 100%;
    }
  }
  .right {
    position: absolute;
    top: 40px;
    left: 25%;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 102;
    ul {
      list-style: none;
      li {
        background: #fff;
        .class-title {
          padding: 7px 15px;
          color: #333;
          font-weight: 600;
          background-color: #f6f6f6;
        }
        .class-item {
          width: 33.33%;
          height: 90px;
          display: inline-block;
          .item {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .image {
              width: 55px;
              height: 55px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10%;
              }
            }
            .title {
              color: #666;
              padding-top: 5px;
              font-size: 12px;
              text-align: center;
            }
          }
        }
        .class-list {
          width: 100%;
        }
        .van-collapse-item__content {
          .title {
            font-size: 12px !important;
          }
        }
      }
    }
  }
}
</style>
