<template>
  <!-- 报价单明细 -->
  <div class="tranrialDetail">
    <div class="tranrial-data">
      <div class="tranrial-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :price="item[14]" :num="item[11]+' '+item[28]" :desc="item[8]" :thumb="item[29].replace('~',servePath)">
            <div slot="footer" v-if="confirmParams[15] != '2'">
              <van-button size="mini" type="danger" @click.stop="onDelete(item)">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'单位： ' + goods.unit" :label="'规格/型号：' + goods.info" />
          <van-field label="数量：" v-model="goods.num" type="number" :required="confirmParams[15] != '2'" :disabled="confirmParams[15] == '2'" placeholder="请输入数量" @change="onSalcSum" />
          <van-field label="赠送数量：" v-model="goods.sendNum" type="number" :required="confirmParams[15] != '2'" :disabled="confirmParams[15] == '2'" placeholder="请输入赠送数量" />
          <van-field label="单价：" v-model="goods.howMuch" type="number" :required="confirmParams[15] != '2'" :disabled="confirmParams[15] == '2'" placeholder="请输入售价" @change="onSalcSum" />
          <van-field label="共计金额：" v-model="goods.howMoney" type="number" disabled />
          <van-field label="税率：" v-model="goods.taxRadio" type="number" :required="confirmParams[15] != '2'" :disabled="confirmParams[15] == '2'" placeholder="请输入税率" />
          <van-field label="备注：" v-model="goods.reMarks" placeholder="请输入物资备注" :disabled="confirmParams[15] == '2'" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!--直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="onSaveGoods" v-if="confirmParams[15] != '2'">保存修改</van-button>
        </div>
      </template>
    </van-sku>
    <div class="tranrial-button" v-if="confirmParams[15] != '2'">
      <van-button type="primary" size="large" @click="onAdd">添加物资</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer, conprice } from "./../../../assets/js/api.js";
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
        info: "",
        unit: "",
        num: "",
        sendNum: "",
        howMuch: "",
        howMoney: "",
        taxRadio: "",
        reMarks: ""
      }
    };
  },
  computed,
  methods: {
    // 添加物资
    onAdd() {
      this.$store.commit("suppParams", {
        id: this.userInfo.oid,
        oid: this.confirmParams[0]
      });
      this.$router.push({
        name: "tranrialAdd"
      });
    },
    // 计算物资总价
    onSalcSum() {
      this.goods.howMoney = this.goods.howMuch * this.goods.num;
    },
    // 获取列表数据
    getData() {
      return conprice.conUpdateDelete(this.confirmParams[0]).then(result => {
        try {
          if (result.status === 1) {
            return offer.getTranrial(this.confirmParams[0]).then(res => {
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
    pageInit() {
      this.getData();
    },
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
    // 保存物资修改
    onSaveGoods() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_Detail: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Order_DetailOID: this.goods.id }
            ]
          },
          {
            BC_SC_Order_Detail: [
              { _attr: { UpdateKind: "" } },
              { SC_Order_DetailOID: "null" },
              { Real_Qty: this.goods.num },
              { send_qty: this.goods.sendNum },
              { Real_Price: this.goods.howMuch },
              { Sub_Amt: this.goods.num * this.goods.howMuch },
              { Sheet_Tax: this.goods.taxRadio },
              { Remark: this.goods.reMarks }
            ]
          }
        ]
      });
      // console.log(xmlString);
      offer.saveTranDetails(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.getData().then(result => {
              if (result) {
                this.$toast.success(res.text);
                this.showBase = false;
                return;
              }
            });
            throw "保存失败，请重试。";
          } else {
            throw res.text;
          }
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    // 删除物资
    onDelete(item) {
      offer.deleteTranDetails(this.confirmParams[0], item[0]).then(res => {
        try {
          if (res.status === 1) {
            if (res.text == "1") {
              this.getData().then(result => {
                if (result) this.$toast.success("删除成功");
                else location.reload();
              });
              throw "删除失败，请重试。";
            } else if (res.text == "-1") {
              throw "物资明细至少保留一条数据";
            } else if (res.text == "-2") {
              throw "删除数量不能大于等于现有记录数量";
            }
          }
          throw res.text;
        } catch (e) {
          this.$toast.fail(e);
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
.tranrialDetail {
  width: 100%;
  .tranrial-data {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 70px;
    .tranrial-list {
      width: 100%;
      padding: 0 10px;
      .list-item {
        background-color: #fff;
        .van-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .tranrial-button {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 10px;
    background-color: #fff;
  }
}
</style>
