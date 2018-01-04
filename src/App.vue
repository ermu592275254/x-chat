<template>
    <div id="app" :style="appStyle">
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                appStyle: ''
            }
        },
        computed: {
            ...mapState({
                height: state => state.cCtrl.height
            })
        },
        created() {
            socket.emit('testPopulate');
        }
    }
</script>

<style>
</style>
