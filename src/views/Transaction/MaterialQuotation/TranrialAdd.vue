<template>
  <div class="supplie-type">
    <van-search placeholder="搜物资、找品牌" v-model="keyword" @search="onSearch" @cancel="filterReset" show-action />

    <div class="left">
      <div class="van-hairline--top-bottom van-badge-group">
        <div :class="activeKey === index ? 'van-badge van-hairline van-badge--select' : 'van-badge van-hairline'" v-for="(item, index) in typeList" :key="index" @click="selectKey(index)">
          {{item.MaterialName}}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="flex-span">
        <div class="flex-1" @click="orderList">单价
          <i class="iconfont icon-paixu" v-show="priceDesc === ''" />
          <i class="iconfont icon-paixu-shang" v-show="priceDesc === false"></i>
          <i class="iconfont icon-paixu-xia" v-show="priceDesc === true"></i>
        </div>
        <div class="flex-1" @click="screenShow=true">筛选
          <i class="iconfont icon-shaixuanxuanzhong"></i>
        </div>
      </div>
      <div class="classify-list" id="classifyList">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
          <div class="list-item" v-for="(item, index) in goodsList" :key="index">
            <van-card :title="item[22]">
              <div slot="thumb" @click.stop="showInfo(item)">
                <img :src="item[41].replace('~',servePath)" class="van-card__img">
              </div>
              <div slot="title" class="van-card__title" @click="showInfo(item)">
                <div class="title">{{item[22]}}</div>
                <div class="price">{{item[5] ? '￥ ' + item[5] : '工程价'}}</div>
              </div>
              <div slot="desc" @click="showInfo(item)">
                <div class="van-card__desc">{{item[28] + ' | 单位：' + item[23]}}</div>
                <div class="item-brand" v-if="projectInfo.SC_ProjectOID != item[49]">
                  <van-tag plain type="success">品牌：{{item[24]}}</van-tag>
                </div>
              </div>
              <div slot="footer" v-if="suppParams.oid">
                <i class="iconfont icon-add" @click.stop="addOrder(item)"></i>
              </div>
            </van-card>
          </div>
        </van-list>
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
            <van-cell :title="'品牌： '+ goods.brand" :label="goods.info + '| 单位：' + goods.unit" />
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
            <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')" v-if="suppParams.oid">加入询价单</van-button>
          </div>
        </template>
      </van-sku>
    </div>
    <van-popup v-model="screenShow" position="right">
      <div class="screen">
        <div class="screen-filter">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="分类" name="1">
              <span class="filter-item" v-for="(item, index) in filterList" :key="index">
                <van-button @click="filterGoods(item, index)" :disabled="filterActive === index ? true : false">{{item.MaterialName}}</van-button>
              </span>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="screen-button">
          <van-button type="primary" size="large" @click="filterReset">重 置</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { classify } from "./../../../assets/js/api.js";

