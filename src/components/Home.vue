<template>
	<div>
		<listbar></listbar>
		<div class="rightpart" v-bind:style="height">
	    	<router-view></router-view>
		</div>
    	<daggerbar v-if="this.$store.state.showDagger"></daggerbar>	
	</div>
</template>

<script>
import Headerbar from './Header.vue'
import Listbar from './List.vue'
import Footerbar from './Footer.vue'
import Daggerbar from './Dagger.vue'

export default {
	components: {
	    Headerbar,
	    Listbar,
	    Footerbar,
	    Daggerbar
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
</style>
