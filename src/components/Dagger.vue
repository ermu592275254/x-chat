<template>
    <div class="dagger" :style="height" v-if="this.$store.state.cCtrl.showDagger">
        <div class="darkpart" @click="daggerCtrl"></div>
        <div class="selectpart">
            <ul>
                <li class="c-blue"><i class="glyphicon glyphicon-plus"></i>邀请好友</li>
                <li class="c-green"><i class="glyphicon glyphicon glyphicon-user"></i>群管理</li>
                <li class="bb c-red"><i class="glyphicon glyphicon-log-out"></i>退出群聊</li>
            </ul>
        </div>
    </div>

</template>

<script type="es6">
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                height: 'height:' + this.$store.state.cCtrl.height + 'px'
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                myGroups: state => state.myGroups
            })
        },
        methods: {
            log: function() {
                this.$root.clientHeight = 'height:' + document.documentElement.clientHeight + 'px';
                console.log(this.$root.clientHeight);
            },
            daggerCtrl: function() {
                this.$store.commit('daggerCtrl');
            }
        }
    }
</script>

<style lang="less" scoped>
.dagger {
	position: fixed;
    top: 0;
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