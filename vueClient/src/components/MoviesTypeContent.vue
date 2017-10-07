<template>
    <div class="movies-types">
        <header class="clearFix">
            <h3 class="f46">{{title}}</h3>
            <div @click="getMore" class="movies-types-more f34" >更多</div>
        </header>

        <div class="betterScroll" :class="scrollClass">
            <div ref="scrollWrap">
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
      pathName:String,
	  scrollClass:String
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
    watch:{
	  moviesList:function () {
		setTimeout(  () => {
		  new BScroll(`.${this.scrollClass}`, {
			click: true,
			scrollX: true
		  });
		},10);
      }
    },
    mounted () {
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
        /*overflow-x: auto;
        overflow-y:hidden ;*/
    }
    .betterScroll::-webkit-scrollbar {
         width: 0;
         height: 0;
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
    .betterScroll .item:last-child {
        margin-right:.2rem ;
    }

</style>