import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    routesAdded : false,
    isCollapsed: false

  },
  getters: {
  },
  mutations: {
    changeRoutesAdded(state, routesAdded){
      state.routesAdded = routesAdded
    },
    changeIsCollapsed(state, value){
      state.isCollapsed = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ['isCollapsed'],
    }),
  ],
})
