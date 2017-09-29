<template>
    <div class="detail-wrap">
        <mt-header fixed :title="title">
            <router-link :to="$store.state.detailFromPath" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button  slot="right"><a class="f32" :href="url">源网站</a></mt-button>
        </mt-header>
        <div class="detail-iframe-wrap">
            <iframe @load="isLoaded" :src="url" frameborder="0" class="detail-iframe"></iframe>
        </div>

        <div class="loading" v-show="loading">
            <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>

    </div>

</template>

<script>
  import { Header,Spinner } from 'mint-ui'
  import Vue from 'vue'
  Vue.component(Header.name, Header);
  Vue.component(Spinner.name, Spinner);

  export default ({
    data () {
      return {
        loading:true,
        title:'',
        url:''
      }
    },
    methods:{
      isLoaded () {
        console.log('下载完成');
        this.loading = false
      }
    },
    mounted () {
      let info = this.$route.query;
      this.title = info.title;
      this.url = info.url;
    },
    beforeRouteEnter (to,from,next) {
	  next(vm => {
		vm.$store.dispatch('saveDetailPathFrom',from.fullPath)
      })
    }
  })

</script>

<style scoped>
    .detail-iframe-wrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom:1rem;
        top:.8rem;
    }
    .detail-iframe {
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .loading {
        padding-top: 0.5rem;
        display: flex;
        justify-content: center;
        margin-bottom: 0.5rem;
    }
</style>