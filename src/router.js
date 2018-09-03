import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login";
import Home from "./components/Home/Home";
import Index from "./views/Index/Index";
import Classify from "./views/Classify/Classify";
import GoodsList from "./views/Classify/GoodsList";
import Cart from "./views/Cart/Cart";
import ProjectList from "./views/Project/ProjectList";
import Material from "./views/Project/Option/Material";
import ConPrice from "./views/Project/Option/ConPrice/ConPrice";
import ContractInfo from "./views/Project/Option/ContractInfo/ContractInfo";
import ArrivalInformation from "./views/Project/Option/Arrival/ArrivalInformation";
import InfoItem from "./views/Project/Option/InfoItem/InfoItem";
import PaymentLabel from "./views/Project/Option/Payment/PaymentLabel";
import PriceDetails from "./views/Project/Option/ConPrice/PriceDetails";
import AnnexContent from "./views/Project/Option/ConPrice/AnnexContent";
import DeliveryDetails from "./views/Project/Option/Delivery/DeliveryDetails";
import ContractDetails from "./views/Project/Option/ContractInfo/ContractDetails";
import MsgList from "./views/Message/MsgList";
import Message from "./views/Message/Message";
import Apply from "./views/Apply/Apply";
import Contact from "./views/Contact/Contact";
import Count from "./views/Count/Count";
import Users from "./views/Users/Users";
import UsersPwd from "./views/Users/UsersPwd";
import UsersInfo from "./views/Users/UsersInfo";
import Supplier from "./views/Supplier/Supplier";
import SupplierType from "./views/Supplier/SupplierType";
import TaskList from "./views/TaskWait/TaskList";
import TaskWait from "./views/TaskWait/TaskWait";
import TaskYCFrom from "./views/TaskWait/TaskYCFrom";
import TaskZFFrom from "./views/TaskWait/TaskZFFrom";
import TaskKKFrom from "./views/TaskWait/TaskKKFrom";
import TaskPKFrom from "./views/TaskWait/TaskPKFrom";
import TaskJDFrom from "./views/TaskWait/TaskJDFrom";
import TaskDJFrom from "./views/TaskWait/TaskDJFrom";
import TaskGYSFrom from "./views/TaskWait/TaskGYSFrom";
import TaskGYSDetails from "./views/TaskWait/TaskGYSDetails";
import Quotation from "./views/Transaction/MaterialQuotation/Quotation";
import TranrialDetail from "./views/Transaction/MaterialQuotation/TranrialDetail"
import TranContract from "./views/Transaction/TranContract/TranContract";
import ShippingInfo from "./views/Transaction/ShippingInfo/ShippingInfo";
import ShippingDetails from "./views/Transaction/ShippingInfo/ShippingDetails";
import TranPayment from "./views/Transaction/TranPayment/TranPayment";
import Tranrial from "./views/Transaction/MaterialQuotation/Tranrial";
import Inventory from "./views/Transaction/TranContract/Inventory";
import Customerlist from "./views/CustomerList/CustomerList";
import InquiryDetails from "./views/Project/Option/ConPrice/InquiryDetails";
import ContractWork from "./views/Project/Option/ConPrice/ContractWork";
import ContractLabor from "./views/Project/Option/ContractInfo/ContractLabor";
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
            title: "首页",
            // keepAlive: true
          }
        },
        {
          path: "/classify",
          name: "classify",
          component: Classify,
          meta: {
            title: "物资分类",
            keepAlive: true
          }
        },
        {
          path: "/goodsList",
          name: "goodsList",
          component: GoodsList,
          meta: {
            title: "物资列表"
          }
        },
        {
          path: "/cart",
          name: "cart",
          component: Cart,
          meta: {
            title: "购物车",
            // keepAlive: true
          }
        },
        {
          path: "/taskWait",
          name: "taskWait",
          component: TaskWait,
          meta: {
            title: "待办列表"
          }
        },
        {
          path: "/taskList",
          name: "taskList",
          component: TaskList,
          meta: {
            title: "待办事宜"
          }
        },
        {
          path: "/projectList",
          name: "projectList",
          component: ProjectList,
          meta: {
            title: "选择项目"
          }
        },
        {
          path: "/project/option/material",
          name: "material",
          component: Material,
          meta: {
            title: "项目详情"
          }
        },
        {
          path: "/taskWait/taskYCFrom",
          name: "taskYCFrom",
          component: TaskYCFrom,
          meta: {
            title: "预存单审核"
          }
        },
        {
          path: "/taskWait/taskZFFrom",
          name: "taskZFFrom",
          component: TaskZFFrom,
          meta: {
            title: "支付申请审核"
          }
        },
        {
          path: "/taskWait/taskKKFrom",
          name: "taskKKFrom",
          component: TaskKKFrom,
          meta: {
            title: "扣款申请审核"
          }
        },
        {
          path: "/taskWait/taskJDFrom",
          name: "taskJDFrom",
          component: TaskJDFrom,
          meta: {
            title: "解冻申请审核"
          }
        },
        {
          path: "/taskWait/taskPKFrom",
          name: "taskPKFrom",
          component: TaskPKFrom,
          meta: {
            title: "批款申请审核"
          }
        },
        {
          path: "/taskWait/taskDJFrom",
          name: "taskDJFrom",
          component: TaskDJFrom,
          meta: {
            title: "冻结申请审核"
          }
        },
        {
          path: "/taskWait/taskGYSFrom",
          name: "taskGYSFrom",
          component: TaskGYSFrom,
          meta: {
            title: "供应商审核"
          }
        },
        {
          path: "/taskWait/taskgysDetails",
          name: "taskgysDetails",
          component: TaskGYSDetails,
          meta: {
            title: "供应商审核证明"
          }
        },
        {
          path: "/msgList",
          name: "msgList",
          component: MsgList,
          meta: {
            title: "消息列表"
          }
        },
        {
          path: "/message",
          name: "message",
          component: Message,
          meta: {
            title: "我的消息"
          }
        },
        {
          path: "/apply",
          name: "apply",
          component: Apply,
          meta: {
            title: "应用"
          }
        },
        {
          path: "/contact",
          name: "contact",
          component: Contact,
          meta: {
            title: "通讯录"
          }
        },
        {
          path: "/count",
          name: "count",
          component: Count,
          meta: {
            title: "数据统计"
          }
        },
        {
          path: "/users",
          name: "users",
          component: Users,
          meta: {
            title: "用户中心",
            keepAlive: true
          }
        },
        {
          path: "/users/usersPwd",
          name: "usersPwd",
          component: UsersPwd,
          meta: {
            title: "修改密码"
          }
        },
        {
          path: "/users/usersInfo",
          name: "usersInfo",
          component: UsersInfo,
          meta: {
            title: "个人信息"
          }
        },
        {
          path: "/users/supplier",
          name: "supplier",
          component: Supplier,
          meta: {
            title: "供应商设置",
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: "/users/supplier/type",
          name: "supplierType",
          component: SupplierType,
          meta: {
            title: "供应商物资"
          }
        },
        {
          path: "/project/option/conPrice/conprice",
          name: "conprice",
          component: ConPrice,
          meta: {
            title: "确认价格"
          }
        },
        {
          path: "/project/option/contractInfo/contractInfo",
          name: "contractInfo",
          component: ContractInfo,
          meta: {
            title: "合同信息"
          }
        },
        {
          path: "/project/option/arrival/arrivalinformation",
          name: "arrivalinformation",
          component: ArrivalInformation,
          meta: {
            title: "到货信息"
          }
        },
        {
          path: "/project/option/infoItem/infoitem",
          name: "infoitem",
          component: InfoItem,
          meta: {
            title: "项目信息" //页面标题
          }
        },
        {
          path: "/project/option/details/pricedetails",
          name: "pricedetails",
          component: PriceDetails,
          meta: {
            title: "询价单编辑" //页面标题
          }
        },
        {
          path: "/project/option/details/annexContent",
          name: "annexContent",
          component: AnnexContent,
          meta: {
            title: "询价单附件" //页面标题
          }
        },
        {
          path: "/project/option/delivery/deliverydetails",
          name: "deliverydetails",
          component: DeliveryDetails,
          meta: {
            title: "发货单编辑" //页面标题
          }
        },
        {
          path: "/project/option/details/contractdetails",
          name: "contractdetails",
          component: ContractDetails,
          meta: {
            title: "合同清单详情" //页面标题
          }
        },
        {
          path: "/project/option/payment/paymentlabel",
          name: "paymentlabel",
          component: PaymentLabel,
          meta: {
            title: "付款信息列表" //页面标题
          }
        },
        {
          path: "/transaction/materialquotation/quotation",
          name: "quotation",
          component: Quotation,
          meta: {
            title: "报价单" //页面标题
          }
        },
        {
          path: "/transaction/materialquotation/tranrialDetail",
          name: "tranrialDetail",
          component: TranrialDetail,
          meta: {
            title: "报价单明细" //页面标题
          }
        },
        {
          path: "/customerlist/customerlist",
          name: "customerlist",
          component: Customerlist,
          meta: {
            title: "客户列表" //页面标题
          }
        },
        {
          path: "/transaction/tranContract/trancontract",
          name: "trancontract",
          component: TranContract,
          meta: {
            title: "合同信息" //页面标题
          }
        },
        {
          path: "/transaction/shippinginfo/shippinginfo",
          name: "shippinginfo",
          component: ShippingInfo,
          meta: {
            title: "发货信息" //页面标题
          }
        },
        {
          path: "/transaction/shippinginfo/shippingDetails",
          name: "shippingDetails",
          component: ShippingDetails,
          meta: {
            title: "发货单编辑" //页面标题
          }
        },
        {
          path: "/transaction/tranPayment/tranpayment",
          name: "tranpayment",
          component: TranPayment,
          meta: {
            title: "付款信息" //页面标题
          }
        },
        {
          path: "/transaction/materialquotation/tranrial",
          name: "tranrial",
          component: Tranrial,
          meta: {
            title: "付款信息" //页面标题
          }
        },
        {
          path: "/transaction/tranContract/inventory",
          name: "inventory",
          component: Inventory,
          meta: {
            title: "清单详情" //页面标题
          }
        },
        {
          path: "/project/option/conPrice/inquirydetails",
          name: "inquirydetails",
          component: InquiryDetails,
          meta: {
            title: "询价单明细编辑" //页面标题
          }
        },
        {
          path: "/project/option/conprice/contractwork",
          name: "contractwork",
          component: ContractWork,
          meta: {
            title: "材料合同编辑" //页面标题
          }
        },
        {
          path: "/project/option/details/contractlabor",
          name: "contractlabor",
          component: ContractLabor,
          meta: {
            title: "劳务合同编辑" //页面标题
          }
        },
      ]
    }
  ]
});