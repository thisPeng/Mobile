import axios from "./request";

// 登录页面
const login = {
  // 账号、密码验证
  validate(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_CompleteTaskMobileService",
        _methodName: "LoginMobile",
        "_parameters[UserName]": params.loginName,
        "_parameters[Password]": params.password,
        "_parameters[DeviceID]": "",
        _paraNames: "UserName,Password,DeviceID",
        _pUrl: ""
      }
    });
  }
};

const index = {
  // 获取首页数据
  getData() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=HOME_MSG"
    });
  },
  getConfig(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_CodeValueService",
        _methodName: "GetCodeValue",
        "_parameters[UserOrgOID]": params.id,
        "_parameters[CodeTableID]": params.code,
        _paraNames: "UserOrgOID,CodeTableID",
        _pUrl: ""
      }
    });
  },
  // 获取省市区数据
  getRegional(BCName = "BC_SC_RegionalData_P", SQLCondi = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": BCName, //省: BC_SC_RegionalData_P     市: BC_SC_RegionalData_C    区: BC_SC_RegionalData_X
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": SQLCondi,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  }
};

const project = {
  // 获取项目列表
  getProjectList(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "GetProjectInfo",
        "_parameters[UserID]": params.oid,
        "_parameters[ProjectType]": params.type,
        _paraNames: "UserID,ProjectType",
        _pUrl: ""
      }
    });
  },
  // 获取项目信息
  getParojectInfo(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Project_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Project",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": " SC_ProjectOID='" + id + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  }
};

// 消息页面
const message = {
  // 获取消息列表
  getData() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=HOME_MSG"
    });
  },
  // 获取系统消息
  getMessage() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    });
  },
  // 获取未读消息
  getUnReadMsg(page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SYS_v_OAUserMsg_Unread",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取已读系统
  getReadMsg(page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SYS_v_OAUserMsg_Read",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 标记已读
  markRead(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "MarkRead",
        "_parameters[OIDs]": id,
        _paraNames: "OIDs",
        _pUrl: ""
      }
    });
  },
  // 删除信息
  deleteMsg(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "DeleteOAMessageReceivers",
        "_parameters[OIDs]": id,
        _paraNames: "OIDs",
        _pUrl: ""
      }
    });
  }
};

const classify = {
  // 所有物资分类
  getProductType() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_MaterialTypeTreeService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    });
  },
  // 获取物资筛选项
  getGoodsFilter(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "Get_MtlTypeForJS",
        "_parameters[MaterialTypeID]": params.MaterialTypeID,
        "_parameters[BrandName]": params.BrandName,
        "_parameters[SKUList]": params.SKUList,
        _paraNames: "MaterialTypeID,BrandName,SKUList",
        _pUrl: ""
      }
    });
  },
  // 获取物资列表
  getGoodsList(params = {}, page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": params.SQLCondi + " AND smt.SPUName LIKE '%" + params.keyword + "%' ",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": params.SQLFix,
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 供应商物资分类
  getSupplierType(SupplierID = "", ParentID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_SMaterialTypeTreeService",
        _methodName: "Get_SC_SMaterialType",
        "_parameters[SupplierID]": SupplierID,
        "_parameters[ParentID]": ParentID,
        _paraNames: "SupplierID,ParentID",
        _pUrl: ""
      }
    });
  },
  // 获取供应商物资
  getSuppGoods(
    SupplierID = "",
    SC_SMaterialType_FK = "",
    keyword = "",
    SQLFix = "",
    StartPos = 0
  ) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProductSKUQueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[nStartPos]": StartPos,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Supp_ProductSKU.SupplierID='" +
          SupplierID +
          "' AND (SC_SMaterialType_FK in (select SC_SMaterialTypeOID from SC_SMaterialType where SC_SMaterialType_FK='" +
          SC_SMaterialType_FK +
          "') OR SC_SMaterialType_FK = '" +
          SC_SMaterialType_FK +
          "' )" + " AND smt.SPUName LIKE '%" + keyword + "%' ",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": SQLFix,
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 添加购物车
  addCart(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "SaveIntentionSKU",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[OIDCheckList]": params.OIDCheckList,
        "_parameters[PartnerID]": params.PartnerID,
        "_parameters[ProjectID]": params.ProjectID,
        "_parameters[DemandID]": params.DemandID,
        _paraNames: "OIDCheckList,PartnerID,ProjectID,DemandID",
        _pUrl: ""
      }
    });
  },
  // 询价单-添加物资
  addCartForOrder(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProductSKUQueryService",
        _methodName: "SaveIntentionSKU",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[OIDCheckList]": params.OIDCheckList,
        "_parameters[PartnerID]": params.PartnerID,
        "_parameters[SupplierID]": params.SupplierID,
        "_parameters[ProjectID]": params.ProjectID,
        "_parameters[DemandID]": params.DemandID,
        "_parameters[PurchaseOrderID]": params.PurchaseOrderID,
        _paraNames: "OIDCheckList,PartnerID,SupplierID,ProjectID,DemandID,PurchaseOrderID",
        _pUrl: ""
      }
    });
  }
};

