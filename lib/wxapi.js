/**
 * Created by Ranshaw on 2017/8/2.
 */
const toast = require('./toast');

const wxapi = (api,params = {}) => {

  if(api === 'showToast') {
    return toast.show(params);
  }

  return new Promise((resolve,reject) => {
	wx[api](Object.assign({
	  success: (res) => {
		resolve(res);
	  },
	  fail: (res) => {
		reject(res)
	  }
	},params))

  });
};

module.exports = wxapi;