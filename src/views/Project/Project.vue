<template>
  <div class="project">
    <div class="project-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
      <div class="item-title">
        <span class="title">{{item.ProjectName}}</span>
        <span class="icon">
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="item-content">
        <span class="content-left">联系人：{{item.Contact}}</span>
        <span class="content-right">联系电话：{{item.Telephone}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { project } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    getData() {
      const params = {
        oid: this.userInfo.oid,
        type: this.projectModel === "自营项目" ? 0 : 1
      };
      project.getProjectList(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          this.list = eval(sp[0]);
          // console.log(this.list);
        }
      });
    },
    jumpPage(item) {
      this.$router.push({
        name: "option"
      });
      console.log(item);
    }
  },
  computed,
  mounted() {
    const model = this.$router.history.current.params.model || this.taskModel;
    this.$parent.title = model;
    this.$store.commit("projectModel", model);
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.project {
  width: 100%;
  padding: 10px;
  .project-item {
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
      padding: 10px 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
    }
  }
}
</style>
