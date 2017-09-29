/**
 * Created by Ranshaw on 2017/8/2.
 */
const url = 'http://192.168.31.159:3002';
const wxapi = require('./wxapi');


module.exports = async function (path,data={},options={}) {
  let _options = {
    method:'get',
	baseUrl:null
  };
  Object.assign(_options,options);
  let baseUrl = _options.baseUrl || url;

  const res = await wxapi('request',{
	url:`${baseUrl}${path}`,
	data,
	method:_options.method || 'get'
  });

  return res ;

};

