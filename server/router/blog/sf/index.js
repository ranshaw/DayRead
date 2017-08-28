/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'https://segmentfault.com/blogs?page=1',
	urlNow = null,
	lib = require('../../lib/lib');

async function sf(...arg) {
  let ctx = arg[0],
	  resBody;
  await  lib.parseBody(ctx?url:urlNow).then((body) => {
	resBody = body
  }, (err) => {
	console.log(err)
  });

  let lists = $(resBody).find('.blog-stream section');
  let zxuList = parseList(lists);

  zxuList.forEach((v) => {
  	!v.time[3] && (v.time = '时间未知')
  });

  if (ctx) {
	ctx.response.body = {
	  code: 0,
	  info: zxuList
	};
  }

  return zxuList;
}

async function sfPrev(...arg) {
  let ctx = arg[0],
	  req = arg[0].request,
	  page = req.query.page,
	  prevUrl;

	  prevUrl = `https://segmentfault.com/blogs?page=${page || 1}`;

  urlNow = prevUrl;
 let zxuList = await  sf().then((res) => {
	return res;
  });

  ctx.response.body = {
	code: 0,
	info: zxuList
  };
}

module.exports = {
  sf,
  sfPrev
};