<template>
  <!-- 报价单明细 -->
  <div class="tranrialDetail">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :price="item[15]" :desc="item[8]" :thumb="item[29].replace('~',servePath)">
            <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="onDelete(item)">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'产品名称： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-field label="数量：" v-model="goods.taxRate" type="number" required placeholder="请输入数量" />
          <van-field label="赠送数量：" v-model="goods.taxAll" type="number" required placeholder="请输入赠送数量" />
          <van-field label="售价：" v-model="goods.howMuch" type="number" required placeholder="请输入售价" />
          <van-field label="金额：" v-model="goods.howMoney" type="number" required placeholder="请输入金额" />
          <van-field label="税率：" v-model="goods.taxRadio" type="number" required placeholder="请输入税率" />
          <van-field label="备注：" v-model="goods.reMarks" placeholder="请输入物资备注" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!--直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action>保存修改</van-button>
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
        reMarks: ""
      }
    };
  },
  computed,
  methods: {
    getData() {
      offer.getTranrial(this.confirmParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[2].split(";");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    },
    showInfo(item) {
      this.sku.price = item[15];
      this.goods = {
        id: item[0],
        sid: item[4],
        title: item[4],
        picture: item[4],
        brand: item[4],
        unit: item[8],
        taxRate: item[11],
        taxAll: item[12],
        howMuch: item[14],
        howMoney: item[15],
        taxRadio: item[16],
        reMarks: item[19]
      };
      this.showBase = true;
      // console.log(item);
    },
    onDelete() {}
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.tranrialDetail {
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
