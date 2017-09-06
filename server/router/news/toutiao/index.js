/**
 * Created by Ranshaw on 2017/9/5.
 */

const request = require('request');

async function touTiaoNewsList(...arg) {
  let news,
	  res = arg[0].response,
	  url;
  url = 'http://m.toutiao.com/list/?tag=__all__&ac=wap&count=40&format=json_raw&as=A115E9AACE25A18&cp=59AEC57AC1184E1';

  await  new Promise((resolve,reject) => {

	(function getNewsList() {
	  request(url,(error,res,body) => {

		if(!error && res.statusCode === 200) {
		  resolve({
			code:0,
			info:JSON.parse(body)
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
  },(err) => {
	news = err;
  });


  res && (res.body = news);

}

module.exports = {
  touTiaoNewsList
};