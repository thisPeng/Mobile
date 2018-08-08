<template>
  <section class="task" v-if="taskModel === '我的待办'">
    <div class="task-in" @click="showTabs">
      <i class="iconfont icon-icon_down" v-show="tabsShow"></i>
      <i class="iconfont icon-icon_up" v-show="!tabsShow"></i>
    </div>
    <van-tabs class="task-tabs" v-model="active" v-show="tabsShow" @click="getView">
      <van-tab title="流程处理">
        <van-radio-group v-model="radio" v-if="data.codeJson.length > 0">
          <van-cell-group>
            <van-cell clickable v-for="item in data.codeJson" :title="item.name" :key="item.value" @click="onSelect(item)">
              <van-radio :name="item.value" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-field v-model="viewText" label="审批意见" type="textarea" placeholder="请输入审批意见" id="viewText" ref="viewText" />
      </van-tab>
      <van-tab title="意见浏览">
        <div class="task-content">
          <div class="task-item" v-for="(item,index) in result" :key="index">
            <div class="item-title">
              <span class="title">{{item.FromActivityName}}</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">执行人：{{item.PersonName}}</span>
                <span class="row-right">执行结果：{{item.BusiField1}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">创建日期：{{new Date(item.sys_created).Format("yyyy-MM-dd hh:mm")}}</span>
                <span class="row-right" v-if="item.FinishDate !== '1900-01-01T00:00:00'">完成日期：{{new Date(item.FinishDate).Format("yyyy-MM-dd hh:mm")}}</span>
              </div>
              <div class="content-row">
                <span>审批意见：{{item.Idea}}</span>
              </div>
            </div>
          </div>
        </div>
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
    onSelect(item) {
      this.radio = item.value;
      if (
        this.viewText === "" ||
        this.viewText === "同意" ||
        this.viewText === "不同意"
      ) {
        this.viewText = item.name;
      }
    },
    getView(index) {
      if (index === 0) {
        setTimeout(() => {
          const obj = document.getElementById("viewText");
          if (obj) obj.focus();
        }, 10);
      } else if (index === 1) {
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
      if (this.tabsShow) {
        this.$nextTick(() => {
          const obj = document.getElementById("viewText");
          if (obj) obj.focus();
        });
      }
    },
    // 重新发起
    onReset() {
      const that = this;
      const parData = this.$parent.$parent._data.data;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定重新发起任务吗？"
        })
        .then(() => {
          that.data.viewText = that.viewText;
          that.data.code = null;
          that.data.text = "申请人修改";
          let str = "",
            newStr = "",
            payStr = "",
            index = 0,
            bcName = "BC_SC_Money_InOut";
          for (const i in that.data.params) {
            str += that.$util.xmlData(i, that.data.params[i]);
            if (index === 0) {
              newStr += that.$util.xmlData(i, null);
            } else {
              if (i === "SYS_LAST_UPD_BY") {
                newStr += that.$util.xmlData(i, that.userInfo.oid);
              } else if (i === "SYS_LAST_UPD") {
                newStr += that.$util.xmlData(
                  i,
                  new Date().Format("yyyy-MM-dd hh:mm")
                );
              } else {
                newStr += that.$util.xmlData(
                  i,
                  parData[that.data.arrays[index]]
                );
              }
            }
            index++;
          }

          if (that.data.payment) {
            index = 0;
            bcName = "BC_SC_Pay_Apply";
            let tmpStr = "",
              tmpsStr = "";
            if (that.data.payment === "支付供应商") {
              for (const i in that.data.paramsChild) {
                for (const j in that.data.paramsChild[i]) {
                  tmpStr += that.$util.xmlData(j, that.data.paramsChild[i][j]);
                  if (index <= 1) {
                    tmpsStr += that.$util.xmlData(j, null);
                  } else {
                    tmpsStr += that.$util.xmlData(
                      j,
                      that.$parent.$parent.dataTable[i][that.data.arrs[index]]
                    );
                  }
                  index++;
                }
              }
              payStr =
                `<BC_SC_Pay_Detail UpdateKind="ukModify">` +
                tmpStr +
                `</BC_SC_Pay_Detail>` +
                `<BC_SC_Pay_Detail UpdateKind="">` +
                tmpsStr +
                `</BC_SC_Pay_Detail>`;
            } else {
              for (const i in that.data.paramsChild) {
                tmpStr += that.$util.xmlData(i, that.data.paramsChild[i]);
                if (index === 0) {
                  tmpsStr += that.$util.xmlData(i, null);
                } else {
                  tmpsStr += that.$util.xmlData(
                    i,
                    that.$parent.$parent.dataTable[0][that.data.arrs[index]]
                  );
                }
                index++;
              }
              payStr =
                `<BC_SC_Pay_Detail UpdateKind="ukModify">` +
                tmpStr +
                `</BC_SC_Pay_Detail>` +
                `<BC_SC_Pay_Detail UpdateKind="">` +
                tmpsStr +
                `</BC_SC_Pay_Detail>`;
            }
          }

          that.data.DeltaXml =
            `<root>` +
            `<` +
            bcName +
            ` UpdateKind="ukModify">` +
            str +
            `</` +
            bcName +
            `>` +
            `<` +
            bcName +
            ` UpdateKind="">` +
            newStr +
            `</` +
            bcName +
            `>` +
            payStr +
            `<BC_WF_AssignTask_Idea UpdateKind="ukModify">` +
            `<AssignTaskOID>` +
            that.data.TaskOID +
            `</AssignTaskOID>` +
            `<resolutionCode>null</resolutionCode>` +
            `<Idea>null</Idea>` +
            `<IdeaCode>null</IdeaCode>` +
            `<BusiField1>null</BusiField1>` +
            `<BusiField2>null</BusiField2>` +
            `<InstanceID>` +
            that.data.InstanceID +
            `</InstanceID>` +
            `</BC_WF_AssignTask_Idea>` +
            `<BC_WF_AssignTask_Idea UpdateKind="">` +
            `<AssignTaskOID>null</AssignTaskOID>` +
            `<resolutionCode>null</resolutionCode>` +
            `<Idea>` +
            that.data.viewText +
            `</Idea>` +
            `<IdeaCode>` +
            that.data.code +
            `</IdeaCode>` +
            `<BusiField1>` +
            that.data.text +
            `</BusiField1>` +
            `<BusiField2>` +
            that.data.code +
            `</BusiField2>` +
            `<InstanceID>null</InstanceID>` +
            `</BC_WF_AssignTask_Idea>` +
            `</root>`;

          if (that.data.payment) {
            task.submitZFTaskForm(that.data).then(res => {
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
          } else {
            task.submitTaskForm(that.data).then(res => {
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
          }
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
  },
  mounted() {
    this.$nextTick(() => {
      if (this.taskModel !== "我的待办") this.$store.commit("tabsShow", false);
      const obj = document.getElementById("viewText");
      if (obj) obj.focus();
    });
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
      max-height: 230px;
      overflow-y: scroll;
      .task-item {
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
          font-size: 12px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
            .row-left {
              flex: 1;
            }
            .row-right {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
