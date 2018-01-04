<template>
	<div class="clearfix">
		<transition name="listbar">
			<listbar></listbar>
		</transition>
		<div class="rightpart" v-bind:style="height">
	    	<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Headerbar from './public/Header.vue'
import Listbar from './List.vue'
import Footerbar from './public/Footer.vue'
import Daggerbar from './Dagger.vue'

export default {
	components: {
	    Headerbar,
	    Listbar,
	    Footerbar,
	    Daggerbar,
	},
	data () {
		return {
			height: 'height:'+(document.documentElement.clientHeight -1)+'px',
			showdagger: this.$store.state.cCtrl.showDagger
		}
	},
	methods: {
		daggerCtrl: function(){
			this.$store.commit('daggerCtrl')
		}
	},
	mounted: function () {
		if(this.$store.getters.doneWidth) {
			this.$store.commit('listCtrl',false)
		}
	}
}

</script>

<style lang="less">
.rightpart {
	position: relative;
	float: left;
	width: 83%;
}
/*
.hinttst-enter-active {
  	transition: all .3s ease;
}
.hinttst-enter {
  	transform: translateX(-100%);
  	opacity: 0;
}
/*.listbar-enter-active {
	transition: all .3s ease;
}
.listbar-enter {
	margin-left: -100%;
}*/
</style>
