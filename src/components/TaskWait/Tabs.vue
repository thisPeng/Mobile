<template>
  <section class="task">
    <div class="task-in" @click="showTabs">
      <i class="iconfont icon-icon_down" v-show="tabsShow"></i>
      <i class="iconfont icon-icon_up" v-show="!tabsShow"></i>
    </div>
    <van-tabs class="task-tabs" v-model="active" v-show="tabsShow">
      <van-tab title="流程处理">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="同意" clickable @click="radio = '1'; viewText = '同意'">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="不同意" clickable @click="radio = '2'; viewText = '不同意'">
              <van-radio name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-field v-model="viewText" label="审批意见" placeholder="请输入审批意见" />
      </van-tab>
      <van-tab title="意见浏览">
        <span class="task-content">{{data[37]}}</span>
      </van-tab>
    </van-tabs>
    <van-button class="margin-top" type="primary" size="large" @click="onSave" v-show="tabsShow">保存并完成任务</van-button>
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
    showTabs() {
      this.$store.commit("tabsShow", !this.tabsShow);
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
          message: "确定完成任务吗？"
        })
        .then(() => {
          that.data.viewText = that.viewText;
          that.data.code = that.radio;
          that.data.text = that.radio === "1" ? "同意" : "不同意";
          task.saveTaskForm(that.data).then(res => {
            console.log(res);
            if (res && res.status === 1) {
              this.$toast("保存成功!");
            }
          });
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
    .task-content {
      width: 100%;
      min-height: 130px;
    }
  }
}
</style>
