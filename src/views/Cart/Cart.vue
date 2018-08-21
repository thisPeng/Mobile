<template>
  <div class="cart">
    <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
      <van-cell-group>
        <van-switch-cell v-model="checked" :title="'供应商分组一'" />
      </van-cell-group>
      <van-checkbox-group v-model="checkedArr" @change="onSelectItem">
        <van-cell-swipe :right-width="65" v-for="(item,index) in list" :key="index" v-show="checked">
          <transition name="van-slide-bottom">
            <div :class="item[35] === false ? 'cart-item bg-gray' : 'cart-item'" v-show="item[35]">
              <van-checkbox :name="item[0]" class="item-check" ref="checked"></van-checkbox>
              <van-card :class="item[35] === false ? 'bg-gray' : ''" :desc="item[16] + ' | 单位：' + item[15]">
                <div slot="thumb" @click.stop="showInfo(item,index)">
                  <img :src="item[32]" class="van-card__img">
                </div>
                <div slot="title" class="van-card__row" @click.stop="showInfo(item,index)">
                  <div class="van-card__title">{{item[14]}}</div>
                  <div class="van-card__price">{{'￥ '+item[19]}}</div>
                </div>
                <!-- <div slot="tags" @click.stop="showInfo(item)">
                <van-tag plain type="primary">供应商： {{item[18]}}</van-tag>
                <van-tag plain type="danger" class="margin-left-xs">历史均价：{{'￥ '+item[22]}}</van-tag>
              </div> -->
                <div slot="footer">
                  <van-stepper v-model="item[3]" :integer="true" />
                </div>
              </van-card>
            </div>
          </transition>
          <span slot="right" class="right" @click="onDeleteItem(item[0],index)">删除</span>
        </van-cell-swipe>
      </van-checkbox-group>
    </van-list>
    <!--商品详情-->
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock" @buy-clicked="searchSame(goods.title)">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'品牌： '+ goods.brand" :label="goods.info + '| 单位：' + goods.unit" />
          <!-- <van-cell :title="'税率：' + goods.taxRate + '%'" :label="'可开票税率：' + goods.taxAll" /> -->
          <van-cell :title="'供应商：' + goods.shop" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">找同款</van-button>
        </div>
      </template>
    </van-sku>
    <!--订单提交栏-->
    <van-submit-bar :button-text="pages.RecordCount > 999 ? '询价(999+)' : '询价('+pages.RecordCount+')'" @submit="onSubmit">
      <van-checkbox v-model="checkedAll" ref="checkedAll" @change="onSelectAll">全选</van-checkbox>
      <!-- <div class="cart-clear" @click="cartClear">
        <i class="iconfont icon-qingkong"></i>
        <span class="clear-text">清空</span>
      </div> -->
      <div class="cart-delete" @click="cartDelete">
        <i class="iconfont icon-qingkong1"></i>
        <span class="delete-text">删除</span>
      </div>
    </van-submit-bar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { cart } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      checked: true,
      checkedArr: [],
      checkedAll: true,
      list: [],
      pages: {},
      loading: false,
      finished: true,
      // 物资详情
      showBase: false,
      sku: {
        tree: [],
        price: "0.00", // 默认价格（单位元）
        // stock_num: 0, // 商品总库存
        // collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        id: "",
        sid: "",
        title: "", // 页面标题
        picture: "", // 默认商品 sku 缩略图
        brand: "",
        info: "",
        unit: "",
        shop: "",
        taxRate: "",
        taxAll: ""
      }
    };
  },
  methods: {
    getCart(nStartPos = 0) {
      cart.getList(this.projectInfo.SC_ProjectOID, nStartPos).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            const list = eval(sp[0].split("=")[1]);
            const arr = [];
            list.forEach(val => {
              if (val[32]) {
                val[32] = val[32].replace("~", this.servePath);
              } else {
                val[32] =
                  this.servePath +
                  "/SupplyChain/Images/MaterialType/default.jpg";
              }
              val[34] = true;
              val[35] = true;
              arr.push(val[0]);
            });
            this.pages = eval("(" + sp[1].split("=")[1] + ")");
            this.loading = false;
            this.finished = this.pages.RecordCount <= nStartPos;
            this.checkedArr = this.checkedArr.concat(arr);
            this.list = this.list.concat(list);
          }
        } catch (e) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    // 滚动加载
    onLoad() {
      this.getCart(this.list.length);
    },
    // 清空购物车
    cartClear() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认清空购物车所有物资？"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    // 购物车删除
    cartDelete() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除购物车已选物资？"
        })
        .then(() => {
          let str = "";
          this.checkedArr.forEach(val => {
            str += val + "|";
          });
          str = str.substr(0, str.length - 1);
          // 多个删除
          cart.delCartMaterials(str).then(res => {
            try {
              if (res.status === 1 && res.text === "True") {
                this.$toast.success("选择的物资都已删除");
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.getCart();
                  }, 1000);
                });
              } else {
                this.$toast.fail("删除失败，请刷新页面重试");
              }
            } catch (e) {
              this.$toast.fail("删除失败，请刷新页面重试");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 选中物资
    onSelectItem() {
      console.log(this.checkedArr);
    },
    // 全选物资
    onSelectAll(res) {
      if (res) {
        this.list.forEach(val => {
          this.checkedArr.push(val[0]);
        });
      } else {
        this.checkedArr = [];
      }
    },
    // 找同款
    searchSame(name) {
      console.log(name);
      this.$store.commit("goodsParams", { keyword: name });
      this.$router.push({
        name: "goodsList"
      });
    },
    // 发起询价
    onSubmit() {},
    // 显示物资详情
    showInfo(item, index) {
      this.goods = {
        id: item[0],
        sid: item[1],
        title: item[14],
        picture: item[32].replace("~", this.servePath),
        brand: item[10],
        info: item[16],
        unit: item[15],
        shop: item[18],
        taxRate: "",
        taxAll: "",
        index: index
      };
      this.showBase = true;
      // console.log(item);
    },
    // 删除物资
    onDeleteItem(id, i) {
      cart.delCartMaterials(id).then(res => {
        try {
          if (res.status === 1 && res.text === "True") {
            this.$toast.success("物资已删除");
            this.list.splice(i, 1);
            this.$nextTick().then(() => {
              setTimeout(() => {
                this.getCart();
              }, 1000);
            });
          } else {
            this.$toast.fail("删除失败，请刷新页面重试");
          }
        } catch (e) {
          this.$toast.fail("删除失败，请刷新页面重试");
        }
      });
    }
  },
  computed,
  mounted() {
    this.$nextTick().then(() => {
      if (this.projectInfo.SC_ProjectOID) {
        this.$parent.title = this.projectInfo.ProjectName;
        this.getCart();
      } else {
        this.finished = true;
        this.$toast.fail("请先点击屏幕右上角按钮，选择项目");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  background-color: #fff !important;
  .van-list {
    margin-bottom: 110px;
    .cart-item {
      padding-left: 10px;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      display: flex;
      align-items: center;
      .item-check {
        overflow: inherit;
      }
      .van-card {
        background-color: #fff;
        overflow: hidden;
      }
    }
    .left {
      color: #ffffff;
      font-size: 15px;
      width: 65px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      color: #ffffff;
      font-size: 15px;
      width: 65px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f44;
    }
  }
  // 订单提交栏
  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 20px;
      background-color: #fff;
    }
    .cart-delete {
      margin-left: 25px;
      .iconfont {
        color: #333;
        font-size: 18px;
      }
      .delete-text {
        font-size: 14px;
        color: #333;
        padding-left: 5px;
      }
    }
    .cart-clear {
      padding-left: 15px;
      .iconfont {
        color: #333;
        font-size: 18px;
      }
      .clear-text {
        color: #333;
        padding-left: 5px;
      }
    }
  }
}
</style>
<style lang="less">
.cart {
  .van-submit-bar__bar {
    .van-button__text,
    .van-checkbox__label {
      font-size: 14px !important;
    }
  }
}
</style>

