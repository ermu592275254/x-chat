<template>
	<div>
		<transition name="listbar">
			<listbar></listbar>
		</transition>
		<div class="rightpart" v-bind:style="height">
	    	<router-view></router-view>
		</div>
		<transition name="daggerbar">
    		<daggerbar></daggerbar>
    	</transition>
    	<transition name="hinttst">
    		<hint></hint>
    	</transition>
	</div>
</template>

<script>
import Headerbar from './Header.vue'
import Listbar from './List.vue'
import Footerbar from './Footer.vue'
import Daggerbar from './Dagger.vue'
import Hint from './Hint.vue'

export default {
	components: {
	    Headerbar,
	    Listbar,
	    Footerbar,
	    Daggerbar,
	    Hint
	},
	data () {
		return {
			height: 'height:'+document.documentElement.clientHeight+'px',
			showdagger: this.$store.state.cCtrl.showDagger
		}
	},
	methods: {
		daggerCtrl: function(){
			this.$store.commit('daggerCtrl')
		}
	}
}

</script>

<style>
.rightpart {
	position: relative;
	float: left;
	width: 83%;
}
.daggerbar-enter-active, .daggerbar-leave-active {
  	transition: opacity .5s;
}
.daggerbar-enter, .daggerbar-leave-active {
  	opacity: 0;
}
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
