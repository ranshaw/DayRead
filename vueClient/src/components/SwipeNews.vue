<template>
    <div class="swipeWrap">
                <mt-swipe :auto="4000" :showIndicators="false">
                    <mt-swipe-item class="swipeItemWrap" v-for="(item,index) in swipeList">
                        <a :href="item.originUrl">
                            <img :src="item.imgUrl" alt="">
                            <div class="title-wrap f32">
                                <span class="title">{{item.title}}</span>
                                <span class="title-num">{{index+1}}<span style="color: #999;">/</span><span class="f26">{{swipeList.length}}</span></span>
                            </div>
                        </a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui'
    export default({
      props:['swipeList'],
      components:{
		'mt-swipe': Swipe,
		'mt-swipe-item': SwipeItem,
      }
    })
</script>

<style scoped>
    .swipeWrap {
        margin-top: 1.7rem;
    }

    .swipeWrap > div {
        height: 3.8rem;
    }

    .swipeItemWrap img{
        width:100%;
        height:100%;
    }
    .swipeItemWrap a {
        display: block;
        width:100%;
        height:100%;
        position: relative;
    }
    .swipeItemWrap .title-wrap {
        position: absolute;
        bottom: 0;
        width:100%;
        height:.9rem;
        font-size:.36rem;
        color: #ffffff;
        background: -webkit-linear-gradient(top,rgba(0,0,0,0) 8%,rgba(0,0,0,0.24) 40%,rgba(0,0,0,0.29) 47%,rgba(0,0,0,0.65) 95%);
        background: linear-gradient(to bottom,rgba(0,0,0,0) 8%,rgba(0,0,0,0.24) 40%,rgba(0,0,0,0.29) 47%,rgba(0,0,0,0.65) 95%);
    }
    .swipeItemWrap .title {
        position: absolute;
        top:60%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        left:.3rem;
    }
    .swipeItemWrap .title-num {
        position: absolute;
        top:60%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        right:.1rem;
        color: #f33;
    }
    .swipeItemWrap .title-num span {
        color: #ffffff;
    }
</style>