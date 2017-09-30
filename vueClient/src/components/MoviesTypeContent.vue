<template>
    <div class="movies-types">
        <header class="clearFix">
            <h3 class="f46">{{title}}</h3>
            <div @click="getMore" class="movies-types-more f34" >更多</div>
        </header>

        <div class="betterScroll">
            <div :style="{width:contentWidth}">
                <t-movies-item  class="item" :moviesItem="item" v-for="item in moviesList"></t-movies-item>
            </div>

        </div>


    </div>
</template>

<script>
  import MoviesItem from './MoviesItem.vue'
  import BScroll from 'better-scroll';
  export default ({
    props:{
      moviesList:Array,
      title:String,
      pathName:String
    },
	data () {
        return {

        }
	},
    methods:{
	  getMore () {
	    this.$router.push({
	      path:'/movies/douBan/more',
          query:{
            title:this.title,
            api:this.path[this.pathName]
          }
        })
      }
    },
	components: {
	  't-movies-item':MoviesItem,
    },
    computed:{
	  contentWidth () {
        return `${this.moviesList.length * 2}rem`
      }
    },
    mounted () {
        /*需要在rem计算完成后执行*/
	  setTimeout(function () {
		new BScroll('.betterScroll', {
		  click: true,
		  scrollX: true
		});
	  }, 1000);
    }
  })
</script>

<style scoped>
    .movies-types header {
        padding:0 .4rem;
    }
    .movies-types header h3 {
        text-align: left;
        margin-bottom:.5rem;
        float: left;
    }
    .movies-types-more {
        color: #42bd56;
        float: right;
    }
    .betterScroll {
        width:100%;
        max-width: 750px;
        display: flex;
    }
    .betterScroll>div {
        white-space:nowrap;
        display: flex;
    }
    .betterScroll .item {
        margin-left:.2rem;
        flex:none;
    }
    .betterScroll .item:first-child {
        margin-left: .4rem;

    }

</style>