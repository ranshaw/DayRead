<template>
    <div class="movies-wrap">
        <t-header tit="电 影"></t-header>
        <div class="movies-content">
            <t-movies-type class="section" :title="hotTitle" pathName="hotMovies" :moviesList="$store.state.hotMoviesList"></t-movies-type>
            <t-movies-type class="section" :title="newTitle" pathName="newMovies" :moviesList="$store.state.newMoviesList"></t-movies-type>
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
            newTitle:'新片速递'
         }
       },
      components:{
		't-header': Header,
        't-top-nav':TopNavBar,
        't-movies-type':MoviesTypeContent
      },
      mounted () {
         /*影院热映*/
        this.api(this.path.hotMovies).then((res) => {
          if(res.status === 200 && res.data.code === 0) {

            this.$store.dispatch('saveMoviesList',{
              hotMovies:res.data.info
            })
          }
        },(err) => {
          console.log(`获取数据失败${err}`)
        });
        /*新片速递*/
		this.api(this.path.newMovies).then((res) => {
		  if(res.status === 200 && res.data.code === 0) {

			this.$store.dispatch('saveMoviesList',{
			  newMovies:res.data.info
            })
		  }
		},(err) => {
		  console.log(`获取数据失败${err}`)
		})
      }
    })
</script>

<style scoped>
    .movies-content {
        position: absolute;
        width:100%;
        top:1.2rem;
    }
    .movies-content .section {
        margin-bottom:.6rem
    }
</style>