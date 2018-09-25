<template>
  <!-- 新增发货单 -->
  <div class="newinvoice">
    <div class="newinvoice-data">
      <!--列表-->
      <div class="list-item" v-for="(ite, idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-cell :title="ite.name">
            <template slot="title">
              <div @click="onShowInfo(idx)">
                <div class="text-sx">{{ite.pname}}</div>
                <div class="text-xs text-gray">{{ite.name}}</div>
              </div>
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
    </div>
    <!--操作-->
    <div class="invoice-button" v-if="clientInfo.length > 0">
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
      let pid = "",
        isTow = false;
      listOrder.forEach(val => {
        if (val.checked) {
          if (!pid) {
            pid = val.pid;
          } else if (pid != val.pid) {
            isTow = true;
          }
          ContractList.push(val.id);
          DetailIDList = DetailIDList.concat(val.checkArr);
        }
      });
      if (isTow) {
        this.$toast.fail("存在不同项目的合同，不得合并生成发货单");
        return;
      }
      if (ContractList.length === 0 || DetailIDList.length === 0) {
        this.$toast.fail("请勾选发货物资");
        return;
      }
      ContractList = ContractList.join(",");
      DetailIDList = DetailIDList.join(",");
      const params = {
        SupplierID: this.userInfo.oid,
        PartnerID: this.clientInfo[0],
        ProjectID: pid,
        ContractList,
        DetailIDList
      };
      offer.saveDeliverBill(params).then(res => {
        if (res.status === 1 && res.text === "1") {
          this.$toast.success({
            forbidClick: true, // 禁用背景点击
            message: "生成发货单成功"
          });
          setTimeout(() => {
            this.$router.go(-1);
            this.getInfo(pid);
          }, 1500);
        } else {
          this.$toast.fail("生成发货单失败，请勾选发货物资");
        }
      });
    },
    // 显示合同详情
    onShowInfo(i) {
      this.$dialog
        .alert({
          message:
            this.list[i][11] +
            "<br>" +
            this.list[i][13] +
            "<br>" +
            this.list[i][14] +
            "<br>" +
            this.list[i][16] +
            "<br>" +
            this.list[i][19] +
            "<br>" +
            this.list[i][20]
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
    getInfo(prid = "") {
      const params = {
        suid: this.userInfo.oid,
        paid: this.clientInfo[0],
        prid
      };
      offer.getNotShippded(params);
    },
    // 发货单详情
    getData() {
      const params = {
        pid: this.clientInfo[0],
        sid: this.userInfo.oid
      };
      offer.getContract(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          const list = eval("[[" + csp[0]);
          const listOrder = [];
          let tmp = "";
          // 数据分组
          list.forEach(val => {
            if (val[0] !== tmp) {
              listOrder.push({
                id: val[0],
                pid: val[4],
                pname: val[11],
                name: val[15],
                checked: false,
                checkArr: [],
                list: []
              });
              tmp = val[0];
            }
          });
          this.list = list;
          this.listOrder = listOrder;
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
      this.getData();
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
  overflow: hidden !important;
  .newinvoice-data {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 70px;
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
  }
  .invoice-button {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    padding: 10px;
    background-color: #fff;
    text-align: center;
  }
}
</style>

