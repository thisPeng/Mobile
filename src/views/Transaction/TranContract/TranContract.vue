<template>
  <!-- 合同信息 -->
  <div class="trancontract">
    <div class="con-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title " />
        </van-cell-group>
        <div class="con-card" v-show="ite.checked">
          <van-cell is-link class="con-item" v-for="(item,index) in ite.list" :key="index" @click="jumpPage(item)">
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
                <span class="row-right">
                  <van-tag v-if="item[20] === '初始状态'">{{item[20]}}</van-tag>
                  <van-tag type="danger" v-else-if="item[20] === '发货情况：未发货'">{{item[20]}}</van-tag>
                  <van-tag type="success" v-else-if="item[20] === '发货情况：全部发货'">{{item[20]}}</van-tag>
                  <van-tag type="primary" v-else>{{item[20]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[13]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[16]}}</span>
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
import { offer, financial } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      listOrder: []
    };
  },
  computed,
  methods: {
    getData() {
      const params = {
        pid: this.userInfo.oid,
        sid: this.userInfo.oid,
        type: 4
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
            if (val[2] !== tmp) {
              listOrder.push({
                name: val[11],
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
      });
    },
    pageInit() {
      this.getData();
    },
    jumpPage(item) {
      this.$store.commit("contractParams", item);
      financial
        .updateReadInfo({
          BPOName: this.taskModel,
          key_value: item[0]
        })
        .then(res => {
          if (res.status && res.text == "True") {
            this.$router.push({
              name: "inventory"
            });
          } else {
            this.$toast.fail("获取数据失败，请重试");
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
.trancontract {
  width: 100%;
  padding: 10px;
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
