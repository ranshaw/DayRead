/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

	let resultList = lists.map((index,list) => {

	  let titleObj = $(list).find('.title'),
		  title = titleObj.text(),
		  originUrl = $(list).find('.news-pic').attr('href'),
		  imgUrl = $(list).find('img').attr('src');

	  return {
		title,
		originUrl,
		imgUrl
	  }

	});

	let arr = Array.from(resultList);
		arr.pop();

  return arr;
};
