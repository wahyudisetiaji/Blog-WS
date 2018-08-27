import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
global.api = 'http://server-blog.wahyudisetiaji.xyz'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
