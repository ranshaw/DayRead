<template>
    <div class="content">
       <!-- <mt-navbar v-model="selected"  class="betterScroll" >
            <div :style="{width:wrapWid}" @click.stop="updateData">
                <mt-tab-item  v-for="item  in titleList"
                              :class="titleList.length > 4 ? 'tt-overflow': '' "
                              :id="item.id">{{item.title}}</mt-tab-item>
            </div>
        </mt-navbar>-->
        <top-nav-bar :titleList="titleList" :selected="selected"></top-nav-bar>

        <!-- tab-container -->
        <mt-tab-container  >
            <div class="placeholder"></div>
            <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="loading"
                    infinite-scroll-distance="10">
                <li  v-for="item in blogsList">
                    <blog-item  :blogItems="item"></blog-item>
                </li>
            </ul>
            <div class="loading" v-show="!blogsList.length || loading">
                <mt-spinner type="fading-circle" :size="60"></mt-spinner>
            </div>
            <div v-show="noMore"  class="noMore f32">
                没有更多的了
            </div>

        </mt-tab-container>
    </div>
</template>

<script>
  import {Navbar, TabItem, Spinner } from 'mint-ui';
  import BScroll from 'better-scroll';
  import BlogItem from './BlogItem.vue';
  import TopNavBar from './TopNavBar.vue'

  export default({
    props:['typeNow','selectedNow','titleListNow'],
	data: function () {
	  return {
	    type:this.typeNow,
		selected: this.selectedNow,
		titleList:this.titleListNow,
        blogsList:[],                       //当前展示的数据
        blogs:{},                           //储存已经请求过的数据
        loading:false,
        noMore:false
	  }
	},
    computed:{
      wrapWid () {
        return this.titleList.length < 5 ? '100%': 'auto'
      }
    },
	components: {
	  "mt-navbar": Navbar,
	  "mt-tab-item": TabItem,
       BlogItem,
      "mt-spinner":Spinner,
	  TopNavBar
	},
	methods: {
      getList (path) {
        this.api(path).then((res) => {
          if(res.status === 200 && res.data.code === 0){
            this.blogsList = res.data.info;
            let name = this.selected;
            this.blogs[name] = [].concat(res.data.info);
          } else {

          }
        })
      },
      getPrevList () {

		this.loading = true;


          /*暂时处理极客头条*/
		if(this.selected == 'jiKe' || this.type != 'blog') {
		  this.loading = false;
		  this.noMore = true;
		  return;
		}

	    let pageObj,page;

	    this.titleList.forEach((v) => {
	      if(v.id == this.selected) {
            pageObj = v
          }
        });

	    page = ++pageObj.page;
	    let path = `${this.path[this.selected + 'Prev']}?page=${page}`;

        this.api(path).then((res) => {
          if(res.status === 200 && res.data.code === 0){

            res.data.info.forEach((v) => {
              this.blogsList.push(v);
              this.blogs[this.selected].push(v);
            });
			this.loading = false;
          } else {
            this.loading = false;
			this.noMore = true;
          }

        })
      },
      updateData () {
        this.blogsList  = [];
		this.noMore = false;
		/*本地有储存从本地拿数据，没有就请求*/
        if(this.blogs[this.selected]) {
          this.blogsList = this.blogs[this.selected];
        } else {
          this.getList(this.path[this.selected])
        }
      },
      loadMore () {
        console.log('到底了');
		console.log('选中到底',this.selected)
        /*第一页已经加载后，才能请求第二页*/
        if( this.blogs[this.selected]) {
		  this.getPrevList();
		}
      }
    },
	mounted () {
	  /*需要在rem计算完成后执行*/
     /* setTimeout(() => {
		new BScroll('.betterScroll',{
		  click:true,
		  scrollX:true
		});
      },1);*/

        console.log('选中1',this.selected)
      this.getList(this.path[this.selected]);

    }
  })
</script>

<style scoped lang="less">
    @font-base-size : 100px;
    .content {
        margin-top:0.7rem;
    }
    .mint-cell {
        height: 200rem / @font-base-size;;
        border-bottom:1px solid #eee;
    }

    .mint-cell-text {
        font-size: 0.36rem;
    }

    .mint-navbar {
        overflow: auto;
        width:100%;
        border-bottom:1px solid #eee;
        position: fixed;
        z-index:1;
    }
    .mint-navbar>div {
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .mint-navbar::-webkit-scrollbar {
        display: none
    }

    .mint-navbar .tt-overflow  {
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
        padding:0.25rem 0;
    }
    .mint-cell-allow-right::after {
        border:none;
    }
    .placeholder {
        margin-top:0.8rem;
    }
    .loading {
        padding-top:0.5rem;
        display: flex;
        justify-content:center;
        margin-bottom:0.5rem;
    }
    .noMore {
        margin-top:0.2rem;
        margin-bottom:0.5rem;
    }
</style>