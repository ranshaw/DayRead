/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

const router = require('koa-router')();
const common = require('./common/index');
router.get('*',common);

/*博客*/
const {zxu,zxuPrev} = require('./blog/zxu/index');
const {bole,bolePrev} = require('./blog/bole/index');
const {jike,jikePrev} = require('./blog/jike/index');
const {juejin,juejinPrev} = require('./blog/juejin/index');
const {sf,sfPrev} = require('./blog/sf/index');

router.get('/blog/zxu',zxu);
router.get('/blog/zxuPrev',zxuPrev);
router.get('/blog/bole',bole);
router.get('/blog/bolePrev',bolePrev);
router.get('/blog/jiKe',jike);
router.get('/blog/jiKePrev',jikePrev);
router.get('/blog/jueJin',juejin);
router.get('/blog/jueJinPrev',juejinPrev);
router.get('/blog/sf',sf);
router.get('/blog/sfPrev',sfPrev);


/*新闻*/
const { slides,newsList } = require('./news/wangyi/index');
const { sougou }          = require('./news/sougou/index');
const { baidu }          = require('./news/baidu/index');
const { weibo }          = require('./news/weibo/index');

router.get('/wangyi/slides',slides);
router.get('/wangyi/news',newsList);
router.get('/hot/baidu',baidu);
router.get('/hot/weibo',weibo);
router.get('/hot/sougou',sougou);

/*电影*/
const { douban } = require('./movies/douban/index');

router.get('/movies/douban',douban);

/*公众号*/
const {account,refreshWx} = require('./weixin/index');

router.get('/weixin/account',account);

module.exports.register = (app) => {
  app.use(router.middleware());
};