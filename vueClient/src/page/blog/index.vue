<template>
    <div class="content">
        <mt-navbar v-model="selected"  class="betterScroll" >
            <div :style="{width:wrapWid}" @click.stop="switchTab">
                <mt-tab-item  v-for="item  in titleList"
                             :class="titleList.length > 4 ? 'tt-overflow': '' "
                              :id="item.id">{{item.title}}</mt-tab-item>
            </div>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
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
            <div v-show="!loading"  class="noMore f32">
                没有更多的了
            </div>

        </mt-tab-container>
    </div>
</template>

<script>
  import {Navbar, TabItem, Spinner } from 'mint-ui';
  import BScroll from 'better-scroll';
  import BlogItem from '../../components/BlogItem.vue';

  export default({
	data: function () {
	  return {
		selected: 'jueJin',
		titleList: [
		  {title: '掘金', id: 'jueJin',page:1},
		  {title: '极客头条', id: 'jiKe',page:1},
		  {title: 'SF', id: 'sf',page:1},
		  {title: '伯乐在线', id: 'bole',page:1},
          {title: '张鑫旭', id: 'zxu',page:1}
		],
        blogsList:[],
        blogs:{},
        loading:false
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
      "blog-item":BlogItem,
      "mt-spinner":Spinner
	},
	methods: {
	  switchTab () {
	     switch (this.selected) {
           case 'jueJin' :
             this.updateData();
             break;
           case 'jiKe' :
             this.updateData();
             break;
           case 'sf' :
             this.updateData();
             break;
           case 'zxu' :
             this.updateData();
             break;
           case 'bole' :
             this.updateData();
             break;
         }
      },
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

	    let pageObj,page;

	    this.titleList.forEach((v) => {
	      if(v.id == this.selected) {
            pageObj = v
          }
        });

	    page = ++pageObj.page;
	    let path = `/blog/${this.selected}Prev?page=${page}`;

        this.api(path).then((res) => {
          if(res.status === 200 && res.data.code === 0){
            res.data.info.forEach((v) => {
              this.blogsList.push(v);
              this.blogs[this.selected].push(v);
              this.loading = false;
            });

          } else {
            this.loading = false;
          }
        })
      },
      updateData () {
        this.blogsList  = [];
        if(this.blogs[this.selected]) {
          this.blogsList = this.blogs[this.selected];
        } else {
          this.getList(this.path[this.selected])
        }
      },
      loadMore () {
        this.loading = true;
        console.log('到底了');
        this.getPrevList();

      }
    },
	mounted () {
	  /*需要在rem计算完成后执行*/
      setTimeout(() => {
		new BScroll('.betterScroll',{
		  click:true,
		  scrollX:true
		});
      },1);
      this.getList(this.path.jueJin);
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
    }
    .noMore {
        margin-top:0.2rem;
    }
</style>