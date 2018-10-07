import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    datag: [],
    msg: 'Welcome to Vue Graph YaY!',
    graph: {},
    country: '',
    wins: null
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
    },
    changeCountry(state, country) {
      state.country = country;
    },
    changeWins(state, wins) {
      state.wins = wins;
    }
  },
  getters: {
    datag: state => state.datag,
    graph: state => state.graph,
    msg: state => state.msg,
    country: state => state.country,
    wins: state => state.wins
  }
})