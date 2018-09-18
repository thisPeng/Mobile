<template>
  <div class="arrivalDetails">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in dspList" :key="index" @click="showInfo(item)">
          <!--  -->
          <van-card :title="item[9]" :num="item[14]+' '+item[11]" :price="item[17]" :desc="item[10]">
            <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="arrivalDelete(item[0])" v-if="confirmParams[25] !== '1' && confirmParams[20] !== '1'">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'产品名称： ' + goods.brand" :label="'规格/型号：' + goods.unit" />
          <van-cell :title="'订单数量：' + goods.taxAll" :label="'单位：' + goods.shop" />
          <van-cell :title="'共计金额：' + goods.howMoney" :label="'税率：' + goods.taxRadio + '%'" />
          <van-field label="发货数量：" v-model="goods.taxRate" type="number" required />
          <van-field label="备注：" v-model="goods.reMarks" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="Keep">保存修改</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { arrival } from "./../../../../assets/js/api.js";
export default {
  data() {
    return {
      search: "",
      dspList: "",
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
    getData() {
      arrival.getInvoiceEdit(this.confirmParams[0]).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[2].split(";");
          // console.log(csp);
          this.dspList = eval("[[" + csp[0]);
          // console.log(this.dspList);
        }
      });
    },
    arrivalDelete(item) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除此产品记录？"
        })
        .then(() => {
          const params = {
            PurchaseOrderID: this.confirmParams[0],
            DetailOIDList: item
          };
          arrival.getDeleteOffer(params).then(res => {
            // console.log(res);
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
    //保存修改
    Keep() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Deliver_Detail: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Deliver_DetailOID: this.goods.id }
            ]
          },
          {
            BC_SC_Deliver_Detail: [
              { _attr: { UpdateKind: "" } },
              {
                Real_Qty: this.goods.taxRate
              },
              {
                Sub_Amt: this.goods.taxRate * this.goods.howMuch
              },
              {
                Remark: this.goods.reMarks
              }
            ]
          }
        ]
      });
      arrival.saveKeepRevise(xmlString).then(res => {
        try {
          if (res && res.status === 1) {
              this.$toast.success("保存成功");
              this.$nextTick().then(() => {
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1500);
              });
            }
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    pageInit() {
      this.getData();
    },

    showInfo(item) {
      this.sku.price = item[17];
      this.goods = {
        id: item[0],
        sid: item[19],
        title: item[9],
        picture: item[23],
        brand: item[9],
        info: item[23],
        unit: item[10],
        shop: item[11],
        taxRate: item[14],
        taxAll: item[13],
        howMuch: item[17],
        howMoney: item[18],
        taxRadio: item[19],
        reMarks: item[21]
      };
      this.showBase = true;
      // console.log(item);
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.arrivalDetails {
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
