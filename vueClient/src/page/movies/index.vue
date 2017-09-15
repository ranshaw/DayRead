<template>
    <t-header tit="电 影"></t-header>
    <!--<t-top-nav
            :selected="selected"
            :titleList="titleList"
    ></t-top-nav>-->
</template>

<script>
  import Header from '../../components/Header.vue'
  import TopNavBar from '../../components/TopNavBar.vue'
    export default ({
       data () {
         return {
		   selected:'douBan',
		   titleList:[
			 {title: '网易', id: 'douBan',page:1},
			 {title: '头条', id: '66',page:1},
			 {title: '热搜', id: 'kkw',page:1},
		   ]
         }
       },
      components:{
		't-header': Header,
		't-top-nav': TopNavBar,
      }
    })
</script>

<style>

</style>