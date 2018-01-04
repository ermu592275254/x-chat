import VueRouter from "vue-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Content from "./components/Content";
import Register from "./components/Register";
import GroupChat from "./components/GroupChat";
import AllGroup from "./components/AllGroup";
import Friend from "./components/Friend";
import Chat from "./components/Chat";
import userInfo from "./components/userInfo.vue"

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/home',
        component: Home,
        children: [
            {path: 'groupchat', component: GroupChat},
            {path: 'content', component: Content},
            {path: 'friend', component: Friend},
            {path: 'chat', component: Chat},
            {path: '', component: GroupChat},
            {path: 'allGroup', component: AllGroup},
            {path:'userInfo',component: userInfo}
        ]
    },
    {
        path: '*',
        component: Error
    }
];

module.exports = new VueRouter({routes});
