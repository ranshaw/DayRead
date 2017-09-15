// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import api from './lib/api'
import axios from 'axios'
import regeneratorRuntime from './lib/regeneratorRuntime'
import store from './store/index'

Vue.use(regeneratorRuntime);
Vue.use(api,axios);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
});

