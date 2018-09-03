<template>
<!-- 报价单明细 -->
  <div class="tranrialDetail">
     <div class="inquiry-data">
      <div class="inquiry-list">
        <div class="list-item" v-for="(item, index) in dspList" :key="index" @click="showInfo(item)">
          <van-card :title="item" :desc="item">
            <div slot="footer">
              <van-button size="mini" type="danger" @click.stop="conDetailsDelete(item[0])">删除</van-button>
            </div>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
export default {
  data(){
    return{
      item:""
    };
  },
  computed,
  methods:{

  },
  mounted() {

  },
}
</script>
<style lang="less" scoped>
.tranrialDetail{
  width:100%;
}
</style>
