<template>
    <ul      class="hot-wrap f28"
             v-infinite-scroll=""
             infinite-scroll-disabled=""
             infinite-scroll-immediate-check=""
             infinite-scroll-distance="10">
        <li v-for="item in hotList">
            <h2 class="f46 hot-title">
                {{item.title}}
            </h2>
            <div class="hot-top clearFix">
                <h5 class="hot-top-sort">排名</h5>
                <h5 class="hot-top-key">关键词</h5>
                <h5 class="hot-top-search">搜索指数</h5>
            </div>
            <div class="hot-content-wrap" v-for="(v,index) in item.info">
                <a :href="v.originUrl">
                    <span class="hot-content-mark">{{index+1}}</span>
                    <span class="hot-content-title">{{v.title}}</span>
                    <span class="hot-content-search">{{v.ind}}</span>
                </a>
            </div>
        </li>
    </ul     >
</template>

<script>
 export default({
    props:['hotList']
 })
</script>

<style>
    .hot-top {
        margin-top:.2rem;
    }
    .hot-title {
        margin-top:.3rem;
    }
    .hot-top-sort {
        margin-left: .3rem;
        float: left;
    }
    .hot-top-key {
        margin-left:.5rem;
        float: left;
    }
    .hot-top-search {
        float:right;
        margin-right:.3rem;
    }
    .hot-content-wrap {
        text-align: left;
        padding: .2rem .4rem ;
        border-bottom: 1px dotted #DBDBDB;
    }
    .hot-content-wrap>a span {
        display: inline-block;
    }
    .hot-content-wrap .hot-content-mark {
        background: #ED4138;
        border: 1px solid #db2b28;
        width:.3rem;
        height:.3rem;
        text-align: center;
        color: #ffffff;
        line-height: .3rem;
    }
    .hot-content-title {
        margin-left:.64rem;
        color: #2464B2;
    }
    .hot-content-search {
        float: right;
    }
</style>