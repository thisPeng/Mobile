import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login";
import Register from "./views/Login/Register";
import Home from "./components/Home/Home";
import Index from "./views/Index/Index";
import Working from "./views/Working/Working";
import Classify from "./views/Classify/Classify";
import GoodsList from "./views/Classify/GoodsList";
import GoodsSearch from "./views/Classify/GoodsSearch";
import Cart from "./views/Cart/Cart";
import ProjectList from "./views/Project/ProjectList";
import ConPrice from "./views/Project/ConPrice/ConPrice";
import ContractInfo from "./views/Project/ContractInfo/ContractInfo";
import ContractWorkInfo from "./views/Project/ContractInfo/ContractWorkInfo";
import ArrivalInformation from "./views/Project/Delivery/ArrivalInformation";
import ProjectInfo from "./views/Project/ProjectInfo/ProjectInfo";
import application from "./views/Project/Payment/List/Application"; //支付申请信息
import preMemory from "./views/Project/Payment/List/PreMemory"; //预存列表
import PayInfoMation from "./views/Project/Payment/List/PayInfoMation"; //支付信息
import appropriation from "./views/Project/Payment/List/Appropriation"; //批款信息
import frozen from "./views/Project/Payment/List/Frozen"; //冻结信息
import withholding from "./views/Project/Payment/List/Withholding"; //扣款信息
import capitalFlow from "./views/Project/Payment/List/CapitalFlow"; //资金流水
import oainformation from "./views/Project/Payment/List/OAinformation"; //OA批款信息
import PaymentAddZF from "./views/Project/Payment/PaymentAddZF";
import PaymentAddYC from "./views/Project/Payment/PaymentAddYC";
import PaymentAddDJ from "./views/Project/Payment/PaymentAddDJ";
import PaymentAddJD from "./views/Project/Payment/PaymentAddJD";
import PaymentAddPK from "./views/Project/Payment/PaymentAddPK";
import PaymentAddKK from "./views/Project/Payment/PaymentAddKK";
import PaymentAddFK from "./views/Project/Payment/PaymentAddFK";
import PriceDetails from "./views/Project/ConPrice/PriceDetails";
import DeliveryDetails from "./views/Project/Delivery/DeliveryDetails";
import ArrivalDetails from "./views/Project/Delivery/ArrivalDetails";
import ContractDetails from "./views/Project/ContractInfo/ContractDetails";
import Message from "./views/Message/Message";
import Count from "./views/Count/Count";
import Users from "./views/Users/Users";
import UsersPwd from "./views/Users/UsersPwd";
import UsersInfo from "./views/Users/UsersInfo";
import CompanyUserInfo from "./views/Users/CompanyUserInfo";
import SupplierUserInfo from "./views/Users/SupplierUserInfo";
import UsersInfoAccessory from "./views/Users/UsersInfoAccessory";
import Supplier from "./views/Supplier/Supplier";
import SupplierInfo from "./views/Supplier/SupplierInfo";
import SupplierList from "./views/Supplier/SupplierList";
import SupplierAccessory from "./views/Supplier/SupplierAccessory";
import SupplierDetailsAnnex from "./views/Supplier/SupplierDetailsAnnex";
import SupplierDetails from "./views/Supplier/SupplierDetails";
import TaskList from "./views/TaskList/TaskList";
import TaskWait from "./views/TaskList/TaskWait";
import TaskYCFrom from "./views/TaskList/TaskYCFrom";
import TaskZFFrom from "./views/TaskList/TaskZFFrom";
import TaskKKFrom from "./views/TaskList/TaskKKFrom";
import TaskPKFrom from "./views/TaskList/TaskPKFrom";
import TaskJDFrom from "./views/TaskList/TaskJDFrom";
import TaskDJFrom from "./views/TaskList/TaskDJFrom";
import TaskGYSFrom from "./views/TaskList/TaskGYSFrom";
import TaskGYSDetails from "./views/TaskList/TaskGYSDetails";
import Inquiry from "./views/Transaction/MaterialQuotation/Inquiry";
import TranrialDetail from "./views/Transaction/MaterialQuotation/TranrialDetail"
import TranContract from "./views/Transaction/TranContract/TranContract";
import ShippingInfo from "./views/Transaction/ShippingInfo/ShippingInfo";
import ShippingDetails from "./views/Transaction/ShippingInfo/ShippingDetails";
import NewInvoice from "./views/Transaction/ShippingInfo/NewInvoice";
import DeliveryDetail from "./views/Transaction/ShippingInfo/DeliveryDetail";
import TranPayment from "./views/Transaction/TranPayment/TranPayment";
import Tranrial from "./views/Transaction/MaterialQuotation/Tranrial";
import TranContractWork from "./views/Transaction/MaterialQuotation/TranContractWork";
import TranrialAdd from "./views/Transaction/MaterialQuotation/TranrialAdd";
import Inventory from "./views/Transaction/TranContract/Inventory";
import CustomerList from "./views/Transaction/CustomerList";
import InquiryDetails from "./views/Project/ConPrice/InquiryDetails";
import ContractWork from "./views/Project/ConPrice/ContractWork";
import ContractLabor from "./views/Project/ContractInfo/ContractLabor";
import ComfrimAnnex from "./views/Annex/Comfrim";
import ContractAnnex from "./views/Annex/Contract";
import PartnerAnnex from "./views/Annex/Partner";
import SupplierAnnex from "./views/Annex/Supplier";
import ProjectSelf from "./views/Project/ProjectSelf";
import ProjectCooperation from "./views/Project/ProjectCooperation";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [{
    path: "/",
    redirect: "/index",
    component: Home,
    children: [{
        path: "/index",
        name: "index",
        component: Index,
        meta: {
          title: "首页", // 页面标题
          keepAlive: true // 是否缓存
        }
      }, {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          title: "登录" // 页面标题
        }
      }, {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
          title: "注册账号" // 页面标题
        }
      }, {
        path: "/working",
        name: "working",
        component: Working,
        meta: {
          title: "工作台", // 页面标题
          keepAlive: true // 是否缓存
        }
      }, {
        path: "/classify",
        name: "classify",
        component: Classify,
        meta: {
          title: "物资分类",
          keepAlive: true // 是否缓存
        }
      }, {
        path: "/goodsList",
        name: "goodsList",
        component: GoodsList,
        meta: {
          title: "物资列表"
        }
      }, {
        path: "/goodsSearch",
        name: "goodsSearch",
        component: GoodsSearch,
        meta: {
          title: "物资查询"
        }
      }, {
        path: "/cart",
        name: "cart",
        component: Cart,
        meta: {
          title: "购物车",
          keepAlive: true
        }
      }, {
        path: "/inquiry",
        name: "inquiry",
        component: Inquiry,
        meta: {
          title: "询价单",
          // keepAlive: true
        }
      }, {
        path: "/taskList",
        name: "taskList",
        component: TaskList,
        meta: {
          title: "已办列表"
        }
      }, {
        path: "/taskWait",
        name: "taskWait",
        component: TaskWait,
        meta: {
          title: "待办列表"
        }
      }, {
        path: "/projectList",
        name: "projectList",
        component: ProjectList,
        meta: {
          title: "选择项目"
        }
      },
      {
        path: "/projectSelf",
        name: "projectSelf",
        component: ProjectSelf,
        meta: {
          title: "自营项目"
        }
      },
      {
        path: "/projectCooperation",
        name: "projectCooperation",
        component: ProjectCooperation,
        meta: {
          title: "合作项目"
        }
      },
      {
        path: "/taskList/taskYCFrom",
        name: "taskYCFrom",
        component: TaskYCFrom,
        meta: {
          title: "预存单详情"
        }
      }, {
        path: "/taskList/taskZFFrom",
        name: "taskZFFrom",
        component: TaskZFFrom,
        meta: {
          title: "支付申请详情"
        }
      }, {
        path: "/taskList/taskKKFrom",
        name: "taskKKFrom",
        component: TaskKKFrom,
        meta: {
          title: "扣款申请详情"
        }
      }, {
        path: "/taskList/taskJDFrom",
        name: "taskJDFrom",
        component: TaskJDFrom,
        meta: {
          title: "解冻申请详情"
        }
      }, {
        path: "/taskList/taskPKFrom",
        name: "taskPKFrom",
        component: TaskPKFrom,
        meta: {
          title: "批款申请详情"
        }
      }, {
        path: "/taskList/taskDJFrom",
        name: "taskDJFrom",
        component: TaskDJFrom,
        meta: {
          title: "冻结申请详情"
        }
      }, {
        path: "/taskList/taskGYSFrom",
        name: "taskGYSFrom",
        component: TaskGYSFrom,
        meta: {
          title: "供应商详情"
        }
      }, {
        path: "/taskList/taskGYSFrom/taskgysDetails",
        name: "taskgysDetails",
        component: TaskGYSDetails,
        meta: {
          title: "供应商证照资料"
        }
      }, {
        path: "/message",
        name: "message",
        component: Message,
        meta: {
          title: "我的消息"
        }
      }, {
        path: "/count",
        name: "count",
        component: Count,
        meta: {
          title: "数据统计"
        }
      }, {
        path: "/users",
        name: "users",
        component: Users,
        meta: {
          title: "用户中心",
          keepAlive: true
        }
      }, {
        path: "/users/usersPwd",
        name: "usersPwd",
        component: UsersPwd,
        meta: {
          title: "修改密码"
        }
      }, {
        path: "/users/usersInfo",
        name: "usersInfo",
        component: UsersInfo,
        meta: {
          title: "合作商个人信息"
        }
      }, {
        path: "/users/companyUserInfo",
        name: "companyUserInfo",
        component: CompanyUserInfo,
        meta: {
          title: "工程商个人信息"
        }
      }, {
        path: "/users/supplierUserInfo",
        name: "supplierUserInfo",
        component: SupplierUserInfo,
        meta: {
          title: "供应商个人信息"
        }
      }, {
        path: "/users/usersInfoAccessory",
        name: "usersInfoAccessory",
        component: UsersInfoAccessory,
        meta: {
          title: "证照资料"
        }
      }, {
        path: "/users/supplier",
        name: "supplier",
        component: Supplier,
        meta: {
          title: "供应商列表",
          keepAlive: true // 需要被缓存
        }
      }, {
        path: "/supplier/supplierList",
        name: "supplierList",
        component: SupplierList,
        meta: {
          title: "劳务供应商列表"
        }
      }, {
        path: "/supplier/supplierAccessory",
        name: "supplierAccessory",
        component: SupplierAccessory,
        meta: {
          title: "劳务供应商列表详情"
        }
      }, {
        path: "/supplier/supplierDetailsAnnex",
        name: "supplierDetailsAnnex",
        component: SupplierDetailsAnnex,
        meta: {
          title: "劳务供应商列表附件"
        }
      }, {
        path: "/supplier/supplierDetails",
        name: "supplierDetails",
        component: SupplierDetails,
        meta: {
          title: "劳务供应商详情"
        }
      }, {
        path: "/users/supplier/info",
        name: "supplierInfo",
        component: SupplierInfo,
        meta: {
          title: "供应商物资",
          keepAlive: true
        }
      }, {
        path: "/conPrice",
        name: "conprice",
        component: ConPrice,
        meta: {
          title: "询价单管理"
        }
      }, {
        path: "/contractInfo/contractInfo",
        name: "contractInfo",
        component: ContractInfo,
        meta: {
          title: "合同信息"
        }
      }, {
        path: "/contractInfo/contractWorkInfo",
        name: "contractWorkInfo",
        component: ContractWorkInfo,
        meta: {
          title: "劳务合同详情"
        }
      }, {
        path: "/arrivalinformation",
        name: "arrivalInformation",
        component: ArrivalInformation,
        meta: {
          title: "到货信息"
        }
      }, {
        path: "/projectInfo/projectInfo",
        name: "projectInfo",
        component: ProjectInfo,
        meta: {
          title: "项目信息"
        }
      }, {
        path: "/details/pricedetails",
        name: "pricedetails",
        component: PriceDetails,
        meta: {
          title: "询价单详情"
        }
      }, {
        path: "/delivery/deliverydetails",
        name: "deliverydetails",
        component: DeliveryDetails,
        meta: {
          title: "发货单详情"
        }
      }, {
        path: "/delivery/arrivalDetails/detail",
        name: "arrivalDetails",
        component: ArrivalDetails,
        meta: {
          title: "发货单明细"
        }
      }, {
        path: "/details/contractdetails",
        name: "contractdetails",
        component: ContractDetails,
        meta: {
          title: "合同清单详情"
        }
      }, {
        path: "/payment/paymentlabel/application",
        name: "application",
        component: application,
        meta: {
          title: "支付申请列表"
        }
      }, {
        path: "/payment/paymentlabel/preMemory",
        name: "preMemory",
        component: preMemory,
        meta: {
          title: "预存单管理"
        }
      }, {
        path: "/payment/paymentlabel/payInfoMation",
        name: "payInfoMation",
        component: PayInfoMation,
        meta: {
          title: "付款信息"
        }
      }, {
        path: "/payment/paymentlabel/appropriation",
        name: "appropriation",
        component: appropriation,
        meta: {
          title: "批款单管理"
        }
      }, {
        path: "/payment/paymentlabel/frozen",
        name: "frozen",
        component: frozen,
        meta: {
          title: "冻结审管理"
        }
      }, {
        path: "/payment/paymentlabel/withholding",
        name: "withholding",
        component: withholding,
        meta: {
          title: "扣款单管理"
        }
      }, {
        path: "/payment/paymentlabel/capitalFlow",
        name: "capitalFlow",
        component: capitalFlow,
        meta: {
          title: "资金流水"
        }
      }, {
        path: "/payment/paymentlabel/oainformation",
        name: "oainformation",
        component: oainformation,
        meta: {
          title: "OA批款信息"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddZF",
        name: "paymentAddZF",
        component: PaymentAddZF,
        meta: {
          title: "新增支付申请单"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddYC",
        name: "paymentAddYC",
        component: PaymentAddYC,
        meta: {
          title: "新增预存登记"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddDJ",
        name: "paymentAddDJ",
        component: PaymentAddDJ,
        meta: {
          title: "新增冻结单"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddJD",
        name: "paymentAddJD",
        component: PaymentAddJD,
        meta: {
          title: "资金解冻单"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddPK",
        name: "paymentAddPK",
        component: PaymentAddPK,
        meta: {
          title: "新增批款单"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddKK",
        name: "paymentAddKK",
        component: PaymentAddKK,
        meta: {
          title: "新增扣款单"
        }
      }, {
        path: "/payment/paymentlabel/PaymentAddFK",
        name: "paymentAddFK",
        component: PaymentAddFK,
        meta: {
          title: "付款登记"
        }
      }, {
        path: "/materialquotation/tranrialDetail/detail",
        name: "tranrialDetail",
        component: TranrialDetail,
        meta: {
          title: "报价单明细"
        }
      }, {
        path: "/materialquotation/tranrialDetail/detail/add",
        name: "tranrialAdd",
        component: TranrialAdd,
        meta: {
          title: "添加明细物资"
        }
      }, {
        path: "/materialquotation/tranContractWork",
        name: "tranContractWork",
        component: TranContractWork,
        meta: {
          title: "合同详情"
        }
      }, {
        path: "/customerList",
        name: "customerList",
        component: CustomerList,
        meta: {
          title: "客户列表"
        }
      }, {
        path: "/trancontract",
        name: "trancontract",
        component: TranContract,
        meta: {
          title: "合同信息"
        }
      }, {
        path: "/shippinginfo",
        name: "shippingInfo",
        component: ShippingInfo,
        meta: {
          title: "发货信息"
        }
      }, {
        path: "/shippinginfo/shippingDetails",
        name: "shippingDetails",
        component: ShippingDetails,
        meta: {
          title: "发货单详情"
        }
      }, {
        path: "/shippinginfo/newInvoice",
        name: "newInvoice",
        component: NewInvoice,
        meta: {
          title: "发货单详情"
        }
      }, {
        path: "/shippinginfo/deliveryDetail/detail",
        name: "deliveryDetail",
        component: DeliveryDetail,
        meta: {
          title: "发货单明细"
        }
      }, {
        path: "/tranpayment",
        name: "tranpayment",
        component: TranPayment,
        meta: {
          title: "付款信息"
        }
      }, {
        path: "/trancontract/materialquotation",
        name: "tranrial",
        component: Tranrial,
        meta: {
          title: "报价单详情"
        }
      }, {
        path: "/trancontract/inventory",
        name: "inventory",
        component: Inventory,
        meta: {
          title: "清单详情"
        }
      }, {
        path: "/conPrice/inquirydetails/detail",
        name: "inquirydetails",
        component: InquiryDetails,
        meta: {
          title: "询价单明细详情"
        }
      }, {
        path: "/conprice/contractwork",
        name: "contractwork",
        component: ContractWork,
        meta: {
          title: "材料合同详情"
        }
      }, {
        path: "/details/contractlabor",
        name: "contractlabor",
        component: ContractLabor,
        meta: {
          title: "劳务合同详情"
        }
      }, {
        path: "/annex/comfrim",
        name: "comfrimAnnex",
        component: ComfrimAnnex,
        meta: {
          title: "附件"
        }
      }, {
        path: "/annex/contract",
        name: "contractAnnex",
        component: ContractAnnex,
        meta: {
          title: "合同附件"
        }
      }, {
        path: "/annex/partner",
        name: "partnerAnnex",
        component: PartnerAnnex,
        meta: {
          title: "附件"
        }
      }, {
        path: "/annex/supplier",
        name: "supplierAnnex",
        component: SupplierAnnex,
        meta: {
          title: "附件"
        }
      }
    ]
  }]
});