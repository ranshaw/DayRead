<template>
    <div>
        <mt-navbar v-model="selectedNow" class="betterScroll">
            <div :style="{width:wrapWid}">
                <mt-tab-item v-for="item  in titleList"
                             :class="titleList.length > 4 ? 'tt-overflow': '' "
                             :id="item.id">{{item.title}}
                </mt-tab-item>
            </div>
        </mt-navbar>
    </div>

</template>

<script>
  import BScroll from 'better-scroll';
  import {mapActions} from 'vuex'
  import { Navbar ,TabItem } from 'mint-ui'
  export default({
	props: ['titleList', 'selected','type'],
	data () {
	  return {
		selectedNow: this.selected
	  }
	},
	methods: {
	  ...mapActions({
		changeSelected: 'changeSelected'
	  }),
      isSelected:function () {
		this.changeSelected(this.selectedNow);
      },
	  getAniName:function (preSelected,nowSelected) {
		let nowSelectedIndex,
			preSelectedIndex;

		this.titleList.forEach((v,i) => {

		  if(v.id === nowSelected) {
			nowSelectedIndex = i;
		  } else if (v.id === preSelected) {
			preSelectedIndex = i;
		  }
		});

		if(nowSelectedIndex < preSelectedIndex) {
		  this.$store.dispatch('getAnimateName','BounceSlideRight')
		} else {
		  this.$store.dispatch('getAnimateName','BounceSlideLeft')
		}

	  }
	},
	computed: {
	  wrapWid () {
		return this.titleList.length < 5 ? '100%' : 'auto'
	  }
	},
    components:{
	  'mt-navbar':Navbar,
      'mt-tab-item':TabItem
    },
    watch:{
	  selectedNow:function () {
	    console.log('上一个状态',this.$store.state.selectedNow);
//	    this.$emit('preSelected',this.$store.state.selectedNow,this.selectedNow);
        this.getAniName(this.$store.state.selectedNow,this.selectedNow);
        this.$router.push(this.selectedNow);
	    this.isSelected();
      },
      '$route' (to,from) {

       /*回到上次点击的路由*/
		this.selectedNow = this.$route.path.split('/')[2];
		this.isSelected();
      }
    },
	mounted () {
        /*需要在rem计算完成后执行*/
	  setTimeout(function () {
		new BScroll('.betterScroll', {
		  click: true,
		  scrollX: true
		});
	  }, 1);

        /*根据路由更新选中值*/
	  this.selectedNow = this.$route.path.split('/')[2];
	  this.isSelected();
	}
  })
</script>

<style scoped lang="less">
    @font-base-size : 100px;

    .mint-navbar {
        overflow: auto;
        width: 100%;
        max-width: 750px;
        border-bottom: 1px solid #eee;
        position: fixed;
        z-index: 1;
        top:0.8rem;
    }

    .mint-navbar > div {
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .mint-navbar::-webkit-scrollbar {
        display: none
    }

    .mint-navbar .tt-overflow {
        -webkit-box-flex: none;
        -ms-flex: none;
        flex: none;
        width: 1.5rem;
        box-sizing: border-box;
    }

    .mint-navbar .mint-tab-item.is-selected {
        margin-bottom: 0;
        border-color: #d81e06;
        color: #d81e06;
    }

    .mint-navbar .mint-tab-item {
        padding: 0.25rem 0;
    }

</style>