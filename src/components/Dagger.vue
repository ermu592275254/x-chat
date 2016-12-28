<template>
    <div class="dagger" :style="height">
    	<div class="darkpart" @click="daggerCtrl"></div>
    	<div class="selectpart">
 			<ul>
 				<li class="c-blue"><i class="glyphicon glyphicon-plus"></i>invite friends</li>
 				<li class="c-green"><i class="glyphicon glyphicon glyphicon-user "></i>joined users</li>
 				<li class="bb c-red"><i class="glyphicon glyphicon-log-out"></i>leave session</li>
 			</ul>
 		</div>
    </div>

</template>

<script>
	export default {
		data () {
			return {
				height: 'height:'+document.documentElement.clientHeight+'px'
			}
		},
		methods: {
			log: function() {
				this.$root.clientHeight = 'height:'+document.documentElement.clientHeight+'px';
				console.log(this.$root.clientHeight);
			},
			daggerCtrl: function () {
				this.$store.commit('daggerCtrl');
			}
		}
	}
</script>

<style scoped>
.dagger {
	position: relative;
	width: 100%;
	z-index: 99;
}
.darkpart{
	height: 100%;
	width: 100%;
	background-color: #000;
	opacity: .5;
}
.selectpart{
	opacity: 1;
	position: absolute;
	bottom: 0;
	padding: 2rem 1rem;
	width: 100%;
	background-color: #fff;
}
.selectpart li {
	position: relative;
	border: 1px solid #ccc;
	border-bottom: none;
	padding: 0 2rem;
	cursor: pointer;
	line-height: 4rem;
}
.selectpart li:hover {
	background-color: #ccc;
}
.selectpart li i {
	position: absolute;
	top: 1rem;
	right: 2rem;
	font-size: 1.8rem;
}

</style>