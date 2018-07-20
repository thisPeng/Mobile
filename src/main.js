import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/assets/js/store'
import './registerServiceWorker'
import "normalize.css";
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import './assets/css/iconfont.css';
import "./assets/css/theme.less";
import axios from './assets/js/request';
import echarts from 'echarts'

Vue.use(Vant);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// 图片地址
if (process.env.NODE_ENV === "production") {
  let strPath = window.document.location.pathname;
  let postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
  if (postPath === '/Screen' || postPath === '/mobile') postPath = ''
  store.commit('servePath', postPath);
} else {
  store.commit('servePath', "http://localhost:8088");
}

// 路由守卫
router.beforeEach((to, from, next) => {
  //如果未匹配到路由
  if (to.name == null) {
    //如果上级也未匹配到路由则跳转首页，如果上级能匹配到则转上级路由
    from.name == null ?
      next({
        name: "index"
      }) :
      next({
        name: from.name
      });
  } else {
    next();
  }
});


window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')