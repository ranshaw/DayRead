/**
 * Created by Ranshaw on 2017/8/9.
 */

export default {
	changeSelected (state,selectedNow) {
	  console.log('当前',selectedNow);
	  state.selectedNow = selectedNow;
	},
  	saveRoute (state,{ path,type }) {
	  state[`old${type}Route`] = path
	},
    saveLists (state,{type,lists}) {
	  state[`${type}Lists`] = lists;
	},
    getAnimateName (state, animateName) {
	  state.animateName = animateName
	},
    saveDetailPathFrom (state,path) {
	  state.detailFromPath = path
	},
    saveMoviesList (state,data) {

	  if(data.hotMovies) {
		state.hotMoviesList =  state.hotMoviesList.concat(data.hotMovies)
	  } else {
		state.newMoviesList =  state.newMoviesList.concat(data.newMovies)
	  }
	},
    saveWangYiSlides (state,data) {
	  state.wangYiSlides = data
	},
    saveWangYiNews (state,data) {
	  state.wangYiNews = data
	},
    saveTouTiao (state,data) {
	  state.touTiao = data
	},
    saveHot (state,data) {
	  state.hot = data
	}
}