<template>
    <div>
        <t-header tit="新 闻"></t-header>
        <t-top-nav
            :selected="selected"
            :titleList="titleList"
        ></t-top-nav>
        <div class="swipeWrap">
            <mt-swipe :auto="3000" :showIndicators="false">
                <mt-swipe-item>
                    <img src="" alt="">
                </mt-swipe-item>
                <mt-swipe-item>2</mt-swipe-item>
                <mt-swipe-item>3</mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
  import {Swipe, SwipeItem} from 'mint-ui'

  export default ({
	data () {
	  return {
		swipeList: [],
		selected:'wangYi',
		titleList:[
		  {title: '网易', id: 'wangYi',page:1}
		]
	  }
	},
	methods: {},
	components: {
	  't-header': Header,
	  'mt-swipe': Swipe,
	  'mt-swipe-item': SwipeItem,
	  't-top-nav': TopNavBar

	},
	mounted () {

	}
  })
</script>

<style scoped>
    .swipeWrap {
        margin-top: 0.8rem;
    }

    .swipeWrap > div {
        height: 3.8rem;
    }

    .mint-swipe-item {
    }

</style>