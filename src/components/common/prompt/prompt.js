/**
 * Created by fulin on 2018-08-30
 */
import Vue from 'vue'
import promptComponent from  './prompt.vue'
const promptConstructor = Vue.extend(promptComponent);
let instance = new promptConstructor().$mount('');

document.body.appendChild(instance.$el);
const Alert = (text,okText)=>{
    if(instance.show === true) {
        return;
    }
    instance.show = true;
    instance.isAlert = true;
    instance.isPrompt = false;
    instance.okText = okText||'确定';
    instance.message = text;
    return new Promise(function(resolve,reject) {
        instance.$refs.okBtn.addEventListener('click',function() {
            instance.show = false;
            resolve(true);
        })
    })
};
const Confirm = (text,okText,cancelText)=>{
    if(instance.show === true) {
        return;
    }
    instance.show = true;
    instance.okText = okText||'确定';
    instance.cancelText = cancelText||'取消';
    instance.isAlert = false;
    instance.isPrompt = false;
    instance.message = text;
    return new Promise(function(resolve,reject) {
        instance.$refs.cancelBtn.addEventListener('click',function() {
            instance.show = false;
            resolve(false);
        });
        instance.$refs.okBtn.addEventListener('click',function() {
            instance.show = false;
            resolve(true);
        })
    })
};
const Prompt = (text,okText, defaultValue)=>{
    if(instance.show === true) {
        return;
    }
    instance.show = true;
    instance.isAlert = false;
    instance.isPrompt = true;
    instance.okText = okText||'确定';
    instance.message = text;
    instance.inputValue = defaultValue || '';
    return new Promise(function(resolve,reject) {
        instance.$refs.okBtn.addEventListener('click',function() {
            instance.show = false;
            resolve(instance.inputValue);
        })
    })
};
// 关闭弹层
const closePopup = ()=>{
    instance.show = false;
}

export {Alert,Confirm,Prompt,closePopup}