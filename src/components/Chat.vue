<template>
    <div class="chat">
        <headerbar showListIcon="1" :subTitle="title"></headerbar>
        <div class="center-area" :style="minHeight">
            <div class="chatcontent" ref="contentBox">
                <div class="chatbox" v-for="(item,index) in chatInfo" :class="{'fr':item.sender.username === user.username}"
                     v-if="chatType !== 'group'">
                    <div>
                        <img class="userimg" :src="item.sender.userIcon" alt=""><span
                            class="name">{{item.sender.username}}</span><span
                            class="time">{{item.sendTime}}</span>
                    </div>
                    <p class="content">{{item.content}}</p>
                </div>
                <div class="chatbox" v-for="(item,index) in groupChatInfo" :class="{'fr':item.sender.username === user.username}"
                     v-if="chatType === 'group'">
                    <div>
                        <img class="userimg" :src="item.sender.userIcon" alt="">
                        <span class="name">{{item.sender.username}}</span>
                        <span class="time">{{item.sendTime}}</span>
                    </div>
                    <p class="content">{{item.content}}</p>
                </div>
            </div>
            <div class="chat-user-info">
                <ul v-if="chatType === 'group'">
                    <p>群成员</p>
                    <li v-for="item in userList" @click="goUserInfo(item)">
                        <img :src="item.userIcon">
                        <span>{{item.username}}</span>
                    </li>
                </ul>
                <div class="chat-advertising" v-if="chatType !== 'group'">
                    <a class="glyphicon glyphicon-wrench"></a>
                    <p>广告位维护中</p>
                    <p>...</p>
                </div>
            </div>
        </div>
        <div class="chatinput">
            <a class="addfile"><i class="glyphicon glyphicon-paperclip"></i></a>
            <div class="input" contenteditable="plaintext-only" ref="inputEl"
                 @keyup="upMethod"
                 @keydown="downMethod"></div>
            <a class="sendmsg" @click="sendMsg"><i class="glyphicon glyphicon-share-alt"></i></a>
        </div>
    </div>
</template>

<script type="es6">
    import Headerbar from './public/Header.vue'
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                minHeight: 'height:' + (this.$store.state.cCtrl.height - 1) + 'px',
                imgUrl: require('../../static/images/pikapika.jpg'),
                message: '',
                receiver: '',
                chatType: '',
                groupName: '',
                title: '',
                userList: '',
                pressCtrl: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                chatInfo: state => state.chatInfo,
                groupChatInfo: state => state.groupChatInfo,
            }),
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            upMethod(event) {
                if (event.keyCode === 17) {
                    this.pressCtrl = false;
                }
            },
            downMethod(event){
                if (event.keyCode === 17) {
                    this.pressCtrl = true;
                }
                if (this.pressCtrl && event.keyCode===13) {
                    this.pressCtrl = false;
                    this.sendMsg();
                }
            },
            sendMsg() {
                let message = this.$refs.inputEl.innerText;
                if (message === '') {
                    this.Toast('请输入你要发送的内容！');
                    return;
                }
                if (this.chatType === 'group') {
                    let data = {
                        sender: this.user.username,
                        groupName: this.groupName,
                        content: message,
                        atUser: [], // @谁谁谁
                    };
                    socket.emit('sendMsgToGroup', data);
                } else {
                    let data = {
                        sender: this.user.username,
                        receiver: this.receiver.username,
                        content: message
                    };
                    socket.emit('sendToOne', data);
                }
                this.$refs.inputEl.innerText = ''
            },
            goUserInfo(item){
                this.$router.push({path: '/home/userInfo',query:{userInfo: item}});
            }
        },
        components: {
            Headerbar
        },
        created() {
            console.log('chat created');
            this.chatType = this.$route.query.chatType || '';
            this.groupName = this.$route.query.groupName || '';
            if (this.chatType === 'group') {
                this.userList = this.$route.query.userList;
                this.title = this.groupName;
                let data = {
                    groupName: this.$route.query.groupName
                };
                this.$store.commit('setGroupChatInfo', data);
            } else {
                this.receiver = this.$route.query.chater;
                this.title = this.receiver.username;
                let data = {
                    sender: this.user.username,
                    receiver: this.receiver.username
                };
                this.$store.commit('setChatInfo', data);
            }
        },
        mounted() {
            this.$refs.contentBox.scrollTop = this.$refs.contentBox.scrollHeight + 999;
        },
        updated() {
            this.$refs.contentBox.scrollTop = this.$refs.contentBox.scrollHeight + 999;
        },
        watch: {
            chatInfo: {
                handler: function(val, oldVal) {
                    // console.log(this.chatInfo);
                },
                deep: true
            },
            groupChatInfo: {
                handler: function(val, oldVal) {
                    // console.log(this.groupChatInfo);
                },
                deep: true
            }
        }
    }
