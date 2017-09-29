/**
 * Created by Ranshaw on 2017/9/20.
 */
/*新片速递*/

const request = require('request');

async function newMovies(...arg) {
  let movies,
	  res = arg[0].response,
	  req = arg[0].request,
	  page,
	  url;
  page =  Math.floor(req.query.page)*18 ;

  url =  `https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items?os=ios&for_mobile=1&callback=jsonp2&start=${page || 0}&count=18&loc_id=108288&_=1505875899587`;

  await  new Promise((resolve,reject) => {
	request(url,(error,res,body) => {
	  function jsonp2 (data) {

		let resData = [];
		data.subject_collection_items.forEach((v) => {
		  resData.push({
			url:v.url && v.url,
			title:v.title && v.title,
			imgUrl:v.cover.url && v.cover.url,
			rating:v.rating && v.rating.value.toString()
		  })
		});

		resolve({
		  code:0,
		  info:resData
		})
	  }
	  if(!error && res.statusCode === 200) {
		eval(body);
	  } else {
		reject({
		  code:1,
		  info:`获取数据失败${error}`
		})
	  }
	})
  }).then((val) => {
	movies = val;
  },(err) => {
	movies = err;
  });

  res && (res.body = movies);
}

module.exports = {
  newMovies
};