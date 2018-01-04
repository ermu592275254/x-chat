<template>
    <div>
        <Headerbar subTitle="个人资料" :showListIcon="true"></Headerbar>
        <div class="user-box">
            <div class="main-row">
                <img class="user-icon" :src="user.userIcon">
                <p class="username">二木</p>
                <p class="address">荷兰 阿姆斯特丹</p>
                <div class="upload-icon" @click="openUpload">
                    <span class="glyphicon glyphicon-cloud-upload"></span>
                    上传头像
                </div>
                <input type="file" style="position:absolute;clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       ref="uploadEl" @change="uploadIcon">
            </div>
            <div class="other-row" style="margin-top: 20px">
                <span>签名</span>
                <span class="grey-span">{{signature}}</span>
                <a class="arrow-right glyphicon glyphicon-pencil"></a>
            </div>
            <div class="other-row">
                <span>性别</span>
                <span class="grey-span">{{sex}}</span>
                <a class="arrow-right glyphicon glyphicon-pencil"></a>
            </div>
            <div class="other-row">
                <span>生日</span>
                <span class="grey-span">{{birthday}}</span>
                <a class="arrow-right glyphicon glyphicon-pencil"></a>
            </div>
            <div class="other-row">
                <span>邮箱</span>
                <span class="grey-span">{{email}}</span>
                <a class="arrow-right glyphicon glyphicon-pencil"></a>
            </div>
            <div class="other-row">
                <span>手机</span>
                <span class="grey-span">{{phone}}</span>
                <a class="arrow-right glyphicon glyphicon-pencil"></a>
            </div>
        </div>
        <footerbar></footerbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import Headerbar from './public/Header.vue'
    import Footerbar from './public/Footer.vue'
    import {mapState} from 'vuex'
    export default {
        name: 'login',
        data () {
            return {
                imgUrl: require("../assets/pikapika.jpg"),
                signature: '该用户很懒，还没有设置他的签名',
                sex: 'boy',
                email: '123456@email.com',
                phone: '12345678910',
                birthday: '1999-01-01',
                image: null
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        },
        components: {
            Headerbar,
            Footerbar
        },
        methods: {
            goPage: function(url) {
                this.$router.push(url);
            },
            openUpload() {
                console.log('init');
                let uploadEl = this.$refs.uploadEl;
                uploadEl.click();
            },
            uploadIcon(){
                let file = this.$refs.uploadEl.files[0];
                console.log(file);
                if(file.size > 100000){
                    this.Toast('文件大小不能超过1M');
                    this.$refs.uploadEl.value = '';
                    return;
                }
                let data = {
                    username: this.user.username,
                    file: file,
                    type: file.type.split('/')[1]
                };
                socket.emit('uploadUserIcon', data);
                this.$refs.uploadEl.value = '';
            },
        },
    }
</script>

<!-- add "scoped" this style just work in this component-->
<style lang="less" scoped>
    .user-box {
        position: absolute;
        width: 100%;
        min-height: 100%;
        padding-top: 7rem;
        background-color: #eee;
        .main-row {
            position: relative;
            background-color: #fff;
            padding: 5px 10px;
            .user-icon {
                float: left;
                margin-right: 1rem;
                width: 60px;
                height: 60px;
                border: none;
            }
            .username {
                padding-left: 10px;
                font-size: 18px;
                color: #333;
            }
            .address {
                padding-left: 10px;
                font-size: 14px;
                color: #999;
            }
            .upload-icon {
                border: 1px solid #ffde00;
                border-radius: 4px;
                background-color: #fff;
                font-size: 12px;
                padding: 5px;
                &:active {
                    background-color: #eee;
                }
                span {
                    display: inline;
                    color: #ffde00;
                    font-size: 1.8rem;
                }
                position: absolute;
                top: 50%;
                right: 1rem;
                -webkit-transform: translateY(-50%);
                -moz-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                -o-transform: translateY(-50%);
                transform: translateY(-50%);
            }
        }
        .other-row {
            position: relative;
            background-color: #fff;
            /*margin: 0 10px;*/
            /*padding: 5px 10px;*/
            height: 5rem;
            border-bottom: 1px solid #cdcdcd;;
            line-height: 5rem;
            span {
                display: inline;
                margin-left: 20px;
                color: #333;
            }
            .grey-span {
                color: #999;
            }
            .arrow-right {
                position: absolute;
                top: 50%;
                right: 10px;
                -webkit-transform: translateY(-50%);
                -moz-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                -o-transform: translateY(-50%);
                transform: translateY(-50%);
            }
        }
    }
</style>
