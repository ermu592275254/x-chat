<template>
    <div class="friend">
        <headerbar showListIcon="1" subTitle="friend List"></headerbar>
        <ul class="grouplist">
            <div class="new-group" @click="newFirend">添加好友</div>
            <li class="bb" v-for="(item,index) in friends" @click="goChat(item)"
                :class="{'bt': index===0}">
                <img :src="item.userIcon" alt="">
                <p class="friendname"><a>{{item.username}}</a></p>
                <p class="time">2016-01-01 12:00:30</p>
                <a class="closebutton bg-red" @click.stop="deleteFriend(item)"><i class="glyphicon glyphicon-remove"></i></a>
            </li>
        </ul>
        <footerbar></footerbar>
    </div>
</template>

<script type="es6">
    import Headerbar from './public/Header.vue'
    import Footerbar from './public/Footer.vue'
    import {mapState} from 'vuex'


    export default {
        components: {
            Headerbar,
            Footerbar
        },
        data() {
            return {
                newFriendName: ''
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                friends: state => state.friends,
            })
        },
        methods: {
            deleteFriend(item){
                this.Confirm('你确定要删除此好友吗？','删除','取消').then(res=>{
                    if(res){
                        socket.emit('deleteFriend',{
                            username: this.user.username,
                            deleteName: item.username
                        });
                    }
                })
            },
            goChat(item){
                console.log(item);
                this.$router.push({path: '/home/chat', query: {chater: item}});
            },
            newFirend() {
                this.Prompt('请输入要添加的好友名称', '确认').then(res => {
                    if (res === '') {
                        this.Toast('请输入要添加的朋友帐号');
                        return
                    }
                    socket.emit('addFriend', {addName: res,username: this.user.username});
                });
            },
        },
        created() {
            console.log(this.$store.state.friends);
        }
    }
</script>

<style lang="less" scoped>
.closebutton{
    position: absolute;
    top: 2rem;
    right: 1rem;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    text-align: center;
    background-color: red;
    box-shadow: 0 0 .2rem #858585;
    cursor: pointer;
    transition: box-shadow 0.2s,top 0.2s;
    -moz-transition:box-shadow .2s, top 0.2s; /* Firefox 4 */
    -webkit-transition:box-shadow .2s, top 0.2s; /* Safari and Chrome */
    -o-transition:box-shadow .2s, top 0.2s; /* Opera */
}
.closebutton i {
    line-height: 4rem;
    color: #fff;
}
.closebutton:hover {
    box-shadow: 0 0 1rem #858585;
    top: 1.9rem;
}
</style>
