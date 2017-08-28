/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

  let resultList = lists.map((index,list) => {

	let titleObj = $(list).find('a'),
		title = titleObj.text(),
		originUrl = titleObj.attr('href'),
		ind = $(list).find('span').text();

	return {
	  title,
	  originUrl,
	  ind,
	}

  });

  return Array.from(resultList);
};