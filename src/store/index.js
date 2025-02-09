import { createStore } from 'vuex'

export default createStore({
  state: {
    routesAdded : false
  },
  getters: {
  },
  mutations: {
    changeRoutesAdded(state, routesAdded){
      state.routesAdded = routesAdded
    }
  },
  actions: {
  },
  modules: {
  }
})
