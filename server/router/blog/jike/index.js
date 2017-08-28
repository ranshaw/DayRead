/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://geek.csdn.net/frontend/',
	urlNow = null,
    {parseBody} = require('../../lib/lib');

async function jike(...arg) {
  let ctx = arg[0],
	  resBody;

  await  parseBody(ctx?url:urlNow).then((body) => {
	resBody = body

  }, (err) => {
	console.log(err)
  });

  let lists = $(resBody).find('#geek_list .geek_list ');
  let zxuList = parseList(lists);

  if (ctx) {
	ctx.response.body = {
	  code: 0,
	  info: zxuList
	};
  }

  return zxuList;
}

async function jikePrev(...arg) {
  let ctx = arg[0];
	/*  prevUrl = url + 'page/' + ctx.query.page + '/';
  urlNow = prevUrl;
 let zxuList = await  jike().then((res) => {
	return res;
  });*/

  ctx.response.body = {
	code: 1,
	info: []
  };
}

module.exports = {
  jike,
  jikePrev
};