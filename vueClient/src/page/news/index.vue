<template>
    <div>
        <t-header tit="新 闻"></t-header>
        <t-top-nav
                :selected="initSelected"
                :titleList="titleList"
        ></t-top-nav>

        <t-swipe-news v-if="selected === 'wangYi'" :swipeList="swipeList"></t-swipe-news>
        <transition :name="$store.state.animateName">
            <component
                    v-if="!loading"
                    v-bind:is="currentView"
                    :newsList="newsList"
                    :hotList="hotList"
            >
            </component>
        </transition>

        <div class="loading" v-show="loading">
            <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <div v-show="(noMore || hotList.length) && !loading" class="noMore f32">
            没有更多的了
        </div>

    </div>
</template>

<script>
  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
  import SwipeNews from '../../components/SwipeNews.vue'
  import NewsItem from '../../components/NewsItem.vue'
  import {mapState} from 'vuex'
  import hotItem from '../../components/HotItem.vue'

  export default ({
	data () {
	  return {
		swipeList: [],
		newsList: [],
		hotList: [],
		initSelected: 'wangYi',
		WYNewsPage: 9,
		loading: true,
		noMore: true,
		currentView: NewsItem,
		titleList: [
		  {title: '网易', id: 'wangYi', page: 1},
		  {title: '头条', id: 'touTiao', page: 1},
		  {title: '热搜', id: 'hot', page: 1},
		]
	  }
	},
	computed: {
	  ...mapState({
		selected: 'selectedNow'
	  })
	},
	methods: {
	  getNews: function () {
		switch (this.selected) {
		  case 'wangYi':
			let wangYiSlides = this.$store.state.wangYiSlides,
				wangYiNews   = this.$store.state.wangYiNews;

			if (wangYiSlides.length > 0) {
			  this.swipeList = wangYiSlides;
			  this.loading = false;
			} else {
			  this.toReq('wangYiSlides').then((res) => {
				if (res.status === 200 && res.data.code === 0) {
				  this.swipeList = res.data.info;
				  this.loading = false;
				  this.$store.dispatch('saveWangYiSlides', this.swipeList)
				}
			  }, (err) => {

			  });
			}

			if (wangYiNews.length > 0) {
			  this.newsList = wangYiNews;

			} else {
			  this.toReq(`wangYiNews`, `?page=${this.WYNewsPage}`).then((res) => {

				if (res.status === 200 && res.data.code === 0) {
				  this.newsList = res.data.info;
				  this.$store.dispatch('saveWangYiNews', this.newsList)
				}
			  });
			}

			break;
		  case 'touTiao':
            let touTiaoList = this.$store.state.touTiao;

           /* if(touTiaoList.length > 0) {
              this.newsList = touTiaoList;
              this.loading = false;
            } else {
			  this.toReq('touTiao').then((res) => {
				if (res.status === 200 && res.data.code === 0) {
				  this.newsList = res.data.info;
				  this.$store.dispatch('saveTouTiao',this.newsList);
				  this.loading = false
				}
			  });
            }
*/
			this.toReq('touTiao').then((res) => {
			  if (res.status === 200 && res.data.code === 0) {
				this.newsList = res.data.info;
				this.$store.dispatch('saveTouTiao',this.newsList);
				this.loading = false
			  }
			});


			break;
		  case 'hot':
			this.toReq('hot').then((res) => {
			  if (res.status === 200 && res.data.code === 0) {

				this.loading = false;
				this.hotList = res.data.info;
			  }
			});
			break;
		}

	  },
	  toReq: function (path, page = '') {
		return this.api(this.path[path] + page)
	  }
	},
	watch: {
	  selected: function () {
		setTimeout(() => {
		  this.loading = true;
		}, 0);

		this.getNews();

		if (this.selected === 'hot') {
		  this.currentView = hotItem
		} else {
		  this.currentView = NewsItem
		}
	  },
	  deep: true
	},
	components: {
	  't-header': Header,
	  't-top-nav': TopNavBar,
	  't-swipe-news': SwipeNews,
	  't-hot-item': hotItem
	},
	mounted () {
	  this.getNews();
	}
  })
</script>

<style scoped>
    .loading {
        padding-top: 0.5rem;
        display: flex;
        justify-content: center;
        margin-bottom: 0.5rem;
    }

    .noMore {
        margin-top: 0.2rem;
        margin-bottom: 1.5rem;
    }
</style>