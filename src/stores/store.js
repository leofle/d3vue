import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    datag: [],
    msg: 'Welcome to Vue Graph YaY!',
    graph: {}
  },
  mutations: {
    change(state, graph) {
				state.graph = graph;
    },
    getdata(state, datag) {
				state.datag = datag;
    },
    changeText(state, text) {
      state.msg = text;
    }
  },
  getters: {
    datag: state => state.datag,
    graph: state => state.graph,
    msg: state => state.msg
  }
})