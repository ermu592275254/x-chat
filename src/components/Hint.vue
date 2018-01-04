<template>
    <div class="hint" :style="height" v-if="this.$store.state.cCtrl.showHint">
        <div class="darkpart" @click="hintCtrl"></div>
        <transition name="hint">
            <div class="hintBox animated bounceInLeft">
                <h4>Remove friend</h4>
                <p>{{message}}</p>
                <button class="btn btn-danger mb-7 hintbutton">DELETE</button>
                <button class="btn btn-warning hintbutton" @click="hintCtrl">NOT NOW</button>
            </div>
        </transition>
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
.hint-enter-active {
  	transition: all .3s ease;
}
.hint-enter {
  	transform: translateX(-100%);
  	opacity: 0;
}
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
h4 {
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

@media all and (max-width: 500px) {
    .hintBox{
        width: 80%!important;
    }
    .mb-7 {
        margin-right: 2rem;
    }
    .hintbutton{
        width: 6rem;
        font-size: 12px;
    }
}


</style>