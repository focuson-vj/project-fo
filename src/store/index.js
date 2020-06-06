import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "../firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    count: [],
    bpm: 120
  },
  mutations: {
    setBpmData: (state, bpm_data) => {
      state.bpm = bpm_data;
    },
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
    getBpmData: ({ commit }) => {
      let doc = db.collection('environment').doc('bpm');
      let bpm_data = 1;
      doc.onSnapshot(function(d) {
        bpm_data = d.data();
        commit('setBpmData', bpm_data.bpm);
      });
    },
    increment: ({ commit }, index) => {
      commit('increment', { index, amount: 1 })
    },
    init: ({ commit }, length) => {
      commit('init', length)
    },
  },
})
