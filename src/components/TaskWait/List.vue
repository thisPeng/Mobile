<template>
  <section class="message">
    <div class="message-button">
      <van-button type="primary" class="button" @click="onClick">{{buttonText}}</van-button>
    </div>
    <div class="task-table">
      <ul class="table">
        <li class="thead row">
          <span class="row-option">
            <van-checkbox v-model="checkAll" name="all" ref="checkAll" @change="selectAll"></van-checkbox>
          </span>
          <span class="row-content">消息内容</span>
          <span class="row-item">发送时间</span>
          <span class="row-item">发送人</span>
        </li>
        <van-checkbox-group v-model="checkeds" @change="selectItem">
          <li class="tbody row" v-for="(item,index) in listData" :key="index">
            <span class="row-option">
              <van-checkbox :name="index" ref="checkeds"></van-checkbox>
            </span>
            <span class="row-content">{{item[5]}}</span>
            <span class="row-item">{{item[8]}}</span>
            <span class="row-item">{{item[3]}}</span>
          </li>
        </van-checkbox-group>
      </ul>
    </div>
    <van-pagination v-model="currentPage" :total-items="pages.RecordCount" :items-per-page="pages.PageCount" mode="simple" class="task-pages" @change="$emit('change',currentPage)" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      checkeds: []
    };
  },
  props: {
    buttonText: {
      type: String,
      default: "标记已读"
    },
    listData: {
      type: Array
    },
    pages: {
      type: Object,
      default: () => {
        return {
          RecordCount: 1,
          PageCount: 1
        };
      }
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
      this.checkAll = false;
      this.checkeds = [];
    },
    selectAll(item) {
      const checks = this.$refs.checkeds;
      let arr = [];
      if (item && checks) {
        checks.forEach(val => {
          arr.push(val.name);
        });
      } else {
        arr = [];
      }
      this.checkeds = arr;
    },
    selectItem(item) {
      let arr = [];
      // if (item.length === this.listData.length && item.length > 0) {
      //   this.checkAll = true;
      // }
      item.forEach(val => {
        arr.push(this.listData[val][0]);
      });
      this.$emit("select", arr);
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  width: 100%;
  .message-button {
    padding: 10px 0;
    .button {
      margin: 0 10px;
    }
  }
  .task-table {
    border-top: 1px solid #d2d2d2;
    .table {
      width: 100%;
      font-size: 14px;
      margin-bottom: 40px;
      .thead {
        background-color: #e9f8ff;
        font-weight: 600;
      }
      .row {
        display: flex;
        justify-content: space-around;
        .row-option {
          flex: 1;
        }
        .row-content {
          flex: 3;
        }
        span {
          flex: 2;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid #fff;
        }
      }
      .row:nth-child(2n) {
        background-color: #e9f8ff;
      }
      .visited {
        background-color: #b3e7ff !important;
      }
    }
  }
  .task-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
