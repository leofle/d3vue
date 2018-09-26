import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../Hello/Hello'
import Graph from '../Graph/Graph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
		},
		{
      path: '/graph',
      name: 'Graph',
      component: Graph
    }
  ]
})