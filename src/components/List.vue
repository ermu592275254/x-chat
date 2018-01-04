<template>
    <div class="list" v-bind:style="height" v-if="this.$store.state.cCtrl.showList">
        <transition name="showul">
            <div class="listul">
                <ul>
                    <li>
                        <a class="mainmenu" v-on:click="hideList('hideMList')">
                            <i class="glyphicon glyphicon-th"></i>
                            <span>通讯录</span>
                        </a>
                        <ul class="menulist">
                            <!--<li v-bind:class="{hideli: hideMList}" @click="goPage('/home/groupchat')">特别关心(special care)</li>-->
                            <li v-bind:class="{hideli: hideMList}" @click="goPage('/home')">多人聊天</li>
                            <li v-bind:class="{hideli: hideMList}" @click="goPage('/home/friend')">好友</li>
                        </ul>
                    </li>
                    <li>
                        <a class="mainmenu" v-on:click="hideList('hideJList')">
                            <i class="glyphicon glyphicon-th-list"></i>
                            <span>设置</span>
                        </a>
                        <ul class="menulist">
                            <li v-bind:class="{hideli: hideJList}" @click="goPage('/home/userInfo')">
                                个人资料
                            </li>
                            <li v-bind:class="{hideli: hideJList}" @click="joinGroup()">
                                加入群聊
                            </li>
                            <li v-bind:class="{hideli: hideJList}" @click="exit()">
                                退出登录
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="listshadow" @click="hideList"></div>
    </div>
</template>

<script type="es6">
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                height: 'height:' + document.documentElement.clientHeight + 'px',
                hideMList: false,
                hideJList: false,
            }
        },
        computed: {
            ...mapState({
                friendList: state => state.friends,
                user: state => state.user
            })
        },
        methods: {
            hideList: function(value) {
                if (this.$store.getters.doneWidth) {
                    this.$store.commit('listCtrl')
                }
                // if (value === 'hideMList') {
                //     this.hideMList = !this.hideMList;
                // } else if (value === 'hideJList') {
                //     this.hideJList = !this.hideJList;
                // } else {
                //     this.$store.commit('listCtrl')
                // }
            },
            goPage: function(str) {
                this.hideList();
                this.$router.push(str);
            },
            exit() {
                console.log('exit');
                this.hideList();
                localStorage.setItem('userInfo', null);
                this.goPage('/login');
            },
            testCreatGroup() {
                let params = {
                    groupName: new Date().getTime(),
                    creater: this.user.username,
                };
                socket.emit('createdGroup', params);
                this.hideList();
            },
            joinGroup() {
                this.$router.push('/home/allGroup');
                this.hideList();
            }
        },
        created() {
            console.log('created');
            console.log(this.friendList);
        }
    }
</script>

<style lang="less" scoped>
.mainmenu {
    position: relative;
	display: block;
	width: 100%;
	height: 4rem;
	z-index: 2;
	background-color: #ffde00;
	font-size: 1.6rem;
	line-height: 40px;
	cursor: pointer;
	overflow: hidden;
    i {
        position: absolute;
        top: 50%;
        left: 1rem;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        height: 4rem;
        line-height: 4rem;
        font-size: 1.8rem;
    }
    span{
        margin-left: 4rem;
    }
}
.listul {
	float: left;
	height: 100%;
	width: 100%;
	border-right: .1rem solid #ccc;
	box-shadow: .1rem 0 .2rem #ccc;
	background-color: #fff;
}
li{
	margin: 0;
}
.menulist li{
	padding-left: 2rem;
	font-size: 1.4rem;
	line-height: 4rem;
	cursor: pointer;
	overflow: hidden;
	height: 4.1rem;
	transition:height 0.2s;
}
.hideli {
	height: 0!important;
}
.menulist li:hover {
	background-color: #ccc
}
.usericon{
	margin: 0 1rem;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}
</style>