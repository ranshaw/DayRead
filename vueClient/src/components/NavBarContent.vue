<template>
    <div class="content">

        <!--<top-nav-bar v-on:preSelected="getAniName" :titleList="titleList" :selected="initSelected" :type="type"></top-nav-bar>-->
        <top-nav-bar  :titleList="titleList" :selected="initSelected" :type="type"></top-nav-bar>
        <transition :name="$store.state.animateName">

            <ul     v-if="show"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="loading"
                    infinite-scroll-distance="10">
                <li v-for="item in blogsList">
                    <blog-item :blogItems="item"></blog-item>
                </li>
            </ul>

        </transition>
        <div class="loading" v-show="!blogsList.length || loading">
            <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <div v-show="noMore" class="noMore f32">
            没有更多的了
        </div>
    </div>
</template>

<script>
  import {Spinner, InfiniteScroll} from 'mint-ui';
  import BScroll from 'better-scroll';
  import BlogItem from './BlogItem.vue';
  import TopNavBar from './TopNavBar.vue'
  import {mapState} from 'vuex'
  import Vue from 'vue'
  Vue.use(InfiniteScroll);
  Vue.component(Spinner.name, Spinner);

  export default({
	props: ['typeNow', 'selectedNow', 'titleListNow'],
	data: function () {
	  return {
		type: this.typeNow,
		initSelected: this.selectedNow,
//		selected: this.$store.state.selectedNow, /*selected的值无法随着state的值变化更新，采用mapState()*/
		titleList: this.titleListNow,
		blogsList: [],                       //当前展示的数据
		blogs: {},                           //储存已经请求过的数据
		loading: false,
		show:false,
		noMore: false
	  }
	},
	computed: {
	  ...mapState({
		selected: 'selectedNow',
	  })
	},
	components: {
	  BlogItem,
	  "mt-spinner": Spinner,
	  TopNavBar
	},
	methods: {
	  getList (path) {
		this.api(path).then((res) => {
		  if (res.status === 200 && res.data.code === 0) {
			this.blogsList = res.data.info;
			let name = this.selected;
			this.blogs[name] = [].concat(res.data.info);
              /*数据保存到state中*/
			this.$store.dispatch('saveLists', {
			  type: this.type,
			  lists: this.blogs
			});
			/*进入动画开启*/
			setTimeout(() => {
			  this.show = true;
            },1000)


		  } else {

		  }
		})
	  },
	  getPrevList () {

		this.loading = true;

          /*暂时处理极客头条*/
		if (this.selected == 'jiKe' || this.type != 'blog') {
		  this.loading = false;
		  this.noMore = true;
		  return;
		}

		let pageObj, page;

		this.titleList.forEach((v) => {
		  if (v.id == this.selected) {
			pageObj = v
		  }
		});

		page = ++pageObj.page;
		let path = `${this.path[this.selected + 'Prev']}?page=${page}`;

		this.api(path).then((res) => {
		  if (res.status === 200 && res.data.code === 0) {

			res.data.info.forEach((v) => {
			  this.blogsList.push(v);
//              this.blogs[this.selected].push(v);
			});
			this.loading = false;
		  } else {
			this.loading = false;
			this.noMore = true;
		  }

		})
	  },
	  updateData () {
		this.blogsList = [];
		this.noMore = false;
		/*还原动画*/
		this.show = false;
          /*本地有储存从本地拿数据，没有就请求*/
		this.blogs = this.$store.state[`${this.type}Lists`];
		if (this.blogs[this.selected]) {
		  this.blogsList = this.blogs[this.selected];
            /*进入动画开启,异步动画才能执行*/
		  setTimeout(() => {

			this.show = true;
          },0)

		} else {
		  this.getList(this.path[this.selected])
		}
	  },
	  loadMore () {
		console.log('到底了');
		console.log('选中到底', this.selected);
          /*第一页已经加载后，才能请求第二页*/
		if (this.blogs[this.selected]) {
		  this.getPrevList();
		}
	  },
      getAniName:function (...arg) {
        let preSelected = arg[0],
            nowSelected = arg[1],
            nowSelectedIndex,
            preSelectedIndex;

        this.titleList.forEach((v,i) => {

          if(v.id === nowSelected) {
			nowSelectedIndex = i;
          } else if (v.id === preSelected) {
			preSelectedIndex = i;
          }
        });

        if(nowSelectedIndex < preSelectedIndex) {
          this.animateName = 'BounceSlideRight'
        } else {
		  this.animateName = 'BounceSlideLeft'
        }

      }
	},
	watch: {
	  selected: {
		handler: function () {
		  this.updateData();
		},
		deep: true
	  }
	},
	mounted () {
	  console.log('选中', this.selected, `${this.type}SelectedNow`)
	  this.updateData()
	}

  })
</script>

<style scoped lang="less">
    @font-base-size : 100px;
    .mint-cell {
        height: 200rem / @font-base-size;;
        border-bottom: 1px solid #eee;
    }

    .mint-cell-text {
        font-size: 0.36rem;
    }

    .mint-navbar {
        overflow: auto;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: fixed;
        z-index: 1;
    }

    .mint-navbar > div {
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .mint-navbar::-webkit-scrollbar {
        display: none
    }

    .mint-navbar .tt-overflow {
        -webkit-box-flex: none;
        -ms-flex: none;
        flex: none;
        width: 1.5rem;
        box-sizing: border-box;
    }

    .mint-navbar .mint-tab-item.is-selected {
        margin-bottom: 0;
        border-color: #d81e06;
        color: #d81e06;
    }

    .mint-cell-allow-right {
        display: none;
    }

    .mint-navbar .mint-tab-item {
        padding: 0.25rem 0;
    }

    .mint-cell-allow-right::after {
        border: none;
    }

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