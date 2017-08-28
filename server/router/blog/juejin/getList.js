/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

  let resultList = lists.map((index,list) => {

	let titleObj = $(list).find('.tracking-ad a'),
		title = titleObj.text(),
		originUrl = titleObj.attr('href'),
		author = "极客头条",
		authorUrl = 'http://geek.csdn.net/frontend',
		time = $(list).find('.list-inline').children().eq(1).text(),
		iconUrl =  $(list).find('.right a').attr('href');
	return {
	  title:title,
	  originUrl:originUrl,
	  time:time,
	  author:author,
	  authorUrl:authorUrl,
	  iconUrl:iconUrl
	}

  });

  return Array.from(resultList).filter((v) => {

  	return v.title[3] && v.originUrl[3]
  });
};