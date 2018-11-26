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
  // 获取首页轮播图
  getBanner() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_NotValidationService",
        _methodName: "GetMobileImage",
        "_parameters[DispayType]": 1,
        _paraNames: "DispayType",
        _pUrl: ""
      }
    });
  },
  // 获取按钮权限
  getAppletButton(LoginUserOID = "", BPOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_CommonService",
        _methodName: "GetAppletButton",
        "_parameters[LoginUserOID]": LoginUserOID,
        "_parameters[BPOID]": BPOID,
        _paraNames: "LoginUserOID,BPOID",
        _pUrl: ""
      }
    });
  },
  // 获取字典配置
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
  // 获取首页版块
  getHomePageInfo(oid = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_NotValidationService",
        _methodName: "GetHomePageInfo",
        "_parameters[LoginUserOID]": oid,
        _paraNames: "LoginUserOID",
        _pUrl: ""
      }
    });
  },
  // 获取工作台
  getGetWorkSpace(oid = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_CommonService",
        _methodName: "GetWorkSpace",
        "_parameters[LoginUserOID]": oid,
        _paraNames: "LoginUserOID",
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
  },
  // 上传文件
  uploadFile(params = {}) {
    return axios({
      url: "/OtherSource/UCMLFileUploadNew.aspx",
      method: "post",
      data: {
        name: params.name,
        Action: "Upload",
        uploadPath: "../SupplyChain/Images/Order",
        file: params.file,
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
  },
  // 新增项目-生成项目编号
  getProjectNO(OrgID = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Project_EditService",
        _methodName: "GetProjectNO",
        "_parameters[OrgID]": OrgID,
        _paraNames: "OrgID",
        _pUrl: ""
      }
    })
  },
  // 新增项目保存
  saveProjectSelf(xmlData = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Project_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 删除项目
  deleteProjectSelf(ProjectID = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Self_ProjectService",
        _methodName: "IsExistsQuote",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    })
  },
  // 获取项目信息
  getParojectPartner(Organize_ID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_BC_SC_SelUnitService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Company_Partner",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": " Status=1 AND SC_Company_Partner.Organize_ID='" + Organize_ID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
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
  getGoodsList(params = {}, page = 0, ProjectID = '') {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_ProductSKU_QueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Vue_Supp_ProductSKU",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": params.SQLCondi + " AND (smt.SPUName LIKE '%" + params.keyword + "%' OR BrandName LIKE '%" + params.keyword + "%') AND ComSupplier.Organize_ID=(select top 1 Organize_ID from sc_company where CoStatus=1 and IsDefault='1') " +
          (ProjectID ? "AND (ProjectID='" + ProjectID + "' OR ProjectID Is Null OR SC_IntentionSKUOID IN (SELECT MAX(SC_IntentionSKUOID) AS SC_IntentionSKUOID FROM SC_IntentionSKU WHERE ProjectID<>'" + ProjectID + "' AND Supp_SKU_ID NOT IN (SELECT Supp_SKU_ID FROM SC_IntentionSKU WHERE ProjectID='" + ProjectID + "') GROUP BY Supp_SKU_ID))" : ""),
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
    ProjectID = "",
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
        _bpoName: "BPO_Vue_ProductSKU_QueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Vue_Supp_ProductSKU",
        "_parameters[nStartPos]": StartPos,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Supp_ProductSKU.SupplierID='" + SupplierID + "' AND (SC_SMaterialType_FK in (select SC_SMaterialTypeOID from SC_SMaterialType where SC_SMaterialType_FK='" + SC_SMaterialType_FK + "') OR SC_SMaterialType_FK = '" + SC_SMaterialType_FK + "' )" + " AND (smt.SPUName LIKE '%" + keyword + "%' OR BrandName LIKE '%" + keyword + "%') AND ComSupplier.Organize_ID=(select top 1 Organize_ID from sc_company where CoStatus=1 and IsDefault='1') " +
          (ProjectID ? "AND (ProjectID='" + ProjectID + "' OR ProjectID Is Null OR SC_IntentionSKUOID IN (SELECT MAX(SC_IntentionSKUOID) AS SC_IntentionSKUOID FROM SC_IntentionSKU WHERE ProjectID<>'" + ProjectID + "' AND Supp_SKU_ID NOT IN (SELECT Supp_SKU_ID FROM SC_IntentionSKU WHERE ProjectID='" + ProjectID + "') GROUP BY Supp_SKU_ID))" : ""),
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
        "_parameters[IsDel]": params.IsDel,
        _paraNames: "OIDCheckList,PartnerID,SupplierID,ProjectID,DemandID,PurchaseOrderID,IsDel",
        _pUrl: ""
      }
    });
  },
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
  userType(UCML_OrganizeOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_CommonService",
        _methodName: "GetUserRole",
        "_parameters[UCML_OrganizeOID]": UCML_OrganizeOID,
        _paraNames: "UCML_OrganizeOID",
        _pUrl: ""
      }
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
  //获取工程商用户信息
  getCompanyUserInfo(SC_CompanyOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Company_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Company",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_CompanyOID='" + SC_CompanyOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //获取合作商用户信息
  getUserInfo(SC_PartnerOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Partner_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_PartnerOID='" + SC_PartnerOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //获取供应商用户信息
  getSupplierUserInfo(Company_SupplierID = "") {
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
        "_parameters[SQLCondi]": "SupplierID='" + Company_SupplierID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
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
  //合作商保存用户数据信息
  saveMessage(xmlData = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Partner_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  //供应商保存用户数据信息
  saveMessageSupplier(xmlData = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Supplier_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  //工程商保存用户数据信息
  saveMessageCompany(xmlData = "") {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_CompanyFormService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
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
  //获取劳务供应商列表
  getSupplierDetails(DemandID = "", keyword = "", page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Labor_SelSuppService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Purchase_Supplier",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "' AND SupplierName like '%" + keyword + "%'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //提交供应商审核
  SubmitSupplier(BusinessKey = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Company_SupplierService",
        _methodName: "__StartFlow",
        "_parameters[FlowID]": "FLow_10604VER10",
        "_parameters[DeltaXml]": "<root></root>",
        "_parameters[BusinessKey]": BusinessKey,
        _paraNames: "FlowID,DeltaXml,BusinessKey",
        _pUrl: ""
      }
    })
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
  // 获取供应商收藏状态
  getColectStatus(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "GetColectStatus",
        "_parameters[PartnerID]": params.pid,
        "_parameters[SupplierID]": params.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  },
  // 获取供应商详情
  getSuppInfo(SupplierID = "") {
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
        "_parameters[SQLCondi]": "SupplierID='" + SupplierID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取供应商详情-未登录
  getSupplieInfo(SupplierID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supplier_CompleteService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_SupplierOID='" + SupplierID + "'",
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
  // 支付申请-提交支付申请流程
  submitAuditSheet(sc_oid = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "AuditSheet",
        "_parameters[sc_oid]": sc_oid,
        "_parameters[DemandID]": DemandID,
        _paraNames: "sc_oid,DemandID",
        _pUrl: ""
      }
    });
  },
  // 提交支付申请流程
  submitPayment(BusinessKey = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "__StartFlow",
        "_parameters[FlowID]": "FLow_10501VER10",
        "_parameters[DeltaXml]": "<root></root>",
        "_parameters[BusinessKey]": BusinessKey,
        _paraNames: "FlowID,DeltaXml,BusinessKey",
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
  getWaitData(page, FlowID = '') {
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
        "_parameters[SQLCondi]": " FlowID='" + FlowID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
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
        "_parameters[nRecords]": -1,
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
        "_parameters[nRecords]": -1,
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
  getList(ProjectID = "") {
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
  getIntentionSKU(Supp_SKU_ID = "", ProjectID = "") {
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
        "_parameters[SQLCondi]": "SC_IntentionSKU.Supp_SKU_ID ='" + Supp_SKU_ID + "' AND SC_IntentionSKU.ProjectID='" + ProjectID + "'",
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
        "_parameters[Type]": 0,
        _paraNames: "ProjectID,Type",
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
  getDetails(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
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
  // 确认订单
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
  // 提议
  conProposal(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "feedbackSpupplier",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    });
  },
  // 发送订单
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
  // 删除询价单
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
        "_parameters[nRecords]": -1,
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
  conUpdateDelete(PurchaseOrderID = "") {
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
  getList(ProjectID = "", Type = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Contract_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[ProjectID]": ProjectID,
        "_parameters[Type]": Type,
        _paraNames: "ProjectID,Type",
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
        _paraNames: "ContractID,Contract_Type",
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
  // 保存劳务合同
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
//获取合作商信息
const arrival = {
  // 到货信息
  getList(ProjectID = "", Type = 1) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Deliver_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[ProjectID]": ProjectID,
        "_parameters[Type]": Type,
        _paraNames: "ProjectID,Type",
        _pUrl: ""
      }
    });
  },
  // 发货单编辑
  getInvoice(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
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
  // 发货单明细
  getItemInvoice(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Deliver_DetailOID='" + DeliverID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 发货单编辑
  getInvoiceEdit(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
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
  //保存修改
  saveKeepRevise(xmlData) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  //签收
  signOrder(BillOID = "") {
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
};
//付款信息模块
const financial = {
  // 工作台知会-已读
  updateReadInfo(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Vue_CommonService",
        _methodName: "UpdateReadInfo",
        "_parameters[BPOName]": params.BPOName,
        "_parameters[key_value]": params.key_value,
        _paraNames: "BPOName,key_value",
        _pUrl: ""
      }
    })
  },
  // 获取支付详情
  getPayInfo(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Pay_Apply",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Pay_ApplyOID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
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
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Money_InOutOID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //删除支付申请，
  deletePayBill(sc_id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Apply_InfoService",
        _methodName: "DeleteBill",
        "_parameters[sc_id]": sc_id,
        _paraNames: "sc_id",
        _pUrl: ""
      }
    })
  },
  //删除预存列表
  deleteStored(sc_id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_YC_InfoService",
        _methodName: "DeleteBill",
        "_parameters[sc_id]": sc_id,
        _paraNames: "sc_id",
        _pUrl: ""
      }
    })
  },
  //新增支付单-获取单号
  getSheetNo(SheetType = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "GetSheetNo",
        "_parameters[SheetType]": SheetType,
        _paraNames: "SheetType",
        _pUrl: ""
      }
    })
  },
  //新增支付单保存
  payConservation(xmlData) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  //新增支付单-获取供应商列表
  getSupplierList(ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_OAPay_SelSuppService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_PaySupplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_SupplierOID IN (SELECT SupplierID FROM SC_Order_Contract WHERE Approve_Flag<>'0' AND ProjectID = '" + ProjectID + "' GROUP BY SupplierID)",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //新增支付单-获取项目列表
  getProjectList(PartnerID = "", ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_ProjectListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Project",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": " PartnerID='" + PartnerID + "' and sc_project.DemandID = (select top 1 DemandID from sc_project where PartnerID='" + PartnerID + "' and SC_ProjectOID= '" + ProjectID + "') and (SC_ProjectOID<>'" + ProjectID + "')",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //支付申请列表
  getPaymentList(page = 0, filters = "") {
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
        "_parameters[SQLCondi]": " Sheet_Type='SQ' " + filters,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //新增预存单-获取单号
  getMemorySheetNo(SheetType = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "GetSheetNo",
        "_parameters[SheetType]": SheetType,
        _paraNames: "SheetType",
        _pUrl: ""
      }
    })
  },
  // 上传图片
  uploadImage(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: params.bpoName,
        _methodName: "UploadImageByBase64",
        "_parameters[UserPhoto]": params.UserPhoto,
        "_parameters[PhotoName]": params.PhotoName,
        _paraNames: "UserPhoto,PhotoName",
        _pUrl: ""
      }
    })
  },
  //新增预存单保存
  preMemoryConservation(xmlData) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 解冻单-保存调用
  updateOrigID(OrigID = "", parentOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_JD_InOutFormService",
        _methodName: "UpdateOrigID",
        "_parameters[OrigID]": OrigID,
        "_parameters[parentOID]": parentOID,
        _paraNames: "OrigID,parentOID",
        _pUrl: ""
      }
    })
  },
  //预存单-提交前先调用
  submitPremomery(sc_oid = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "AuditSheet",
        "_parameters[sc_oid]": sc_oid,
        "_parameters[DemandID]": DemandID,
        _paraNames: "sc_oid",
        _pUrl: ""
      }
    })
  },
  //提交-预存单
  conservationSubmit(BusinessKey = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "__StartFlow",
        "_parameters[FlowID]": "FLow_10002VER10",
        "_parameters[DeltaXml]": "<root></root>",
        "_parameters[BusinessKey]": BusinessKey,
        _paraNames: "FlowID,DeltaXml,BusinessKey",
        _pUrl: ""
      }
    })
  },
  //预存列表
  getPremomey(PartnerID = "", page = 0, filter = "") {
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
        "_parameters[SQLCondi]": "(SC_Money_InOut.PartnerID='" + PartnerID + "' OR SC_Money_InOut.DemandID='" + PartnerID + "') AND SC_Money_InOut.Sheet_Type='YC' " + filter,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //支付信息
  getPaymentInfo(PartnerID = "", page = 0, filter = "") {
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
        "_parameters[SQLCondi]": "(SC_Money_InOut.PartnerID='" + PartnerID + "' OR SC_Money_InOut.DemandID='" + PartnerID + "') AND SC_Money_InOut.Sheet_Type='FK' " + filter,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  PaymentExamine(sc_oid = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Pay_Info_EditService",
        _methodName: "AuditSheet",
        "_parameters[sc_oid]": sc_oid,
        _paraNames: "sc_oid",
        _pUrl: ""
      }
    })
  },
  //批款信息
  getApproInfo(PartnerID = "", page = 0, filter = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_PK_InOutListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_InOut",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "(SC_Money_InOut.PartnerID='" + PartnerID + "' OR SC_Money_InOut.DemandID='" + PartnerID + "') AND SC_Money_InOut.Sheet_Type='PK' " + filter,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY ProjectName",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //冻结列表
  getFrozen(PartnerID = "", page = 0, filter = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_DJ_InOutListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_DJ_Money_InOut",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "(SC_Money_InOut.PartnerID='" + PartnerID + "' OR SC_Money_InOut.DemandID='" + PartnerID + "') AND SC_Money_InOut.Sheet_Type='DJ' " + filter,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //扣款信息
  getWithInfo(PartnerID = "", page = 0, filter = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_KK_InOutListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_InOut",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "(SC_Money_InOut.PartnerID='" + PartnerID + "' OR SC_Money_InOut.DemandID='" + PartnerID + "') AND SC_Money_InOut.Sheet_Type='KK' " + filter,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //资金流水
  getClahFlow(ProjectID = "", page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_FlowService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Proj_Balance",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ProjectID='" + ProjectID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //资金流水子表
  getClahFlowDetails(ProjectID = "", page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Money_FlowService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_Flow",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ProjectID ='" + ProjectID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  //OA批款信息
  getAppropriation(ProjectID = "", page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Finance_OAPayService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_OAPay_Info",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_OAPay_Info.ProjectID ='" + ProjectID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 新增单据-获取项目列表
  getProject(oid = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_ProjectService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Project",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": " (Project_Type = '2' or Project_Type = '4') AND (SC_Project.DemandID='" + oid + "' or SC_Project.PartnerID='" + oid + "')",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 保存单据
  saveOrder(bpoName = "", xmlData = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: bpoName,
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 提交前调用-启动流程
  startFlow(bpoName = "", sc_oid = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: bpoName,
        _methodName: "AuditSheet",
        "_parameters[sc_oid]": sc_oid,
        "_parameters[DemandID]": DemandID,
        _paraNames: "sc_oid",
        _pUrl: ""
      }
    })
  },
  // 提交单据
  submitOrder(bpoName = "", FlowID = "", BusinessKey = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: bpoName,
        _methodName: "__StartFlow",
        "_parameters[FlowID]": FlowID,
        "_parameters[DeltaXml]": "<root></root>",
        "_parameters[BusinessKey]": BusinessKey,
        _paraNames: "FlowID,DeltaXml,BusinessKey",
        _pUrl: ""
      }
    })
  },
  //删除单据
  deleteOrder(bpoName = "", sc_id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: bpoName,
        _methodName: "DeleteBill",
        "_parameters[sc_id]": sc_id,
        _paraNames: "sc_id",
        _pUrl: ""
      }
    })
  }
}
//供应商模块
const offer = {
  // 客户信息
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
  // 供应商物质报价
  getPriceList(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPriceService",
        _methodName: "getBCColumnsForJS",
        "_parameters[PartnerID]": parasm.pid,
        "_parameters[SupplierID]": parasm.sid,
        "_parameters[Type]": parasm.type,
        _paraNames: "PartnerID,SupplierID,Type",
        _pUrl: ""
      }
    });
  },
  // 报价单编辑
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
  // 报价单明细
  getTranDetails(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
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
  // 报价单明细删除
  deleteTranDetails(PurchaseOrderID = "", DetailOIDList = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "DeleteRec",
        "_parameters[PurchaseOrderID]": PurchaseOrderID,
        "_parameters[DetailOIDList]": DetailOIDList,
        _paraNames: "PurchaseOrderID,DetailOIDList",
        _pUrl: ""
      }
    })
  },
  // 保存物资明细
  saveTranDetails(xmlData) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 提交报价
  getPriceButton(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
        _methodName: "SendToPartner",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  },
  //询价单明细删除增加后更新主表的合计和数量
  setUpdateDelete(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "UpdateDetailSum",
        "_parameters[DeliverID]": DeliverID,
        _paraNames: "DeliverID",
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
        "_parameters[Type]": parasm.type,
        _paraNames: "PartnerID,SupplierID,Type",
        _pUrl: ""
      }
    })
  },
  //发货单明细保存按钮
  saveGoodsDetail(xmlData) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 立即发货
  sendDeliveryOption(BillOID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "ConfirmBill",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  },
  //发货单详情
  getDeliveryDetail(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Master",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
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
  // 发货单明细
  getDeliveryDetails(DeliverID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Deliver_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
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
  // 发货单明细删除
  deleteDeliveryDetails(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_List_EditService",
        _methodName: "DeleteRec",
        "_parameters[DeliverID]": params.DeliverID,
        "_parameters[DetailOIDList]": params.DetailOIDList,
        _paraNames: "DeliverID,DetailOIDList",
        _pUrl: ""
      }
    })
  },
  //付款信息
  getPayment(SupplierID = "") {
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
        "_parameters[SQLCondi]": "SC_Money_InOut.SupplierID='" + SupplierID + "' AND SC_Money_InOut.Approve_Flag=1" +
          " AND SC_Money_InOutOID not in (SELECT Key_Value FROM SC_ReadBill_Info WHERE UserOID='" + SupplierID +
          "' AND Table_Name='SC_Money_InOut' AND Read_Flag='1')",
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
        "_parameters[Type]": parasm.type,
        _paraNames: "PartnerID,SupplierID,Type",
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
        "_parameters[nRecords]": -1,
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
  // 是否存在发货单
  checkContractList(ContractList = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_DetailService",
        _methodName: "CheckContractList",
        "_parameters[ContractList]": ContractList,
        _paraNames: "ContractList",
        _pUrl: ""
      }
    })
  },
  // 发货单合同详情
  getShipped(SupplierID = "") {
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
        "_parameters[SQLCondi]": "SupplierID='" + SupplierID + "'" + " AND (Approve_Flag='1'  or Approve_Flag='2')",
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
  // 保存发货单
  deleteDeliverOrder(BillOID = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Deliver_ListService",
        _methodName: "DeleteBill",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    })
  }
};

// 附件模块
const annex = {
  // 工程/合作商-询价单附件
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
  // 供应商-报价单附件
  getTranAnnex(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPrice_EditService",
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
    })
  },
  // 合同附件
  getContractAnnex(PurchaseOrderID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_EditService",
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
    })
  },
  // 合作商-资料附件
  getPartnerAnnex(PartnerID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Partner_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner_DOCData",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "PartnerID='" + PartnerID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 供应商-资料附件
  getSupplierAnnex(SupplierID = "") {
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
  },
  // 保存确认订单-附件
  saveAnnex(xml) {
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
  },
  // 保存合作商-资料附件
  savePartnerAnnex(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Partner_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 保存供应商-资料附件
  saveSupplierAnnex(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_Supplier_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  // 删除附件
  deleteAnnex(path = "") {
    return axios({
      url: "/OtherSource/UCMLFileUploadNew.aspx",
      method: "post",
      data: {
        Action: "Delete",
        filePath: path
      }
    })
  }
}

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
  offer,
  financial,
  annex
};