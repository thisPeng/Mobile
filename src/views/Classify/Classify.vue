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
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      activeNames: [],
      list: [],
      topList: [],
      detailedList: []
    };
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
  computed,
  mounted() {
    classify.getProductType().then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        const list = eval(sp[1].split("=")[1]);

        let topIndex = -1,
          deIndex = -1;
        list.forEach(val => {
          if (val[8] === "00000000-0000-0000-0000-000000000000") {
            this.topList.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
            topIndex++;
          } else if (this.topList[topIndex].id === val[8]) {
            this.detailedList.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
            deIndex++;
          } else if (this.detailedList[deIndex].id === val[8]) {
            this.detailedList[deIndex].list.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
          } else {
            this.detailedList[deIndex].list.forEach(v => {
              if (v.id === val[8]) {
                v.list.push({
                  id: val[0],
                  code: val[1],
                  name: val[2],
                  pid: val[8]
                });
              }
            });
          }
        });
      }
      // console.log(this.detailedList);
    });
  }
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
    // background: #eee;
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
    position: absolute;
    left: 25%;
    right: 0;
    top: 0;
    bottom: 0;
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
        .item-right {
          float: left;
          padding: 0 10px;
          .title {
            width: 100px;
            height: 20px;
            margin-top: 10px;
            background: #eee;
          }
          .subtitle {
            width: 70px;
            height: 20px;
            margin-top: 10px;
            background: #eee;
          }
          .price {
            width: 50px;
            height: 20px;
            margin-top: 10px;
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
