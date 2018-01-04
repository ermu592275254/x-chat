<style lang="less" scoped>
    /*@import '~assets/style/variable.less';*/
    /*@import '~assets/style/reset.less';*/
    /*@import "~assets/style/common.less";*/

    .confirm-enter-active {
        transition: all .2s;
    }

    .confirm-leave-active {
        transition: opacity .2s;
    }

    .confirm-leave-to {
        opacity: 0;
    }

    .confirm-enter {
        opacity: 0;
    }

    .confirm {
        position: relative;
        font-family: PingFangSC-Regular;
        font-size: 17px;
        -webkit-user-select: none;
        user-select: none;
        // 遮罩层样式
        .masker {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .4);
            -webkit-transition: opacity .1s linear;
            transition: opacity .1s linear;
            z-index: 100;
        }
        // 入库数据错误样式
        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 250px;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
            border-radius: 12px;
            background-color: #fff;
            .message {
                vertical-align: middle;
                color: #000;
                letter-spacing: -0.41px;
                p {
                    margin: 34px auto;
                    padding: 0 40px;
                    vertical-align: middle;
                    line-height: 24px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                }
                &::after {
                    content: '';
                    height: 100%;
                }
            }
            .prompt {
                margin: 20px 0;
                width: 100%;
                p {
                    margin: 5px auto;
                    font-size: 17px;
                    line-height: 24px;
                }
                input {
                    margin: 5px auto;
                    border: 1px solid #999;
                    border-radius: 6px;
                    width: 200px;
                    height: 30px;
                    font-size: 14px;
                    line-height: 20px;
                    text-align: center;
                    outline:none;
                }
            }
            .button-group {
                border-top: 1px solid #eee;
                a {
                    width: calc(50% - 0.5px);
                    text-align: center;
                    font-size: 16px;
                    line-height: 43px;
                    color: #4caf50;
                }
                .max-width {
                    width: 100% !important;;
                }
            }
        }
    }
</style>
<template>
    <transition name="confirm">
        <div class="confirm" v-show="show">
            <div class="masker" @touchmove.prevent>
                <div class="box">
                    <div class="message" v-if="!isPrompt">
                        <p>{{message}}</p>
                    </div>
                    <div class="prompt" v-if="isPrompt">
                        <p>{{message}}</p>
                        <input type="text" v-model="inputValue" ref="inputEl">
                    </div>
                    <div class="button-group clearfix bd-top">
                        <a class="bd-right fl" ref="cancelBtn" v-show="!isAlert && !isPrompt">{{cancelText}}</a>
                        <a class="fr" ref="okBtn" :class="{'max-width': isAlert || isPrompt}">{{okText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default{
        data() {
            return {
                show: false,
                message: '请输入提示语',
                okText: '确定',
                cancelText: '取消',
                isAlert: false,
                isPrompt: false,
                inputValue: '',
                inputType: ''
            }
        },
        watch: {
            show(){
                if (this.show) {
                    this.$nextTick(() => {
                        if(this.$refs.inputEl){
                            this.$refs.inputEl.focus();
                        }
                    });
                }
            }
        }
    }
</script>
