<template>
	<div class="group">
	<headerbar></headerbar>
		<ul class="grouplist">
			<li v-for="(item, index) in groupList" v-bind:class="{bb : index === groupList.length - 1}">
				<img src="/static/images/logo.png" alt="">
				<p class="grouptitle"><span>[group]</span> {{item.name}} - {{index}}</p>
				<p class="msgtime">{{ item.time | timeType }}</p>
				<p class="msginfo txt-ellipsis">{{item.lastMsg.author}}: {{item.lastMsg.content}}</p>
				<a class="groupbutton" @click="showDagger"><i class="glyphicon glyphicon-align-justify"></i></a>
			</li>
		</ul>
	<footerbar></footerbar>
	</div>
</template>

 <script>
import Headerbar from './Header.vue'
import Footerbar from './Footer.vue'

 export default {
	components: {
	    Headerbar,
	    Footerbar
	},
 	data() {
 		return{
			groupList: [
			{	
				imgUrl: '../static/images/logo.png',
				name: 'nodeChats',
				time: new Date('2016-12-01 12:01:00'),
				lastMsg:{author:'jolly',content:'you are lovely'}
			},{
				imgUrl: '../static/images/ogo2.jpg',
				name: 'CSSChats',
				time: new Date('2016-12-12 12:22:22'),
				lastMsg:{author:'cat',content:'thank you'}
			},{
				imgUrl: '../static/images/logo.png',				
				name: 'AngularChats',
				time: new Date(),
				lastMsg:{author:'dog',content:'exception'}
			}],
			time: new Date,
			a: true
		}
 	},
 	methods: {
 		showDagger: function() {
			this.$store.commit('daggerCtrl')
		}
 	},
 	computed: { // 计算属性没办法在v-for里面使用 因为无法获取到index
 		timeType: function() {
 			var timeStr = this.time.getFullYear() +'-'+ this.time.getMonth() + '-'+ this.time.getDate();
 			return timeStr
		}
 	},
 	filters: {
 		timeType: function (value) {
 			return value.getFullYear() +'-'+ (value.getMonth()+1) + '-'+ value.getDate()+' '+value.getHours()+':'+value.getMinutes()+':'+value.getSeconds();
 		}
 	}
 }
 	
 </script>

 <style>
.grouplist {
	margin: 1rem;
}
.grouplist li {
	display: block;
	position: relative;
	border: .1rem solid #ccc;
	padding: 1.5rem 6rem 0 6rem;
	min-height: 8.3rem;
	border-bottom: none;
	background: url('/static/images/pikapika.jpg') no-repeat center center; 
	background-size: contain;
}
.grouplist li p{
	margin: 0;
}
.grouplist li img {
	position: absolute;
	top: 1rem;
	left: 1rem;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}
.grouptitle {
	color: #4CAF50;
}
.grouptitle span {
	color: #F44336;
}
.msgtime {
	color: #858585;
}
</style>
