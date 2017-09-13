<template>
    <div>
        <t-header tit="新 闻"></t-header>
        <t-top-nav
            :selected="selected"
            :titleList="titleList"
        ></t-top-nav>

        <div class="loading" v-show="!swipeList.length || loading">
            <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <t-swipe-news :swipeList="swipeList"></t-swipe-news>

        <ul     class="newsItem f32"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="loading"
                infinite-scroll-distance="10">
            <li  v-for="item in newsList">
                <t-news-item :item="item"></t-news-item>
            </li>
        </ul>

        <div v-show="noMore"  class="noMore f32">
            没有更多的了
        </div>

    </div>
</template>

<script>
  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
  import SwipeNews from '../../components/SwipeNews.vue'
  import NewsItem from '../../components/NewsItem.vue'

  export default ({
	data () {
	  return {
		swipeList: [],
        newsList:[],
		selected:'wangYi',
        WYNewsPage:9,
		loading:false,
		noMore:false,
		titleList:[
		  {title: '网易', id: 'wangYi',page:1},
		  {title: '头条', id: 'touTiao',page:1},
		  {title: '热搜', id: 'hot',page:1},
		]
	  }
	},
	methods: {
	  getNews:function () {
	    switch (this.$store.state.selectedNow) {
          case 'wangYi':
            this.toReq('wangYiSlides').then((res) => {

			  if(res.status === 200 && res.data.code === 0) {
                this.swipeList = res.data.info
			  }
			},(err) => {

			});
            this.toReq(`wangYiNews`,`?page=${this.WYNewsPage}`).then((res) => {

              if(res.status === 200 && res.data.code === 0) {
                this.newsList = res.data.info;
              }
            });
            break;
        }

      },
      toReq:function (path,page='') {
	    return this.api(this.path[path]+page)
      },
      loadMore:function () {
	    
      }
    },
	components: {
	  't-header': Header,
	  't-top-nav': TopNavBar,
      't-swipe-news':SwipeNews,
      't-news-item':NewsItem
	},
	mounted () {
        this.getNews();
	}
  })
</script>

<style scoped>
    .loading {
        margin-top:1.7rem ;
        padding-top:0.5rem;
        display: flex;
        justify-content:center;
        margin-bottom:0.5rem;
    }
    .noMore {
        margin-top:0.2rem;
        margin-bottom:0.5rem;
    }

    .newsItem {
        background: #f6f6f6;
        margin-bottom:1rem;
    }
    .newsItem>li {
        padding:.2rem 0;
        border-bottom:1px solid #e5e5e5;
        margin:0 .3rem;
    }


</style>