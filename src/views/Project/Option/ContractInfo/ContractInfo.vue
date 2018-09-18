<template>
  <!-- 合同信息 -->
  <div class="contractInfo">
    <div class="con-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title " />
        </van-cell-group>
        <div class="con-card" v-show="ite.checked">
          <van-cell class="con-item" v-for="(item,index) in ite.list" :key="index">
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[12]}}</span>
                <span class="row-right">
                  <van-tag type="danger" v-if="item[18] === '审核情况：未审核'">{{item[18]}}</van-tag>
                  <van-tag type="success" v-else-if="item[18] === '审核情况：已审核'">{{item[18]}}</van-tag>
                  <van-tag type="primary" v-else-if="item[18] === '发货情况：部分发货'">{{item[18]}}</van-tag>
                  <van-tag type="success" v-else-if="item[18] === '发货情况：已发货'">{{item[18]}}</van-tag>
                  <van-tag v-else>{{item[18]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
                <span class="row-left">{{item[13]}}</span>
              </div>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { contractInfo } from "./../../../../assets/js/api.js";
export default {
  data() {
    return {
      listOrder: []
    };
  },
  computed,
  methods: {
    getList() {
      contractInfo.getList(this.projectInfo.SC_ProjectOID).then(res => {
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
                  name: val[10],
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
    jumpPage(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "contractlabor"
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
.contractInfo {
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
          background-color: #fff;
          padding: 5px 15px;
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
              padding: 2px 0;
            }
          }
        }
      }
    }
  }
}
</style>


