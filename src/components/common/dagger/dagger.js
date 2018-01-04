import Vue from 'vue'
const DaggerConstructor = Vue.extend(require('./Dagger.vue'));
let instance = new DaggerConstructor().$mount('');

document.body.appendChild(instance.$el);
const Dagger = (list,index)=>{
    if(instance.show === true) {
        return;
    }
    instance.show = true;
    instance.list = list;
    instance.index=index;
};
const hideDagger = ()=> {
    instance.show = false;
};
export {Dagger, hideDagger}