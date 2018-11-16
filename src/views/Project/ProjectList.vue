<template>
  <div class="project">
    <van-tabs v-model="active" @click="switchType" v-if="userType != 2">
      <van-tab title="自营项目">
        <div class="project-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <div class="item">
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
          <div class="option">
            <div class="icon icon-edit" @click.stop="jumpEdit(item)">
              <van-icon name="edit" size="18px" color="#00A0E9" />
              <span class="text-xs">编辑</span>
            </div>
            <div class="icon icon-delete" @click.stop="onDelete(item)">
              <van-icon name="close" size="18px" color="#f44" />
              <span class="text-xs">删除</span>
            </div>
          </div>
        </div>
      </van-tab>
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
    </van-tabs>
    <!--合作商项目列表-->
    <div class="project-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)" v-else>
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
      this.getData(this.userType != 2 ? res : 1);
    },
    jumpPage(item) {
      this.$store.commit("projectInfo", item);
      if (this.backRouter) {
        this.$router.replace({ name: this.backRouter });
        this.$store.commit("backRouter", "");
      } else {
        this.$router.go(-1);
      }
    },
    // 跳转编辑
    jumpEdit(item) {
      this.$store.commit("projectInfo", item);
      this.$router.push({
        name: "projectSelf"
      });
    }
  },
  computed,
  mounted() {
    this.getData(this.userType != 2 ? 0 : 1);
  }
};
</script>
<style lang="less" scoped>
.project {
  width: 100%;
  .project-item {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px 15px;

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
      border-bottom: 1px solid #eee;
    }
    .option {
      padding-top: 5px;
      display: flex;
      .icon {
        padding-right: 15px;
        display: flex;
        align-items: center;
        .icon-edit {
          color: #00a0e9;
        }
        .icon-delete {
          color: #f44;
        }
        .text-xs {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
