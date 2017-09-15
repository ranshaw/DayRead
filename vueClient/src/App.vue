<template>
    <div id="app">
        <Tabbar></Tabbar>
    </div>
</template>

<script>
  import Tabbar from './page/tabbar.vue'
  export default {
	name: 'app',
	components: {
	  Tabbar
	},
	mounted: function () {

	}
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-top: 1.7rem;
    }
</style>
