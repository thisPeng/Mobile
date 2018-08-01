import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login";
import Home from "./components/Home/Home";
import Index from "./views/Index/Index";
import Classify from "./views/Classify/Classify";
import Cart from "./views/Cart/Cart";
import Self from "./views/Project/Self";
import Cooperation from "./views/Project/Cooperation";
import MsgList from "./views/Message/MsgList";
import Message from "./views/Message/Message";
import Apply from "./views/Apply/Apply";
import Contact from "./views/Contact/Contact";
import Count from "./views/Count/Count";
import Users from "./views/Users/Users";
import usersPwd from "./views/Users/usersPwd";
import TaskWait from "./views/TaskWait/TaskWait";
import usersInfo from "./views/Users/usersInfo";
import TaskYCFrom from "./views/TaskWait/TaskYCFrom";
import TaskZFFrom from "./views/TaskWait/TaskZFFrom";
import TaskKKFrom from "./views/TaskWait/TaskKKFrom";
import TaskPKFrom from "./views/TaskWait/TaskPKFrom";
import TaskJDFrom from "./views/TaskWait/TaskJDFrom";
import TaskDJFrom from "./views/TaskWait/TaskDJFrom";
Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [{
      path: "/login",
      name: "login",
      component: Login
    },
    {
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
        },
        {
          path: "/classify",
          name: "classify",
          component: Classify,
          meta: {
            title: "挑货" // 页面标题
          }
        },
        {
          path: "/cart",
          name: "cart",
          component: Cart,
          meta: {
            title: "购物车" // 页面标题
          }
        },
        {
          path: "/taskWait",
          name: "taskWait",
          component: TaskWait,
          meta: {
            title: "待办列表" // 页面标题
          }
        },
        {
          path: "/self",
          name: "self",
          component: Self,
          meta: {
            title: "自营项目" // 页面标题
          }
        },
        {
          path: "/cooperation",
          name: "cooperation",
          component: Cooperation,
          meta: {
            title: "合作项目" // 页面标题
          }
        },
        {
          path: "/taskWait/taskYCFrom",
          name: "taskYCFrom",
          component: TaskYCFrom,
          meta: {
            title: "预存单审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskZFFrom",
          name: "taskZFFrom",
          component: TaskZFFrom,
          meta: {
            title: "支付申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskKKFrom",
          name: "taskKKFrom",
          component: TaskKKFrom,
          meta: {
            title: "扣款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskJDFrom",
          name: "taskJDFrom",
          component: TaskJDFrom,
          meta: {
            title: "解冻申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskPKFrom",
          name: "taskPKFrom",
          component: TaskPKFrom,
          meta: {
            title: "批款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskDJFrom",
          name: "taskDJFrom",
          component: TaskDJFrom,
          meta: {
            title: "冻结申请审核" // 页面标题
          }
        },
        {
          path: "/msgList",
          name: "msgList",
          component: MsgList,
          meta: {
            title: "消息列表" // 页面标题
          }
        },
        {
          path: "/message",
          name: "message",
          component: Message,
          meta: {
            title: "我的消息" // 页面标题
          }
        },
        {
          path: "/apply",
          name: "apply",
          component: Apply,
          meta: {
            title: "应用" // 页面标题
          }
        },
        {
          path: "/contact",
          name: "contact",
          component: Contact,
          meta: {
            title: "通讯录" // 页面标题
          }
        },
        {
          path: "/count",
          name: "count",
          component: Count,
          meta: {
            title: "数据统计" // 页面标题
          }
        },
        {
          path: "/users",
          name: "users",
          component: Users,
          meta: {
            title: "用户中心" // 页面标题
          }
        },
        {
          path: "/users/usersPwd",
          name: "usersPwd",
          component: usersPwd,
          meta: {
            title: "修改密码" // 页面标题
          }
        },
        {
          path: "/users/usersInfo",
          name: "usersInfo",
          component: usersInfo,
          meta: {
            title: "个人信息" // 页面标题
          }
        }
      ]
    }
  ]
});