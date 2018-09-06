<template>
  <!-- 新增发货单 -->
  <div class="newinvoice">
    <!--<div class="title-delivery">合同信息</div>
    <div class="info-data">
      <div class="info-card">
        <div class="info-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">合同名称：{{item[2]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">合同编号：{{item[1]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">甲方：{{item[3]}}</span>
              <span class="row-right">乙方：{{item[4]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">交货地点：{{item[8]}}</span>
              <span class="row-right">交货时间：{{new Date(item[9]).Format('yyyy-MM-dd')}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">合同金额：{{item[11]}}</span>
              <span class="row-left">合同状态：{{item[48]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title-delivery">订单明细</div>
    <div class="inquiry-data">
      <div class="inquiry-list">
         <div class="list-item" v-for="(item, index) in tspList" :key="index"  @click="showInfo(item)">
          <van-card :title="item[4]" :desc="item[8]">
          </van-card>
        </div>
      </div>
    </div>
     <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
      <template slot="sku-body-top" slot-scope="props">
        <van-cell-group>
          <van-cell :title="'品名： ' + goods.brand" :label="'规格型号：' + goods.unit" />
          <van-field label="实际数量：" v-model="goods.taxAll" type="number" required placeholder="请输入实际数量" />
         <van-cell :title="'赠送数量： ' + goods.taxRate" :label="'实价：' + goods.howMuch" />
          <van-cell :title="'金额(小计)： ' + goods.howMoney" :label="'税率：' + goods.taxRadio" />
          <van-field label="备注：" v-model="goods.reMarks" placeholder="请输入物资备注" />
        </van-cell-group>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div></div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
           直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调
          <van-button type="primary" bottom-action>保存修改</van-button>
             </div>
      </template>
    </van-sku> -->
    <!-- <div class="con-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title" />
        </van-cell-group>
        <div class="con-card" v-show="ite.checked">
          <div class="inquiry-data">
            <div class="inquiry-list">
              <div class="list-item" v-for="(item, index) in tspList" :key="index" @click="showInfo(item)">
                <van-card :title="item[4]" :desc="item[8]">
                </van-card>
              </div>
            </div>
          </div>
          <van-sku v-model="showBase" :sku="sku" :goods="goods" :goods-id="goods.id" :hide-stock="sku.hide_stock">
            <template slot="sku-body-top" slot-scope="props">
              <van-cell-group>
                <van-cell :title="'品名： ' + goods.brand" :label="'规格型号：' + goods.unit" />
                <van-field label="实际数量：" v-model="goods.taxAll" type="number" required placeholder="请输入实际数量" />
                <van-cell :title="'赠送数量： ' + goods.taxRate" :label="'实价：' + goods.howMuch" />
                <van-cell :title="'金额(小计)： ' + goods.howMoney" :label="'税率：' + goods.taxRadio" />
                <van-field label="备注：" v-model="goods.reMarks" placeholder="请输入物资备注" />
              </van-cell-group>
            </template>
            <template slot="sku-stepper" slot-scope="props">
              <div></div>
            </template>
            <template slot="sku-actions" slot-scope="props">
              <div class="van-sku-actions">
                直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调
                <van-button type="primary" bottom-action>保存修改</van-button>
              </div>
            </template>
          </van-sku>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      // item: "",
      // list:[],
      // // item: [],
      // search: "",
      //  listOrder: [],
      // tspList: [],
      // showBase: false,
      // loading: false,
      // finished: false,
      // sku: {
      //   tree: [],
      //   price: "0.00", // 默认价格（单位元）
      //   // stock_num: 0, // 商品总库存
      //   // collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
      //   none_sku: true, // 是否无规格商品
      //   hide_stock: true // 是否隐藏剩余库存
      // },
      // goods: {
      //   id: "",
      //   sid: "",
      //   title: "", // 页面标题
      //   picture: "", // 默认商品 sku 缩略图
      //   brand: "",
      //   // info: "",
      //   unit: "",
      //   taxRate: "",
      //   taxAll: "",
      //   howMuch: "",
      //   howMoney: "",
      //   taxRadio: "",
      //   reMarks: ""
     // }
    };
  },
  computed,
  methods: {
    // 先通过后端计算出未发货的数据
    getInfo() {
      const params = {
        suid: this.userInfo.oid,
        paid: this.clientInfo[0],
        prid: this.contractParams[3]
      };
      offer.getNotShippded(params).then(res => {
        console.log(res);
      });
    },
    //发货单选择
    getData() {
      offer.getShipped(this.contractParams[3]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          //  console.log(sp);
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          //  console.log(this.list);
        }
      });
    },
    // 子表
    getItem() {
      offer.getShipped(this.contractParams[3]).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.list = eval("[[" + csp[0]);
            // console.log(list);
            // const listOrder = [];
            // let tmp = "";
            // 数据分组
            // list.forEach(val => {
            //   if (val[3] !== tmp) {
            //     listOrder.push({
            //       name: val[2],
            //       checked: true,
            //       list: []
            //     });
            //     listOrder[listOrder.length - 1].list.push(val);
            //     tmp = val[3];
            //   } else {
            //     listOrder[listOrder.length - 1].list.push(val);
            //   }
            // });
            // this.listOrder = listOrder;
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
    //   showInfo(item) {
    //   this.sku.price = item[15];
    //   this.goods = {
    //     id: item[4],
    //     sid: item[4],
    //     title: item[4],
    //     picture: item[4],
    //     brand: item[4],
    //     unit: item[8],
    //     taxRate: item[12],
    //     taxAll: item[11],
    //     howMuch: item[14],
    //     howMoney: item[15],
    //     taxRadio: item[16],
    //     reMarks: item[19]
    //   };
    //   this.showBase = true;
    //   // console.log(item);
    // }
  },
  mounted() {
    this.getData();
    this.getInfo();
    this.getItem();
  }
};
</script>
<style lang="less" scoped>
.newinvoice {
  width: 100%;
  padding: 10px;
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  // .info-data {
  //   margin-bottom: 40px;
  //   .info-card {
  //     width: 100%;
  //     .info-item {
  //       background-color: #fff;
  //       padding: 10px 15px;
  //       border-bottom: 1px solid #eee;
  //       border-radius: 5px;
  //       margin-bottom: 10px;
  //       .item-title {
  //         padding: 10px 0;
  //         border-bottom: 1px solid #f6f6f6;
  //         display: flex;
  //         align-items: center;
  //         justify-content: space-between;
  //         .title {
  //           font-weight: 600;
  //           font-size: 16px;
  //         }
  //         .icon {
  //           font-size: 14px;
  //         }
  //       }
  //       .item-content {
  //         padding: 5px 0;
  //         font-size: 13px;
  //         color: #666;
  //         .content-row {
  //           display: flex;
  //           align-items: center;
  //           justify-content: space-between;
  //           padding: 5px 0;
  //         }
  //       }
  //     }
  //   }
  // }
  .con-data {
    .data-item {
      background-color: #fff;
      margin-bottom: 10px;
      .item-title {
        font-size: 14px;
        font-weight: 600;
      }
      .con-card {
        width: 100%;
        .con-item {
          .item-content {
            font-size: 13px;
            color: #666;
            .content-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 2px 0;
            }
          }
        }
      }
    }
  }
  .van-card {
    background-color: white;
  }
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

