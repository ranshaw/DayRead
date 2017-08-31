<template>
    <div class="content">
       <!-- <keep-alive>
            blog和wx两个组件中，同时使用了NavBarContent组件，在MintUi的InfiniteScroll组件中，触底刷新绑定的是全局事件，
            blog和wx两个组件不能共存，不然一个组件滚动时会触发另一个组件的事件
        </keep-alive>-->

        <router-view></router-view>

        <Bottom-nav></Bottom-nav>
    </div>
</template>

<script>
  import  Blog from './blog/index.vue';
  import  WeXin from './wx/index.vue';
  import BottomNav from '../components/BottomNav.vue'
  export default({
	data: function () {
	  return {}
	},
	computed: {},
	components: {
	  Blog,
	  WeXin,
	  BottomNav
	},
	methods: {}

  })
</script>

<style lang="less">
    @font-base-size :100px;

    .mint-tabbar > .mint-tab-item.is-selected {
        color: #d81e06;
    }

    .mint-tab-item {
        padding: 8rem / @font-base-size 0;
    }

    .mint-tab-item-icon {
        width: 40rem / @font-base-size;
        height: 40rem / @font-base-size;
        margin: 0 auto 6rem / @font-base-size;

    }

    .iconFontSize {
        font-size: 40rem / @font-base-size;
    }

    .mint-tab-item-label {
        font-size: 30rem / @font-base-size;
    }

    .mint-header-title {
        font-size: 36rem / @font-base-size;
    }

    .mint-header {
        height: 80rem / @font-base-size;
    }

    .mint-button-text {
        font-size: 28rem / @font-base-size;
    }

    .mint-header {
        background-color: #d81e06
    }

    .mint-tab-container .mint-tab-container-wrap {
        flex-direction: column;
        margin-bottom: 0.6rem;

    }
</style>