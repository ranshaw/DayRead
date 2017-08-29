/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	createTable = require('../../mongoose/lib'),
	url = '',
	{parseBody, getContent} = require('../lib/lib'),
	articleNow,
	allArticle = [];

let table = createTable('weiXin', {
  type: String,
  articleList: Array
});

async function account(...arg) {
  let res = arg[0].response,
	  req = arg[0].request,
	  hour = new Date().getHours(),
	  articleList,
	  searchKey = encodeURIComponent(req.query.key),
	  searchUrl = `http://weixin.sogou.com/weixin?type=1&s_from=input&query=${searchKey}&ie=utf8&_sug_=n&_sug_type_=`,
	  resBody;

  articleList = await table.find({type: req.query.key}).then((res) => {

	return res
  });

  if(articleList.info[0].articleList.length > 0) {
	res.body = {
	  code:0,
	  info:articleList.info[0].articleList
	};
  } else {
	res.body = {
	  code:1,
	  info:'获取文章失败！'
	};
  }



}

async function refreshWx() {
  let hour = new Date().getHours(),
	  articleList,
	  searchKey = ['前端早读课', '前端大全', '奇舞周刊','前端之巅'],
	  resBody;

  articleList = searchKey.map(getList);

  articleList = Promise.all(articleList);

  articleList.then((res) => {

   res.forEach((v) => {
     if(v.articleList.length > 0) {
       console.log('\x1B[33m%s\x1b[0m:',`${v.type}获取内容成功！`)
	 } else {
	   console.log('\x1B[31m%s\x1B[39m',`${v.type}获取内容失败！`)
	 }
   })

  })

}
async function getList(searchKey) {

  /*获取公众号链接*/
  let resContent,
	  resBody,
	  searchUrl = `http://weixin.sogou.com/weixin?type=1&s_from=input&query=${encodeURIComponent(searchKey)}&ie=utf8&_sug_=n&_sug_type_=`;

  await  getContent(searchUrl).then((body) => {
	resContent = body
  }, (err) => {
	console.log(err)
  });

  let url = $(resContent).find('.news-list2 li').eq(0).find('.tit a').attr('href');

  /*获取文章列表*/
  await  getContent(url).then((body) => {
	resBody = body
  }, (err) => {
	console.log(err)
  });

  let lists = $(resBody).find('.weui_msg_card_list .weui_msg_card'),
	  articles = parseList(lists, searchKey);

  table.find({type:searchKey}).then((res) => {
	if(articles.length > 0) {
	  /*写入到数据库*/
	  table.update({
	    old:{type:searchKey},
		new:{
		  type: searchKey,
		  articleList: articles
		}
	  }).then((res) => {
		console.log(`${searchKey}更新成功！`)
	  }, (err) => {
		console.log(`${searchKey}更新失败！`)
	  });
	} else {
	  console.log(`${searchKey}获取失败！`);

	}

  },(err) => {
	if(articles.length > 0) {
	  /*写入到数据库*/
	  table.add({
		type: searchKey,
		articleList: articles
	  }).then((res) => {
		console.log(`${searchKey}写入成功！`)
	  }, (err) => {
		console.log(`${searchKey}写入失败！`)
	  });
	} else {
	  console.log(`${searchKey}获取失败！`)
	}
  });

/*  /!*删除所有数据*!/
  table.del({type:searchKey}).then((res) => {
    console.log('删除数据成功')
  })*/

  return {
	type: searchKey,
	articleList: articles
  }

}

module.exports = {
  account,
  refreshWx
};