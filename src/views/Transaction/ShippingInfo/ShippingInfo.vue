<template>
  <!-- 发货信息 -->
  <div class="shippingInfo">
    <div class="info-data">
      <div class="info-card">
        <div class="info-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">{{item[8]}}</span>
            <span class="option" v-if="buttonValue.delete.show">
              <van-button type="danger" size="mini" plain :disabled="buttonValue.delete.disabled" @click="onDelete(item)">删除</van-button>
            </span>
          </div>
          <van-cell class="item-content" :is-link="buttonValue.edit.show" @click="buttonValue.edit.show && !buttonValue.edit.disabled ? jumpInfo(item) : ''">
            <div class="content-row">
              <span class="row-left">{{item[10]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[16]}}</span>
              <span class="row-right">
                <van-tag :type="item[14] === '发货状态：已发货' ? 'success' : 'danger'">{{item[14]}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[19]}}</span>
              <span class="row-right">
                <van-tag plain :type="item[18] === '签收状态：已签收' ? 'success' : 'danger'">{{item[18]}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[12]}}</span>
            </div>
            <div>
              <span class="row-left">{{item[13]}}</span>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
    <!--新增发货单-->
    <div class="info-button" v-if="buttonValue.add.show">
      <van-button type="primary" size="large" :disabled="buttonValue.add.disabled" @click.stop="jumpAdd">新增发货单</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { index, offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      buttonValue: {
        add: {
          show: false,
          disabled: true
        },
        edit: {
          show: false,
          disabled: true
        },
        submit: {
          show: false,
          disabled: true
        },
        delete: {
          show: false,
          disabled: true
        }
      }
    };
  },
  computed,
  methods: {
    getData() {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: this.userId.UCML_UserOID,
        type: 4
      };
      return offer.getDelivery(params).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.list = eval("[[" + csp[0]);
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      });
    },
    jumpInfo(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "shippingDetails"
      });
    },
    onDelete(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除该发货单？"
        })
        .then(() => {
          offer.deleteDeliverOrder(item[0]).then(res => {
            try {
              if (res.status === 1) {
                this.getData().then(result => {
                  if (result) {
                    this.$toast.success({
                      forbidClick: true, // 禁用背景点击
                      message: "删除成功"
                    });
                  } else {
                    location.reload();
                  }
                });
              }
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    jumpAdd() {
      this.$router.push({
        name: "newInvoice"
      });
    },
    pageInit() {
      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Deliver_List")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.Allowvisible === "1") {
                switch (val.text) {
                  case "新增":
                    this.buttonValue.add.show = true;
                    this.buttonValue.add.disabled = val.Enabled !== "1";
                    break;
                  case "发货":
                    this.buttonValue.submit.show = true;
                    this.buttonValue.submit.disabled = val.Enabled !== "1";
                    break;
                  case "编辑":
                    this.buttonValue.edit.show = true;
                    this.buttonValue.edit.disabled = val.Enabled !== "1";
                    break;
                  case "删除":
                    this.buttonValue.delete.show = true;
                    this.buttonValue.delete.disabled = val.Enabled !== "1";
                    break;
                }
              }
            });
          }
        });

      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.shippingInfo {
  width: 100%;
  overflow: hidden !important;
  .info-data {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 70px;
    .info-card {
      width: 100%;
      .info-item {
        background-color: #fff;
        padding: 5px 10px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .option {
            padding: 10px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px;
          padding-right: 0;
          font-size: 12px;
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
  .info-button {
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

