/**
 * Created by Ranshaw on 2017/8/15.
 */
'use strict';

const mongoose = require('mongoose'),
	  db       = mongoose.connect('mongodb://127.0.0.1:27017/dayread',{useMongoClient:true});

mongoose.Promise = global.Promise;
mongoose.set('debug',true);

module.exports = {
  db,
  mongoose
};