</script>
<style lang="less" scoped>
    .chat {
        position: relative;
    }

    .center-area {
        padding: 5rem 0 6rem 0;
        height: 100%;
        .chatcontent {
            float: left;
            padding: 0 10px;
            width: 80%;
            height: 100%;
            overflow: scroll;
            &::-webkit-scrollbar {
                display: none
            }
            @media screen and (max-width: 1000px) {
                width: 100%;
            }
            .chatbox {
                float: left;
                margin: 1rem auto;
                padding: 1rem;
                min-width: 20rem;
                /*max-width:80%;*/
                /*min-height: 60%;*/
                width: 60%;
                border: .1rem solid #ccc;
                box-shadow: 0 0 .5rem #ccc;
            }
            .chatbox .userimg {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
            }
            .chatbox .name {
                display: inline;
                margin: 0 1rem;
                line-height: 3rem;
                font-size: 1.4rem;
                color: #858585;
            }
            .chatbox .time {
                display: inline;
                line-height: 3rem;
                font-size: 1.4rem;
                color: #858585;
            }
            .chatbox .content {
                margin: 0;
                padding: 0 2rem;
                font-size: 1.6rem;
                text-align: justify;
            }
        }
        .chat-user-info {
            float: left;
            width: 20%;
            overflow: scroll;
            height: 100%;
            border-left: 1px solid #999;
            @media screen and (max-width: 1000px) {
                display: none;
            }
            &::-webkit-scrollbar {
                display: none
            }
            p {
                padding: 1rem 0;
                text-align: center;
                font-size: 16px;
                color: #fff;
                background-color: #ffde00;
                margin: 0;
            }
            li {
                border-bottom: 1px solid #eee;
                img {
                    margin: .4rem;
                    width: 4rem;
                    height: 4rem;
                }
                span {
                    color: #000;
                }
            }
        }
        .chat-advertising{
            margin-top: 10rem;
            text-align: center;
            a{
                font-size: 44px;
                color: #ffde00;
            }
            p{
                background-color: transparent;
                font-size: 18px;
                color: #ffde00;
            }
        }
    }

    .chatinput {
        position: absolute;
        bottom: 0;
        width: 100%;
        min-height: 6rem;
        background-color: #ffde00;
        box-shadow: 0 -.2rem 0.2rem #ccc;
        .input {
            width: 65%;
            margin: 2rem auto;
            min-height: 2rem;
            border-bottom: .1rem solid #858585;
        }
        .input:focus {
            outline: none;
        }
        .addfile {
            position: absolute;
            bottom: .8rem;
            left: 5%;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: #000;
            color: #fff;
            text-align: center;
            line-height: 4rem;
            cursor: pointer;
            transition: box-shadow .2s, bottom .2s;
        }
        .addfile:hover {
            box-shadow: 0 0 .3rem #ccc;
            bottom: .9rem;
            color: #12940a;
        }
        .sendmsg {
            position: absolute;
            bottom: .8rem;
            right: 5%;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: #000;
            color: #fff;
            text-align: center;
            line-height: 4rem;
            cursor: pointer;
            transition: box-shadow .2s, bottom .2s;
        }
        /*.sendmsg:hover {
        box-shadow: 0 0 .3rem #ccc;
        bottom: .9rem;
        color: #12940a;
    }
    */
    }
</style>
