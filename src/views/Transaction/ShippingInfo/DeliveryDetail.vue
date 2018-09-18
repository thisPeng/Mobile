<template>
  <!-- 发货单明细 -->
  <div class="deliveryDetail">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[9]" :price="item[17]" :num="item[14]+' '+item[11]" :desc="item[10]" :thumb="item[26].replace('~',servePath)">
            <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="deleteItem(item[0])" v-if="confirmParams[41] != '已发货'">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'单位：' + goods.unit" :label="'规格/型号：' + goods.info" />
          <van-cell :title="'订单数量：' + goods.orderNum" :label="'赠送数量： ' + goods.sendNum" />
          <van-cell :title="'共计金额：' + goods.howMoney" :label="'税率：' + goods.taxRate + '%'" />
          <van-field label="发货数量：" v-model="goods.num" :disabled="confirmParams[41] == '已发货'" :required="confirmParams[41] != '已发货'" :placeholder="confirmParams[41] != '已发货' ? '请输入发货数量' : ''" @change="onSalcSum" />
          <van-field label="备注：" v-model="goods.reMarks" :disabled="confirmParams[41] == '已发货'" :placeholder="confirmParams[41] != '已发货' ? '请输入备注' : ''" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="saveDetail" v-if="confirmParams[41] != '已发货'">保存修改</van-button>
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
        info: "",
        unit: "",
        taxRate: "",
        orderNum: "",
        howMuch: "",
        howMoney: "",
        num: "",
        sendNum: "",
        reMarks: ""
      }
    };
  },
  computed,
  methods: {
    //发货单明细
    getData() {
      return offer.setUpdateDelete(this.confirmParams[0]).then(result => {
        try {
          if (result.status === 1) {
            return offer.getDeliveryDetail(this.contractParams[0]).then(res => {
              if (res.status === 1) {
                const sp = res.text.split("[[");
                const csp = sp[2].split(";");
                this.list = eval("[[" + csp[0]);
                return true;
              }
            });
          }
          throw "获取数据失败，请刷新页面";
        } catch (e) {
          this.$toast.fail(e);
          return false;
        }
      });
    },
    //删除按钮
    deleteItem(list) {
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
            if (res.status === 1) {
              if (res.text === "-1") {
                this.$toast.fail("明细至少有一条记录");
              } else if (res.text === "-2") {
                this.$toast.fail("删除数量不能大于等于现有记录数量");
              } else {
                this.getData().then(result => {
                  if (result) this.$toast.success("删除成功");
                  else this.$router.go(0);
                });
              }
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //保存修改按钮
    saveDetail() {
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
              { SC_Deliver_DetailOID: "null" },
              { Real_Qty: this.goods.num },
              { Remark: this.goods.reMarks }
            ]
          }
        ]
      });
      offer.saveGoodsDetail(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.showBase = false;
            this.getData().then(result => {
              if (result) this.$toast.success(res.text);
              else this.$router.go(0);
            });
          } else {
            this.$toast.fail(res.text);
          }
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    // 计算物资总价
    onSalcSum() {
      this.goods.howMoney = this.goods.howMuch * this.goods.num;
    },
    // 显示详情
    showInfo(item) {
      this.sku.price = item[17];
      this.goods = {
        id: item[0],
        sid: item[5],
        title: item[9],
        picture: item[26].replace("~", this.servePath),
        info: item[10],
        unit: item[11],
        num: item[14],
        sendNum: item[15],
        orderNum: item[13],
        howMuch: item[17],
        howMoney: item[18],
        taxRate: item[19],
        reMarks: item[21]
      };
      this.showBase = true;
      // console.log(item);
    }
  },
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
        }
      }
    }
  }
}
</style>
