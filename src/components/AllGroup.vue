<template>
    <div class="group">
        <headerbar showListIcon="1" subTitle="group List"></headerbar>
        <ul class="grouplist" :style="appStyle">
            <div class="new-group" @click="newGroup">新建群聊</div>
            <p class="">未加入的群聊</p>
            <li v-for="(item, index) in allGroups"
                v-if="isJoined(item)"
                class="bt">
                <img :src="imgUrl" alt="">
                <p class="grouptitle"><span>[group]</span> {{item.groupName}}</p>
                <p class="msgtime">{{ item.creatTime | timeType }}</p>
                <!--<p class="msginfo txt-ellipsis">{{item.lastMsg.author}}: {{item.lastMsg.content}}</p>-->
                <div class="join" @click.stop="join(item)"><i class="glyphicon glyphicon-plus"></i>join</div>
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
                imgUrl: '../static/images/logo.png',
                appStyle: '',
            }
        },
        computed: {
            ...mapState({
                allGroups: state => state.allGroups,
                user: state => state.user,
                height: state => state.cCtrl.height
            })
        },
        methods: {
            join(item) {
                let params = {
                    username: this.user.username,
                    groupName: item.groupName
                };
                socket.emit('joinGroup', params);
            },
            goChat() {
                this.$router.push('/home/chat');
            },
            isJoined(item) {
                console.log(item.userList);
                console.log(this.user.username);
                return !item.userList.includes(this.user.username)
            },
            newGroup() {
                this.Prompt('请输入群聊名称', '确认').then(res => {
                    let params = {
                        username: this.user.username,
                        groupName: res
                    };
                    if (params.groupName === '') {
                        this.Toast('请输入要创建的群名');
                        return
                    }
                    socket.emit('creatNewGroup', params);
                });
            }
        },
        filters: {
            timeType: function(value) {
                value = new Date(value);
                return value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            }
        },
        created(){
            socket.emit('getAllGroup');
            this.appStyle = `height: ${this.height}px`
        },
    }

</script>

<style lang="less" scoped>
    .new-group {
        margin: 1rem 0;
        width: 8rem;
        height: 3rem;
        background-color: #ffde00;
        border: 1px solid #999;
        border-radius: 4px;
        text-align: center;
        line-height: 3rem;
        color: #fff;
        font-size: 16px;
    }
</style>
