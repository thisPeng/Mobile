<template>
  <!-- 清单详情 -->
  <div class="inventory">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :price="item[14]" :num="item[11]" :desc="item[8]">
            <!-- <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="arrivalDelete(item[0])">删除</van-button>
            </div> -->
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'品名： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-cell :title="'实际数量：' + goods.taxAll" :label="'赠送数量：' + goods.shop" />
          <van-cell :title="'单位：' + goods.taxRadio + '%'" :label="'实价：' + goods.howMuch" />
          <van-cell :title="'小计： ' + goods.taxRate" :label="'税率：' + goods.howMoney" />
          <!-- <van-field label="小计：" v-model="goods.taxRate" type="number" required placeholder="请输入订购数量" /> -->
          <van-field label="备注：" v-model="goods.reMarks" disabled/>
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <!-- <van-button type="primary" bottom-action>保存修改</van-button> -->
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      item: [],
      search: "",
      list: [],
      showBase: false,
      loading: false,
      finished: false,
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
        reMarks: ""
      }
    };
  },
  computed,
  methods: {
    showInfo(item) {
      this.sku.price = item[15];
      this.goods = {
        id: item[23],
        sid: item[19],
        title: item[4],
        // picture: item[23],
        brand: item[4],
        // info: item[23],
        unit: item[8],
        shop: item[12],
        taxRate: item[15],
        taxAll: item[11],
        howMuch: item[14],
        howMoney: item[16],
        taxRadio: item[28],
        reMarks: item[19]
      };
      this.showBase = true;
      // console.log(item);
    },
    getData() {
      offer.getContractDetail(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.inventory {
  width: 100%;
  .inquiry-data {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .inquiry-list {
      width: 100%;
      padding: 0 10px;
      .list-item {
        background-color: #fff;
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
