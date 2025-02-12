import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    routesAdded : false,
    isCollapsed: false,
    userInfo:{
      username:"",
      role:"",
      introduction:"",
      gender:0
    }

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
    changeUserInfo(state, value){
      state.userInfo = {
        ...state.userInfo,...value
      }
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
