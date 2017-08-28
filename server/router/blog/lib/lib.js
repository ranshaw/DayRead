/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

const request = require('request');

function parseBody(url) {

	return new Promise((resolve,reject) => {
	  request(url,(error,res,body) => {

	     if(!error && res.statusCode === 200) {
	       resolve(body);
		 } else {
	       reject("获取页面失败" + error)
		 }
	   })

	})
}

function parseResult(result) {

  result = JSON.parse(result).d.entrylist.map((v) => {

      let authorUrl;
     if(v.user.community) {

	   v.user.community.github && (authorUrl = v.user.community.github.blogAddress);
	   v.user.community.weibo && (authorUrl = v.user.community.weibo.blogAddress)

	 }

	return {
	  title:v.title,
	  originUrl:v.originalUrl,
	  time:v.createdAt,
	  author:v.user.username,
	  authorUrl: authorUrl,
	  iconUrl:v.screenshot || v.user.avatarLarge
	}
  });

  return result;

}

module.exports = {
  parseBody,
  parseResult
};