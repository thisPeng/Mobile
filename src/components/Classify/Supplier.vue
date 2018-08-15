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
        <div class="flex-span">
          <div class="flex-1" @click="orderList">单价
            <i class="iconfont icon-paixu-shang" v-show="!priceDesc"></i>
            <i class="iconfont icon-paixu-xia" v-show="priceDesc"></i>
          </div>
          <div class="flex-1" @click="screenshow=true">筛选
            <i class="iconfont icon-shaixuanxuanzhong"></i>
          </div>
        </div>
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
    <van-popup v-model="screenshow" position="right">
      <div class="screen">
        <div class="screen-filter">
          <span class="filter-item" v-for="(item, index) in filterList" :key="index">
            <van-button :disabled="filterList.length === 1">{{item}}</van-button>
          </span>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large">重 置</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      priceDesc: false,
      screenshow: false,
      isSearch: false,
      keyword: "",
      activeKey: 0,
      typeList: [],
      filterList: [],
      goodsList: []
    };
  },
  methods: {
    orderList() {},
    // 选择分类
    selectKey(i) {
      this.activeKey = i;
      this.getSuppGoodsList(
        this.typeList[i].SupplierID,
        this.typeList[i].SC_SMaterialTypeOID
      );
      // 获取二级分类
      this.getSuppType(false, this.typeList[i].SC_SMaterialTypeOID);
    },
    // 获取分类商品
    getSuppGoodsList(id = "", pid = "") {
      classify.getSuppGoods(id, pid).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split("]]");
            this.goodsList = eval("[[" + tsp[0] + "]]");
            // console.log(this.goodsList);
            // console.log(tsp[1]);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 获取供应商分类
    getSuppType(isLoad = false, fk = "") {
      classify.getSupplierType(this.suppParams[2], fk).then(res => {
        try {
          if (res.status === 1) {
            const arr = JSON.parse(res.text);
            if (arr.length > 0) {
              if (isLoad) {
                this.typeList = arr;
                this.selectKey(0);
              } else {
                console.log(arr);
                this.filterList = arr;
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    addCart() {}
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
      .flex-span {
        width: 100%;
        height: 30px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        .flex-1 {
          text-align: center;
          .iconfont {
            font-size: 16px;
          }
          .icon-shaixuanxuanzhong {
            font-size: 14px;
          }
        }
      }
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
  .van-popup--right {
    width: 90%;
    height: 100%;
    .screen {
      height: 100%;
      overflow-y: auto;
      background-color: #fff;
      .screen-filter {
        margin-bottom: 40px;
        .filter-item {
          padding: 5px;
        }
      }
      .screen-button {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
      }
    }
  }
}
</style>