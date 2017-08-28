/**
 * Created by Ranshaw on 2017/8/9.
 */

'use strict';

module.exports = {
  setCookie:(key,value) => {
    let days = 3600,
		exp = new Date();

	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${key}=${value};expires=${exp.toGMTString()}`
  },
  getCookie:(key) => {
	let arr = document.cookie.split(';').map((v) => {
	  return v.split('=')
	});

	for (let val of arr) {
	  if(val[0].trim() == key) {
	    return val[1].trim()
	  }
	}
  }
};