export default {
  data() {
    return {
      activeNames: ["1"],
      priceDesc: "",
      screenShow: false,
      keyword: "",
      activeKey: 0,
      typeList: [],
      filterList: [],
      goodsList: [],
      pages: {},
      loading: false,
      finished: false,
      suppActive: 0,
      filterActive: "",
      SQLFix: "",
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
    // 滚动加载
    onLoad() {
      const i = this.activeKey;
      classify
        .getSuppGoods(
          "",
          this.typeList[i].SupplierID,
          this.typeList[i].SC_SMaterialTypeOID,
          this.keyword,
          this.SQLFix,
          this.goodsList.length
        )
        .then(res => {
          try {
            if (res.status === 1) {
              const sp = res.text.split("[[");
              const tsp = sp[1].split("]]");
              let arr = [];
              arr = eval("[[" + tsp[0] + "]]");
              this.pages = eval(
                "(" + tsp[1].split("=")[1].replace(";", "") + ")"
              );
              this.goodsList = this.goodsList.concat(arr);
              this.loading = false;
              this.finished = this.pages.RecordCount <= this.goodsList.length;
            }
          } catch (e) {
            this.loading = false;
            this.finished = true;
          }
        });
    },
    // 物资排序
    orderList() {
      try {
        const i = this.activeKey;
        this.priceDesc = !this.priceDesc;
        this.SQLFix = " ORDER BY Price ";
        this.SQLFix += this.priceDesc ? "DESC" : "ASC";
        this.getSuppGoodsList(
          this.typeList[i].SupplierID,
          this.typeList[i].SC_SMaterialTypeOID
        );
      } catch (e) {
        console.log(e);
      }
    },
    // 搜索
    onSearch() {
      const i = this.activeKey;
      this.priceDesc = !this.priceDesc;
      this.SQLFix = " ORDER BY Price ";
      this.SQLFix += this.priceDesc ? "DESC" : "ASC";
      this.getSuppGoodsList(
        this.typeList[i].SupplierID,
        this.typeList[i].SC_SMaterialTypeOID
      );
      this.screenShow = false;
    },
    // 选择分类
    selectKey(i) {
      this.activeKey = i;
      this.filterActive = "";
      this.getSuppGoodsList(
        this.typeList[i].SupplierID,
        this.typeList[i].SC_SMaterialTypeOID
      );
      // 获取二级分类
      this.getSuppType(false, this.typeList[i].SC_SMaterialTypeOID);
    },
    // 过滤分类
    filterGoods(item, index) {
      this.filterActive = index;
      this.getSuppGoodsList(item.SupplierID, item.SC_SMaterialTypeOID);
      this.screenShow = false;
    },
    // 重置过滤
    filterReset() {
      this.suppActive = "";
      this.filterActive = "";
      this.getSuppType();
      this.screenShow = false;
      this.loading = false;
      this.finished = false;
    },
    // 获取分类商品
    getSuppGoodsList(id = "", pid = "") {
      classify
        .getSuppGoods("", id, pid, this.keyword, this.SQLFix)
        .then(res => {
          try {
            if (res.status === 1) {
              document.querySelector("#classifyList").scrollTop = 0;
              const sp = res.text.split("[[");
              const tsp = sp[1].split("]]");
              let arr = [];
              arr = eval("[[" + tsp[0] + "]]");
              this.pages = eval(
                "(" + tsp[1].split("=")[1].replace(";", "") + ")"
              );
              this.goodsList = arr;
              this.loading = false;
              this.finished = false;
            }
          } catch (e) {
            this.goodsList = [];
            this.loading = false;
            this.finished = false;
          }
        });
    },
    // 获取供应商分类
    getSuppType(isLoad = true, fk = "") {
      classify.getSupplierType(this.suppParams.id, fk).then(res => {
        try {
          if (res.status === 1) {
            const arr = JSON.parse(res.text);
            if (isLoad) {
              this.typeList = arr;
              this.selectKey(0);
            } else {
              this.filterList = arr;
            }
          }
        } catch (e) {
          this.goodsList = [];
          this.typeList = [];
          this.filterList = [];
        }
      });
    },
    // 添加物资到询价单
    onBuyClicked() {
      if (this.suppParams.oid) {
        const params = {
          OIDCheckList: this.goods.id,
          PartnerID: this.userId.UCML_OrganizeOID,
          ProjectID: this.projectInfo.SC_ProjectOID || "",
          DemandID: this.projectInfo.DemandID || this.confirmParams[24],
          SupplierID: this.suppParams.id,
          PurchaseOrderID: this.suppParams.oid,
          IsDel: false
        };
        classify.addCartForOrder(params).then(res => {
          try {
            if (res.status === 1 && res.text == "1") {
              this.$toast.success("添加成功，请到询价单物资列表修改数量");
              this.showBase = false;
              return;
            } else if (res.status === 1 && res.text == "-1") {
              throw "供应商未通过审核，添加物资失败";
            }
            throw "添加失败，请刷新页面后重试";
          } catch (e) {
            this.$toast.fail(e);
          }
        });
      }
    },
    // 添加物资-询价单
    addOrder(item) {
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
        taxAll: item[32]
      };
      this.showBase = true;
    },
    pageInit() {
      this.getSuppType();
    }
  },
  computed,
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.supplie-type {
  width: 100%;
  overflow: hidden !important;
  .supplie-info {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-top: 1px solid #eee;
    .info-left {
      display: flex;
      .info-img {
        display: flex;
        align-items: center;
        height: 50px;
        img {
          height: 100%;
        }
      }
      .info-text {
        padding: 5px 0;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .text-name {
          font-size: 14px;
          font-weight: 600;
        }
        .text-address {
          color: #666;
          font-size: 12px;
        }
      }
    }
    .info-right {
      display: flex;
      align-items: center;
      .van-tag {
        width: 60px;
      }
    }
  }
  .left {
    width: 25%;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
    top: 50px;
    left: 25%;
    right: 0;
    bottom: 0;
    // overflow-y: auto;
    z-index: 102;
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
    .classify-list {
      width: 100%;
      padding: 0 10px;
      position: absolute;
      top: 35px;
      bottom: 0;
      z-index: 103;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      background-color: #f6f6f6;
      .list-item {
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
        .filter-title {
          width: 100%;
          padding: 10px 0;
          color: #333;
          font-weight: 600;
          text-align: center;
          border-bottom: 1px solid #eee;
        }
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