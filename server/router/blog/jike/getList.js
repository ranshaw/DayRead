/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

  let resultList = lists.map((index,list) => {

	let titleObj = $(list).find('.tracking-ad a'),
		title = titleObj.text(),
		originUrl = $(list).find('.list-inline  li').eq(0).find('a').attr('href'),
		author = "极客头条",
		authorUrl =  $(list).find('.right a ').attr('href') ,
		time = $(list).find('.list-inline').children().eq(1).text(),
		iconUrl =  'http://ranshaw.oss-cn-shanghai.aliyuncs.com/dayread/images/timg.jpg';
	return {
	  title:title,
	  originUrl:originUrl,
	  time:time,
	  author:author,
	  authorUrl:authorUrl,
	  iconUrl:iconUrl
	}

  });

  return Array.from(resultList);
};