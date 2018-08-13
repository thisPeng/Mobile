<template>
  <div class="option">
    <div class="option-row">
      <div class="row-item" @click="jumpPage('material')">
        <div class="item-icon bg-blue">
          <i class="iconfont icon-wuzi" />
        </div>
        <div class="item-text">物资列表</div>
      </div>
      <div class="row-item" @click="jumpPage('material')">
        <div class="item-icon bg-orange">
          <i class="iconfont icon-icon-price" />
        </div>
        <div class="item-text">确认价格</div>
      </div>
    </div>
    <div class="option-row">
      <div class="row-item" @click="jumpPage('material')">
        <div class="item-icon bg-red">
          <i class="iconfont icon-hetong" />
        </div>
        <div class="item-text">合同信息</div>
      </div>
      <div class="row-item" @click="jumpPage('arrivalinformation')">
        <div class="item-icon bg-green">
          <i class="iconfont icon-daohuofangshi" />
        </div>
        <div class="item-text">到货信息</div>
      </div>
    </div>
    <div class="option-row">
      <div class="row-item" @click="jumpPage('material')">
        <div class="item-icon bg-yellow">
          <i class="iconfont icon-fukuan" />
        </div>
        <div class="item-text">付款信息</div>
      </div>
      <div class="row-item" @click="jumpPage('infoitem')">
        <div class="item-icon bg-mint">
          <i class="iconfont icon-gongcheng" />
        </div>
        <div class="item-text">项目信息</div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {
    jumpPage(name) {
      this.$router.push({
        name
      });
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.option {
  width: 100%;
  .option-row {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    .row-item {
      height: 150px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #eee;
      .item-icon {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          color: #fff;
          font-size: 26px;
        }
      }
      .item-text {
        color: #666;
        padding-top: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
