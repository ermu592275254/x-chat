<template>
    <div class="hint" :style="height" v-if="this.$store.state.cCtrl.showHint">
    	<div class="darkpart" @click="hintCtrl"></div>
		<div class="hintBox">
    		<h2>Remove friend</h2>
    		<p>{{message}}</p>
    		<button class="btn btn-danger mb-7 hintbutton">DELETE</button>
    		<button class="btn btn-warning hintbutton" @click="hintCtrl">NOT NOW</button>
		</div>
    </div>
</template>

<script>
	export default {
		data () {
			return {
				height: 'height:'+document.documentElement.clientHeight+'px',
				message: 'Are you sure want to delete 95927 from your friends list?'
			}
		},
		methods: {
			hintCtrl: function() {
				this.$store.commit('hintCtrl')
			}
		}
	}
</script>

<style scoped>
.hint {
	margin: 0;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 99;
}
.darkpart{
	height: 100%;
	width: 100%;
	background-color: #000;
	opacity: .5;
}
.hintBox {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	padding: 1rem;
	width: 50%;
	max-height: 20rem; 
	border-radius: .5rem;
	text-align: center;
	background-color: #fff;
	opacity: 1;
	z-index: 100;
}
h2 {
	margin-bottom: 3rem;
}
p {
	margin-bottom: 2rem;
}
.mb-7 {
	margin-right: 7rem;
}
.hintbutton {
	width: 10rem;
}

</style>