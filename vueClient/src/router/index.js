import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '../page/tabbar.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Tabbar
    }
  ]
})
