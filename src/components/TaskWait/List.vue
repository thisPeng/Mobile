<template>
  <section class="message">
    <div class="message-button">
      <van-button type="default" class="button" @click="$emit('click')">{{buttonText}}</van-button>
    </div>
    <div class="task-table">
      <van-checkbox-group v-model="checkeds" @change="selectItem" ref="checkboxes">
        <table>
          <thead>
            <tr>
              <td>
                <van-checkbox name="all"></van-checkbox>
              </td>
              <td>消息内容</td>
              <td>发送时间</td>
              <td>发送人</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listData" :key="index">
              <td>
                <van-checkbox :name="index"></van-checkbox>
              </td>
              <td>{{item[5]}}</td>
              <td>{{item[8]}}</td>
              <td>{{item[3]}}</td>
            </tr>
          </tbody>
        </table>
      </van-checkbox-group>
    </div>
    <van-pagination v-model="currentPage" :total-items="pages.RecordCount" :items-per-page="pages.PageCount" mode="simple" class="task-pages" @change="$emit('change')" />
  </section>
</template>
<script>
export default {
  data() {
    return {
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
    selectItem(item) {
      // console.log(this.$refs.checkboxes);
      // this.$refs.checkboxes[item].toggle();
      if (item == "all") {
        console.log(this.checkeds);
      }
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
      color: #fff;
      border-radius: 5px;
      background-color: #3d95d5;
    }
  }

  .task-table {
    border-top: 1px solid #d2d2d2;
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      margin-bottom: 40px;
      thead {
        tr {
          background-color: #e9f8ff;
          font-weight: 600;
        }
        td {
          padding: 10px 0;
        }
      }
      tbody {
        tr:nth-child(2n) {
          background-color: #e9f8ff;
        }
        td {
          height: 50px;
        }
        .visited {
          background-color: #b3e7ff !important;
        }
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
