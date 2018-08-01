<template>
  <div class="apply">
    <div class="apply-option">
      <!-- <div class="apply-item" v-for="(item,index) in list.menu" :key="index">
        <div class="item-divider" v-if="item.type === 'divider' && index < 3">
          <span>{{item.name}}</span>
        </div>
        <div class="item-menu" v-else-if="item.type === 'menu' && index < 3" @click="jumpPage(item.name)">
          <img src="img/menuicon/caogaoxiang@2x.png" v-if="index === 1" />
          <img src="img/menuicon/buzhirenwu@2x.png" v-else-if="index === 2" />
          <span>{{item.name}}</span>
        </div>
      </div> -->

      <!--菜单-->
      <div class="apply-item">
        <div class="item-divider">
          <span>我的首页(手机)</span>
        </div>
        <div class="item-menu" @click="jumpPage('我的待办')">
          <img src="img/menuicon/caogaoxiang@2x.png" />
          <span>我的待办</span>
        </div>
        <div class="item-menu" @click="jumpPage('我的已办')">
          <img src="img/menuicon/buzhirenwu@2x.png" />
          <span>我的已办</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users, apply } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    jumpPage(name) {
      this.$router.push({
        name: "taskWait",
        params: {
          model: name === "我的已办" ? "complete" : "wait"
        }
      });
    }
  },
  computed,
  mounted() {
    const params = {
      oid: this.userInfo.oid,
      type: 1
    };
    apply.getProjectList(params).then(res => {
      if (res && res.status) {
        let sp = res.text.split(";");
        console.log(eval(sp[0]));
        this.list = eval(sp[0]);
      }
    });
    apply.getProductType().then(res => {
      if (res && res.status) {
        let sp = res.text.split(";");
        console.log(eval(sp[1].split("=")[1]));
      }
    });
    /*
    apply.getData().then(res => {
      if (res) {
        // for (const i in res.menu) {
        //   if (res.menu[i].imageLink) {
        //     res.menu[i].imageLink =
        //       "http://localhost/SupplyChain/" + res.menu[i].imageLink;
        //   } else {
        //     res.menu[i].imageLink = "/img/menuicon/rizhi@2x.png";
        //   }
        // }
        this.list = res;
      }
    });
    */
  },
  created() {
    users.userInfo().then(res => {
      if (res) {
        this.$store.commit("userInfo", res);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.apply {
  width: 100%;
  .apply-option {
    width: 100%;
    padding-bottom: 5px;
    background-color: #fff;
    .apply-item {
      display: inline;
      &:nth-child(4n + 1) {
        .item-menu {
          // border-right: 0;
        }
      }
      .item-divider {
        padding: 10px;
        border-bottom: 1px solid #d2d2d2;
        span {
          padding-left: 5px;
          border-left: 3px solid #00a0e9;
        }
      }
      .item-menu {
        width: 25%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #d2d2d2;
        border-bottom: 1px solid #d2d2d2;
        padding: 10px 0;
        img {
          width: 45px;
          height: 45px;
        }
        span {
          padding-top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
