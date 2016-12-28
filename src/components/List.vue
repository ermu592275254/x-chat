<template>
    <div class="list" v-bind:style="height">
    	<ul>
    		<li>
    			<a class="mainmenu row no-m no-p" v-on:click="hideList('hideMList')">
    				<i class="col-lg-3 no-m glyphicon glyphicon-th"></i>
    				<span class="col-lg-9 no-m">Main Menu</span>
				</a>
    			<ul class="menulist">
    				<li v-bind:class="{hideli: hideMList}" @click="goPage('/home/groupchat')">Chats Public</li>
    				<li v-bind:class="{hideli: hideMList}" @click="goPage('/home')">Chats Joined</li>
    				<li v-bind:class="{hideli: hideMList}" @click="goPage('/home/friend')">Friends</router-link></li>
    				<li v-bind:class="{hideli: hideMList}">Notifications</li>
    			</ul>
    		</li>
    		<li>
    			<a class="mainmenu row no-m no-p" v-on:click="hideList('hideJList')">
    				<i class="col-lg-3 no-m glyphicon glyphicon-th-list"></i>
    				<span class="col-lg-9 no-m">Joined Chat</span>
				</a>
    			<ul class="menulist">
    				<li v-bind:class="{hideli: hideJList}" @click="goPage('/home/chat')">
    					<img class="usericon" src="../assets/logo.png" alt="">jolly baby
    				</li>
    				<li v-bind:class="{hideli: hideJList}" @click="goPage('/home/chat')">
    					<img class="usericon" src="../assets/logo2.jpg" alt="">little piggish cat
    				</li>
    			</ul>
    		</li>

    	</ul>
    </div>
</template>

<script>
export default {
	data () {
		return {
			height: 'height:'+document.documentElement.clientHeight+'px',
			hideMList: false,
			hideJList: false
		}
	},
	methods: {
		hideList: function(value) {
			if(value === 'hideMList'){
				this.hideMList = !this.hideMList;
			} else {
				this.hideJList = !this.hideJList;
			}
		},
		goPage: function(str) {
			this.$router.push(str);
		}
	}
}
</script>

<style scoped>
.list{
	margin-right: -.1rem;
	float: left;
	width: 17%;
	border-right: .1rem solid #ccc;
	box-shadow: .1rem 0 .2rem #ccc; 
}
.mainmenu {
	display: block;
	width: 100%;
	height: 4rem;
	z-index: 2;
	background-color: #ffde00;
	font-size: 1.6rem;
	line-height: 40px;
	cursor: pointer;
	overflow: hidden;
}
.mainmenu i {
	height: 4rem;
	line-height: 4rem;
	font-size: 1.8rem;
}

li{
	margin: 0;
}
.menulist li{
	padding-left: 2rem;
	font-size: 1.4rem;
	line-height: 4rem;
	cursor: pointer;
	overflow: hidden;
	height: 4.1rem;
	transition:height 0.2s;
}
.hideli {
	height: 0!important;
}
.menulist li:hover {
	background-color: #ccc
}
.usericon{
	margin: 0 1rem;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;	
}
</style>