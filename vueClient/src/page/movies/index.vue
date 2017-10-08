<template>
    <div class="movies-wrap">
        <t-header tit="电 影"></t-header>
        <div class="movies-content">
            <t-movies-type class="section" scrollClass="scrollHot" :title="hotTitle" pathName="hotMovies" :moviesList="hotMoviesList"></t-movies-type>
            <t-movies-type class="section" scrollClass="scrollNew" :title="newTitle" pathName="newMovies" :moviesList="newMoviesList"></t-movies-type>
        </div>

    </div>

</template>

<script>

  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
  import MoviesTypeContent from '../../components/MoviesTypeContent.vue'
    export default ({
       data () {
         return {
		    hotTitle:'影院热映',
            newTitle:'新片速递',
		    hotMoviesList:[],
		    newMoviesList:[]
         }
       },
      components:{
		't-header': Header,
        't-top-nav':TopNavBar,
        't-movies-type':MoviesTypeContent
      },
      mounted () {
         /*影院热映*/
         let hotMovies = this.$store.state.hotMoviesList,
             newMovies = this.$store.state.newMoviesList;
         console.log(hotMovies.length)
         if(hotMovies.length > 0) {
            this.hotMoviesList = hotMovies
         } else {
		   this.api(this.path.hotMovies).then((res) => {
			 if(res.status === 200 && res.data.code === 0) {
			   this.hotMoviesList = res.data.info;
			   this.$store.dispatch('saveMoviesList',{
				 hotMovies:res.data.info
			   })
			 }
		   },(err) => {
			 console.log(`获取数据失败${err}`)
		   });
         }

        /*新片速递*/
        if(newMovies.length > 0) {
          this.newMoviesList = newMovies
        } else {
		  this.api(this.path.newMovies).then((res) => {
			if(res.status === 200 && res.data.code === 0) {
			  this.newMoviesList = res.data.info;
			  this.$store.dispatch('saveMoviesList',{
				newMovies:res.data.info
			  })
			}
		  },(err) => {
			console.log(`获取数据失败${err}`)
		  })
        }
      }
    })
</script>

<style scoped>
    .movies-content {
        position: absolute;
        width:100%;
        top:1.2rem;
        overflow: hidden;
        padding-bottom: 1rem;
    }
    .movies-content .section {
        margin-bottom:.6rem
    }
</style>