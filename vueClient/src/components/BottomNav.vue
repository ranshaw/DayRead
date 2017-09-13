<template>
    <div class="container f28">
        <ul class="app-flex-row">
            <li  class="app-flex1"
                v-for="item in titleList">
                <router-link :to="item.router">
                    <i :class='item.icon'></i>
                    <div class="title">{{item.title}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default({
	data () {
	  return {
		titleList: [
		  {
			title: '博客',
			icon: 'iconfont icon-blog iconFontSize',
			router: '/blog'
		  },
		  {
			title: '公众号',
			icon: 'iconfont icon-wenzhang iconFontSize',
			router: '/wx'
		  },
		  {
			title: '新闻',
			icon: 'iconfont icon-NEWS-copy iconFontSize',
			router: '/news/wangYi'
		  },
		  {
			title: '电影',
			icon: 'iconfont icon-dianying iconFontSize',
			router: '/movies'
		  }
		],

	  }
	},
	methods: {

	}
  })
</script>

<style scoped>
    .container {
        position: fixed;
        left: 50%;
        bottom: 0;
        z-index: 9999;
        width: 100%;
        max-width: 750px;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .container > ul {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-color: #fafafa;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        text-align: center;
    }

    .container > ul li a {
        display: block;
        width: 100%;
        height: 100%;
        padding:0.15rem 0;
    }

    .router-link-active {
        background-color: #eaeaea;
    }

    .router-link-active i, .router-link-active div {
        color: #d81e06;
    }

    .title {
        margin-top: 0.08rem;
    }
</style>