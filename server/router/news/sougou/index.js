/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://top.sogou.com/',
	{ parseBody } = require('../../lib/lib');

async function sougou(...arg) {
  let res = arg[0].response,
	  content,
	  resBody;

  await  parseBody(url).then((val) => {
    content = val;
  },(err) => {
     console.log('获取内容失败！')
  });

  let lists = $(content).find('.hot-b ol li');

	  resBody = parseList(lists);

  res.body = resBody ;

}

module.exports = {
  sougou
};