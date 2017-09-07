/**
 * Created by Ranshaw on 2017/8/9.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
  selectedNow:'',
  oldBlogRoute:'',
  oldWxRoute:'',
  blogLists:{},
  wxLists:{}
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})