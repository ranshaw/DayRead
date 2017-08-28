/**
 * Created by Ranshaw on 2017/8/4.
 */
'use strict';

let $ = require('cheerio'),
	parseList = require('./getList'),
	url = 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=0&limit=20&category=all',
	urlNow = null,
	{ parseBody , parseResult ,formatDate } = require('../../lib/lib');

async function juejin(...arg) {
  let res = arg[0].response,
	  resBody;

  await  parseBody(url).then((val) => {
    resBody = {
      code:0,
	  info:parseResult(val)
	}
  },(err) => {
    resBody = {
      code:1,
	  info:err
	}
  });

  if(resBody.code === 0) {
  	resBody.info.forEach((v) => {
  		v.time =  formatTime(v.time)
	})
  }

  res.body = resBody ;

}

async function juejinPrev(...arg) {
  let res = arg[0].response,
	  req = arg[0].request,
	  resBody,
	  page,
	  prevUrl;
      page = Math.floor(req.query.page) - 1;
	  prevUrl = `https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=${page || 0}&limit=20&category=all`;

  await  parseBody(prevUrl).then((val) => {
	resBody = {
	  code:0,
	  info:parseResult(val)
	}
  },(err) => {
	resBody = {
	  code:1,
	  info:err
	}
  });

  res.body = resBody ;

}

function formatTime (time) {
	let yearMD = time.split('T')[0],
		hourMS = time.split('T')[1].split('.')[0];

    if(yearMD == formatDate()) {
    	let hour = new Date().getHours(),
			juejinHour = hourMS.split(':')[0];

		return `${hour-juejinHour}小时前`
	} else {
    	return `${yearMD} ${hourMS}`
	}
}


module.exports = {
  juejin,
  juejinPrev
};