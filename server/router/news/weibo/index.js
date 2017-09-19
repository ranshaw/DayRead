/**
 * Created by Ranshaw on 2017/8/16.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'http://s.weibo.com/top/summary?cate=realtimehot',
	{ parseBody,getContent } = require('../../lib/lib');

async function weibo(...arg) {
  let content,
	  resBody;

  await  getContent(url).then((val) => {
    content = val;
  },(err) => {
     console.log('获取内容失败！')
  });

  let lists = $(content).find('#realtimehot tbody tr');
      console.log(lists.length);
	  resBody = parseList(lists);

  return resBody ;

}

module.exports = {
  weibo
};