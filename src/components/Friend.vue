<template>
	<div class="friend">
		<headerbar></headerbar>
		<ul class="grouplist">
			<li class="bb">
				<img src="../assets/logo2.jpg" alt="">
				<p class="friendname"><a href="">jolly</a></p>
				<p class="time">2016-01-01 12:00:30</p>
				<a class="closebutton bg-red" @click="hintCtrl"><i class="glyphicon glyphicon-remove"></i></a>
			</li>
		</ul>
		<footerbar></footerbar>
	</div>
</template>

 <script>
import Headerbar from './Header.vue'
import Footerbar from './Footer.vue'

 export default {
 	components: {
	    Headerbar,
	    Footerbar
	},
 	data() {
 		return{
			
		}
 	},
 	methods: {
 		hintCtrl: function () {
 			this.$store.commit('hintCtrl')
 		}
 	}
 }
 	
 </script>

 <style>
.grouplist {
	padding: 2rem 1rem;
}

</style>
