<template>
  <!-- 发货单明细 -->
  <div class="deliveryDetail">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[9]" :desc="item[10]" :price="item[18]" :thumb="item[26]">
            <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="getDelete(item[0])">删除</van-button>
              <!-- @click.stop="arrivalDelete(item[0])" -->
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'产品名称： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-cell :title="'单位： ' + goods.taxRate" :label="'订单数量：' + goods.taxAll" />
          <van-cell :title="'赠送数量： ' + goods.taxbrand" :label="'税率：' + goods.taxRadio + '%'" />
          <van-cell :title="'实价 ' + goods.howMuch" :label="'金额：' + goods.howMoney" />
          <van-cell :title="'发货数量：' + goods.taxunit" />
          <van-field label="备注：" v-model="goods.reMarks" disabled />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions"></div>
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
    getDelete(list) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除此产品记录？"
        })
        .then(() => {
          const params = {
            DeliverID: this.contractParams[0],
            DetailOIDList: list
          };
          offer.deleteDeliveryDetails(params).then(res => {
            console.log(res);
            if (res.status === 1) {
              if (res.text === "-1") {
                this.$toast.fail("明细至少有一条记录");
              } else if (res.text === "-2") {
                this.$toast.fail("删除数量不能大于等于现有记录数量");
              } else {
                this.getData();
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("删除成功");
                  }, 300);
                });
              }
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    showInfo(item) {
      this.sku.price = item[18];
      this.goods = {
        id: item[0],
        sid: item[5],
        title: item[9],
        picture: item[26],
        brand: item[9],
        info: item[10],
        unit: item[11],
        taxRate: item[11],
        taxAll: item[13],
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
        background-color: white;
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
