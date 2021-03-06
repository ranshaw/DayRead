/**
 * Created by Ranshaw on 2017/8/9.
 */
'use strict';


module.exports  = function (Vue,axios ) {

  /*配置axios*/
  const instance = axios.create({
	timeout: 10000,
	headers: {
	  "content-type":"application/json",
	}
  });

  Vue.prototype.api  =   (path = '',data = {},options = {}) => {

    	let _options = {
    	  method:"get",
          baseURL: 'http://localhost:3002',//'http://www.dayread.top',
		};
        Object.assign(_options,options);
     return  instance({
         method:_options.method,
		 url:path,
		 data:data,
	     baseURL:_options.baseURL
	   })

	};

  Vue.prototype.path = {
  	jueJin:'/blog/jueJin',
	jueJinPrev:'/blog/jueJinPrev',
	jiKe:'/blog/jiKe',
	jiKePrev:'/blog/jiKePrev',
	sf:'/blog/sf',
	sfPrev:'/blog/sfPrev',
	zxu:'/blog/zxu',
	zxuPrev:'/blog/zxuPrev',
	bole:'/blog/bole',
	bolePrev:'/blog/bolePrev',
	zaoDu:'/weixin/account?key=前端早读课',
	daQuan:'/weixin/account?key=前端大全',
	site360:'/weixin/account?key=奇舞周刊',
	alp:'/weixin/account?key=前端之巅',
	JS:'/weixin/account?key=前端JavaScript',
	QX:'/weixin/account?key=技术最前线',
	foreign:'/weixin/account?key=前端外刊评论',
	wangYiSlides:'/wangYi/slides',
	wangYiNews:'/wangyi/news',
	touTiao:'/toutiao/news',
	hot:'/hot',
	hotMovies:'/movies/hotMovies',
	newMovies:'/movies/newMovies',
  }

  };
