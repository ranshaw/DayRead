/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

	let resultList = lists.map((index,list) => {

	  let titleObj = $(list).find('h3 a'),
		  title = titleObj.text(),
		  originUrl = titleObj.attr('href'),
		  author = "张鑫旭",
		  authorUrl = 'http://www.zhangxinxu.com',
		  time = $(list).find('small').text(),
		  iconUrl = 'http://tva2.sinaimg.cn/crop.0.0.180.180.50/4b4d632fjw1e8qgp5bmzyj2050050aa8.jpg';

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
