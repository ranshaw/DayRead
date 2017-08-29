<template>
    <div>
        <NavBarContent
                :typeNow="type"
                :selectedNow="selected"
                :titleListNow="titleList"
        ></NavBarContent>
    </div>
</template>

<script>
  import NavBarContent from '../../components/NavBarContent.vue'
  export default ({
	data () {
	  return {
		type: 'wx',
		selected:'zaoDu',
		titleList:[
		  {title: '前端早读课', id: 'zaoDu',page:1},
		  {title: '前端大全', id: 'daQuan',page:1},
		  {title: '奇舞周刊', id: 'site360',page:1},
		  {title: '前端之巅', id: 'alp',page:1}
		]
	  }
	},
	components: {
	  NavBarContent
	}
  })
</script>

<style>

</style>