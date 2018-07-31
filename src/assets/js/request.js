"use strict";
/**
 * @file axios请求封装
 * @author DJ
 */
import axios from "axios";

// 根据环境设置请求服务器地址
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ?
  getRootPath() :
  "http://192.168.2.254/SupplyChain/";
  // "http://192.168.2.172:8090/";
// 响应时间
axios.defaults.timeout = 10000;
// `withCredentails`选项表明了是否是跨域请求
axios.defaults.withCredentials = true;
// 设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
};

function getRootPath() {
  var strPath = window.document.location.pathname;
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
  if (postPath === '/Screen' || postPath === '/mobile') postPath = ''
  return postPath + "/";
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 是否加全屏loding
    if (config.data !== false) {
      window.vm.$toast.loading();
    }
    if (config.method === "post") {
      config.transformRequest = function (data) {
        let ret = "";
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      };
    }
    return config;
  },
  error => {
    window.vm.$toast.clear();
    return Promise.reject(error);
  }
);

// 添加返回拦截器
axios.interceptors.response.use(
  response => {
    window.vm.$toast.clear();
    const result = response.data;
    const res = result.substr(result.indexOf("("), result.length);
    if (res !== "()") {
      return eval(res);
    } else {
      return res;
    }
  },
  error => {
    window.vm.$toast.clear();
    error.message = "无法连接服务器";
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "访问失败，请重试";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求失败";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          // error.message = '服务器内部错误';
          window.localStorage.clear();
          window.sessionStorage.clear();
          error.message = "登录过期，请重新登录";
          window.vm.$router.replace({
            name: "login"
          });
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "无法连接服务器";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "连接服务器超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
      }
    }
    checkCode(error.message);
  }
);

// 请求失败错误信息提示
function checkCode(message) {
  // 弹出错误信息
  window.vm.$toast(message);
}

export default axios;