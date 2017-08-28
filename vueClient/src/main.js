// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './lib/api'
import axios from 'axios'
import regeneratorRuntime from './lib/regeneratorRuntime'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import rem from './lib/rem';


Vue.use(regeneratorRuntime);
Vue.use(api,axios);
Vue.use(MintUi);
Vue.config.productionTip = false;



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },

});
