<template>
    <div class="movies-wrap">
        <t-header tit="电 影"></t-header>
        <t-movies-type></t-movies-type>
    </div>

</template>

<script>

  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
  import MoviesTypeContent from '../../components/MoviesTypeContent.vue'
    export default ({
       data () {
         return {

         }
       },
      components:{
		't-header': Header,
        't-top-nav':TopNavBar,
        't-movies-type':MoviesTypeContent
      },
      mounted () {

      }
    })
</script>

<style scoped>

</style>