import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    msg: 'Welcome to Vue Graph YaY!',
    graph: {}
  },
  mutations: {
    change(state, graph) {
				state.graph = graph;
    },
    changeText(state, text) {
      state.msg = text;
    }
  },
  getters: {
    graph: state => state.graph,
    msg: state => state.msg
  }
})