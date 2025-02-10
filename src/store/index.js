import { createStore } from 'vuex'

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
  }
})
