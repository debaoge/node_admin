import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    routesAdded : false,
    isCollapsed: false,
    // userInfo:{
    //   username:"",
    //   password:"",
    //   role:"",
    //   introduction:"",
    //   avatar:"",
    //   gender:0
    // }，
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {} // 初始化时从 localStorage 读取

  },
  getters: {
  },
  mutations: {
    changeRoutesAdded(state, routesAdded){
      state.routesAdded = routesAdded
    },
    changeIsCollapsed(state, value){
      state.isCollapsed = value
    },

    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo)); // 更新时保存到 localStorage
    },
    
    clearUserInfo(state, value){
      state.userInfo = {}
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ['isCollapsed','userInfo'],
    }),
  ],
})
