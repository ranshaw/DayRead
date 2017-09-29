<template>
    <mt-header fixed :title="tit">
        <mt-button slot="right"><a class="f32" href="https://github.com/ranshaw/DayRead">Star</a></mt-button>
    </mt-header>
</template>

<script>
    import { Header , Button} from 'mint-ui'
    import Vue from 'vue'
	Vue.component(Header.name, Header);
	Vue.component(Button.name, Button);
    export default({
	  props:['tit'],
      data () {
	    return {

        }
      }
    })
</script>

<style >


</style>