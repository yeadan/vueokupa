import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes.js'
import VModal from 'vue-js-modal'


Vue.use(VModal)
Vue.use(VueRouter)

export const router = new VueRouter({
  routes,
  base: '/#app',
  mode: 'abstract'
})
new Vue({
  el:"#app",
  router,
  render: h => h(App),
}).$mount('#app') 

router.replace('/')
