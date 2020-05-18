import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    count: [],
  },
  mutations: {
    increment: (state, { index, amount }) => {
      Vue.set(state.count, index, state.count[index] + amount)
    },
    init: (state, length) => {
      console.log('init', length)
      for (let i = 0; i < length; i++) {
        state.count.push(0)
      }
    },
  },
  actions: {
    increment: ({ commit }, index) => {
      commit('increment', { index, amount: 1 })
    },
    init: ({ commit }, length) => {
      commit('init', length)
    },
  },
})
