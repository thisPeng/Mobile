'use strict'
/**
 * @file DATA映射
 * @author DJ
 */
import {
  mapState
} from 'vuex';

export default mapState({
  userInfo: state => {
    return state.userInfo;
  },
  loginInfo: state => {
    return state.loginInfo;
  },
  tabActive: state => {
    return state.tabActive;
  },
  taskModel: state => {
    return state.taskModel;
  },
  taskParams: state => {
    return state.taskParams;
  },
  servePath: state => {
    return state.servePath;
  },
  tabsShow: state => {
    return state.tabsShow;
  }
})