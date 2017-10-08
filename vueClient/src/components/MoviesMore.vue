<template>
    <div class="moviesMore">
        <mt-header fixed :title="title">
            <router-link to="/movies/douBan" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"><a class="f32" href="https://github.com/ranshaw/DayRead">Star</a></mt-button>
        </mt-header>

        <ul     class="itemWrap"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="loading"
                infinite-scroll-distance="10">
            <li class="item" v-for="item in itemList" >
                <t-movies-item :moviesItem="item" ></t-movies-item>
            </li>
        </ul>

    </div>
</template>

<script>
  import { Header } from 'mint-ui'
  import MoviesItem from './MoviesItem.vue'
  import Vue from 'vue'
  Vue.component(Header.name, Header);
    export default ({
      data () {
        return {
            title:'',
            itemList:[],
            loading:false
        }
      },
      components:{
        't-header':Header,
		't-movies-item':MoviesItem,
      },
      methods:{
		loadMore () {
		  console.log('到底了')
        }
      },
      mounted () {
        this.title = this.$route.query.title;
        let path = this.$route.query.api,
            type = this.$route.query.type,
            oldMoviesList = this.$store.state[`${type}List`];
        console.log(`${type}List`)

		this.itemList = oldMoviesList;

        this.api(`${path}?page=${1}`).then((res) => {
            if(res.status === 200 && res.data.code === 0) {
			  res.data.info.forEach((v) => {
				this.itemList.push(v);
              })

            }
        })
      }
    })
</script>

<style scoped>
    .itemWrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom:1rem;
    }
    .itemWrap .item {
        margin-bottom:.3rem;
    }
</style>