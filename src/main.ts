import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


Vue.config.productionTip = false

const eventHub = new Vue()
Vue.prototype['$eventHub'] = eventHub // bus event, need for alert message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
