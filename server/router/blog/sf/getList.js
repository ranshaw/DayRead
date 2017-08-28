/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {
    let url = 'https://segmentfault.com';

	let resultList = lists.map((index,list) => {

	  let titleObj = $(list).find('.summary .title a'),
		  title = titleObj.text(),
		  originUrl = url + titleObj.attr('href'),
		  authorObj = $(list).find('.summary .author li').eq(0).find('span a').eq(0),
		  author = authorObj.text(),
		  authorUrl = url + authorObj.attr('href') ,
		  time =  '' ,
		  iconUrl = $(list).find('.summary .author li').eq(0).find('a img').attr('src');
		// console.log($(list).find('.summary .author li').eq(0).find('span'));
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
