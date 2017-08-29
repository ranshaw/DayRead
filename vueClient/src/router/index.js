import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '../page/tabbar.vue'
import  WeXin from '../page/wx/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Tabbar
    },
	{
	  path: '/wx',
	  name: 'wx',
	  component: WeXin
	}
  ]
})
