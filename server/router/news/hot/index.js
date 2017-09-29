/**
 * Created by Ranshaw on 2017/9/19.
 */
let { baidu }  = require('../baidu/index.js');
let { sougou } = require('../sougou/index');
let { weibo }  = require('../weibo/index');
const createTable = require('../../../mongoose/lib');

let table = createTable('hot',{
  type:String,
  info:Array
});

async function hot(...arg) {

  let res = arg[0].response,
	  resBody = [];

  await table.find({
    type:'hot'
  }).then((res) => {
	 resBody = res.info[0].info
  },(err) => {
	refreshHot();
    console.log(`查找hot数据失败${err}`)
  });

	if(resBody.length > 0) {
	  res.body = {
		code:0,
		info:resBody
	  }
	} else {
	  res.body = {
		code:1,
		info:'获取数据失败！'
	  }
	}

}

async function refreshHot () {

  let  resBody = [];

  await baidu().then((res) => {
	resBody.push({
	  title:'百度热搜',
	  info:res
	});
  });

  await sougou().then((res) => {
	resBody.push({
	  title:'搜狗热搜',
	  info:res
	});
  });

  await weibo().then((res) => {
	resBody.push({
	  title:'微博热搜',
	  info:res
	});
  });

  table.find({
    type:'hot'
  }).then((res) => {

	if(resBody.length > 0) {
	  let obj = {
	    old:{type:'hot'},
		new:{
	      type:'hot',
		  info:resBody
		}
	  };
	  table.update(obj)
	}

  },(err) => {

	if(resBody.length > 0) {
	  table.add({
		type:'hot',
		info:resBody
	  }).then((res) => {
		console.log(`hot添加成功${res}`)
	  },(err) => {
		console.log(`hot添加失败${err}`)
	  });
	}
  });


}

module.exports = {
  hot,
  refreshHot
};