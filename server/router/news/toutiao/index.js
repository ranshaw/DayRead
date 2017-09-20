/**
 * Created by Ranshaw on 2017/9/5.
 */

const request = require('request');

let  newsList = [],
	 hour;

async function touTiaoNewsList(...arg) {
  let news,
	  res = arg[0].response,
	  url;
  url = 'http://m.toutiao.com/list/?tag=__all__&ac=wap&count=40&format=json_raw&as=A115E9AACE25A18&cp=59AEC57AC1184E1';

  let hourNow = new Date().getHours();
  if(newsList.length > 0 && hour === hourNow) {
	news = {
	  code:0,
	  info:newsList
	}
  } else {

	await  new Promise((resolve,reject) => {

	  (function getNewsList() {
		request(url,(error,res,body) => {

		  if(!error && res.statusCode === 200) {


			body = JSON.parse(body);
			body.data.forEach((v) => {

			  try {
				newsList.push({
				  title:v.checkKey('title'),
				  link:v.checkKey('article_url'),
				  time:v.checkKey('datetime'),
				  source:v.checkKey('source'),
				  picInfo:[{
					url:v.checkKey('media_info') && v.checkKey('media_info').checkKey('avatar_url')
				  }]
				})
			  } catch (e) {
			    console.log(e)
			  }

			});

			resolve({
			  code:0,
			  info:newsList
			})
		  } else {
			getNewsList();
			/* reject({
			 code:1,
			 info:`获取数据失败${error}`
			 })*/
		  }
		})
	  })()

	}).then((val) => {
	  news = val;
	  hour = new Date().getHours();
	},(err) => {
	  news = err;
	});
  }

  res && (res.body = news);

}

module.exports = {
  touTiaoNewsList
};