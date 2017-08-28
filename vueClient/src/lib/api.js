/**
 * Created by Ranshaw on 2017/8/9.
 */
'use strict';


module.exports  = function (Vue,axios ) {

  /*配置axios*/
  const instance = axios.create({
	baseURL: 'http://192.168.31.159:3002',
	timeout: 5000,
	headers: {
	  "content-type":"application/json",
	}
  });

  Vue.prototype.api  =   (path = '',data = {},options = {}) => {

    	let _options = {
    	  method:"get",
		};
        Object.assign(_options,options);

     return  instance({
         method:_options.method,
		 url:path,
		 data:data
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
	bolePrev:'/blog/bolePrev'
  }

  };
