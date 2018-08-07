<template>
  <div class="classify">
    <van-search placeholder="请输入商品名称" v-model="squery" />
    <div class="flex-span">
      <van-row type="flex">
        <van-col span="8">
          单价
        </van-col>
        <van-col span="8">税率</van-col>
        <van-col span="8">
          <span @click="screenshow=true">筛选</span>
          <van-icon name="shop" class="icons" /></van-col>
      </van-row>
    </div>
    <div class="classify-data">
      <div class="classify-card">
        <div class="classify-item">
          <div class="item-title">
            <span class="title">品牌名称：{{title}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>材料名称：{{clname}}</span>
            </div>
            <div class="content-row">
              <span>{{spec}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单位：{{unit}}</span>
              <span class="row-right">单价：{{univalent}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">是否含税：{{yntex}}</span>
              <span class="row-right">税率：{{duty}}</span>
            </div>
            <div class="content-row">
              <span>可开票税率：{{kaptex}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="screenshow" position="right">
      <div class="screen">
        <span class="font-rate">单价区间</span>
        <div class="input-rate">
          <van-row>
            <van-col span="12">
              <van-cell-group>
                <van-field v-model="minrate" placeholder="最高价" />
              </van-cell-group>
            </van-col>
            <van-col span="12">
              <van-cell-group>
                <van-field v-model="maxrate" placeholder="最低价" />
              </van-cell-group>
            </van-col>
          </van-row>
        </div>
        <div class="screen-brand">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="品牌名称" name="1">
              <span class="screen-icons">
                <van-button size="normal">迪森照明</van-button>
              </span>
              <span class="screen-icons">
                <van-button type="default">立乔照明</van-button>
              </span>
              <van-button type="default">不锈钢装饰板</van-button>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <van-button type="default" class="icon">重置</van-button>
      <van-button type="primary" class="icon">确定</van-button>
    </van-popup>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      squery: "",
      active: 2,
      activeNames: ["1"],
      screenshow: false,
      minrate: "",
      maxrate: "",
      checked: true,
      title: "唐钢",
      clname: "四级螺纹钢",
      spec: "品种 : 四级螺纹钢 | 直径(mm) : Φ20 | 牌号 : HRB500",
      unit: "t,",
      univalent: "100.00",
      yntex: "是",
      duty: "16.00",
      kaptex:"3%;6%;10%;16%"
    };
  },
  methods: {
    getGoodsList() {
      const params = {
        id: this.goodsParams.id,
        brand: "",
        keyword: ""
      };
      classify.getGoodsList(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          const list = eval(sp[0]);
          console.log(list);
        }
      });
    }
  },
  computed,
  mounted() {
    // this.getGoodsList();
  }
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  .classify-data {
    margin-bottom: 40px;
    .classify-card {
      width: 100%;
      .classify-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
  .flex-span {
    height: 40px;
    background-color: white;
    padding-top: 10px;
    padding-left: 18%;
  }
  .screen {
    height: 622px;
    width: 350px;
    background-color: white;
    .font-rate {
      font-size: 16px;
      padding-top: 10px;
      padding-left: 20px;
    }
  }
  .input-rate {
    padding-top: 10px;
  }
  .screen-icons {
    padding-right: 10px;
  }
  .icon {
    width: 50%;
  }
}
</style>
