<template>
    <div class="content">

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="blogs">
                <mt-header fixed title="博 客">
                    <mt-button slot="right">分享</mt-button>
                </mt-header>
                <Blog></Blog>
            </mt-tab-container-item>
            <mt-tab-container-item id="wexin">
                <mt-header fixed title="公 众 号">
                    <mt-button slot="right">分享</mt-button>
                </mt-header>
                <WeXin></WeXin>
            </mt-tab-container-item>
            <mt-tab-container-item id="news">
                <mt-header fixed title="新 闻">
                    <mt-button slot="right">分享</mt-button>
                </mt-header>
                <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="movies">
                <mt-header fixed title="电 影">
                    <mt-button slot="right">分享</mt-button>
                </mt-header>
                <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-tabbar fixed v-model="selected">
            <mt-tab-item id="blogs">
                <i slot="icon" class='iconfont icon-blog iconFontSize' ></i>
                博客
            </mt-tab-item>
            <mt-tab-item id="wexin">
                <i slot="icon" class='iconfont icon-wenzhang iconFontSize'></i>
                公众号
            </mt-tab-item>
            <mt-tab-item id="news">
                <i slot="icon" class='iconfont icon-NEWS-copy iconFontSize'></i>
                新闻
            </mt-tab-item>
            <mt-tab-item id="movies">
                <i slot="icon" class='iconfont icon-dianying iconFontSize'></i>
                电影
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
  import {Tabbar, TabItem, TabContainer, TabContainerItem, Header} from 'mint-ui';
  import  Blog from './blog/index.vue';
  import  WeXin from './wx/index.vue';
  export default({
	data: function () {
	  return {
		selected: 'blogs'
	  }
	},
	computed: {},
	components: {
	  "mt-tabbar": Tabbar,
	  "mt-tab-item": TabItem,
	  "mt-tab-container": TabContainer,
	  "mt-tab-container-item": TabContainerItem,
	  "mt-header": Header,
	  Blog,
	  WeXin
	},
	methods: {

	}

  })
</script>

<style   lang="less" >
    @font-base-size :100px;

    .mint-tabbar > .mint-tab-item.is-selected {
        color: #d81e06;
    }
    .mint-tab-item {
        padding:8rem/@font-base-size 0;
    }
    .mint-tab-item-icon{
        width: 40rem/@font-base-size;
        height: 40rem/@font-base-size;
        margin: 0 auto 6rem/@font-base-size;

    }
    .iconFontSize {
        font-size:40rem/@font-base-size;
    }
    .mint-tab-item-label {
        font-size:30rem/@font-base-size;
    }
    .mint-header-title {
        font-size:36rem/@font-base-size;
    }
    .mint-header {
        height:80rem/@font-base-size;
    }
    .mint-button-text {
        font-size:28rem/@font-base-size;
    }
    .mint-header {
        background-color:#d81e06
    }
    .mint-tab-container .mint-tab-container-wrap {
        flex-direction: column;
        margin-bottom:0.6rem;

    }
</style>