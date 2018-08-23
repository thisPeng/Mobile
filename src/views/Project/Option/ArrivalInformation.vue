<template>
  <!-- 到货信息 -->
  <div class="arrivalinformation">
    <div class="arrival-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title " />
        </van-cell-group>
        <div class="arrival-card" v-show="ite.checked">
          <van-cell-group>
            <van-cell is-link class="arrival-item" v-for="(item,index) in ite.list" :key="index" @click="jumpage('deliverydetails')">
              <div class="item-content">
                <div class="content-row">
                  <span class="row-left">{{item[9]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-right">{{item[10]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">{{item[15]}}</span>
                  <span class="row-right">{{item[13]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">{{item[11]}}</span>
                  <span class="row-right">{{item[12]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">{{item[18]}}</span>
                  <span class="row-right">{{item[17]}}</span>
                </div>
              </div>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { arrival } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      listOrder: []
    };
  },
  computed,
  methods: {
    getList() {
      arrival.getList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split(";");
            const list = eval("[[" + tsp[0]);
            const listOrder = [];
            let tmp = "";
            // 数据分组
            list.forEach(val => {
              if (val[2] !== tmp) {
                listOrder.push({
                  name: val[7],
                  checked: true,
                  list: []
                });
                listOrder[listOrder.length - 1].list.push(val);
                tmp = val[2];
              } else {
                listOrder[listOrder.length - 1].list.push(val);
              }
            });
            this.listOrder = listOrder;
            // console.log(this.listOrder);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpage(name) {
      this.$router.push({
        name
      });
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.getList();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.arrivalinformation {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .arrival-data {
    margin-bottom: 40px;
    .data-item {
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      .item-title {
        font-size: 14px;
        font-weight: 600;
      }
      .arrival-card {
        width: 100%;
        .arrival-item {
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
          .item-content {
            padding: 5px 0;
            font-size: 13px;
            color: #666;
            .content-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              // padding: 5px 0;
            }
          }
        }
      }
    }
  }
}
</style>

