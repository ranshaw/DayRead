<template>
    <div class="movies-types">
        <h3 class="f34">{{title}}</h3>
        <!--<router-link :to="">更多</router-link>-->
        <t-movies-item></t-movies-item>
    </div>
</template>

<script>
  import MoviesItem from './MoviesItem.vue'
  export default ({
	data () {
        return {
          title:'影院热映'
        }
	},
	components: {
	  't-movies-item':MoviesItem,
    }
  })
</script>

<style>

</style>