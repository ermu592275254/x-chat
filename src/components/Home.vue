<template>
	<div>
		<transition name="listbar">
		<listbar v-if="this.$store.state.showList"></listbar>
		</transition>
		<div class="rightpart" v-bind:style="height">
	    	<router-view></router-view>
		</div>
		<transition name="daggerbar">
    		<daggerbar v-if="this.$store.state.showDagger"></daggerbar>
    		<hint v-if="this.$store.state.showHint"></hint>
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
			showdagger: this.$store.state.showDagger
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
.listbar-enter-active, .listbar-leave-active {
  transition: margin-left .5s;
}
.listbar-enter, .listbar-leave-active {
  margin-left: 1rem;
}
</style>
