<template>
  <div class="contact">
    <div class="contact-search">
      <van-search placeholder="请输入关键字" v-model="keyword" />
    </div>
    <div class="contact-title">组织架构</div>
    <van-collapse v-model="activeName" accordion @change="getListData">
      <van-collapse-item :name="index" v-for="(item,index) in list" :key="index">
        <div slot="title">
          <div class="contect-item">
            <div class="item-img">
              <img src="../../../public/img/menuicon/zuzhi_ico.png">
            </div>
            <div class="item-text">
              <div class="text-md">{{item.name}}</div>
              <div class="text-gray text-xs">组织架构</div>
            </div>
          </div>
        </div>
        <!-- <div :ref="'listData' + index"> -->
          <van-cell :title="ite.name" is-link :value="ite.count" v-for="(ite,idx) in listData[index]" :key="idx"></van-cell>
        <!-- </div> -->
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { contact } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: [],
      listData: [],
      keyword: "",
      activeName: "1"
    };
  },
  methods: {
    getListData(i) {
      if (!isNaN(i)) {
        const id = this.list[i].id;
        contact.getListData(id).then(res => {
          if (res) {
            this.listData.push(res.division);
          }
        });
      }
    }
  },
  computed,
  mounted() {
    contact.getList().then(res => {
      if (res) {
        this.list = res;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.contact {
  width: 100%;
  .contact-search {
    span {
      font-size: 8px;
      color: darkgray;
      margin-left: 15px;
    }
  }
  .contact-title {
    height: 40px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    color: #3d95d5;
    background-color: #fff;
  }
  .contect-item {
    display: flex;
    align-items: center;
    .item-img {
      flex: 1;
      img {
        width: 100%;
      }
    }
    .item-text {
      padding-left: 10px;
      flex: 6;
    }
  }
}
</style>
