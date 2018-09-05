<template>
<!-- 发货单明细 -->
  <div class="deliveryDetail">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[9]" :desc="item[10]">
            <!-- <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="conDetailsDelete(item)">删除</van-button>
            </div> -->
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'产品名称： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-cell :title="'单位： ' + goods.taxRate" :label="'订单数量：' + goods.taxAll" />
          <van-cell :title="'赠送数量： ' + goods.taxbrand" :label="'发货数量：' + goods.taxunit" />
          <van-cell :title="'实价 ' + goods.howMuch" :label="'金额：' + goods.howMoney" />
          <van-cell :title="'税率：' + goods.taxRadio + '%'" />
          <van-field label="备注：" v-model="goods.reMarks" disabled />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!--直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
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
      list: [],
      item: [],
      search: "",
      dspList: [],
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
        taxRate: "",
        taxAll: "",
        howMuch: "",
        howMoney: "",
        taxRadio: "",
        taxbrand: "",
        taxunit: "",
        reMarks: ""
      }
    };
  },
  computed,
  methods: {
    getData() {
      offer.getDeliveryDetail(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[2].split(";");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    showInfo(item) {
      this.sku.price = item[18];
      this.goods = {
        id: item[9],
        sid: item[9],
        title: item[9],
        picture: item[9],
        brand: item[9],
        unit: item[10],
        taxRate: item[11],
        taxAll: item[10],
        howMuch: item[17],
        howMoney: item[18],
        taxRadio: item[19],
        taxbrand: item[15],
        taxunit: item[16],
        reMarks: item[21]
      };
      this.showBase = true;
      // console.log(item);
    }
  }, //methods
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.deliveryDetail {
  width: 100%;
}
</style>
