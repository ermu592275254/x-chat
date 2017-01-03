import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import Error from './components/Error'
import List from './components/List'
import Content from './components/Content'
import Register from './components/Register'
import GroupChat from './components/GroupChat'
import Friend from './components/Friend'
import Chat from './components/Chat'

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
		name: 'home',
		component: Home,
	    children: [
	        {path: 'groupchat',component: GroupChat},
	        {path:'content',component: Content},
	        {path: 'friend',component: Friend},
	        {path: 'chat',component: Chat}
	    ]
	},
	{
		path: '/*',
		component: Error
	}
];

module.exports = new VueRouter({routes});