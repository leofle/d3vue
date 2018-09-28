
import Vue from 'vue'
import App from './App'
import router from './components/Router'
import {store} from './stores/store'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app')