import Vue from "vue";
import Vuex from "vuex";
import WS from "./webScoket";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 组件控制
        cCtrl: {
            showHint: false,
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
            showHeader: true,
            showFooter: true,
            showList: true
        },
        user: {}, // 用户信息
        friends: [], // 我的好友
        chatList:{}, // 私聊记录 （好友名为键名，与该好友的聊天记录为值）
        chatInfo:[], // 当前好友聊天记录
        groupChatList:{},// 群聊记录（群名为键，对应的群聊记录为值）
        groupChatInfo:[],// 当前群聊记录
        myGroups:[], // 我加入的群聊
        allGroups:[], // 所有群聊
        notJoinGroups:[],// 未加入的群聊
    },
    getters: {
        // 根据计算属性 返回true和false
        doneWidth: state => !(state.cCtrl.width > 1000)
    },
    mutations: {
        daggerCtrl (state) {
            state.cCtrl.showDagger = !state.cCtrl.showDagger
        },
        headerCtrl (state) {
            state.cCtrl.showHeader = !state.cCtrl.showHeader
        },
        footerCtrl (state) {
            state.cCtrl.footerCtrl = !state.cCtrl.footerCtrl
        },
        hintCtrl (state) {
            state.cCtrl.showHint = !state.cCtrl.showHint
        },
        listCtrl (state,bool) {
            if(bool !== undefined) {
                state.cCtrl.showList = bool;

            } else {
                state.cCtrl.showList = !state.cCtrl.showList
            }
        },
        setFriends(state,data) {
            state.friends = data;
        },
        updateFriends(state, data) {
            if(!state.friends.includes(data))state.friends.push(data);
        },
        updateChatInfo(state, data){
            if(state.chatList.hasOwnProperty(data.receiver)) {
                state.chatList[data.receiver].length=0;
                state.chatList[data.receiver].push(...data.data);
            } else {
                state.chatList[data.receiver] = data.data;
            }
        },
        addChatInfo(state, data){
            if(state.chatList.hasOwnProperty(data.receiver)) {
                state.chatList[data.receiver].push(data.data);
            } else {
                state.chatList[data.receiver] = [];
                state.chatList[data.receiver].push(data.data);
            }
        },
        setChatInfo(state,params){
            if(state.chatList.hasOwnProperty(params.receiver)){
                state.chatInfo = state.chatList[params.receiver];
            } else {
                state.chatList[params.receiver] = [];
                state.chatInfo = state.chatList[params.receiver];
            }
            socket.emit('getChatInfo',params)
        },
        // 群聊列表中没有就新加一个，有就直接覆盖
        updateGroupChatInfo(state,data){
            if(state.groupChatList.hasOwnProperty(data.groupName)) {
                state.groupChatList[data.groupName].length=0;
                state.groupChatList[data.groupName].push(...data.data);
            } else {
                state.groupChatList[data.groupName] = data.data;
            }
        },
        addGroupChatInfo(state,data){
            if(state.groupChatList.hasOwnProperty(data.groupName)) {
                state.groupChatList[data.groupName].push(data);
            } else {
                state.groupChatList[data.groupName] = [];
                state.groupChatList[data.groupName].push(data);
            }
        },
        setGroupChatInfo(state,params){
            if(state.groupChatList.hasOwnProperty(params.groupName)){
                state.groupChatInfo = state.groupChatList[params.groupName];
            } else {
                state.groupChatList[params.groupName] = [];
                state.groupChatInfo = state.groupChatList[params.groupName];
            }
            socket.emit('getGroupChatInfo',params)
        },
        wsData(state, payload) {
            if (payload === null || payload === undefined || payload === '') {
                throw 'the payload is not a true value'
            }
            state.wsData = payload;
            console.log('from store: ' + state.wsData);
        },
        setMyGroups(state,data){
            state.myGroups = data;
        },
        setAllGroup(state,data){
            state.allGroups = data;
        }
    },
    actions: {
        login(username, password) {
            let params = {
                cmd: this.state.cmd.cmd_login,
                name: username,
                pass: password
            };
            let paramsStr = JSON.stringify(params);
            WS.send(paramsStr);
        }
    }
})