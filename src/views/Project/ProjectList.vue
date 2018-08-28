<template>
  <div class="project">
    <van-tabs v-model="active" @click="switchType">
      <van-tab title="合作项目">
        <div class="project-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <div class="item-title">
            <span class="title">{{item.ProjectName}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item.ProjectNo === projectInfo.ProjectNo" />
            </span>
          </div>
          <div class="item-content">
            <span class="content-left">联系人：{{item.Contact}}</span>
            <span class="content-right">联系电话：{{item.Telephone}}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="自营项目">
        <div class="project-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <div class="item-title">
            <span class="title">{{item.ProjectName}}</span>
            <span class="icon">
              <van-icon name="success" color="#00A0E9" v-if="item.ProjectNo === projectInfo.ProjectNo" />
            </span>
          </div>
          <div class="item-content">
            <span class="content-left">联系人：{{item.Contact}}</span>
            <span class="content-right">联系电话：{{item.Telephone}}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { project } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      list: []
    };
  },
  methods: {
    getData(type) {
      const params = {
        oid: this.userInfo.oid,
        type
      };
      project.getProjectList(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          this.list = eval(sp[0]);
        }
      });
    },
    switchType(res) {
      this.getData(res);
    },
    jumpPage(item) {
      this.$store.commit("projectInfo", item);
      this.$router.go(-1);
    }
  },
  computed,
  mounted() {
    this.getData(0);
  }
};
</script>
<style lang="less" scoped>
.project {
  width: 100%;
  .project-item {
    background-color: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    border-radius: 5px;
    margin: 10px 0;
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
