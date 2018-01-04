<!--
    create by fulin 2017/08/26
-->
<style lang="css">
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 250px;
        padding: 23px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        -webkit-user-select: none;
        user-select: none;
        background-color: #000;
        opacity: 0.7;
        border-radius: 12px;
        text-align: center;
     }
    span {
        display: inline-block;
        width: 65%;
        color: #fff;
        line-height: 25px;
        word-wrap: break-word;
        /*word-break: break-all;*/
    }
    /*动画效果*/
    .toast-enter-active {
        transition: all .5s;
    }

    .toast-leave-active {
        transition: opacity .5s;
    }

    .toast-leave-to {
        opacity: 0;
    }

    .toast-enter {
        opacity: 0;
        transform: translate(-50%, -10%);
    }


</style>
<template>
    <transition name="toast">
        <div class="toast" id="toast" v-show="show">
            <span>{{text}}</span>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    export default{
        data() {
            return {
                show: false,
                text: ''
            }
        }
    }
</script>
