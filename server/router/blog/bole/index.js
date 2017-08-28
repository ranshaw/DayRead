/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://top.jobbole.com/tag/javascript/',
	urlNow = null,
	lib = require('../../lib/lib');

async function bole(...arg) {
  let ctx = arg[0],
	  resBody;
  await  lib.parseBody(ctx?url:urlNow).then((body) => {
	resBody = body
  }, (err) => {
	console.log(err)
  });

  let lists = $(resBody).find('.list-posts .media:not(".sponsored")');
  let zxuList = parseList(lists);

  if (ctx) {
	ctx.response.body = {
	  code: 0,
	  info: zxuList
	};
  }

  return zxuList;
}

async function bolePrev(...arg) {
  let ctx = arg[0],
	  prevUrl = url + 'page/' + ctx.query.page + '/';
  urlNow = prevUrl;
 let zxuList = await  bole().then((res) => {
	return res;
  });

  ctx.response.body = {
	code: 0,
	info: zxuList
  };
}

module.exports = {
  bole,
  bolePrev
};