<template>
    <div class="container">
        <h2 class="title">
            <a :href="blogItems.originUrl">{{blogItems.title}}</a>
        </h2>
        <div>
            <p class="time">
                {{blogItems.time}}
            </p>
            <p class="author">
                <a :href="blogItems.authorUrl">
                    {{blogItems.author}}
                    <img :src="blogItems.iconUrl" alt="">
                </a>
            </p>
        </div>

    </div>
</template>

<script>

  export default (
      {
        props:['blogItems'],
        data () {
          return {

          }
        }
      }
  )

</script>

<style scoped>
    .container {
        font-size: 0.36rem;
        border-bottom: 1px solid #eee;
        text-align: left;
        padding: 0.4rem 0.3rem 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }
    .container a {
        color: #000;
    }
    .title {
        width: 100%;
    }
    .title a {
        font-size: 0.36rem;
        /*overflow: hidden;
        white-space: nowrap;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;*/
        display: block;

    }
    .title a:visited {
        color: #7e8c8d;
    }
    .author {
        font-size:0.28rem;
        margin-top:0.2rem;
        float: right;

    }
    .author a {
        color: #b2bac2;
        display: flex;
        align-items: center;
    }
    .author img {
        width:0.8rem;
        height:0.8rem;
        border-radius: 100%;
        margin-left:0.3rem;
    }
    .time {
        display: inline-block;
        font-size:0.28rem;
        margin-top:0.45rem;
        color: #b2bac2;
    }
</style>