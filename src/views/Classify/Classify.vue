<template>
  <div class="classify">
    <div class="left">
      <ul>
        <li v-for="(item,index) in topList" :key="index" @click="onNavClick(index)">{{item.name}}</li>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in detailedList" :key="index">
          <div class="class-title">{{item.name}}</div>
          <div v-for="(ite,idx) in item.list" :key="idx">
            <div class="item">
              <div class="item-left">
                <div class="item-img"></div>
              </div>
              <div class="item-right">
                <div class="title">{{ite.name}}</div>
                <div class="subtitle"></div>
                <div class="price"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { classify } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      list: [],
      topList: [],
      detailedList: []
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    },

    getSubList(pid, index) {
      let arr = [];
      // let tmp = [];
      for (let i = index; i < this.list.length; i++) {
        if (this.list[i][8] === pid) {
          // tmp = [];
          arr.push({
            code: this.list[i][1],
            name: this.list[i][2],
            id: this.list[i][0]
          });
          //arr = tmp;
          let res = this.getSubList(this.list[i][0], i);
          if (res.length > 0) {
            arr.push(res);
          }
          // arr.push(this.getSubList(this.list[i][0], i));
        }
      }
      return arr;
    }
  },
  computed,
  mounted() {
    classify.getProductType().then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        const list = eval(sp[1].split("=")[1]);
        this.list = list;

        let arr = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i][8] === "00000000-0000-0000-0000-000000000000") {
            this.topList.push({
              code: list[i][1],
              name: list[i][2],
              id: list[i][0]
            });
            arr.push(this.getSubList(list[i][0], i));
          }
        }
        console.log(arr);
        this.detailedList = arr;
        // console.log(this.detailedList);

        /*
        list.forEach(v => {
          if (v[1].length === 2) {
            this.topList.push({
              code: v[1],
              name: v[2]
            });
          } else {
            console.log(v[1]);
            if (v[1].length === 4) {
              this.detailedList.push({
                code: v[1],
                name: v[2],
                list: []
              });
              i++;
            } else {
              this.detailedList[i].list.push({
                code: v[1],
                name: v[2]
              });
            }
          }
        });
        */
        // console.log(this.topList);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  bottom: 50px !important;
  overflow: hidden !important;
  .actives {
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
  .left {
    top: 41px;
    float: left;
    width: 25%;
    height: 100%;
    background: #eee;
    overflow-y: scroll;
    ul {
      list-style: none;
      li {
        padding: 15px 5px;
        text-align: center;
      }
    }
    .active {
      background: #fff;
      border-left: 2px solid #3190e8;
    }
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
    ul {
      list-style: none;
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
        .item-left {
          float: left;
          .item-img {
            width: 100px;
            height: 100px;
            background: #eee;
          }
        }
        .item-right {
          float: left;
          padding: 0 10px;
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
      }
    }
  }
}
</style>
