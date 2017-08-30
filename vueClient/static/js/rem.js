/**
 * Created by Ranshaw on 2017/7/17.
 * 增加全局配置设计稿大小，字体大小，最大宽度，最小宽度
 */
(function(_D){
  var Dpr = 1,
	  _self = {},
	  sourceWidth = 750,
	  initFsize = 100,
	  maxWidth = 750,
	  minWidth = 320,
	  uAgent = window.navigator.userAgent;
  var isIOS = uAgent.match(/iphone/i);
  var isYIXIN = uAgent.match(/yixin/i);
  var is2345 = uAgent.match(/Mb2345/i);
  var ishaosou = uAgent.match(/mso_app/i);
  var isSogou = uAgent.match(/sogoumobilebrowser/ig);
  var isLiebao = uAgent.match(/liebaofast/i);
  var isGnbr = uAgent.match(/GNBR/i);


  _self.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  _self.Html = _D.getElementsByTagName("html")[0];

  /*获取屏幕宽度*/
  _self.getWandH = function () {
	var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
				window.innerWidth : window.innerWidth;
	var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
			screen.height : window.innerHeight : window.innerHeight;

	return {
	  wWidth:wWidth,
	  wHeight:wHeight
	}
  };
  _self.setFsize = function () {
	var wDpr,
		wWidth,
		wHeight,
		initRem,
		wFsize;

	wWidth = _self.getWandH().wWidth;
	wHeight = _self.getWandH().wHeight;

	if (window.devicePixelRatio) {
	  wDpr = window.devicePixelRatio;
	} else {
	  wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
	}
	if (isIOS) {
	  wWidth = screen.width;
	  wHeight = screen.height;
	}

	if (wWidth > wHeight) {
	  wWidth = wHeight;
	}
	/*默认750的设计稿，最大宽1080px，最小宽240px*/
	initRem = sourceWidth/initFsize;
	wFsize = wWidth > maxWidth ? maxWidth / initRem : wWidth / initRem;
	wFsize = wFsize > minWidth / initRem ? wFsize : minWidth / initRem;

	if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) { //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
	  setTimeout(function () {

		wWidth = _self.getWandH().wWidth;
		wFsize = wWidth > maxWidth ? maxWidth / initRem : wWidth / initRem;
		wFsize = wFsize > minWidth / initRem ? wFsize : minWidth / initRem;
		// document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
		_self.Html.style.fontSize = wFsize + 'px';
//			document.getElementById("fixed").style.display = "none";
	  }, 500);
	} else {
	  // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
	  _self.Html.style.fontSize = wFsize + 'px';
//		  document.getElementById("fixed").style.display = "none";
	}
//		 alert("fz="+wFsize+";dpr="+window.devicePixelRatio+";UA="+uAgent+";width="+wWidth+";sw="+screen.width+";wiw="+window.innerWidth+";wsw="+window.screen.width+window.screen.availWidth);

  };

  _self.changePage = function(){
	_self.setFsize();
	/*修正某些手机rem值计算不准确*/
	_self.correctPx();
	/*隐藏未计算出rem之前的遮罩层*/
	// document.getElementById("fixed").style.display = "none";

  };
  _self.correctPx = function(){

	var clientWidth = _self.getWandH().wWidth;

	if (!clientWidth || clientWidth > maxWidth || maxWidth > 768) return;
	var div = document.createElement('div');
	div.style.width = '1.4rem';
	div.style.height = '0';
	document.body.appendChild(div);
	var ideal = 140 * clientWidth / sourceWidth;
	console.log(ideal);
	var rmd = (div.clientWidth / ideal);
	console.log(rmd);
	if(rmd > 1.2 || rmd < 0.8){

	  document.documentElement.style.fontSize = initFsize * (clientWidth / sourceWidth) / rmd + 'px';
	  document.body.removeChild(div);
	}

  };

  if (!document.addEventListener) return;
  window.addEventListener(_self.resizeEvt,_self.changePage,false);
  // window.addEventListener('load', _self.changePage,false);
  _self.changePage();
  // document.addEventListener('DOMContentLoaded', _self.changePage, false);
})(document);