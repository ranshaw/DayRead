import Vue from 'vue'
import Router from 'vue-router'
import  Blog  from '../page/blog/index.vue'
import  WeXin from '../page/wx/index.vue'
import News from '../page/news/index.vue'
import Movies from '../page/movies/index.vue'

Vue.use(Router);

export default new Router({
  routes: [
	{
	  path: '*',
	  redirect: '/blog'
	},
	{
	  path: ' ',
	  redirect: '/blog'
	},
	{
	  path: '/blog',
	  name: 'blog',
	  component: Blog
	},
	{
	  path: '/wx',
	  name: 'wx',
	  component: WeXin
	},
	{
	  path: '/news',
	  name: 'news',
	  component: News
	},
	{
	  path: '/movies',
	  name: 'movies',
	  component: Movies
	}
  ]
})
