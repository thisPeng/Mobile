<template>
  <div class="annex">
    <div class="annex-content">
      <div class="annex-item" v-for="(item, index) in data" :key="index" @click="preView(data[3])">
        <!--  -->
        <div class="item-img">
          <img :src="(servePath+data[3]).replace('..','')" :alt="data[1]">
        </div>
        <div class="item-text">{{data[1]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { offer } from "./../../assets/js/api.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      // data: []
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
      offer.getSupplierAnnex(this.userInfo.oid).then(res => {
        // console.log(res);
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
  .annex-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .annex-item {
      width: 32%;
      margin-bottom: 10px;
      .item-img {
        img {
          width: 95%;
        }
      }
      .item-text {
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
}
</style>

