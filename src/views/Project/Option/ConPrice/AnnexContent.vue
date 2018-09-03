<template>
  <div class="annex">
    <div class="annex-item" v-for="(item, index) in data" :key="index" @click="preView(item[4])">
      <div class="item-img">
        <img :src="(servePath+item[4]).replace('..','')" :alt="item[1]">
      </div>
      <div class="item-text">{{item[1]}}</div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import { ImagePreview } from "vant";
import { conprice } from "./../../../../assets/js/api.js";
export default {
  data() {
    return {
      data: []
    };
  },
  computed,
  methods: {
    //图片预览
    preView(img) {
      ImagePreview([(this.servePath + img).replace("..", "")]);
    },
    pageInit() {
      conprice.getAnnex(this.confirmParams[0]).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split("[[");
            const dsp = sp[1].split(";");
            const arr = eval("[[" + dsp[0]);
            this.data = arr;
            // console.log(arr);
          }
        } catch (e) {
          console.log(e);
          // this.$toast.fail(e);
        }
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.annex {
  width: 100%;
  padding: 10px;
  text-align: center;
  .annex-item {
    display: inline-block;
    width: 32%;
    height: 150px;
    .item-img {
      height: 120px;
      img {
        width: 90%;
      }
    }
    .item-text {
      height: 30px;
      color: #999;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

