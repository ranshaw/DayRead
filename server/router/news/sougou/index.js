/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://top.sogou.com/',
	{ parseBody } = require('../../lib/lib');

async function sougou(...arg) {
  let content,
	  resBody;

  await  parseBody(url).then((val) => {
    content = val;
  },(err) => {
     console.log('获取内容失败！')
  });

  let lists = $(content).find('.hot-b ol li');

	  resBody = parseList(lists);

  return resBody ;

}

module.exports = {
  sougou
};