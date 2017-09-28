<template>

    <ul
            class="newsItem f32"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="loading"
            infinite-scroll-distance="10">
        <li  v-for="item in newsList">
            <div v-if="item.picInfo.length == 1">
                <a class="clearFix" :href="item.link">
                    <div class="newsItem-left">
                        <img  :src="item.picInfo[0].url" alt="">
                    </div>
                    <div class="newsItem-right">
                        <h5 class="newsItem-right-top">{{item.title}}</h5>
                        <div class="newsItem-right-bot">
                            <span class="left">{{item.time}}</span>
                            <span class="right">{{item.source}}</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="newsItem-3pic " v-else>

                <a class="clearFix" :href="item.link">
                    <h5 class="newsItem-3pic-top f34">{{item.title}}</h5>
                    <div  class="newsItem-imgs-wrap">
                        <img v-for="(v,index) in item.picInfo" class="left" :src="v.url" alt="">
                    </div>

                    <div class="newsItem-3pic-bot f24">
                        <span class="fl">{{item.time}}</span>
                        <span class="fr">{{item.source}}</span>
                    </div>

                </a>

            </div>
        </li>
    </ul>


</template>

<script>
    export default({
      props:['newsList'],
      data () {
        return {
		  loading:false
        }
      },
      methods:{
		loadMore () {
		  console.log('到底了')
        }
      }
    })
</script>

<style>
    .newsItem {
        background: #f6f6f6;
    }
    .newsItem>li {
        padding:.2rem 0;
        border-bottom:1px solid #e5e5e5;
        margin:0 .3rem;
    }
    .newsItem-left {
        float: left;
        width: 27%;
        height: 1.4rem;
        overflow: hidden;
        position: relative;
        margin-right: .2rem;

    }
    .newsItem-left>img {
        width: 100%;
        display: block;
    }

    .newsItem-right-top {
        color: #000;
        text-align: left;
        margin-bottom:.5rem;
        display: -webkit-box;
        -webkit-line-clamp:2;
        overflow: hidden;
        -webkit-line-break:auto;
        -webkit-box-orient:vertical;
    }
    .newsItem-right-bot{
        font-size:.26rem;
    }
    .newsItem-right-bot .left {
        float: left;
    }
    .newsItem-right-bot .right {
        float: right;
    }
    .newsItem-3pic>a {
        display: flex;
        flex-direction: column;
    }
    .newsItem-3pic-top {
        text-align: left;
        color: #000;
        margin-bottom: .2rem;
    }
    .newsItem-imgs-wrap{
        display: flex;
        justify-content:space-between;
    }
    .newsItem-imgs-wrap>img {
        width: 32%;
        height:1.56rem;
        display: inline-block;
    }
    .newsItem-3pic-bot {
        margin-top:.2rem;
    }
</style>