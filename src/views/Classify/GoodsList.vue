<template>
  <div class="classify">
    <div class="van-cell van-cell--borderless van-field" v-if="userInfo.oid">
      <div class="van-cell__title">工程名称：</div>
      <div class="van-cell__value flex-between">
        <span class="text-truncate text-left text-gray">{{projectInfo.ProjectName || '请选择工程项目'}}</span>
        <van-button type="primary" size="mini" @click="$router.push({ name: 'projectList' })">选择</van-button>
      </div>
    </div>
    <van-cell v-else title="未登录账号" value="" @click="$router.push({ name: 'login' })" icon="setting" is-link />

    <div class="classify-search">
      <van-search placeholder="搜物资、找品牌" v-model="keyword" @search="onSearch" @cancel="filterReset" show-action />
      <div class="flex-span">
        <div class="flex-1" @click="orderList('price')">单价
          <i class="iconfont icon-paixu" v-show="priceDesc === ''" />
          <i class="iconfont icon-paixu-shang" v-show="priceDesc === false"></i>
          <i class="iconfont icon-paixu-xia" v-show="priceDesc === true"></i>
        </div>
        <div class="flex-1" @click="orderList('taxRate')">税率
          <i class="iconfont icon-paixu" v-show="taxRateDesc === ''" />
          <i class="iconfont icon-paixu-shang" v-show="taxRateDesc === false"></i>
          <i class="iconfont icon-paixu-xia" v-show="taxRateDesc === true"></i>
        </div>
        <div class="flex-1" @click="screenShow=true">筛选
          <i class="iconfont icon-shaixuanxuanzhong"></i>
        </div>
      </div>
    </div>
    <div class="classify-data">
      <div class="classify-list">
        <div class="list-item" v-for="(item, index) in goodsList" :key="index">
          <van-card :title="item[22]" :desc="item[28] + ' | 单位：' + item[23]">
            <div slot="thumb" @click.stop="showInfo(item)">
              <img :src="item[41].replace('~',servePath)" class="van-card__img">
            </div>
            <div slot="title" class="van-card__title" @click="showInfo(item)">
              <div class="title">{{item[22]}}</div>
              <div class="price">{{item[5] ? '￥ ' + item[5] : '工程价'}}</div>
            </div>
            <div slot="desc" @click="showInfo(item)">
              <div class="van-card__desc">{{item[28] + ' | 单位：' + item[23]}}</div>
              <div class="item-brand">
                <van-tag plain type="success">品牌：{{item[24]}}</van-tag>
              </div>
            </div>
            <div slot="footer" v-if="userType != 3 && projectInfo.SC_ProjectOID">
              <van-stepper v-model="item[48]" :integer="true" @change="onChangNumber(item)" v-if="projectInfo.SC_ProjectOID == item[49]" />
              <i class="iconfont icon-add" @click.stop="addCart(item)" v-else></i>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-popup v-model="screenShow" position="right">
      <div class="screen">
        <div class="screen-filter">
          <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(item, index) in filterList" :key="index" :title="item.sku_name" :name="index">
              <span class="filter-item" v-for="(ite, idx) in item.sku_arr" :key="idx">
                <van-button :disabled="item.sku_arr.length === 1" v-if="ite.id" @click="itemActive(item.sku_name, ite.val, ite.id)">{{ite.val}}</van-button>
                <van-button :disabled="item.sku_arr.length === 1" v-else @click="itemActive(item.sku_name, ite)">{{ite}}</van-button>
              </span>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click="filterReset">重 置</van-button>
        </div>
      </div>
    </van-popup>
    <!--购物车-->
    <div class="cart-icon" @click="jumpCart" v-if="projectInfo.SC_ProjectOID">
      <div class="icon-number">{{cartPages.RecordCount}}</div>
      <i class="iconfont icon-gouwuchekong"></i>
    </div>
    <!--商品详情-->
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked">
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol" v-if="props.price > 0">￥</span>
          <span class="van-sku__price-num">{{props.price > 0 ? props.price : '工程价'}}</span>
        </div>
      </template>
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'品牌： ' + goods.brand" :label="goods.info + '| 单位：' + goods.unit" />
          <van-cell :title="'税率：' + goods.taxRate + '%'" :label="'可开票税率：' + goods.taxAll" />
          <van-cell :title="'供应商：' + goods.shop" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="onCartDelete" v-if="goods.isCart">移出购物车</van-button>
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')" v-else-if="userType != 3 && projectInfo.SC_ProjectOID">加入购物车</van-button>
        </div>
      </template>
    </van-sku>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" force-ellipses class="classify-pages" @change="getGoodsList" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify, cart } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      params: { SQLCondi: "1=1 ", SQLFix: "", keyword: "" },
      keyword: "",
      BrandName: "",
      SKUList: "",
      activeNames: [],
      screenShow: false,
      filterList: [],
      goodsList: [],
      curPage: 1,
      pages: {},
      priceDesc: "",
      taxRateDesc: "",
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
        taxAll: "",
        isCart: false
      },
      cartList: [],
      cartPages: []
    };
  },
  methods: {
    // 搜索
    onSearch(res) {
      if (res) {
        this.curPage = 1;
        this.getGoodsList();
      } else {
        this.filterReset();
      }
    },
    // 修改数量
    onChangNumber(item) {
      cart.getIntentionSKU(item[0]).then(result => {
        try {
          if (result.status) {
            const sp = result.text.split(";");
            let tmp = eval(sp[0].split("=")[1])[0];
            tmp[3] = item[48];
            const xmlString = "<root>" + this.xmlString(tmp) + "</root>";
            cart.saveCart(xmlString).then(res => {
              if (res.status !== 1) {
                this.$toast.fail("保存失败，请重试");
              }
            });
            return;
          }
          throw "修改失败，请重试";
        } catch (e) {
          this.$toast.fail(e);
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
      cart.getIntentionSKU(this.goods.id).then(result => {
        try {
          if (result.status) {
            const sp = result.text.split(";");
            const tmp = eval(sp[0].split("=")[1])[0];
            cart.delCartMaterials(tmp[0]).then(res => {
              try {
                if (res.status === 1 && res.text == "True") {
                  this.getCartList().then(ress => {
                    if (ress) {
                      let goodsList = this.goodsList;
                      for (const i in goodsList) {
                        if (goodsList[i][0] == this.goods.id) {
                          goodsList[i][48] = 0;
                          goodsList[i][49] =
                            "00000000-0000-0000-0000-000000000000";
                          break;
                        }
                      }
                      this.goodsList = [];
                      this.goodsList = goodsList;
                      this.showBase = false;
                      this.$toast.success("已移除购物车");
                    } else location.reload();
                  });
                } else {
                  this.$toast.fail("删除失败，请刷新页面重试");
                }
              } catch (e) {
                this.$toast.fail("删除失败，请刷新页面重试");
              }
            });
            return;
          }
          throw "修改失败，请重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    // 获取物资种类
    getGoodsFilter() {
      const params = {
        MaterialTypeID: this.goodsParams.id || "",
        BrandName: this.BrandName,
        SKUList: this.SKUList
      };
      classify.getGoodsFilter(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          const filterList = eval(sp[0]);
          let tmp = [];
          filterList.forEach(val => {
            if (val.sku_item.indexOf("|") > 0) {
              let arr = [],
                tmpArr = [];
              tmpArr = val.sku_item.split(",");
              tmpArr.forEach(v => {
                tmp = v.split("|");
                arr.push({
                  id: tmp[0],
                  val: tmp[1]
                });
              });
              val.sku_arr = arr;
            } else {
              val.sku_arr = val.sku_item.split(",");
            }
          });
          this.filterList = filterList;
        }
      });
    },
    // 添加物资到购物车
    addCart(item) {
      this.sku.price = item[5];
      this.goods = {
        id: item[0],
        sid: item[31],
        title: item[22],
        picture: item[41].replace("~", this.servePath),
        brand: item[24],
        info: item[28],
        unit: item[23],
        shop: item[36],
        taxRate: item[20],
        taxAll: item[32]
      };
      this.onBuyClicked();
    },
    // 显示物资详情
    showInfo(item) {
      this.sku.price = item[5];
      this.goods = {
        id: item[0],
        sid: item[31],
        title: item[22],
        picture: item[41].replace("~", this.servePath),
        brand: item[24],
        info: item[28],
        unit: item[23],
        shop: item[36],
        taxRate: item[20],
        taxAll: item[32],
        isCart: this.projectInfo.SC_ProjectOID == item[49]
      };
      this.showBase = true;
    },
    // 跳转购物车
    jumpCart() {
      this.$parent.active = 2;
      this.$router.replace({
        name: "cart"
      });
    },
    // 添加购物车
    onBuyClicked() {
      if (this.projectInfo.SC_ProjectOID) {
        const params = {
          OIDCheckList: this.goods.id + "|" + this.goods.sid,
          PartnerID: this.userId.UCML_OrganizeOID,
          ProjectID: this.projectInfo.SC_ProjectOID,
          DemandID: this.projectInfo.DemandID
        };
        classify.addCart(params).then(res => {
          try {
            if (res.status === 1 && res.text == "1") {
              this.getCartList().then(ress => {
                if (ress) {
                  this.$toast.success("添加物资成功");
                  let goodsList = this.goodsList;
                  for (const i in goodsList) {
                    if (goodsList[i][0] == this.goods.id) {
                      goodsList[i][48] = 1;
                      goodsList[i][49] = this.projectInfo.SC_ProjectOID;
                      break;
                    }
                  }
                  this.goodsList = [];
                  this.goodsList = goodsList;
                } else location.reload();
              });

              return;
            } else if (res.status === 1 && res.text == "-1") {
              throw "供应商未通过审核，添加物资失败";
            }
            throw "添加失败，请刷新页面后重试";
          } catch (e) {
            this.$toast.fail(e);
          }
        });
      } else {
        this.$toast.fail("请选择项目");
      }
    },
    // 获取购物车列表
    getCartList() {
      if (this.projectInfo.SC_ProjectOID) {
        return cart.getList(this.projectInfo.SC_ProjectOID).then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split(";");
              this.cartList = eval("(" + sp[0].split("=")[1] + ")");
              this.cartPages = eval("(" + sp[1].split("=")[1] + ")");
              return true;
            }
            return false;
          } catch (e) {
            console.log(e);
            return false;
          }
        });
      }
    },
    // 获取物资列表
    getGoodsList() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      this.params.keyword = this.keyword;

      return classify.getGoodsList(this.params, page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.goodsList = eval(sp[0].split("=")[1] + "]]");
            this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
            this.getGoodsFilter();
            return true;
          }
          return false;
        } catch (e) {
          this.filterList = [];
          this.goodsList = [];
          this.pages = {};
          return false;
        }
      });
    },
    // 商品排序
    orderList(type = "price") {
      this.curPage = 1;
      if (type === "price") {
        this.priceDesc = !this.priceDesc;
      } else if (type === "taxRate") {
        this.taxRateDesc = !this.taxRateDesc;
      }
      let SQLFix = " ORDER BY Price ";
      SQLFix += this.priceDesc ? "DESC" : "ASC";
      SQLFix += this.taxRateDesc ? ",TaxRate DESC" : ",TaxRate ASC";
      this.params.SQLFix = SQLFix;
      this.getGoodsList();
    },
    // 筛选项选择
    itemActive(type = "", val = "", id = "") {
      this.curPage = 1;
      if (id) {
        this.SKUList += type + " : " + id + "|";
        this.params.SQLCondi +=
          " AND SC_Supp_ProductSKU.SC_MaterialType_FK = '" + id + "'";
      } else {
        if (type === "品牌") {
          this.BrandName = val;
          this.params.SQLCondi += " AND BrandName='" + val + "'";
        } else {
          this.SKUList += type + " : " + val + "|";
          this.params.SQLCondi +=
            " AND CHARINDEX('" + type + " : " + val + "',SKUUnionIDS)>0 ";
        }
      }
      this.getGoodsList();
    },
    // 重置过滤选项
    filterReset() {
      this.keyword = this.BrandName = this.SKUList = "";
      this.curPage = 1;
      if (this.goodsParams.id) {
        const params = {
          SQLCondi:
            "(SC_Supp_ProductSKU.SC_MaterialType_FK = '" +
            this.goodsParams.id +
            "' OR SC_Supp_ProductSKU.Parent_MaterialType = '" +
            this.goodsParams.id +
            "')",
          SQLFix: ""
        };
        this.params = params;
      } else {
        this.params = {
          SQLCondi: "1=1 ",
          SQLFix: ""
        };
      }

      this.getGoodsList();
    }
  },
  computed,
  mounted() {
    if (this.$router.history.current.params.model) {
      this.$store.commit("goodsParams", "");
    } else if (this.goodsParams.id) {
      const params = {
        SQLCondi:
          "(SC_Supp_ProductSKU.SC_MaterialType_FK = '" +
          this.goodsParams.id +
          "' or SC_Supp_ProductSKU.Parent_MaterialType = '" +
          this.goodsParams.id +
          "' or SC_Supp_ProductSKU.SC_Brand_FK = '" +
          this.goodsParams.id +
          "')",
        SQLFix: ""
      };
      this.params = params;
    } else if (this.goodsParams.keyword) {
      this.keyword = this.goodsParams.keyword;
    }
    this.getGoodsList();
    this.$nextTick().then(() => {
      if (this.projectInfo.SC_ProjectOID) {
        this.getCartList();
      }
    });
  }
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  bottom: 40px !important;
  overflow: hidden !important;
  .classify-search {
    position: relative;
  }
  .classify-data {
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .classify-list {
      width: 100%;
      padding: 0 10px;
      .list-item {
        .van-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 10px;
          .van-card__title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .title {
              width: 0;
              font-size: 14px;
              flex: 9;
              word-wrap: normal;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .price {
              color: #ff4257;
              flex: 1;
            }
          }
          .item-brand {
            padding: 5px 0;
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
  .van-popup--right {
    width: 75%;
    height: 100%;
    .screen {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
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
  /* 分页 */
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  /* 购物车 */
  .cart-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 10px;
    bottom: 50px;
    background-color: #fa7815;
    border-radius: 100%;
    .icon-number {
      color: #fff;
      left: auto;
      top: 4px;
      right: 4px;
      padding: 0 0.3em;
      text-align: center;
      min-width: 1.5em;
      line-height: 1.5em;
      position: absolute;
      border-radius: 0.6em;
      box-sizing: border-box;
      background-color: #f44;
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
      font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
      font-size: 12px;
    }
    .iconfont {
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>
<style lang="less">
// .classify {
//   /* 物资列表 */
//   .van-card__desc {
//     overflow: inherit;
//     white-space: inherit;
//   }
// }
</style>

