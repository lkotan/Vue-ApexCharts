import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$baseURL = 'http://localhost:3000'

new Vue({
  render: h => h(App),
}).$mount('#app')
