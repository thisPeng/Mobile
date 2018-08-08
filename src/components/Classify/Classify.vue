<template>
  <div class="classify">
    <div class="left">
      <ul>
        <li v-for="(item,index) in topList" :key="index" @click="onNavClick(index)" :class="index===active? 'active' : ''">{{item.name}}</li>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in detailedList" :key="index" v-if="item.pid == topList[active].id">
          <div class="class-title">{{item.name}}</div>
          <div v-for="(ite,idx) in item.list" :key="idx" class="class-item">
            <!-- <van-collapse v-model="activeNames" v-if="ite.list.length > 0" class="item-list">
              <van-collapse-item class="text-xs" :title="ite.name" :name="idx">
                <div class="class-item" v-for="(e,i) in ite.list" :key="i" @click="onItemClick(e.id)">
                  <div class="item">
                    <img class="image" :src="e.img" alt="">
                    <div class="title">{{e.name}}</div>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse> -->
            <div class="item" @click="onItemClick(ite.id)">
              <img class="image" :src="ite.img" alt="">
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
      this.$store.commit("goodsParams", id);
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
  .actives {
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
  .left {
    width: 25%;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    ul {
      list-style: none;
      li {
        padding: 15px 5px;
        text-align: center;
      }
    }
    .active {
      background: #fff;
      border-left: 2px solid #3190e8;
    }
  }
  .right {
    position: absolute;
    top: 45px;
    left: 25%;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    ul {
      list-style: none;
      li {
        background: #fff;
        .class-title {
          padding: 7px 10px;
          background: #eee;
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
              border-radius: 5px;
            }
            .title {
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
