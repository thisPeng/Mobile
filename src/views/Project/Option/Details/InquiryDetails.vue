<template>
  <!-- 询价单明细详情编辑 -->
  <div class="inquirydetails">
    <form action="/">
      <van-search v-model="search" placeholder="请输入搜索关键词" show-action />
      <!-- @search="onSearch" @cancel="onCancel" -->
    </form>
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in dspList" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :desc="item[8]">
            <div slot="footer">
              <van-button size="mini" type="danger">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'品名： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-cell :title="'赠送数量：' + goods.taxAll" :label="'单位：' + goods.shop" />
          <van-cell :title="'实价： ' + goods.howMuch" :label="'小计：' + goods.howMoney" />
          <van-field label="实际数量：" v-model="goods.taxRate" />
          <van-field label="税率(%)：" v-model="goods.taxRadio" />
          <van-field label="备注：" v-model="goods.reMarks" />
          <van-field label="产品编码：" v-model="goods.coding" disabled/>
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">保存修改</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { conprice } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      search: "",
      item: [],
      dspList: [],
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
        // info: "",
        unit: "",
        shop: "",
        taxRate: "",
        taxAll: "",
        howMuch: "",
        howMoney: "",
        taxRadio: "",
        reMarks: "",
        coding: ""
      }
    };
  },
  computed,
  methods: {
    // 询价单明细
    getDetails() {
      conprice.getDetails(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const dsp = sp[1].split(";");
          this.dspList = eval("[[" + dsp[0]);
          // console.log(this.dspList);
        }
      });
    },
    showInfo(item) {
      this.goods = {
        id: item[0],
        sid: item[4],
        title: item[4],
        picture: item[41],
        brand: item[4],
        info: item[28],
        unit: item[8],
        shop: item[28],
        taxRate: item[10],
        taxAll: item[12],
        howMuch: item[13],
        howMoney: item[15],
        taxRadio: item[16],
        reMarks: item[16],
        coding: item[16]
      };
      this.showBase = true;
      // console.log(item);
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>
<style lang="less" scoped>
.inquirydetails {
  width: 100%;
  .van-card {
    background-color: white;
  }
  .inquiry-data {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .inquiry-list {
      width: 100%;
      padding: 0 10px;
      .list-item {
        .van-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 10px;
          .item-brand {
            padding: 5px 0;
          }
          .item-price {
            color: #ff4257;
          }
        }
      }
    }
  }
}
</style>
