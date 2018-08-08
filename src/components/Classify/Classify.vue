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
          <div v-for="(ite,idx) in item.list" :key="idx">
            <van-collapse v-model="activeNames" v-if="ite.list.length > 0">
              <van-collapse-item :title="ite.name" :name="idx">
                <div class="item" v-for="(e,i) in ite.list" :key="i" @click="onItemClick(e.id)">
                  <div class="title">{{e.name}}</div>
                </div>
              </van-collapse-item>
            </van-collapse>
            <div class="item" v-else @click="onItemClick(ite.id)">
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
      console.log(id);
    }
  },
  computed
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  bottom: 50px !important;
  overflow: hidden !important;
  .actives {
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
  .left {
    top: 41px;
    float: left;
    width: 25%;
    height: 100%;
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
    float: left;
    width: 75%;
    height: 100%;
    overflow-y: scroll;
    ul {
      list-style: none;
      .class-title {
        padding: 7px 10px;
        background: #eee;
      }
      .item {
        overflow: hidden;
        width: 100%;
        height: 44px;
        padding: 10px 15px;
        font-size: 14px;
        background: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .item-left {
          float: left;
          .item-img {
            width: 100px;
            height: 100px;
            background: #eee;
          }
        }
      }
      .van-collapse-item__content {
        .title {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
