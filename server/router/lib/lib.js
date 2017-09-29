/**
 * Created by Ranshaw on 2017/8/15.
 */
'use strict';
const phantom = require('phantom'),
      request = require('request');

async function getContent(url) {
  const instance = await phantom.create(),
	    page     = await instance.createPage();

  /*监控页面中静态资源的加载*/
  await page.on('onResourceRequested',(requestData) => {
	// console.info('Requesting',requestData.url)
  });

  /*页面是否加载完成*/
  const status = await page.open(url);

  console.log(status);
  /*页面内容*/
  const content = await page.property('content');

  // console.log(content);

  await instance.exit();
  return new Promise((resolve,reject) => {
     status === "success" ? resolve(content) : reject('获取页面失败！')
  })
}

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

  return result.filter((v) => {
    v.iconUrl[3] && (v.iconUrl = 'http://ranshaw.oss-cn-shanghai.aliyuncs.com/dayread/images/timg.jpg');
    return v.title[3] && v.originUrl[3]
  });

}

function formatDate (date=new Date(),symbol='-') {
  let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

  return [year,month,day].map(addZero).join(symbol);
}

function addZero (d) {
  let str = d.toString();

  return str[1] ? str : '0' + str;
}
/*检查一个对象中是否有某个属性*/
function checkKey (...arg) {

  if(typeof arg[0] === 'string') {
	let val;
	Object.keys(this).forEach((v) => {
	  if(v === arg[0]) {
		val = this[v]
	  }
	});
	return val;
  } else {
	return 'undefined';
  }
};


module.exports = {
  getContent,
  parseBody,
  parseResult,
  formatDate,
  checkKey
};