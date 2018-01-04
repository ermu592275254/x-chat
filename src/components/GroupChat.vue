<template>
    <div class="group">
        <headerbar showListIcon="1" subTitle="group List"></headerbar>
        <ul class="grouplist">
            <li v-for="(item, index) in groupList"
                :class="{'bt': index===0}"
                @click="goChat(item)">
                <img :src="imgUrl" alt="">
                <p class="grouptitle"><span>[group]</span> {{item.groupName}}</p>
                <p class="msgtime">{{ item.creatTime | timeType }}</p>
                <!--<p class="msginfo txt-ellipsis">{{item.lastMsg.author}}: {{item.lastMsg.content}}</p>-->
                <a class="groupbutton" @click.stop="showDagger(index)"><i class="glyphicon glyphicon-align-justify"></i></a>
            </li>
        </ul>
        <footerbar></footerbar>
    </div>
</template>

<script type="es6">
    import Headerbar from './public/Header.vue'
    import Footerbar from './public/Footer.vue'
    import {
        mapState
    } from 'vuex'

    export default {
        components: {
            Headerbar,
            Footerbar
        },
        data() {
            return {
                imgUrl:'../static/images/logo.png',
                time: new Date,
            }
        },
        computed: {
            ...mapState({
                groupList: state => state.myGroups,
                user: state => state.user
            })
        },
        methods: {
            showDagger(index) {
                this.Dagger(this.groupList,index);
            },
            goChat(item) {
                this.$router.push({path:'/home/chat',query:{chatType: 'group',groupName: item.groupName,userList: item.userList}});
                console.log(item.userList);
                socket.emit('joinRoom',{
                    username: this.user.username,
                    groupName: item.groupName,
                })
            }
        },
        filters: {
            timeType: function(value) {
                value = new Date(value);
                return value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            }
        }
    }

</script>

<style lang="less" scoped>
/*.grouplist {*/
	/*margin: 6rem 1rem;*/
/*}*/
/*.grouplist li {*/
	/*display: block;*/
	/*position: relative;*/
	/*border: .1rem solid #ccc;*/
	/*padding: 1.5rem 6rem 0 6rem;*/
	/*min-height: 8.3rem;*/
	/*border-bottom: none;*/
	/*background: url('/static/images/pikapika.jpg') no-repeat center center;*/
	/*background-size: contain;*/
/*}*/
/*.grouplist li p{*/
	/*margin: 0;*/
/*}*/
/*.grouplist li img {*/
	/*position: absolute;*/
	/*top: 50%;*/
	/*left: 1rem;*/
	/*transform: translateY(-50%);*/
	/*width: 4rem;*/
	/*height: 4rem;*/
	/*border-radius: 50%;*/
/*}*/
/*.grouptitle {*/
	/*color: #4CAF50;*/
/*}*/
/*.grouptitle span {*/
    /*display: inline;*/
	/*color: #F44336;*/
/*}*/
/*.msgtime {*/
	/*color: #858585;*/
/*}*/
.groupbutton{
	position: absolute;
	top: 50%;
	right: 1rem;
	transform: translateY(-50%);
	height: 4rem;
	width: 4rem;
	border-radius: 50%;
	text-align: center;
	background-color: #ccc;
	box-shadow: 0 0 .2rem #858585;
	cursor: pointer;
	transition: box-shadow 0.2s;
	-moz-transition:box-shadow .2s; /* Firefox 4 */
	-webkit-transition:box-shadow .2s; /* Safari and Chrome */
	-o-transition:box-shadow .2s; /* Opera */
}
.groupbutton i {
	line-height: 4rem;
	color: #fff;
}
.groupbutton:hover {
	box-shadow: 0 0 0.5rem #858585;
}
</style>
