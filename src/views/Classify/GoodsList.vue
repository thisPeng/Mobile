<template>
  <div class="classify">
    <div class="classify-search">
      <van-search placeholder="请输入商品名称" v-model="keyword" @search="onSearch" @cancel="filterReset" />
      <div class="flex-span">
        <div class="flex-1" @click="orderList('price')">单价
          <i class="iconfont icon-paixu-shang" v-show="!priceDesc"></i>
          <i class="iconfont icon-paixu-xia" v-show="priceDesc"></i>
        </div>
        <div class="flex-1" @click="orderList('taxRate')">税率
          <i class="iconfont icon-paixu-shang" v-show="!taxRateDesc"></i>
          <i class="iconfont icon-paixu-xia" v-show="taxRateDesc"></i>
        </div>
        <div class="flex-1" @click="screenshow=true">筛选
          <i class="iconfont icon-shaixuanxuanzhong"></i>
        </div>
      </div>
    </div>
    <div class="classify-data">
      <div class="classify-list">
        <div v-for="(item, index) in goodsList" :key="index" @click="showInfo(item)">
          <van-card :title="item[22]" :desc="item[28]" :price="item[5]" :thumb="item[41].replace('~',servePath)" />
        </div>
        <van-sku v-model="showBase" :sku="sku" />
        <!-- <div class="classify-item" v-for="(item, index) in goodsList" :key="index">
          <div class="item-title">
            <span class="title">材料名称：{{item[22]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>品牌名称：{{item[22]}}</span>
            </div>
            <div class="content-row">
              <span>{{item[28]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单位：{{item[23]}}</span>
              <span class="row-right">单价：{{item[5]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">是否含税：{{item[4] ? '是' : '否'}}</span>
              <span class="row-right">税率：{{item[20]}}</span>
            </div>
            <div class="content-row">
              <span>可开票税率：{{item[32]}}</span>
            </div>
          </div>
        </div> -->
      </div>
      <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getGoodsList" />
    </div>
    <van-popup v-model="screenshow" position="right">
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
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      params: { SQLCondi: "", SQLFix: "" },
      keyword: "",
      searchSql: " and smt.SPUName LIKE '%%'",
      BrandName: "",
      SKUList: "",
      activeNames: [],
      screenshow: false,
      filterList: [],
      goodsList: [],
      curPage: 1,
      pages: {},
      priceDesc: false,
      taxRateDesc: true,
      // 物资详情
      showBase: false,
      sku: {}
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
    // 获取物资种类
    getGoodsFilter() {
      const params = {
        MaterialTypeID: this.goodsParams,
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
          // console.log(filterList);
          this.filterList = filterList;
        }
      });
    },
    // 显示物资详情
    showInfo(item) {
      this.showBase = true;
      console.log(item);
    },
    // 获取物资列表
    getGoodsList() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      let SQLCondi = this.params.SQLCondi;
      if (SQLCondi.indexOf(this.searchSql) > 0) {
        const str = " and smt.SPUName LIKE '%" + this.keyword + "%'";
        this.params.SQLCondi = SQLCondi.replace(this.searchSql, str);
        this.searchSql = str;
      } else {
        this.params.SQLCondi += this.searchSql;
      }

      classify.getGoodsList(this.params, page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.goodsList = eval(sp[0].split("=")[1] + "]]");
            this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
            this.getGoodsFilter();
            console.log(this.goodsList);
          }
        } catch (e) {
          this.filterList = [];
          this.goodsList = [];
          this.pages = {};
          // console.log(e);
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
          this.params.SQLCondi += " and BrandName='" + val + "'";
        } else {
          this.SKUList += type + " : " + val + "|";
          this.params.SQLCondi +=
            " and CHARINDEX('" + type + " : " + val + "',SKUUnionIDS)>0 ";
        }
      }
      this.getGoodsList();
    },
    // 重置过滤选项
    filterReset() {
      this.searchSql = " and smt.SPUName LIKE '%%'";
      this.keyword = this.BrandName = this.SKUList = "";
      this.curPage = 1;

      const params = {
        SQLCondi:
          "(SC_Supp_ProductSKU.SC_MaterialType_FK = '" +
          this.goodsParams +
          "' or SC_Supp_ProductSKU.Parent_MaterialType = '" +
          this.goodsParams +
          "')",
        SQLFix: " ORDER BY Price ASC, TaxRate DESC"
      };
      this.params = params;
      this.getGoodsList();
    }
  },
  computed,
  mounted() {
    const params = {
      SQLCondi:
        "(SC_Supp_ProductSKU.SC_MaterialType_FK = '" +
        this.goodsParams +
        "' or SC_Supp_ProductSKU.Parent_MaterialType = '" +
        this.goodsParams +
        "')",
      SQLFix: " ORDER BY Price ASC, TaxRate DESC"
    };
    this.params = params;
    this.getGoodsList();
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
    top: 75px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    .classify-list {
      width: 100%;
      padding: 0 10px;
      .classify-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
            .row-left {
              flex: 1;
            }
            .row-right {
              flex: 1;
            }
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

  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
