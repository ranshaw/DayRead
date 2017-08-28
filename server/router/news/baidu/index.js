/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://top.baidu.com',
	{ parseBody,getContent } = require('../../lib/lib');

async function baidu(...arg) {
  let res = arg[0].response,
	  content,
	  resBody;

  await  getContent(url).then((val) => {
    content = val;
  },(err) => {
     console.log('获取内容失败！')
  });

  let lists = $(content).find('#hot-list li');

	  resBody = parseList(lists);

  res.body = resBody ;

}

module.exports = {
  baidu
};