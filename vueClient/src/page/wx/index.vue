<template>
    <div>
        <t-header tit="公 众 号"></t-header>
        <NavBarContent
                :typeNow="type"
                :selectedNow="selected"
                :titleListNow="titleList"
        ></NavBarContent>
    </div>
</template>

<script>
  import NavBarContent from '../../components/NavBarContent.vue'
  import Header from '../../components/Header.vue'
  export default ({
	data () {
	  return {
		type: 'wx',
		selected: 'zaoDu',
		titleList: [
		  {title: '早读课', id: 'zaoDu', page: 1},
		  {title: '前端大全', id: 'daQuan', page: 1},
		  {title: '奇舞周刊', id: 'site360', page: 1},
		  {title: '前端之巅', id: 'alp', page: 1},
		  {title: '前端JS', id: 'JS', page: 1},
		  {title: '技术最前线', id: 'QX', page: 1},
		  {title: '外刊评论', id: 'foreign', page: 1}
		]
	  }
	},
	components: {
	  NavBarContent,
	  "t-header": Header
	},
	beforeRouteEnter: function (to, from, next) {
        /*跳转到保存的路由*/
	  next(vm => {
		let path = vm.$store.state.oldWxRoute;
		if (path) {
		  vm.$router.push(path);
		}
	  })
	},
	beforeRouteLeave: function (to, from, next) {
	  this.$store.dispatch('saveRoute', {
		type: 'Wx',
		path: from.path
	  });
	  next()
	}
  })
</script>

<style>

</style>