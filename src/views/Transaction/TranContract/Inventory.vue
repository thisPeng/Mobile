<template>
  <!-- 清单详情 -->
  <div class="inventory">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :price="item[14]" :num="item[11]+' '+item[28]" :desc="item[8]" :thumb="item[29].replace('~',servePath)">
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
          <van-cell :title="'单位： ' + goods.unit" :label="'规格/型号：' + goods.info" />
          <van-cell :title="'发货数量：' + goods.num" :label="'赠送数量：' + goods.sendNum" />
          <van-cell :title="'共计金额：' + goods.howMoney" :label="'税率：' + goods.taxRadio + '%'" />
          <van-field label="备注：" v-model="goods.reMarks" disabled />
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
    <div class="invoice-button" v-if="contractParams[20] != '发货情况：全部发货'">
      <van-button type="primary" size="large" @click="onSave">生成发货单</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
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
        info: "",
        unit: "",
        num: "",
        sendNum: "",
        orderNum: "",
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
      this.sku.price = item[14];
      this.goods = {
        id: item[0],
        sid: item[6],
        title: item[4],
        picture: item[29].replace("~", this.servePath),
        brand: item[27],
        info: item[8],
        unit: item[5],
        orderNum: item[10],
        num: item[11],
        sendNum: item[12],
        howMuch: item[14],
        howMoney: item[15],
        taxRadio: item[16],
        reMarks: item[19]
      };
      this.showBase = true;
      // console.log(item);
    },
    getData() {
      return offer.getContractDetail(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
          return true;
        }
        return false;
      });
    },
    pageInit() {
      this.getData();
    },
    // 生成发货单
    onSave() {
      const list = this.list;
      let DetailIDList = [];
      list.forEach(val => {
        DetailIDList.push(val[0]);
      });
      DetailIDList = DetailIDList.join(",");
      const params = {
        SupplierID: this.userInfo.oid,
        PartnerID: this.clientInfo[0],
        ProjectID: "00000000-0000-0000-0000-000000000000",
        ContractList: this.contractParams[0],
        DetailIDList
      };
      offer.saveDeliverBill(params).then(res => {
        if (res.status === 1 && res.text === "1") {
          this.$toast.success({
            forbidClick: true,
            message: "生成发货单成功"
          });
          setTimeout(() => {
            this.$router.push({
              name: "shippinginfo"
            });
          }, 1500);
        }
      });
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
    padding-bottom: 70px;
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
  .invoice-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
