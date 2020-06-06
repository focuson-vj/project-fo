import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    count: [],
    bpm: 120,
  },
  mutations: {
    setBpmData: (state, bpm_data) => {
      state.bpm = bpm_data
    },
  },
  actions: {
    getBpmData: ({ commit }) => {
      let doc = db.collection('environment').doc('bpm')
      let bpm_data = 1
      doc.onSnapshot(function(d) {
        bpm_data = d.data()
        commit('setBpmData', bpm_data.bpm)
      })
    },
  },
})
