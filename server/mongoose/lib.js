/**
 * Created by Ranshaw on 2017/8/15.
 */
'use strict';

const {db,mongoose} = require('./index');

module.exports =  function (name,initType) {

  let table = null;

  db.on('error',() => {
	console.log('连接数据库失败！')
  });
  db.once('open',() => {
    console.log('连接数据库成功！');
  });
  table = mongoose.model(`${name}`,initType);

  return {
    add:(obj={}) => {
      let addNew = new table(obj);

      return new Promise((resolve,reject) => {
        addNew.save((err) => {
          if(err) {
            reject({
              code:1,
			  info:"写入数据失败！"
			})
		  } else {
            resolve({
              code:0,
			  info:"写入数据成功！"
			})
		  }
		})
	  })
	},
	find:(obj={}) => {

      return new Promise((resolve,reject) => {

		table.find(obj,(err,docs) => {

		  if(docs.length > 0) {
			resolve({
			  code:0,
			  info:docs
			})
		  } else {
		    reject({
		      code:1,
			  info:"查找数据失败！"
			})
		  }
		})
	  })

	},
    update:(obj={}) => {
      return new Promise((resolve,reject) => {
        table.update(
        	obj.old,
			obj.new,
			(err) => {
        	  if(err) {
        	    reject({
        	      code:1,
				  info:"更新数据失败！"
				})
			  } else{
        	    resolve({
        	      code:0,
				  info:"修改数据成功！"
				})
			  }
			}
		)
	  })
	},
	del:(obj={}) => {

      return new Promise((resolve,reject) => {
        table.remove(obj,(err) => {
          if(err) {
            reject({
              code:1,
			  info:"删除数据失败！"
			})
		  } else {
            resolve({
              code:0,
			  info:"删除数据成功！"
			})
		  }
		})
	  })
	}
  }
};