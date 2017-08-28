/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://www.zhangxinxu.com/wordpress/category/js',
	urlNow = null,
	lib = require('../../lib/lib');

async function zxu(...arg) {
  let ctx = arg[0],
	  resBody;
  await  lib.parseBody(ctx?url:urlNow).then((body) => {
	resBody = body
  }, (err) => {
	console.log(err)
  });

  let lists = $(resBody).find('.post');
  let zxuList = parseList(lists);

  if (ctx) {
	ctx.response.body = {
	  code: 0,
	  info: zxuList
	};
  }

  return zxuList;
}

async function zxuPrev(...arg) {
  let ctx = arg[0],
	  prevUrl = url + '/page/' + ctx.query.page + '/';

  urlNow = prevUrl;
 let zxuList = await  zxu().then((res) => {
	return res;
  });

  ctx.response.body = {
	code: 0,
	info: zxuList
  };
}

module.exports = {
  zxu,
  zxuPrev
};