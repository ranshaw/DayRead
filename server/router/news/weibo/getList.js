/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio');

module.exports= function (lists) {

  let url = 'http://s.weibo.com';
  let resultList = lists.map((index,list) => {

	let titleObj = $(list).find('.star_name a'),
		title = titleObj.text(),
		originUrl = url + titleObj.attr('href'),
		ind = $(list).find('.star_num span').text();

	return {
	  title,
	  originUrl,
	  ind,
	}

  });

  return Array.from(resultList);
};