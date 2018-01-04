import Vue from "vue";
import store from "./store";
import router from "./router";

socket.on('err', function(data) {
    Vue.prototype.Toast(JSON.stringify(data), 2000);
});
socket.on('login', function(data) {
    console.log(data);
    store.state.user = data;
    Vue.prototype.Toast('登录成功');
    router.push('/home');
    console.log(data);
    socket.emit('getFriendList', data);
    socket.emit('getMyGroupList', data);
});
socket.on('register', function(data) {
    Vue.prototype.Toast('注册成功，请登录！').then((res) => {
        router.go(-1);
    });
});
socket.on('uploadUserIcon', function (data) {
    Vue.prototype.Toast(data.message);
    store.state.user = data.user;
});
socket.on('addFriend', function(data) {
    Vue.prototype.Toast('添加好友成功');
    store.commit('updateFriends', data);
});
socket.on('deleteFriend', function(data) {
    Vue.prototype.Toast(data).then((res) => {
        socket.emit('getFriendList', store.state.user);
    });
});
socket.on('friendList', function(data) {
    console.log('friendList');
    store.commit('setFriends', data);
});

socket.on('chatInfo', function(data) {
    console.log(data);
    store.commit('updateChatInfo', data);
});
socket.on('newMessage', function(data) {
    console.log(data);
    store.commit('addChatInfo', data);
});

// 群聊相关
socket.on('createdGroup', function(data) {
    console.log(data);
    Vue.prototype.Toast(data).then((res) => {
        router.push('/home');
        socket.emit('getMyGroupList', store.state.user);
    });
});
socket.on('getMyGroupList', function(data) {
    console.log(data);
    store.commit('setMyGroups', data);
});

socket.on('getAllGroup', function(data) {
    console.log(data);
    store.commit('setAllGroup', data);
});

socket.on('joinGroup', function(data) {
    Vue.prototype.Toast(data);
    socket.emit('getMyGroupList', store.state.user);
    socket.emit('getAllGroup');
});

socket.on('creatNewGroup', function(data) {
    console.log(data);
    socket.emit('getAllGroup');
});

socket.on('getGroupChatInfo', function(data) {
    console.log(data);
    store.commit('updateGroupChatInfo', data);
});

socket.on('newMsgOfGroup', function(data) {
    console.log(data);
    store.commit('addGroupChatInfo', data);
});

socket.on('newUserJoin', function(data) {
    console.log(data);
})

socket.on('testPopulate', function(data) {
    console.log('testPopulate');
    console.log(data);
})