<template>
  <div class="upload">
    <div class="upload-imgage" v-if="image.src">
      <van-icon name="close" class="upload-close" @click="onDelete" />
      <img :src="image.src" :alt="image.name" @click="preView">
    </div>
      <van-uploader class="upload-imgage" v-else :after-read="onReadFile" accept="image/*" :max-size="2097152" @oversize="$toast.fail('图片大小不能超过2M')">
        <div class="upload-content">
          <van-icon name="photograph" />
          <span>点击上传图片</span>
        </div>
      </van-uploader>
      <div class="upload-name">{{image.name}}</div>
    </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      image: {
        index: "",
        src: "",
        name: ""
      }
    };
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: -1
    }
  },
  computed,
  methods: {
    onReadFile(file) {
      const b64toBlob = require("b64-to-blob");
      const data = new FormData();
      const blob = b64toBlob(
        file.content.split(",")[1],
        file.file.type,
        file.file.size
      );
      const upFile = new File([blob], file.file.name);
      data.append("name", file.file.name);
      data.append("Action", "Upload");
      data.append("uploadPath", "../SupplyChain/Images/" + this.path);
      data.append("file", upFile);

      this.$axios({
        url: this.servePath + "/OtherSource/UCMLFileUploadNew.aspx",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data
      }).then(result => {
        if (result.code == 200) {
          this.$emit("change", {
            name: file.file.name,
            type: file.file.type,
            path: result.message,
            index: this.image.index
          });
        } else {
          this.$toast.fail(result.message);
        }
      });
    },
    // 图片预览
    preView() {
      if (this.image.src) ImagePreview([this.image.src.replace("..", "")]);
    },
    // 删除图片
    onDelete() {
      this.$emit("close", this.image);
    }
  },
  mounted() {
    this.image = {
      index: this.index,
      src: this.src,
      name: this.name
    };
  }
};
</script>
<style lang="less" scoped>
.upload {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .upload-imgage {
    width: 110px;
    height: 110px;
    border: 1px solid #ddd;
    position: relative;
    .upload-close {
      position: absolute;
      top: -10px;
      right: -10px;
      color: #fff;
      background-color: #ff4257;
      z-index: 1001;
      font-size: 30px;
      border-radius: 50%;
    }
    img {
      width: 100%;
    }
    .upload-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 30px;
      }
      span {
        color: #666;
        font-size: 12px;
        padding-top: 10px;
      }
    }
  }
  .upload-name {
    width: 110px;
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
</style>
