import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login";
import Home from "./components/Home/Home";
import Index from "./views/Index/Index";
import Message from "./views/Index/message";
import Apply from "./views/Apply/Apply";
import Contact from "./views/Contact/Contact";
import Users from "./views/Users/Users";
import usersPwd from "./views/Users/usersPwd";
import TaskWait from "./views/TaskWait/TaskWait";
import usersInfo from "./views/Users/usersInfo";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [{
    path: "/login",
    name: "login",
    component: Login
  }, {
    path: "/",
    redirect: "/index",
    component: Home,
    children: [{
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        title: "首页" // 页面标题
      }
    }, {
      path: "/taskWait",
      name: "taskWait",
      component: TaskWait,
      meta: {
        title: "我的待办" // 页面标题
      }
    }, {
      path: "/message",
      name: "message",
      component: Message,
      meta: {
        title: "我的消息" // 页面标题
      }
    }, {
      path: "/apply",
      name: "apply",
      component: Apply,
      meta: {
        title: "应用" // 页面标题
      }
    }, {
      path: "/contact",
      name: "contact",
      component: Contact,
      meta: {
        title: "通讯录" // 页面标题
      }
    }, {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        title: "用户中心" // 页面标题
      }
    }, {
      path: "/users/usersPwd",
      name: "usersPwd",
      component: usersPwd,
      meta: {
        title: "修改密码" // 页面标题
      }
    }, {
      path: "/users/usersInfo",
      name: "usersInfo",
      component: usersInfo,
      meta: {
        title: "个人信息" // 页面标题
      }
    }]
  }]
});