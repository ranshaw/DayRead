/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

  let resultList = lists.map((index,list) => {

	let titleObj = $(list).find('h3 a'),
		title = titleObj.text(),
		originUrl = titleObj.attr('href'),
		author = "伯乐在线",
		authorUrl = 'http://top.jobbole.com/tag/javascript/',
		time = $(list).find('.p-meta').children().first().text(),
		iconUrl = 'http://top.jobbole.com/wp-content/uploads/sites/8/2014/06/javascript.png';
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