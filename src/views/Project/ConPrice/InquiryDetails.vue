<template>
  <!-- 询价单明细详情编辑 -->
  <div class="inquirydetails">
    <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in dspList" :key="index" @click="showInfo(item)">
          <van-card :title="item[4]" :price="item[14]" :num="item[11]+' '+item[28]" :desc="item[8]" :thumb="item[29].replace('~',servePath)">
            <div slot="footer" v-if="confirmParams[13] != '待报价'">
              <van-button size="mini" type="danger" @click.stop="conDetailsDelete(item[0])" v-if="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认'">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'单位： ' + goods.unit" :label="'规格/型号：' + goods.info" />
          <!-- <van-cell :title="'发货数量：' + goods.num" :label="'赠送数量：' + goods.sendNum" /> -->
          <van-cell :title="'小计：' + goods.howMoney " />
          <van-field label="税率：" v-model="goods.taxRadio" type="number" :required="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认'" :disabled="confirmParams[13] === '待报价' || confirmParams[13] === '待确认'" :placeholder="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认' ? '请输入税率' : ''" />
          <van-field label="数量：" v-model="goods.num" type="number" :required="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认'" :disabled="confirmParams[13] === '待报价' || confirmParams[13] === '待确认'" :placeholder="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认' ? '请输入实际数量' : ''" @change="onSalcSum" />
          <van-field label="备注：" v-model="goods.reMarks" :disabled="confirmParams[13] === '待报价' || confirmParams[13] === '待确认'" :placeholder="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认' ? '请输入备注' : ''" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="priceDetails" v-if="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认'">保存修改</van-button>
        </div>
      </template>
    </van-sku>
    <div class="inquiry-button" v-if="confirmParams[15] != '2'">
      <van-button type="primary" size="large" @click="onAdd" v-if="confirmParams[13] !== '待报价' && confirmParams[13] !== '待确认'">添加物资</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { conprice, contractInfo } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      search: "",
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
    // 添加物资
    onAdd() {
      this.$store.commit("suppParams", {
        id: this.confirmParams[2],
        oid: this.confirmParams[0]
      });
      this.$router.push({
        name: "supplierType"
      });
    },
    // 计算物资总价
    onSalcSum() {
      this.goods.howMoney = "￥" + this.goods.howMuch * this.goods.num;
    },
    // 询价单明细
    getData() {
      return conprice.conUpdateDelete(this.confirmParams[0]).then(result => {
        try {
          if (result.status === 1) {
            return conprice.getDetails(this.confirmParams[0]).then(res => {
              if (res.status === 1) {
                const sp = res.text.split("[[");
                const dsp = sp[1].split(";");
                const arr = eval("[[" + dsp[0]);
                this.dspList = arr;
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
        howMoney: "￥" + item[15],
        taxRadio: item[16],
        reMarks: item[19]
      };
      this.showBase = true;
      // console.log(item);
    },

    //询价单明细删除
    conDetailsDelete(item) {
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
          conprice.conDetailsDelete(params).then(res => {
            if (res.status === 1) {
              if (res.text == "-1") {
                this.$toast.fail("明细至少有一条记录");
              } else if (res.text == "-2") {
                this.$toast.fail("删除数量不能大于等于现有记录数量");
              } else {
                const xml = require("xml");
                let xmlString = xml([
                  {
                    BC_SC_Order_Master: [
                      { _attr: { UpdateKind: "ukModify" } },
                      { SC_Order_MasterOID: this.confirmParams[0] }
                    ]
                  },
                  {
                    BC_SC_Order_Master: [
                      { _attr: { UpdateKind: "" } },
                      { Edit_Flag: "1" }
                    ]
                  }
                ]);
                xmlString += "<root>" + xmlString + "</root>";
                contractInfo.keepContract(xmlString).then(ress => {
                  try {
                    if (ress.status === 1) {
                      this.getData().then(result => {
                        if (result) this.$toast.success("删除成功");
                        else location.reload();
                      });
                    }
                    throw "保存失败，请刷新页面重试";
                  } catch (e) {
                    this.$toast.fail(e);
                  }
                });
              }
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    priceDetails() {
      if (parseInt(this.goods.num) > 999999999) {
        this.$toast.fail("输入的实际数量超过有效值，请重新输入");
        return;
      }
      const xml = require("xml");
      let xmlString = xml([
        {
          BC_SC_Order_Detail: [
            { _attr: { UpdateKind: "ukModify" } },
            { SC_Order_DetailOID: this.goods.id }
          ]
        },
        {
          BC_SC_Order_Detail: [
            { _attr: { UpdateKind: "" } },
            { Real_Qty: this.goods.num },
            { Sub_Amt: this.goods.howMuch * this.goods.num },
            { Sheet_Tax: this.goods.taxRadio },
            { Remark: this.goods.reMarks }
          ]
        }
      ]);
      xmlString += xml([
        {
          BC_SC_Order_Master: [
            { _attr: { UpdateKind: "ukModify" } },
            { SC_Order_MasterOID: this.confirmParams[0] }
          ]
        },
        {
          BC_SC_Order_Master: [
            { _attr: { UpdateKind: "" } },
            { Edit_Flag: "1" }
          ]
        }
      ]);
      xmlString = "<root>" + xmlString + "</root>";
      contractInfo.keepContract(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.getData().then(result => {
              if (result) {
                this.$toast.success(res.text);
                this.showBase = false;
              }
            });
          }
          throw "保存失败，请刷新页面重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.inquirydetails {
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
        }
      }
    }
  }
  .inquiry-button {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 10px;
    background-color: #fff;
  }
}
</style>
<style lang="less">
.inquirydetails {
  .van-field .van-cell__title {
    max-width: 45px;
  }
}
</style>

