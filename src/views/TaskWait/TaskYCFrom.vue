<template>
  <div class="task">
    <van-cell-group>
      <van-field v-model="data[1]" label="单号" disabled/>
      <van-field v-model="data[27]" label="工程编号" disabled/>
      <van-field v-model="data[28]" label="工程名称" disabled/>
      <van-field v-model="data[17]" label="汇款日期" disabled/>
      <van-field v-model="data[9]" label="汇款金额" disabled/>
      <van-field v-model="data[12]" label="银行账号" disabled/>
      <van-field v-model="data[11]" label="开户行" disabled/>
      <van-field v-model="data[13]" label="经手人" disabled/>
      <van-field v-model="data[16]" label="汇款说明" disabled/>
      <van-field v-model="data[29]" label="操作员" disabled/>
      <van-field v-model="data[17]" label="创建日期" disabled/>
      <div class="task-title">
        <span>资金凭证</span>
      </div>
      <van-swipe class="task-img" :loop="true">
        <van-swipe-item>
          <img :src="(server+data[14]).replace('~','')" alt="资金凭证1">
        </van-swipe-item>
        <van-swipe-item>
          <img :src="(server+data[15]).replace('~','')" alt="资金凭证2">
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
    <van-cell-group>
      <van-tabs v-model="active">
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
      <van-button type="primary" size="large" @click="onSave">保存并完成任务</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      server: "/",
      active: 0,
      radio: "",
      data: [],
      viewText: ""
    };
  },
  methods: {
    onSave() {
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
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  computed,
  mounted() {
    // 图片地址
    if (process.env.NODE_ENV === "production") {
      let strPath = window.document.location.pathname;
      let postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
      if (postPath === "/Screen") postPath = "";
      this.server = postPath + "/";
    } else {
      this.server = "http://localhost:8088";
    }
    // 获取数据
    task.getTaskYCInfo(this.taskParams).then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        this.data = eval(sp[0].split("=")[1])[0];
        // console.log(this.data);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  .task-title {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .center {
      margin: 0 auto;
    }
  }
  .task-img {
    img {
      width: 100%;
    }
  }
  .task-content {
    width: 100%;
    min-height: 130px;
  }
}
</style>





