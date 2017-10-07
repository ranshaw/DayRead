/**
 * Created by Ranshaw on 2017/8/9.
 */

export default {
	changeSelected ({ commit }, selectedNow) {
		commit('changeSelected',selectedNow)
	},
  	saveRoute ({ commit } ,obj) {
	  commit('saveRoute',obj)
	},
    saveLists({ commit },lists) {
	  commit('saveLists',lists)
	},
    getAnimateName ({ commit } ,animateName) {
	  commit('getAnimateName',animateName)
	},
    saveDetailPathFrom ({ commit },path) {
	  commit('saveDetailPathFrom',path)
	},
    saveMoviesList ({ commit },data) {
	  commit('saveMoviesList',data)
	},
    saveWangYiSlides ({ commit },data) {
	  commit('saveWangYiSlides',data)
	},
    saveWangYiNews ({ commit },data) {
	  commit('saveWangYiNews',data)
	},
    saveTouTiao ({ commit },data) {
	  commit('saveTouTiao',data)
	}
}
