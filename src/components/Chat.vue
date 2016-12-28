<template>
	<div class="chat">
		<div class="chatheader">
			<img src="../assets/logo.png" alt=""><span>[Group] vueChat </span>
			<a>Account　<i class="glyphicon glyphicon-chevron-down"></i></a>
			<ul class="options" v-if="false">
				<li class="c-green bb">create group</li>
				<li class="c-blue">change pwd</li>
				<li class="c-blue bb">set profile</li>
				<li class="c-red">Logout</li>
			</ul>
		</div>
		<div class="chatcontent" :style="minHeight">
			<div class="chatbox">
				<div>
					<img class="userimg" src="../assets/pikapika.jpg" alt=""><span class="name">jolly</span><span class="time">2016-12-12 12:12:12</span>
				</div>
				<p class="content">I'll still be able to break a motherfuckin' table</p>
			</div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="chatbox" style="margin-left: 40%">
				<div>
					<img class="userimg" src="../assets/yellowboy.jpg" alt=""><span class="name">jolly</span><span class="time">2016-12-12 12:12:12</span>
				</div>
				<p class="content">His palms are sweaty' knees weak' arms are heavy
									There's vomit on his sweater already' mom's spaghetti
									He's nervous' but on the surface he looks calm and ready
									To drop bombs' but he keeps on forgettin
									What he wrote down' the whole crowd goes so loud
									He opens his mouth' but the words won'te out
									He's chokin' how everybody's jokin now
									The clock's run out' time's up over' bloah!
									Snap back to reality' Oh there goes gravity
									Oh' there goes Rabbit' he choked
									He's so mad' but he won't give up that
									Is he? No
									He won't have it ' he knows his whole back city's ropes
									It don't matter' he's dope
									He knows that' but he's broke</p>
			</div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
			<div class="hint"><span>little piggish cat join chats</span></div>
		</div>
		<div class="chatinput">
			<a class="addfile"><i class="glyphicon glyphicon-paperclip"></i></a>
			<div class="input" contenteditable="plaintext-only"></div>
			<a class="sendmsg"><i class="glyphicon glyphicon-share-alt"></i></a>
		</div>
	</div>
</template>

<script>


export default {
	data () {
		return {
			minHeight: 'height:' + this.$store.state.height + 'px'
		}
	}
}

</script>

<style scoped>
.chat {
	position: relative;
	width: 100%;
	margin: 0;
}
.chatheader {
	position: absolute;
	top: 0;
	width: 100%;
	height: 5rem;
	background-color: #ffde00;
	border-bottom: .1rem solid #ccc;
	box-shadow: 0 .2rem 0.2rem #ccc;
	text-align: center;
	line-height: 5rem;
}
.chatheader a {
	position: absolute;
	right: 2rem;
	line-height: 5rem;
	color: #000;
	cursor: pointer;
}
img{
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}
.options {
	position: fixed;
	top: 0;
	right: 0;
	border: .1rem solid #ccc;
	box-shadow: 0 .2rem .2rem #ccc;
}
.options li{
	width: 15rem;
	background-color: #fff;
	cursor: pointer;
}
.options li:hover {
	background-color: #ccc;
}
.chatcontent {
	padding: 7rem 2rem;
	overflow: scroll;
}
.chatinput {
	position: absolute;
	bottom: 0;
	width: 100%;
	min-height: 6rem;
	background-color: #ffde00;
	box-shadow: 0 -.2rem 0.2rem #ccc;
}
.addfile {
	position: absolute;
	bottom: .8rem;
	left: 7rem;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background-color: #000;
	color: #fff;
	text-align: center;
	line-height: 4rem;
	cursor: pointer;
	transition: box-shadow .2s, bottom .2s;
}
.addfile:hover {
	box-shadow: 0 0 .3rem #ccc;
	bottom: .9rem;
	color: #12940a;
}
.sendmsg {
	position: absolute;
	bottom: .8rem;
	right: 7rem;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background-color: #000;
	color: #fff;
	text-align: center;
	line-height: 4rem;
	cursor: pointer;
	transition: box-shadow .2s, bottom .2s;
}
.sendmsg:hover {
	box-shadow: 0 0 .3rem #ccc;
	bottom: .9rem;
	color: #12940a;
}
.input {
	width: 65%;
	margin: 2rem auto;
	min-height: 2rem;
	border-bottom: .1rem solid #858585;
}
.input:focus {
	outline:none;
}
</style>
