'use strict'
/**
 * @file DATA映射
 * @author DJ
 */
import { mapState } from 'vuex';

export default mapState({
  userInfo: state => {
    return state.userInfo;
  },
  tabActive: state => {
    return state.tabActive;
  },
  taskModel: state => {
    return state.taskModel;
  }
})