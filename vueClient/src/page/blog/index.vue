<template>
    <div>
        <t-header tit="博 客"></t-header>
        <nav-bar-content
                :typeNow="type"
                :selectedNow="selected"
                :titleListNow="titleList"
        ></nav-bar-content>
    </div>
</template>

<script>
  import NavBarContent from '../../components/NavBarContent.vue'
  import Header from '../../components/Header.vue'
  export default ({
	data () {
	  return {
		type: 'blog',
		selected:'jueJin',
		titleList:[
		  {title: '掘金', id: 'jueJin',page:1},
		  {title: '极客头条', id: 'jiKe',page:1},
		  {title: 'SF', id: 'sf',page:1},
		  {title: '伯乐在线', id: 'bole',page:1},
		  {title: '张鑫旭', id: 'zxu',page:1}
		]
	  }
	},
	components: {
	  NavBarContent,
	  't-header':Header
	}
  })
</script>

<style>

</style>