// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";
import Common from "./common";
import App from "./App";
import {Toast,hideToast} from './components/common/toast/toast.js'
import {Dagger,hideDagger} from './components/common/dagger/dagger'
import {Alert,Confirm,Prompt,closePopup} from  './components/common/prompt/prompt'
import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";
import "./base.less";
import './socket.js'

Vue.prototype.Toast = function(text, time) {
    return Toast(text, time)
};
Vue.prototype.hideToast = function() {
    return hideToast();
};
Vue.prototype.Dagger = function(list, index) {
    return Dagger(list, index)
};
Vue.prototype.hideDagger = function() {
    return hideDagger();
};
Vue.prototype.Alert = function(text,okText){
    return Alert(text,okText);
}
Vue.prototype.Confirm = function(text,okText,cancelText){
    return Confirm(text,okText,cancelText);
}
Vue.prototype.Prompt = function(text,okText, defaultValue){
    return Prompt(text,okText,defaultValue);
}
Vue.use(VueRouter);

Vue.mixin({
    methods: Common.methods()
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
