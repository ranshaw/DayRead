/**
 * Created by Ranshaw on 2017/8/9.
 */

export default {
	changeSelected (state,selectedNow) {
	  console.log('当前',selectedNow)
	  state.selectedNow = selectedNow;
	},
  	saveRoute (state,{ path,type }) {
	  state[`old${type}Route`] = path
	},
    saveLists (state,{type,lists}) {
	  state[`${type}Lists`] = lists;
	}
}