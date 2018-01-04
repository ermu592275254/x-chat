// let host = "ws://localhost:3000";
// function createWS () {
// 	let  ws;
// 	// 建立websocket链接
// 	ws = new WebSocket(host);
// 	// 当websocket连接建立成功时
// 	ws.onopen = function() {
// 	    console.log('websocket 打开成功');
// 	};
// 	// 当收到服务端的消息时
// 	ws.onmessage = function(res) {
// 	    // e.data 是服务端发来的数据
// 	    console.log(res.data);
// 	    this.$store.commit('wsData', res.data);
// 	};
// 	// 当websocket关闭时
// 	ws.onclose = function() {
// 	    console.log("websocket 连接关闭");
// 	};
// 	// 当出现错误时
// 	ws.onerror = function() {
// 	    console.log("出现错误");
// 	};
// 	return ws;
// }
//
// var WS = createWS ();
// module.exports =  WS;
