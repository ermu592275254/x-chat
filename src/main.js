// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from './components/Home'
import Login from './components/Login'
import Error from './components/Error'
import List from './components/List'
import Content from './components/Content'
import Register from './components/Register'
import GroupChat from './components/GroupChat'
import Friend from './components/Friend'
import Chat from './components/Chat'
import 'bootstrap/dist/css/bootstrap.css'
import './base.css'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		showDagger: false,
		height: document.documentElement.clientHeight,
		showHeader: true,
		showFooter: true
	},
	mutations: {
		daggerCtrl (state) {
			state.showDagger = !state.showDagger
		},
		headerCtrl (state) {
			state.showHeader = !state.showHeader
		},
		footerCtrl (state) {
			state.footerCtrl = !state.footerCtrl
		}
	}
})

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

const router = new VueRouter({routes});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})