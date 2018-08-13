<template>
  <div class="supplie-type">
    <van-search placeholder="请输入商品名称" v-model="keyword" v-if="!isSearch" />
    <div class="left">
      <van-badge-group :active-key="activeKey">
        <van-badge v-for="(item, index) in typeList" :key="index" :title="item.MaterialName" @click="selectKey" />
      </van-badge-group>
    </div>
    <div class="right">
      <div class="classify-list">
        <div class="list-item" v-for="(item, index) in goodsList" :key="index">
          <van-card :title="item[22]" :thumb="item[41].replace('~',servePath) ">
            <div slot="desc">
              <div class="item-brand">
                <van-tag plain type="success">品牌： {{item[24]}}</van-tag>
              </div>
              <div class="item-price">￥ {{item[5]}}</div>
            </div>
            <div slot="footer">
              <i class="iconfont icon-add " @click.stop="addCart(item)"></i>
            </div>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      isSearch: false,
      keyword: "",
      activeKey: 0,
      typeList: [],
      goodsList: []
    };
  },
  methods: {
    // 选择分类
    selectKey(i) {
      this.activeKey = i;
      this.getSuppGoodsList(this.typeList[i].SupplierID);
    },
    // 获取分类商品
    getSuppGoodsList(id) {
      classify.getSuppGoods(id).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split("]]");
            this.goodsList = eval("[[" + tsp[0] + "]]");
            console.log(this.goodsList);
            // console.log(tsp[1]);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 获取供应商分类
    getSuppType(isLoad = false) {
      classify.getSupplierType(this.suppParams[2]).then(res => {
        try {
          if (res.status === 1) {
            this.typeList = JSON.parse(res.text);
            if (isLoad && this.typeList.length > 0) {
              this.getSuppGoodsList(this.typeList[0].SupplierID);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed,
  mounted() {
    this.isSearch = this.$parent.index ? true : false;
    this.getSuppType(true);
  }
};
</script>
<style lang="less" scoped>
.supplie-type {
  width: 100%;
  overflow: hidden !important;
  .left {
    width: 25%;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    z-index: 101;
    .van-badge--select {
      border-color: #00a0e9;
    }
    .van-badge-group {
      width: 100%;
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
    overflow-y: auto;
    z-index: 102;
    .classify-list {
      width: 100%;
      padding: 0 10px;
      .list-item {
        .van-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 10px;
          .item-brand {
            padding: 10px 0;
          }
          .item-price {
            color: #ff4257;
          }
          .iconfont {
            color: #00a0e9;
            font-size: 26px;
            padding: 10px;
          }
        }
      }
    }
  }
  .class-title {
    padding: 7px 10px;
    background: rgb(202, 195, 195);
  }
}
</style>