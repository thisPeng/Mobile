<template>
  <!-- 新增发货单 -->
  <div class="newinvoice">
    <!--列表-->
    <div class="list-item" v-for="(ite, idx) in listOrder" :key="idx">
      <van-cell-group>
        <van-cell class="text-bold" :title="ite.name">
          <template slot="title">
            <div @click="onShowInfo(idx)">{{ite.name}}</div>
          </template>
          <template slot="right-icon">
            <van-switch v-model="ite.checked" size="26px" @change="onSwitechSupp(idx)" />
          </template>
        </van-cell>
      </van-cell-group>
      <div v-show="ite.checked">
        <van-checkbox-group v-model="ite.checkArr">
          <van-swipe-cell v-for="(item,index) in ite.list" :key="index">
            <div class="cart-item">
              <van-checkbox :name="item[0]" class="item-check" ref="checked"></van-checkbox>
              <van-card :desc="item[8] + ' | 单位：' + item[5]">
                <div slot="thumb">
                  <img :src="item[29].replace('~', servePath)" class="van-card__img">
                </div>
                <div slot="title" class="van-card__row">
                  <div class="van-card__title">{{item[4]}}</div>
                  <div class="van-card__price">{{'￥ '+item[14]}}</div>
                </div>
                <div slot="footer">
                  <van-stepper v-model="item[11]" :integer="true" />
                </div>
              </van-card>
            </div>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
    </div>
    <!--操作-->
    <div class="invoice-button">
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
      listOrder: [],
      pages: {},
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
        shop: "",
        taxRate: "",
        taxAll: ""
      }
    };
  },
  computed,
  methods: {
    // 生成发货单
    onSave() {
      const listOrder = this.listOrder;
      let ContractList = [];
      let DetailIDList = [];
      listOrder.forEach(val => {
        if (val.checked) {
          ContractList.push(val.id);
          DetailIDList = DetailIDList.concat(val.checkArr);
        }
      });
      if (ContractList.length === 0 || DetailIDList.length === 0) {
        this.$toast.fail("请勾选发货物资");
        return;
      }
      ContractList = ContractList.join(",");
      DetailIDList = DetailIDList.join(",");
      const params = {
        SupplierID: this.userInfo.oid,
        PartnerID: this.clientInfo[0],
        ProjectID: this.contractParams[3],
        ContractList,
        DetailIDList
      };
      offer.saveDeliverBill(params).then(res => {
        if (res.status === 1 && res.text === "1") {
          this.$toast.success("生成发货单成功");
        } else {
          this.$toast.fail("生成发货单失败，请勾选发货物资");
        }
      });
    },
    // 显示合同详情
    onShowInfo(i) {
      const te = this.$options.filters["deliverState"];
      this.$dialog
        .alert({
          message:
            "合同编号：" +
            this.list[i][1] +
            "<br>甲方：" +
            this.list[i][3] +
            "<br>乙方：" +
            this.list[i][4] +
            "<br>交货地点：" +
            this.list[i][8] +
            "<br>交货时间：" +
            this.list[i][9] +
            "<br>合同金额：" +
            this.list[i][11] +
            "<br>合同状态：" +
            te(this.list[i][48])
        })
        .then(() => {
          // on close
        });
    },
    // 显示合同
    onSwitechSupp(i) {
      if (this.listOrder[i].list.length === 0) {
        this.getDataItem(this.list[i][0]).then(res => {
          this.listOrder[i].list = res;
          this.listOrder[i].checkArr = [];
          res.forEach(val => {
            this.listOrder[i].checkArr.push(val[0]);
          });
        });
      }
    },
    // 刷新未发货的数据
    getInfo() {
      const params = {
        suid: this.userInfo.oid,
        paid: this.clientInfo[0],
        prid: this.contractParams[3]
      };
      offer.getNotShippded(params).then(res => {
        try {
          if (res.status === 1 && res.text === "True") {
            this.getData();
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 发货单详情
    getData() {
      offer.getShipped(this.contractParams[3]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = eval("[[" + sp[1].split(";")[0]);
          this.list = csp;
          csp.forEach(val => {
            this.listOrder.push({
              id: val[0],
              name: val[2],
              checked: false,
              checkArr: [],
              list: []
            });
          });
          // console.log(this.listOrder);
        }
      });
    },
    // 子表
    getDataItem(id) {
      return offer.getShipping(id).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = eval("[[" + sp[1].split(";")[0]);
            return csp;
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    pageInit() {
      this.getInfo();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.newinvoice {
  width: 100%;
  margin-bottom: 60px;
  .list-item {
    border-bottom: 5px solid #f6f6f6;
  }
  .cart-item {
    padding-left: 10px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    display: flex;
    align-items: center;
    .item-check {
      overflow: inherit;
    }
    .van-card {
      background-color: #fff;
      overflow: hidden;
    }
  }
  .left {
    color: #ffffff;
    font-size: 15px;
    width: 65px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    color: #ffffff;
    font-size: 15px;
    width: 65px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f44;
  }
  .invoice-button {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 5px;
    button {
      width: 95%;
    }
  }
}
</style>

