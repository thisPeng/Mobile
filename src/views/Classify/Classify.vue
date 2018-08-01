<template>
  <div class="classify">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="content">
          <div class="left" id="left">
            <ul>
              <li v-for="(item,index) in items1" :key="index">{{item.name}}</li>
            </ul>
          </div>
          <div class="right" id="right">
            <ul>
              <li v-for="(item,index) in items2" :key="index">
                <div class="class-title">{{item.class}}</div>
                <div v-for="(ite,idx) in item.list" :key="idx">
                  <div class="item">
                    <div class="item-left">
                      <div class="item-img"></div>
                    </div>
                    <div class="item-right">
                      <div class="title">{{ite.title}}</div>
                      <div class="subtitle"></div>
                      <div class="price"></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="swiper-slide" style="display:none;">
        店铺介绍
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
// import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      items1: [
        { name: "分类1" },
        { name: "分类2" },
        { name: "分类3" },
        { name: "分类4" },
        { name: "分类5" },
        { name: "分类6" },
        { name: "分类7" },
        { name: "分类8" }
      ],
      items2: [
        { class: "分类1", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类2", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类3", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类4", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类5", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类6", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类7", list: [{ title: "1" }, { title: "2" }] },
        { class: "分类8", list: [{ title: "1" }, { title: "2" }] }
      ]
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  overflow: hidden !important;
  .swiper-container-ul {
    list-style: none;
    overflow: hidden;
    width: 100%;
    background: #fff;
    top: 0;
  }
  .swiper-container-ul-li {
    width: 50%;
    height: 40px;
    line-height: 40px;
    float: left;
    text-align: center;
  }
  .actives {
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
  .content {
    width: 100%;
    overflow: hidden;
  }
  .left {
    top: 41px;
    float: left;
    width: 25%;
    height: 100%;
    background: #eee;
    overflow-y: scroll;
  }
  .left ul {
    list-style: none;
  }
  .left ul li {
    padding: 15px 5px;
    text-align: center;
  }
  .active {
    background: #fff;
    border-left: 2px solid #3190e8;
  }
  .right {
    float: left;
    width: 75%;
    height: 100%;
    overflow-y: scroll;
    position: absolute;
    left: 25%;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .right ul {
    list-style: none;
  }
  .class-title {
    padding: 7px 10px;
    background: #eee;
  }
  .item {
    overflow: hidden;
    width: 100%;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .item-left {
    float: left;
  }
  .item-right {
    float: left;
    padding: 0 10px;
  }
  .item-img {
    width: 100px;
    height: 100px;
    background: #eee;
  }
  .title {
    width: 100px;
    height: 20px;
    margin-top: 10px;
    background: #eee;
  }
  .subtitle {
    width: 70px;
    height: 20px;
    margin-top: 10px;
    background: #eee;
  }
  .price {
    width: 50px;
    height: 20px;
    margin-top: 10px;
    background: #eee;
  }
}
</style>
