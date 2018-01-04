<template>
    <transition name="daggerbar">
        <div class="dagger" :style="style" v-if="show">
            <div class="darkpart" @click="close"></div>
            <div class="selectpart">
                <ul>
                    <li class="c-blue"><i class="glyphicon glyphicon-plus"></i>邀请好友</li>
                    <li class="c-green"><i class="glyphicon glyphicon glyphicon-user"></i>群管理</li>
                    <li class="bb c-red"><i class="glyphicon glyphicon-log-out"></i>退出群聊</li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script type="es6">
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                style: '',
                list: [],
                index: 0,
                show: false
            }
        },
        computed: {
            // ...mapState({
            //     height: state=>state.cCtrl.height,
            //     user: state => state.user,
            // })
        },
        methods: {
            close(){
                this.show = false;
            }
        },
        created() {
            this.style = 'height:' + document.documentElement.clientHeight + 'px';
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
.daggerbar-enter-active, .daggerbar-leave-active {
  	transition: opacity .5s;
}
.daggerbar-enter, .daggerbar-leave-active {
  	opacity: 0;
}

</style>