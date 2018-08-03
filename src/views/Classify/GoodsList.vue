<template>
  <div class="classify">
    <van-card title="钢材" desc="很钢正面钢的材" num="500" price="998.00" thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {};
  },
  methods: {
    getGoodsList() {
      const params = {
        id: this.goodsParams.id,
        brand: "",
        keyword: ""
      };
      classify.getGoodsList(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          const list = eval(sp[0]);
          console.log(list);
        }
      });
    }
  },
  computed,
  mounted() {
    this.getGoodsList();
  }
};
</script>
<style lang="less" scoped>
.classify {
}
</style>
