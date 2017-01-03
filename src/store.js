import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 组件控制
		cCtrl: {
			showDagger: false,
			showHint: false,
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth,
			showHeader: true,
			showFooter: true,
			showList: true
		}
	},
	getters: {
		// 根据计算属性 返回true和false
		doneWidth: state => {
			return state.cCtrl.width > 1000 ? false : true
		}
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
		listCtrl (state) {
			state.cCtrl.showList = !state.cCtrl.showList
		}
	}
})