// 应用页
const apply = {
  // 获取应用数据
  getData() {
    return axios({
      url: "/ucml_mobile/getMenuCount_new.ashx"
    });
  }
};

// 通讯录
const contact = {
  // 获取通讯录列表
  getList() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ORG"
    });
  },
  // 获取列表详情
  getListData(id = "") {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ORG_SUB&OID=" + id
    });
  }
};

const users = {
  // 编辑用户信息
  exit() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ExitSystem"
    });
  },
  // 获取用户信息
  userInfo() {
    return axios({
      url: "ucml_mobile/select_User_Org_Mobile.ashx?type=MYINFO"
    });
  },
  // 获取用户ID
  userId(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Project_EditService",
        _methodName: "GetUserInfoOrgOID",
        "_parameters[UserOID]": id,
        _paraNames: "UserOID",
        _pUrl: ""
      }
    });
  },
  // 更新用户密码
  updatePwd(params = {}) {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_ChangePWD_WXService",
        _methodName: "DoChangePassword",
        "_parameters[OldPassWord]": params.oldPwd,
        "_parameters[NewPassWord]": params.newPwd,
        "_parameters[ConfirmPassWord]": params.cfmPwd,
        _paraNames: "OldPassWord,NewPassWord,ConfirmPassWord",
        _pUrl: ""
      }
    });
  },
  // 保存用户信息
  saveInfo(params = {}) {
    return axios({
      url: "ucml_mobile/select_User_Org_Mobile.ashx?type=CHANGEINFO&sex=" +
        params.sex +
        "&telno=" +
        params.telno +
        "&email=" +
        params.email +
        "&worktelno=" +
        params.worktelno
    });
  },
  // 获取统计数据
  getDemandData(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_ViewPage_InfoService",
        _methodName: "GetViewPageInfo",
        "_parameters[LoginUserOID]": id,
        _paraNames: "LoginUserOID",
        _pUrl: ""
      }
    });
  }
};

