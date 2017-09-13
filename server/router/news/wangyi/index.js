/**
 * Created by Ranshaw on 2017/8/15.
 */
'use strict';
const { getContent } = require('../../lib/lib'),
      $              = require('cheerio'),
      parseList      = require('./getList'),
	  news           = require('../../../mongoose/lib'),
	  request        = require('request');

let newsTable,
	isFirst = true;

newsTable = news('news',{
  type:String,
  lists:Object,
  hour:Number
});

async function slides(...arg) {
  let res = arg[0].response,
	  req = arg[0].request,
	  url = 'http://3g.163.com/touch/all?dataversion=A&uversion=A&version=v_standard',
	  slidesList,
	  hour= new Date().getHours(),
	  type,
	  body= {};
  /*JsonP接口,10-10.html,20-10.html,改变页码，其他参数不变*/
  /*http://3g.163.com/touch/jsonp/sy/recommend/10-10.html?hasad=1&miss=51&refresh=A&loc=%E4%B8%8A%E6%B5%B7%E5%B8%82_%E4%B8%8A%E6%B5%B7%E5%B8%82&offset=0&size=10*/
 /* newsTable.del({type:'wangyi'}).then((val) => {
    console.log(val)
  } )*/

  /*获取轮播图*/
  await new Promise((resolve,reject) => {

	newsTable.find({type:'wangyi'}).then((val) => {

	  if(val.info[0].hour === hour && val.info[0].lists.length > 0) {
		slidesList = val.info[0].lists;
		resolve({
		  code:0,
		  info:slidesList
		});
	  } else {
		/*超过一小时更新数据*/
		getSlidesList(url).then((slides) => {
		  let obj = {
			old:{type:'wangyi'},
			new:{
			  type:'wangyi',
			  hour:hour,
			  lists:slides
			}
		  };
		  slidesList = slides;
		  resolve({
			code:0,
			info:slidesList
		  });
		  newsTable.update(obj).then((val) => {
			console.log('更新数据成功！')
		  },(err) => {
			reject({
			  code:1,
			  info:`更新数据失败！`
			})
		  })
		})
	  }

	},(err) => {
	  console.log(err);
	  /*首次添加数据*/
	  getSlidesList(url).then((slides) => {
		let data = {
		  type:'wangyi',
		  hour:hour,
		  lists:slides
		};
		slidesList = slides;
		resolve({
		  code:0,
		  info:slidesList
		});
		newsTable.add(data).then((val) => {
		  console.log(val);
		},(err) => {
		  reject({
		    code:1,
			info:`写入数据失败！`
		  })
		})
	  });

	});
  }).then((val) => {
	slidesList = val;
  },(err) => {
	slidesList = err;
  });

  res && (res.body = slidesList);
}

function getSlidesList(url) {
  let lists,
	  slidesList;

  return new Promise((resolve,reject) => {
	getContent(url).then((content) => {
	  lists      = $(content).find('.slides li');
	  slidesList = parseList(lists);
	  resolve(slidesList)
	},(err) => {
      reject(err);
	});
  });

}

async function newsList(...arg) {
  let news,
	  res = arg[0].response,
	  req = arg[0].request,
	  page,
	  url;
      page = req.query.page;
	  url = `http://3g.163.com/touch/jsonp/sy/recommend/${page || 1}0-10.html?hasad=1&miss=51&refresh=A&loc=%E4%B8%8A%E6%B5%B7%E5%B8%82_%E4%B8%8A%E6%B5%B7%E5%B8%82&offset=0&size=10`;

   await  new Promise((resolve,reject) => {
	request(url,(error,res,body) => {
	  function artiList (data) {
	    let newsList = [];
	    if(data) {
		  data.list.forEach((v) => {

			if(v.picInfo.length > 0) {
			  newsList.push({
				title:v.title,
				link:v.link,
				time:v.ptime,
				source:v.source,
				picInfo:v.picInfo
			  })
			}
		  });
		  resolve({
			code:0,
			info:newsList
		  })
		} else {
		  resolve({
			code:1,
			info:'请求数据不存在！'
		  })
		}

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
    news = val;
  },(err) => {
     news = err;
   });

  res && (res.body = news);

}

module.exports = {
  slides,
  newsList
};