<template>
  <!-- 确认价格 -->
  <div class="conprice">
    <div class="con-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title" />
        </van-cell-group>
        <div class="con-card" v-show="ite.checked">
          <van-cell is-link class="con-item" v-for="(item,index) in ite.list" :key="index" @click="jumpInfo(item)">
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
                <span class="row-right">
                  <van-tag :type="item[13] === '初始状态' ? '' : 'danger'">{{item[13]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[11]}} {{item[12]}}</span>
                <span class="row-right"></span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
              </div>
              <div class="content-row">
                <span>{{item[16]}}</span>
              </div>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { conprice } from "./../../../assets/js/api.js";

export default {
  data() {
    return {
      listOrder: []
    };
  },
  computed,
  methods: {
    getList() {
      conprice.getList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            const list = eval("[[" + csp[0]);
            const listOrder = [];
            let tmp = "";
            // 数据分组
            list.forEach(val => {
              if (val[2] !== tmp) {
                listOrder.push({
                  name: val[9],
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
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpInfo(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "pricedetails"
      });
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.$parent.title = this.projectInfo.ProjectName;
      this.getList();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.conprice {
  width: 100%;
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
}
</style>


