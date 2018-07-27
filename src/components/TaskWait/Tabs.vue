<template>
  <section class="task">
    <div class="task-in" @click="showTabs">
      <i class="iconfont icon-icon_down" v-show="tabsShow"></i>
      <i class="iconfont icon-icon_up" v-show="!tabsShow"></i>
    </div>
    <van-tabs class="task-tabs" v-model="active" v-show="tabsShow" @click="getView">
      <van-tab title="流程处理">
        <van-radio-group v-model="radio" v-if="data.codeJson.length > 0">
          <van-cell-group>
            <van-cell clickable v-for="item in data.codeJson" :title="item.name" :key="item.value" @click="radio = item.value; viewText = item.name">
              <van-radio :name="item.value" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-field v-model="viewText" label="审批意见" placeholder="请输入审批意见" />
      </van-tab>
      <van-tab title="意见浏览">
        <span class="task-content">
          <table>
            <thead>
              <tr>
                <td>时间</td>
                <td>审核</td>
                <td>意见</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in result" :key="index">
                <td>{{item.sys_created}}</td>
                <td>{{item.BusiField1}}</td>
                <td>{{item.Idea}}</td>
              </tr>
            </tbody>
          </table>
        </span>
      </van-tab>
    </van-tabs>
    <van-button class="margin-top" type="primary" size="large" @click="onSave" v-show="tabsShow" v-if="data.codeJson.length > 0">保存并完成任务</van-button>
    <van-button class="margin-top" type="primary" size="large" @click="onReset" v-show="tabsShow" v-else>重新发起</van-button>
  </section>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      radio: "",
      result: "",
      viewText: ""
    };
  },
  computed,
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getView(index) {
      if (index === 1) {
        task.getViewList(this.data.InstanceID).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            this.result = eval(sp[0]);
          }
        });
      }
    },
    showTabs() {
      this.$store.commit("tabsShow", !this.tabsShow);
    },
    onReset() {
      const that = this;
      if (this.viewText === "") {
        this.$toast("请输入审批意见");
        return;
      }

      this.$dialog
        .confirm({
          title: "提示",
          message: "确定重新发起任务吗？"
        })
        .then(() => {
          that.data.viewText = that.viewText;
          that.data.code = null;
          that.data.text = "申请人修改";
          task.saveTaskForm(that.data).then(res => {
            if (res && res.status === 1) {
              this.$dialog
                .alert({
                  message: "操作成功！",
                  className: "text-center"
                })
                .then(() => {
                  this.$router.go(-1);
                });
            } else {
              this.$toast(res.text);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    onSave() {
      const that = this;
      if (this.radio === "" || this.viewText === "") {
        this.$toast("请选择审批意见");
        return;
      }

      this.$dialog
        .confirm({
          title: "提示",
          message: "确定保存并完成任务吗？"
        })
        .then(() => {
          try {
            that.data.viewText = that.viewText;
            that.data.code = that.radio;
            that.data.text =
              that.radio === 1 || that.radio === 3 ? "同意" : "不同意";
            task.saveTaskForm(that.data).then(res => {
              if (res && res.status === 1) {
                this.$dialog
                  .alert({
                    message: "操作成功！",
                    className: "text-center"
                  })
                  .then(() => {
                    this.$router.go(-1);
                  });
              } else {
                this.$toast(res.text);
              }
            });
          } catch (e) {
            console.log(e);
          }
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 99;
  background-color: #f5f5f5;
  .task-in {
    width: 100%;
    text-align: center;
    border-top: 1px solid #e5e5e5;
    .iconfont {
      font-size: 24px;
    }
  }
  .task-tabs {
    background-color: #fff;
    .task-content {
      width: 100%;
      min-height: 130px;
      max-height: 400px;
      overflow-y: scroll;
      table {
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-bottom: 40px;
        thead {
          tr {
            background-color: #e9f8ff;
            font-weight: 600;
          }
          td {
            padding: 10px 0;
          }
        }
        tbody {
          tr:nth-child(2n) {
            background-color: #e9f8ff;
          }
          td {
            height: 50px;
          }
          .visited {
            background-color: #b3e7ff !important;
          }
        }
      }
    }
  }
}
</style>
