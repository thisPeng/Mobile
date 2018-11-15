<template>
  <div class="cart">
    <div class="cart-list">
      <div class="van-cell van-cell--borderless van-field" v-if="userInfo.oid">
        <div class="van-cell__title">工程名称：</div>
        <div class="van-cell__value flex-between">
          <span class="text-truncate text-left text-gray">{{projectInfo.ProjectName || '请选择工程项目'}}</span>
          <van-button type="primary" size="mini" @click="$router.push({ name: 'projectList' })">选择</van-button>
        </div>
      </div>
      <van-cell v-else title="未登录账号" value="" @click="$router.push({ name: 'login' })" icon="setting" is-link />

      <!--列表-->
      <van-checkbox-group v-model="checkedArr">
        <div class="list-item" v-for="(ite, idx) in listOrder" :key="idx">
          <van-cell-group>
            <van-cell class="text-bold" :title="ite.name">
              <template slot="title">
                <div @click="jumpSupp(ite)">{{ite.name}}</div>
              </template>
              <template slot="right-icon">
                <van-switch v-model="ite.checked" size="26px" @change="onSwitechSupp(idx)" />
              </template>
            </van-cell>
          </van-cell-group>
          <div v-show="ite.checked">
            <van-swipe-cell :right-width="65" v-for="(item,index) in ite.list" :key="index">
              <div class="cart-item">
                <van-checkbox :name="item" class="item-check" ref="checked"></van-checkbox>
                <van-card :desc="item[16] + ' | 单位：' + item[15]">
                  <div slot="thumb" @click.stop="onShowInfo(item,index)">
                    <img :src="item[32]" class="van-card__img">
                  </div>
                  <div slot="title" class="van-card__row" @click.stop="onShowInfo(item,index)">
                    <div class="van-card__title">{{item[14]}}</div>
                    <div class="van-card__price">{{'￥ '+item[19]}}</div>
                  </div>
                  <div slot="footer">
                    <van-stepper v-model="item[3]" :integer="true" @change="onChangNumber(item)" />
                  </div>
                </van-card>
              </div>
              <span slot="right" class="right" @click="onDeleteItem(item[0])">删除</span>
            </van-swipe-cell>
          </div>
        </div>
      </van-checkbox-group>
    </div>

    <!--商品详情-->
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock" @buy-clicked="onSearchSame(goods.title)">
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
    <!-- <van-submit-bar :button-text="" @submit="onSubmit">
      <van-checkbox v-model="checkedAll" ref="checkedAll" @change="onSelectAll">全选</van-checkbox>
      <div class="cart-delete" @click="onCartDelete">
        <i class="iconfont icon-qingkong1"></i>
        <span class="delete-text">删除</span>
      </div>
    </van-submit-bar> -->

    <div class="van-submit-bar">
      <div class="van-submit-bar__bar">
        <van-checkbox v-model="checkedAll" ref="checkedAll" @change="onSelectAll">全选</van-checkbox>
        <div class="cart-delete" @click="onCartDelete">
          <i class="iconfont icon-qingkong1"></i>
          <span class="delete-text">删除</span>
        </div>
        <div class="van-submit-bar__text"></div>
        <van-button type="primary" @click="jumpPage">添加物资</van-button>
        <van-button type="danger" class="margin-right-xs">{{checkedArr.length > 999 ? '询价(999+)' : '询价('+checkedArr.length+')'}}</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { cart } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      checkedArr: [],
      checkedAll: false,
      list: [],
      listOrder: [],
      pages: {},
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
    getCart() {
      cart.getList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          const sp = res.text.split(";");
          const list = eval(sp[0].split("=")[1]);
          const arr = [];
          const listOrder = [];
          let tmp = "";
          // 供应商分组
          list.forEach(val => {
            if (val[17] !== tmp) {
              listOrder.push({
                id: val[17],
                name: val[18],
                checked: false,
                list: []
              });
              listOrder[listOrder.length - 1].list.push(val);
              tmp = val[17];
            } else {
              listOrder[listOrder.length - 1].list.push(val);
            }
            // 默认图片路径
            if (val[32]) {
              val[32] = val[32].replace("~", this.servePath);
            } else {
              val[32] =
                this.servePath + "/SupplyChain/Images/MaterialType/default.jpg";
            }
            if (val[23] == "1") {
              arr.push(val);
              listOrder[listOrder.length - 1].checked = true;
            }
          });
          this.list = list;
          this.listOrder = listOrder;
          this.checkedArr = arr;
          this.pages = eval("(" + sp[1].split("=")[1] + ")");
        } catch (e) {
          this.list = [];
          this.listOrder = [];
          this.checkedArr = [];
        }
      });
    },
    jumpPage() {
      if (this.projectInfo.SC_ProjectOID) {
        this.$router.push({ name: "classify" });
      } else {
        this.$toast.fail("请选择项目");
      }
    },
    jumpSupp(item) {
      this.$store.commit("suppParams", { id: item.id });
      this.$router.push({
        name: "supplierInfo"
      });
    },
    // 供应商开关
    onSwitechSupp(i) {
      const listOrder = this.listOrder[i];
      if (listOrder.checked) {
        // 并集
        this.checkedArr = Array.from(
          new Set([...this.checkedArr, ...listOrder.list])
        );
      } else {
        // 差集
        const sArr = new Set(listOrder.list);
        this.checkedArr = this.checkedArr.filter(x => !sArr.has(x));
      }
    },
    // 勾选物资项
    /*
    onChangeItem(arr) {
      let item = [];
      if (arr.length > this.list.length) {
        const sArr = new Set(this.list);
        item = arr.filter(x => !sArr.has(x));
        item[0][23] = "1";
        this.list = arr;
      } else if (arr.length < this.list.length) {
        const sArr = new Set(arr);
        item = this.list.filter(x => !sArr.has(x));
        item[0][23] = "0";
        this.list = arr;
      }
      if (item.length !== 1) {
        return;
      }
      const xmlString = "<root>" + this.xmlString(item[0]) + "</root>";
      cart.saveCart(xmlString).then(res => {
        if (res.status !== 1) {
          this.$toast.fail("勾选失败");
        }
      });
    },
    */
    // 修改数量
    onChangNumber(item) {
      const xmlString = "<root>" + this.xmlString(item) + "</root>";
      cart.saveCart(xmlString).then(res => {
        if (res.status !== 1) {
          this.$toast.fail("修改失败");
        }
      });
    },
    // 拼接XML
    xmlString(item) {
      const xml = require("xml");
      return xml([
        {
          BC_SC_IntentionSKU: [
            { _attr: { UpdateKind: "ukModify" } },
            { SC_IntentionSKUOID: item[0] }
          ]
        },
        {
          BC_SC_IntentionSKU: [
            { _attr: { UpdateKind: "" } },
            { SC_IntentionSKUOID: "null" },
            { Order_Qty: item[3] },
            { Remark: "null" },
            { SKU_Status: item[23] },
            { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
            { SYS_LAST_UPD_BY: this.userInfo.oid }
          ]
        }
      ]);
    },
    // 购物车删除
    onCartDelete() {
      if (this.checkedArr.length > 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除购物车已选物资？"
          })
          .then(() => {
            let str = this.checkedArr.join("|");
            // 多个删除
            cart.delCartMaterials(str).then(res => {
              try {
                if (res.status === 1 && res.text == "True") {
                  this.$toast.success("已删除");
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
      }
    },
    // 全选物资
    onSelectAll(res) {
      this.listOrder.forEach(val => {
        val.checked = res;
      });
    },
    // 找同款
    onSearchSame(name) {
      this.$store.commit("goodsParams", { keyword: name });
      this.$router.push({
        name: "goodsList"
      });
    },
    // 发起询价
    onSubmit() {
      if (this.checkedArr.length === 0) {
        this.$toast.fail("请选择需要询价的物资");
        return;
      }
      this.saveCart();
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认提交[" + this.checkedArr.length + "]个物资询价？"
        })
        .then(() => {
          cart
            .addOrder(
              this.projectInfo.PartnerID,
              this.projectInfo.SC_ProjectOID
            )
            .then(result => {
              try {
                if (result.status === 1) {
                  const res = JSON.parse(result.text)[0];
                  if (res.iReturn == "1") {
                    this.$toast.success("提交成功");
                    this.$nextTick().then(() => {
                      setTimeout(() => {
                        this.getCart();
                      }, 1000);
                    });
                    return;
                  }
                }
                throw "提交失败，请刷新页面重试";
              } catch (e) {
                this.$toast.fail(e);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 显示物资详情
    onShowInfo(item, index) {
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
    },
    // 删除物资
    onDeleteItem(id) {
      cart.delCartMaterials(id).then(res => {
        try {
          if (res.status === 1 && res.text == "True") {
            this.$toast.success("已删除");
            this.$nextTick().then(() => {
              setTimeout(() => {
                this.getCart();
              }, 1000);
            });
          } else {
            throw "删除失败，请刷新页面重试";
          }
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    // 页面初始化
    pageInit() {
      this.getCart();
    },
    // 保存购物车选择
    saveCart() {
      let str = "";
      if (this.checkedArr.length === this.list.length) {
        str = "-1";
      } else {
        const arr = [];
        this.checkedArr.forEach(val => {
          arr.push(val[0]);
        });
        str = arr.join("|");
      }
      cart.cartSelect(this.projectInfo.SC_ProjectOID, str);
    }
  },
  computed,
  mounted() {
    this.pageInit();
  },
  beforeDestroy() {
    this.saveCart();
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  overflow: hidden !important;
  .cart-list {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 100px;
    .project {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    .cart-project {
      width: 100%;
      margin: 30px 0;
      text-align: center;
    }
    .list-item {
      border-bottom: 5px solid #f6f6f6;
    }
    .cart-item {
      padding-left: 10px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      display: flex;
      align-items: center;
      .item-check {
        overflow: inherit;
      }
      .van-card {
        width: 100%;
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

