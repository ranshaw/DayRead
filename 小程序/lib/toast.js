/**
 * Created by Ranshaw on 2017/8/2.
 */
const path = '/images/toast/';

const image = {
  ok: path + 'ok.png',
  tip: path + 'tip.png',
  warning: path + 'warning.png',

  'color-ok': path + 'color/ok.png',
  'color-tip': path + 'color/tip.png',
  'color-warning': path + 'color/warning.png',
  'color-waiting': path + 'color/waiting.png',
  'color-security': path + 'color/security.png'
};

module.exports = {
  show: ({title = '信息', type = 'tip', duration = 1500, mask = false}) => {
	wx.showToast({
	  title,
	  duration,
	  mask,
	  image: image[type]
	})
  },
  hide: () => {
	wx.hideToast();
  }
};