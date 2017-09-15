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
	  redirect: '/blog/jueJin'
	},
	{
	  path: ' ',
	  redirect: '/blog/jueJin'
	},
	{
	  path: '/blog/:title',
	  name: 'blog',
	  component: Blog,
	  beforeEnter (to,from,next)  {
	   /* console.log(to);
	    console.log(from);*/
		next()
	  }
	},
	{
	  path: '/wx',
	  redirect:'/wx/zaoDu'
	},
	{
	  path: '/wx/:title',
	  name: 'wx',
	  component: WeXin
	},
	{
	  path: '/news/:title',
	  name: 'news',
	  component: News
	},
	{
	  path: '/movies/:title',
	  name: 'movies',
	  component: Movies
	}
  ]
})

