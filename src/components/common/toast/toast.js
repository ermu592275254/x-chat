/**
 * Created by fulin on 2018-08-30
 */
import Vue from "vue";
const ToastConstructor = Vue.extend(require('./toast.vue'));
let instance = new ToastConstructor().$mount('');

document.body.appendChild(instance.$el);

const Toast = (text, duration) => {
    return new Promise((resolve, reject) => {
        if (instance.show === true) {
            reject(false);
        }
        instance.show = true;
        instance.text = text;
        Vue.nextTick(() => {
            instance.timer = setTimeout(function() {
                instance.show = false;
                resolve(true);
            }, duration || 2000);
        })
    });
};
const hideToast = () => {
    instance.show = false;
};
export {Toast, hideToast}