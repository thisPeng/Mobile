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
import TaskYCFrom from "./views/TaskWait/TaskYCFrom";
import TaskZFFrom from "./views/TaskWait/TaskZFFrom";
import TaskKKFrom from "./views/TaskWait/TaskKKFrom";
import TaskPKFrom from "./views/TaskWait/TaskPKFrom";
import TaskJDFrom from "./views/TaskWait/TaskJDFrom";
import TaskDJFrom from "./views/TaskWait/TaskDJFrom";
import TaskAccept from "./views/TaskWait/TaskAccept";
import TaskExecute from "./views/TaskWait/TaskExecute";
import TaskGuide from "./views/TaskWait/TaskGuide";
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
          path: "/taskWait",
          name: "taskWait",
          component: TaskWait,
          meta: {
            title: "我的待办" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskYCFrom",
          name: "TaskYCFrom",
          component: TaskYCFrom,
          meta: {
            title: "预存单审核" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskZFFrom",
          name: "TaskZFFrom",
          component: TaskZFFrom,
          meta: {
            title: "支付申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskKKFrom",
          name: "TaskKKFrom",
          component: TaskKKFrom,
          meta: {
            title: "扣款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskJDFrom",
          name: "TaskJDFrom",
          component: TaskJDFrom,
          meta: {
            title: "解冻申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskPKFrom",
          name: "TaskPKFrom",
          component: TaskPKFrom,
          meta: {
            title: "批款申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/TaskDJFrom",
          name: "TaskDJFrom",
          component: TaskDJFrom,
          meta: {
            title: "冻结申请审核" // 页面标题
          }
        },
        {
          path: "/taskWait/taskAccept",
          name: "taskAccept",
          component: TaskAccept,
          meta: {
            title: "接收任务" // 页面标题
          }
        },
        {
          path: "/taskWait/taskExecute",
          name: "taskExecute",
          component: TaskExecute,
          meta: {
            title: "任务执行" // 页面标题
          }
        },
        {
          path: "/taskWait/taskGuide",
          name: "taskGuide",
          component: TaskGuide,
          meta: {
            title: "任务执行" // 页面标题
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