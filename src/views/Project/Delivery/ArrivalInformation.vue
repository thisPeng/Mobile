<template>
  <!-- 到货信息 -->
  <div class="arrivalInformation">
    <div class="arrival-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title " />
        </van-cell-group>
        <div class="arrival-card" v-show="ite.checked">
          <van-cell class="arrival-item" v-for="(item,index) in ite.list" :key="index" :is-link="buttonValue.show" @click="buttonValue.show && !buttonValue.disabled ? jumpPage(item) : ''">
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[9]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
                <span class="row-right">
                  <van-tag type="success" v-if="item[13] === '发货状态：已发货'">{{item[13]}}</van-tag>
                  <van-tag type="danger" v-else>{{item[13]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[18]}}</span>
                <span class="row-right">
                  <van-tag plain type="success" v-if="item[17] === '签收状态：已签收'">{{item[17]}}</van-tag>
                  <van-tag plain type="danger" v-else>{{item[17]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[11]}}</span>
                <span class="row-right">{{item[12]}}</span>
              </div>
              <div class="content-row">
                <span class="row-right">{{item[10]}}</span>
              </div>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, arrival, financial } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      listOrder: [],
      buttonValue: {
        show: false,
        disabled: true
      }
    };
  },
  computed,
  methods: {
    pageInit() {
      // 获取查看权限
      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Purchase_Deliver_List")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.text === "查看" && val.Allowvisible === "1") {
                this.buttonValue.show = true;
                this.buttonValue.disabled = val.Enabled !== "1";
              }
            });
          }
        });

      const type = this.filterParams === 1 ? 3 : 0;
      arrival.getList(this.userId.UCML_UserOID, type).then(res => {
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
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      financial
        .updateReadInfo({
          BPOName: this.taskModel,
          key_value: item[0]
        })
        .then(res => {
          if (res.status && res.text == "True") {
            this.$router.push({
              name: "deliverydetails"
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
.arrivalInformation {
  width: 100%;
  .arrival-data {
    .data-item {
      background-color: #fff;
      margin-bottom: 10px;
      .item-title {
        font-size: 14px;
        font-weight: 600;
      }
      .arrival-card {
        width: 100%;
        .arrival-item {
          padding: 5px 15px;
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

