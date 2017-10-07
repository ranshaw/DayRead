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
  selectedNow:'',                    //当前选中的topNav项
  oldBlogRoute:'',                   //博客页面选中topNav的路由
  oldWxRoute:'',                     //公众号页面选中topNav的路由
  blogLists:{},                      //博客页面已浏览的数据
  wxLists:{},                        //公众号页面已浏览的数据
  wangYiSlides:[],
  wangYiNews:[],
  touTiao:[],
  hot:[],
  animateName:'BounceSlideLeft' ,    //动画名称
  detailFromPath:'',                 //跳转至detail组件的来源页面
  hotMoviesList:[],                  //影院热映
  newMoviesList:[],                  //新片速递
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})