const supplier = {
  // 供应商所有列表
  getAllList(page, keyword = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_SupplierListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Purchase_Supplier",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "' AND SC_Supplier.SupplierName LIKE '%" + keyword + "%'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 常用供应商列表
  getList(page = 0, keyword = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner_Supplier",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "' AND supp.SupplierName LIKE '%" + keyword + "%'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 所有常用供应商列表
  getSuppList(DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner_Supplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 收藏供应商
  addCollect(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_SupplierListService",
        _methodName: "CollectSupplier",
        "_parameters[PartnerID]": params.pid,
        "_parameters[SupplierID]": params.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  },
  // 取消收藏供应商
  cancelCollect(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "UnCollectSupplier",
        "_parameters[PartnerID]": params.pid,
        "_parameters[SupplierID]": params.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  },
  // 获取供应商详情
  getSuppInfo(DemandID = "", SupplierID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Company_Supplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "Organize_ID='" + DemandID + "' AND SupplierID='" + SupplierID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取供应商待办ID
  getSuppTaskId(DemandID = "", SupplierID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_SupplierListService",
        _methodName: "GetCompanySupplier",
        "_parameters[DemandID]": DemandID,
        "_parameters[SupplierID]": SupplierID,
        _paraNames: "DemandID,SupplierID",
        _pUrl: ""
      }
    });
  }
};

// 我的待办
const task = {
  //获取供应商审核（询价单主表）
  getInquiry(SQLCondi = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Company_Supplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": SQLCondi,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 提交供应商申请
  submitInquiry(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "__StartFlow",
        "_parameters[FlowID]": params.FlowID,
        "_parameters[DeltaXml]": params.DeltaXml,
        "_parameters[BusinessKey]": params.BusinessKey,
        _paraNames: "FlowID,DeltaXml,BusinessKey",
        _pUrl: ""
      }
    });
  },
  // 获取我的待办
  getWaitData(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_TASKTICKETService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_WF_AssignTask",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY AssignTask.SYS_Created DESC",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取已完成待办数据
  getCompleteData(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_CompleteTaskService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_WF_CompletedTask",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY AssignTask.SYS_Created DESC",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取预存详情
  getTaskYCInfo(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_InOut",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "InstanceID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付详情
  getTaskZFInfo(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Pay_Apply",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "InstanceID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付项目资金
  getTaskZFMoney(ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "GetProjectInfo",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  // 读取流程数据
  getFlowAssignData(InstanceID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "GetFlowAssignData",
        "_parameters[InstanceID]": InstanceID,
        _paraNames: "InstanceID",
        _pUrl: ""
      }
    });
  },
  // 读取审核意见列表
  getViewList(InstanceID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "GetFlowAssignIdea",
        "_parameters[InstanceID]": InstanceID,
        _paraNames: "InstanceID",
        _pUrl: ""
      }
    });
  },
  // 重新提交
  submitTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": parasm.DeltaXml,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
        _pUrl: ""
      }
    });
  },
  // 支付重新提交
  submitZFTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_Apply_InfoService",
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": parasm.DeltaXml,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
        _pUrl: ""
      }
    });
  },
  // 保存并完成任务
  saveTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": `<root>` +
          `<BC_WF_AssignTask_Idea UpdateKind="ukModify">` +
          `<AssignTaskOID>` +
          parasm.TaskOID +
          `</AssignTaskOID>` +
          `<resolutionCode>null</resolutionCode>` +
          `<Idea>null</Idea>` +
          `<IdeaCode>null</IdeaCode>` +
          `<BusiField1>null</BusiField1>` +
          `<BusiField2>null</BusiField2>` +
          `<InstanceID>` +
          parasm.InstanceID +
          `</InstanceID>` +
          `</BC_WF_AssignTask_Idea>` +
          `<BC_WF_AssignTask_Idea UpdateKind="">` +
          `<AssignTaskOID>null</AssignTaskOID>` +
          `<resolutionCode>null</resolutionCode>` +
          `<Idea>` +
          parasm.viewText +
          `</Idea>` +
          `<IdeaCode>` +
          parasm.code +
          `</IdeaCode>` +
          `<BusiField1>` +
          parasm.text +
          `</BusiField1>` +
          `<BusiField2>` +
          parasm.code +
          `</BusiField2>` +
          `<InstanceID>null</InstanceID>` +
          `</BC_WF_AssignTask_Idea>` +
          `</root>`,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
        _pUrl: ""
      }
    });
  }
};
// 购物车
const cart = {
  // 获取购物车列表
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_IntentionSKU.ProjectID ='" + ProjectID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY SupplierName ASC",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取购物车列表
  getAllList() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    });
  },
  // 删除购物车物资
  delCartMaterials(IntentionSKUOID = '') {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "DeleteRec",
        "_parameters[IntentionSKUOID]": IntentionSKUOID,
        _paraNames: "IntentionSKUOID",
        _pUrl: ""
      }
    });
  },
  // 购物车选择
  cartSelect(ProjectID = "", OIDList = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "SetBillSelect",
        "_parameters[ProjectID]": ProjectID,
        "_parameters[OIDList]": OIDList,
        _paraNames: "ProjectID,OIDList",
        _pUrl: ""
      }
    });
  },
  // 保存购物车
  saveCart(xmlData = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    });
  },
  // 提交询价
  addOrder(PartnerID = "", ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "CreateOrderBill",
        "_parameters[PartnerID]": PartnerID,
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "PartnerID,ProjectID",
        _pUrl: ""
      }
    });
  }
};
//获取确定价格信息
const conprice = {
  getList(ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJService",
        _methodName: "getBCColumnsForJS",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  //获取确认价格详情
  getInfo(PurchaseOrderID = "", page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Master",
        "_parameters[nStartPos]": page * 20,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_MasterOID  = '" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //获取询价单明细详情
  getDetails(PurchaseOrderID = "", nStartPos = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": nStartPos,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "PurchaseOrderID='" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 询价单附件
  getAnnex(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_DOCData",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "PurchaseOrderID='" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //确认订单
  confrimPrice(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "ConfirmOrderBill",
        "_parameters[PurchaseOrderID]": PurchaseOrderID,
        _paraNames: "PurchaseOrderID",
        _pUrl: ""
      }
    });
  },
  //提议
  conProposal(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "SendToSupplier",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    });
  },
  //发送订单
  sendOrder(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "SendToSupplier",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    });
  },
  //删除询价单
  confirmDelete(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "DeleteOrderBill",
        "_parameters[BillOID]": params.BillOID,
        "_parameters[ContractID]": params.ContractID,
        _paraNames: "BillOID,ContractID",
        _pUrl: ""
      }
    });
  },
  // 合同编辑
  conContract(ContractOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Contract",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_ContractOID='" + ContractOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //询价单明细删除
  conDetailsDelete(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "DeleteRec",
        "_parameters[PurchaseOrderID]": params.PurchaseOrderID,
        "_parameters[DetailOIDList]": params.DetailOIDList,
        _paraNames: "PurchaseOrderID,DetailOIDList",
        _pUrl: ""
      }
    })
  },
  //询价单明细删除增加后更新主表的合计和数量
  conUpdateDelete(PurchaseOrderID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "UpdateDetailSum",
        "_parameters[PurchaseOrderID]": PurchaseOrderID,
        _paraNames: "PurchaseOrderID",
        _pUrl: ""
      }
    })
  }
};
// 获取合同信息
const contractInfo = {
  // 获取合同列表
  getList(ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Contract_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  // 合同回退
  returnContract(ContractID = "", Contract_Type = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Contract_ListService",
        _methodName: "ReturnContract",
        "_parameters[ContractID]": ContractID,
        "_parameters[Contract_Type]": Contract_Type,
        _paraNames: "ContractID, Contract_Type",
        _pUrl: ""
      }
    });
  },
  // 保存合同信息
  saveContract(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 合同盖章
  updateSealFlag(ContractID = "", Seal_Flag = 2) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Contract_ListService",
        _methodName: "UpdateSealFlag",
        "_parameters[ContractID]": ContractID,
        "_parameters[Seal_Flag]": Seal_Flag,
        _paraNames: "ContractID, Seal_Flag",
        _pUrl: ""
      }
    })
  },
  // 获取劳务合同
  getLaborList(ContractOID = "", BCName = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Labor_Contract_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": BCName, //BC_Labor_Contract 劳务合同   BC_SC_Contract_Valuation 合同计价方式   BC_SC_Contract_Pay 合同付款补充 	 BC_Labor_Contract_Detail 劳务合同附表
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_ContractOID='" + ContractOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //
  keepContract(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  }
};
//获取到货信息
const arrival = {
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Deliver_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  //发货单编辑
  getInvoice(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  getItemInvoice(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //发货单明细
  getInvoiceEdit(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  getInvoiceEdits(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //签收
  getSign(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Deliver_ListService",
        _methodName: "ReceiveBill",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  },
  //提议
  getOffer(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Deliver_ListService",
        _methodName: "SaveToSupplier",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  },
  // 发货单明细删除
  getDeleteOffer(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "DeleteRec",
        "_parameters[PurchaseOrderID]": params.PurchaseOrderID,
        "_parameters[DetailOIDList]": params.DetailOIDList,
        _paraNames: "PurchaseOrderID,DetailOIDList",
        _pUrl: ""
      }
    })
  },
  //支付申请列表
  getPaymentList(ProjectID = "", page = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Apply_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Pay_Apply",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Pay_Apply.ProjectID ='" + ProjectID + "'" + " AND Sheet_Type='SQ'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //预存列表
  getPremomey(ProjectID = "", page = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_YC_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_InOut",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Money_InOut.ProjectID ='" + ProjectID + "'" + " AND Sheet_Type='YC'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //支付信息
  getPaymentInfo(ProjectID = "", page = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Pay_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_FK_Money_InOut",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Money_InOut.ProjectID ='" + ProjectID + "'" + " AND SC_Money_InOut.Sheet_Type='FK'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  }
};
//供应商模块
const offer = {
  //客户信息
  getClientList(UCML_OrganizeOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supplier_TradeService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Supplier_Organize",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "UCML_OrganizeOID in (select PartnerID from sc_order_contract  where SupplierID ='" + UCML_OrganizeOID + "' Group By PartnerID) ",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //供应商物质报价
  getPriceList(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPriceService",
        _methodName: "getBCColumnsForJS",
        "_parameters[PartnerID]": parasm.pid,
        "_parameters[SupplierID]": parasm.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  },
  //报价单编辑
  getTranrial(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_MasterOID='" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  getTranDetails(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_MasterOID='" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //提交报价
  getPriceButton(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPriceService",
        _methodName: "SendToPartner",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  },
  //发货信息
  getDelivery(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[PartnerID]": parasm.pid,
        "_parameters[SupplierID]": parasm.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    })
  },
  //发货单编辑
  getDeliveryDetail(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  getDeliveryDetails(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_MasterOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //付款信息
  getPayment(SupplierID = "", PartnerID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Finance_SuppPayService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_FK_Money_InOut",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SupplierID='" + SupplierID + "'" + " AND SC_Money_InOut.PartnerID='" + PartnerID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //合同信息
  getContract(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supplier_Contract_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[PartnerID]": parasm.pid,
        "_parameters[SupplierID]": parasm.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    })
  },
  //清单明细
  getContractDetail(ContractID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Order_DetailService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ContractID ='" + ContractID + "'" + " AND SheetType='PO'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 新增发货单 - 刷新未发货的数据
  getNotShippded(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "UpdateDeliverStatus",
        "_parameters[SupplierID]": params.suid,
        "_parameters[PartnerID]": params.paid,
        "_parameters[ProjectID]": params.prid,
        _paraNames: "PartnerID,ProjectID,SupplierID",
        _pUrl: ""
      }
    })
  },
  // 发货单合同详情
  getShipped(PartnerID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_DetailService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Contract",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ProjectID ='" + PartnerID + "'" + " AND (Approve_Flag = '1'  or Approve_Flag='2' )",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 发货单物资明细
  getShipping(SC_Order_ContractOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Order_DetailService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SheetType='PO' AND Deliver_Select<>2 and ContractID='" + SC_Order_ContractOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 保存发货单
  saveDeliverBill(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_DetailService",
        _methodName: "SaveDeliverBill",
        "_parameters[SupplierID]": parasm.SupplierID,
        "_parameters[PartnerID]": parasm.PartnerID,
        "_parameters[ProjectID]": parasm.ProjectID,
        "_parameters[ContractList]": parasm.ContractList,
        "_parameters[DetailIDList]": parasm.DetailIDList,
        _paraNames: "SupplierID,PartnerID,ProjectID,ContractList,DetailIDList",
        _pUrl: ""
      }
    })
  },
  // 供应商附件
  getTranAnnex(SupplierID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supplier_DOCData",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SupplierID='" + SupplierID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  }
};

export {
  login,
  index,
  project,
  classify,
  apply,
  message,
  contact,
  users,
  supplier,
  task,
  cart,
  conprice,
  contractInfo,
  arrival,
  offer
};