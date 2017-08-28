/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio');
let url = 'https://mp.weixin.qq.com';
module.exports= function (lists,auth) {

  let resultList = lists.map((index,list) => {

	let title = $(list).find('.weui_msg_card_bd div').eq(0).find('.weui_media_title').text().replace(/\s+/g,''),
		titleObj = $(list).find('.weui_media_hd'),
		originUrl = url + titleObj.attr('hrefs'),
		author =  decodeURIComponent(auth),
		authorUrl = 'http://geek.csdn.net/frontend',
		time = $(list).find('.weui_msg_card_hd').text(),
		iconUrl =  titleObj.attr('style').split(')')[0].slice(21);

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