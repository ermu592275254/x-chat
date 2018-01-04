step=0
function flash_title()
{
step++
if (step==3) {step=1}
if (step==1) {document.title='消息:wwwwwwwwwwwwwwwwww'}
if (step==2) {document.title='msgwwwwwwwwwwwwww'}
setTimeout("flash_title()",333);
}
flash_title()

    jQuery(document).ready(function(){ 
        $(function(){
            //$("mymsg").bind('keypress',function(event){
            //    if(event.keyCode == "13")     {
            //        $("conn").click();
            //     }
            // });
        });
    });

    var li=document.getElementById("mymsg");
    li.addEventListener("keydown",function(event){
    if(event.ctrlKey && event.keyCode==13){
        UserSendChatMsg();
        }
    },false);

    // 下面是各协议包的通信命令字
    const cmd_keepalive = 1;
    const cmd_online_event = 8;
    const cmd_system_msg = 9;
    const cmd_login = 10;
    const cmd_logout = 11;
    const cmd_chat_send = 12;
    const cmd_chat_recv = 13;
    const cmd_friendlist = 14;
    const cmd_friendopt = 15;
    const cmd_get_userinfo  = 16;
    const cmd_set_userinfo  = 17;

    const CMD_GET_GROUPLIST = 100;
    const CMD_GET_GROUPINFO = 101;
    const CMD_SET_GROUPINFO = 102;
    const CMD_GROUPMEMBER_OPT = 103;
    const CMD_GET_GROUP_MEMBERINFO = 104;
    const CMD_SEND_GROUP_CHATMSG = 105;
    const CMD_RECV_GROUP_CHATMSG = 106;

    const opt_add = 1;
    const opt_del = 2;


    var consoleLog = document.getElementById("consoleLog");
    var friendlist_view = document.getElementById("friendlist");
    var grouplist_view = document.getElementById("grouplist");


    var ws;
    var User = new Object();;
    User.chatdlg_cnt = 0;
    User.chat_user = 0;
    User.friendlist = {};
    User.grouplist = {};
    User.missed_heartbeats = 0;
    var heartbeat_interval = null;
    User.connstatus = false;

    window.onload=function(){
        if("WebSocket" in window){
            ws = new WebSocket("ws://tinychat.0xsky.com:1081/chat");  
            //ws = new WebSocket("ws://192.168.132.130:1081/chat");
            //ws = new WebSocket("ws://yun.0xsky.com:1081/chat");
            
                    ws.onopen=function(){
                        User.connstatus = true;
                        $("log").innerHTML='已成功连接服务器，您现在可以试试发送消息。';

                        User.ws = ws;
                        
                    }
                    ws.onclose=function(){
                        User.connstatus = false;
                        $("log").innerHTML='与服务器连接已断开.';

                    }
                    ws.onmessage=function(msg){
                        // 收到服务器的回应包与消息推送处理
                        console.log("recv:"+msg.data);
                        output("recv:"+msg.data);
                        var obj = JSON.parse(msg.data); 
                        switch(obj.cmd){
                            case cmd_keepalive: { onKeepalive(obj); break; }
                            case cmd_login: { onUserLogin(obj); break; }
                            case cmd_chat_recv: { onUserChat(obj); break; }
                            case cmd_chat_send: { break; }
                            case cmd_friendlist: { onFriendlist(obj); break; }
                            case cmd_get_userinfo: { onGetUserinfo(obj); break; }
                            case cmd_system_msg: { onSystemMsg(obj); break; }
                            case cmd_online_event: { onOnlineEvent(obj); break; }

                            case CMD_GET_GROUPLIST: { onGroupidlist(obj); break; }
                            case CMD_GET_GROUPINFO: { onGetGroupinfo(obj); break; }
                            case CMD_RECV_GROUP_CHATMSG: { onGetGroupChatmsg(obj); break; }    
                            default: {output(" 收到出错包:"+obj.cmd); }
                        }
                        //$("output").value += msg.data + "\n";
                    }
                    ws.onerror=function( msg ){
                        $("log").innerHTML='出错了.';
                        $("conn").disabled=true;
                    }
            //$("conn").onclick=function(){
            //   var msg = $("mymsg").value;
            //   if( msg.length > 0 ){
            //       if( msg == ":clear" ){
            //           $("output").value="";
            //       }else if( msg == ":help" ){
            //           alert("wwwwwwwwwwww");
            //       }else{
            //            if (User.chat_user==0) {
            //                $("chatuser").innerHTML="没有选择聊天对像";
            //            } else {
            //                var idtype = User.friendlist[User.chat_user].idtype;
            //                if (0==idtype) {SendChatMessgae(User.chat_user, msg);}
            //                if (1==idtype) {SendGroupChatMessgae(User.chat_user, msg);}   
            //            }
            //       }
            //       $("mymsg").value = "";
            //   }
            //}
    //
            $("btlogin").onclick=function(){
               var user = $("username").value;
               var pass = $("passwd").value;
               User.user = user;
               if (!User.connstatus) {reConn()};
               if( user.length > 0 && pass.length>0 ){
                       var loginpacket = new Object();
                       loginpacket.cmd = cmd_login;
                       loginpacket.ver = 111;
                       loginpacket.account = user;
                       loginpacket.pass = pass;
                       SendPacket(loginpacket);
                   }
               }
            
       }else{
           output("对不起!您的浏览器不支持webSocket.");
       }
    };
    
    function reConn()
    {
        User.ws = new WebSocket("ws://192.168.132.130:1081/chat");
    }

    // 定时心跳检测处理
    function start_heartbeat() {
    if (heartbeat_interval === null) {
        User.missed_heartbeats = 0;
        heartbeat_interval = setInterval(function() {
            try {
                User.missed_heartbeats++;
                if (User.missed_heartbeats >= 3)
                    throw new Error("Too many missed heartbeats.");
                sendkeepalive();
            } catch(e) {
                clearInterval(heartbeat_interval);
                heartbeat_interval = null;
                console.warn("Closing connection. Reason: " + e.message);
                User.ws.close();
            }
        }, 1000*30);
    }
    }


    function $(id){
        if( typeof id == "string" ){
            return document.getElementById(id);
        }
        return id;
    }

    // 向WS 发送JSON对像，将JSON转为STRING传送
    function SendPacket(packet)
    {
        console.log("send:"+JSON.stringify(packet));
        ws.send(JSON.stringify(packet));
    }

    // 用户发送消息处理
    function UserSendChatMsg()
    {
       var msg = $("mymsg").value;
       if( msg.length > 0 ){
           if( msg == ":clear" ){
               $("output").value="";
           }else if( msg == ":help" ){
               alert("wwwwwwwwwwww");
           }else{
                if (User.chat_user==0) {
                    $("chatuser").innerHTML="没有选择聊天对像";
                } else {
                    var idtype = User.friendlist[User.chat_user].idtype;
                    if (0==idtype) {SendChatMessgae(User.chat_user, msg);}
                    if (1==idtype) {SendGroupChatMessgae(User.chat_user, msg);}   
                }
           }
           $("mymsg").value = "";
       }
    }

    // 发送心跳包
    function sendkeepalive() {
        var alivepacket = new Object();
        alivepacket.cmd = cmd_keepalive;
        alivepacket.ver = 111;
        alivepacket.userid = User.userid;
        SendPacket(alivepacket);
    }

    // 发送取好友列表请求
    function GetFriendList() {
        var getfriendspacket = new Object();
        getfriendspacket.cmd = cmd_friendlist;
        getfriendspacket.ver = 111;
        getfriendspacket.userid = User.userid;
        SendPacket(getfriendspacket);
    }
    // 发送取用户的群列表
    function GetGroupList() {
        var getgroupspacket = new Object();
        getgroupspacket.cmd = CMD_GET_GROUPLIST;
        getgroupspacket.ver = 111;
        getgroupspacket.userid = User.userid;
        SendPacket(getgroupspacket);
    }

    // 好友操作请求包，可以添加删除好友
    function FriendOperation(type, friendid) {
        var friendoptpacket = new Object();
        friendoptpacket.cmd = cmd_friendopt;
        friendoptpacket.ver = 111;
        friendoptpacket.userid = User.userid;
        friendoptpacket.type = type;
        friendoptpacket.friendid = friendid;
        SendPacket(friendoptpacket);
    }
    
    // 给指定的UID发送单聊消息
    function SendChatMessgae(toUid, msg)
    {
        var chatpacket = new Object();
        chatpacket.cmd = cmd_chat_send;
        chatpacket.ver = 111;
        chatpacket.userid = User.userid;
        chatpacket.msgfrom = User.userid;
        chatpacket.msgto = parseInt(toUid);
        chatpacket.msg = msg;
        SendPacket(chatpacket);
        output(chatpacket.msgto + ": " + chatpacket.msg);
        SendChat(chatpacket);
    }

    // 给指定的群发送聊天消息，服务器会将消息投递给所有群成员
    function SendGroupChatMessgae(toUid, msg)
    {
        var chatpacket = new Object();
        chatpacket.cmd = CMD_SEND_GROUP_CHATMSG;
        chatpacket.ver = 111;
        chatpacket.userid = User.userid;
        chatpacket.msgfrom = User.userid;
        chatpacket.msgto = parseInt(toUid);
        chatpacket.msg = msg;
        SendPacket(chatpacket);
        output(chatpacket.msgto + ": " + chatpacket.msg);
        SendChat(chatpacket);
    }

    // 查询用户的信息，也可以取自己的信息
    function SendGetUserinfo(idlist) {
        var chatpacket = new Object();
        chatpacket.cmd = cmd_get_userinfo;
        chatpacket.ver = 111;
        chatpacket.userid = User.userid;
        chatpacket.type = 0; // 0 基本信息 1 详细信息
        chatpacket.friendlist = idlist;
        SendPacket(chatpacket);
    }

    // 查询群的信息
    function SendGetGroupinfo(idlist) {
        var chatpacket = new Object();
        chatpacket.cmd = CMD_GET_GROUPINFO;
        chatpacket.ver = 111;
        chatpacket.userid = User.userid;
        chatpacket.type = 0; // 0 基本信息 1 详细信息
        chatpacket.grouplist = idlist;
        SendPacket(chatpacket);
    }


    // 登陆回应回调处理
    function onUserLogin(loginpacket)
    {
        if(0==loginpacket.result) {
            User.userid = loginpacket.userid;
            output(loginpacket.userid + " 登陆成功");
            GetFriendList();
            GetGroupList();
            start_heartbeat();
        } else {
            output(loginpacket.userid + " 登陆失败");
        }
    }

    function SendChat(chatpacket)
    {
        output( chatpacket.msgfrom + ": " + chatpacket.msg );
        
        var info = User.friendlist[chatpacket.msgfrom];

        var html = "<div id=\"msgitem\">";
         html += "<div id=\"chat_name_send\">" ;
         html += "<img src=\""+info.avatar+"\"width=\"18\" height=\"18\"/>&nbsp;" +info.nickname+" </div>";
         html += "<div id=\"chat_msg_send\">"+chatpacket.msg+" </div>";
         html += "</div>";  

        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = html;
        show_chat(pre); 
        
    }   

    function onUserChat(chatpacket)
    {
        output( chatpacket.msgfrom + ": " + chatpacket.msg );
        var info = User.friendlist[chatpacket.msgfrom];
        var html = "<div id=\"msgitem\">";
        html += "<div id=\"chat_name_recv\">";
        html += "<img src=\""+info.avatar+"\"width=\"18\" height=\"18\"/>&nbsp;" +info.nickname+ " </div>";
        html += "<div id=\"chat_msg_recv\">  "+chatpacket.msg+" </div>";
        html += "</div>";  
        
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = html;
        show_chat(pre);
               
    }
    
    function onGetGroupChatmsg(chatpacket)
    {
        output( chatpacket.msgfrom + ": " + chatpacket.msg );
        var info = User.friendlist[chatpacket.msgfrom];
        var html = "<div id=\"msgitem\">";
        html += "<div id=\"chat_name_recv\">"+info.nickname +"<img src=\""+info.avatar+"\"width=\"16\" height=\"16\"/>" + " </div>";
         html += "<div id=\"chat_msg_recv\">  "+chatpacket.msg+" </div>";
         html += "</div>";  

        logToConsole(chatpacket.msg);
    }

    function onKeepalive(chatpacket)
    {
        User.missed_heartbeats = 0;
    }

    function onFriendlist(friendlistPacket)
    {
        var flist = friendlistPacket.friends;
        output( "friends:");
        for (var i in flist) {
            output( flist[i] );
        }
        flist.unshift(User.userid);
        SendGetUserinfo(flist);
    }

    function onGroupidlist(Packet)
    {
        var flist = Packet.grouplist;
        output( "grouplist:");
        for (var i in flist) {
            output( flist[i] );
        }

        SendGetGroupinfo(flist);
    }

    function select_chatuser(event)
    {
        console.log("select_chatuser "+ this.getAttribute("data-id"));
        User.chat_user = this.getAttribute("data-id");
        var info = User.friendlist[User.chat_user];
        $("chatuser").innerHTML="单聊:" + info.nickname;
    }

    function select_group(event)
    {
        console.log("select_group "+ this.getAttribute("data-id"));
        User.chat_user = this.getAttribute("data-id");
        var info = User.friendlist[User.chat_user];
        if (info.idtype=1) {$("chatuser").innerHTML="群聊:" + info.name;};
    }
    
    function onGetUserinfo(Packet) {
        document.getElementById("userinfo").innerHTML="" 
        document.getElementById("friendlist").innerHTML="" 
    
        var infolist = Packet.infolist;
        var html_list = "<table ondblclick=\"select_chatuser()\">";
        var select_list = "<select name=\"ids\" onchange=\"onSelect(this)\">";
        output( "friends:");
        for (var i in infolist) {
            infolist[i].idtype = 0;
            User.friendlist[infolist[i].userid] = infolist[i];
            //if (User.userid==infolist[i].userid) {continue;};
            output( "userid:" + infolist[i].userid);
            output( "sex:" + infolist[i].sex );
            output( "nickname:" + infolist[i].nickname );
            output( "avatar:" + infolist[i].avatar );
            output( "signature:" + infolist[i].signature );
            output( "status:" + infolist[i].status );

            var uitem ="";
            uitem += "<img src=\"" + infolist[i].avatar + "\" width=\"40\" height=\"40\" />";
            uitem += "<h2>"+infolist[i].nickname + "("+ infolist[i].userid +")" +"</h2><p> "+infolist[i].signature+" </p> ";
            var li = document.createElement("li");
            li.innerHTML = uitem;
            li.setAttribute('data-id', infolist[i].userid); 

            // 对用户自己的信息特另处理下
            if (infolist[i].userid==User.userid) {
                User.me = infolist[i];
                var profile = document.createElement("li");
                profile.innerHTML = uitem;
                profile.setAttribute('data-id', infolist[i].userid); 
                profile.addEventListener('click', userprofile, false);
                var userprofile_view = document.getElementById("userinfo");
                userprofile_view.appendChild(profile);
                continue;
            };

            li.addEventListener('click', select_chatuser,false);

            if(!friendlist_view) friendlist_view = document.getElementById("friendlist");
            friendlist_view.appendChild(li);
            
        }
         
        show_userinfo();
    }
    
    function onGetGroupinfo(Packet) {
        document.getElementById("grouplist").innerHTML=""
        var infolist = Packet.infolist;
        var html_list = "<table ondblclick=\"select_chatuser()\">";
        var select_list = "<select name=\"gids\" onchange=\"onSelect(this)\">";
        output( "gids:");
        for (var i in infolist) {
            infolist[i].idtype = 1;
            User.friendlist[infolist[i].gid] = infolist[i];
            //if (User.userid==infolist[i].userid) {continue;};
            output( "gid:" + infolist[i].gid);
            output( "owner:" + infolist[i].owner );
            output( "name:" + infolist[i].name );
            output( "detail:" + infolist[i].detail );
            output( "logo:" + infolist[i].logo );
            output( "type:" + infolist[i].type );
            var bgcolor = "bgcolor=#D9D9D9";
            if (1==infolist[i].status) {bgcolor = "bgcolor=#87CEFA";};
            html_list += "<tr "+bgcolor+ "><td>" +infolist[i].gid +"</td><td> <img src='" +infolist[i].logo +"' width=\"40\" height=\"40\" /></td><td>" +infolist[i].name +"</td> </tr>";
            
            var uitem ="";
            uitem += "<img src=\"" + infolist[i].logo + "\" width=\"40\" height=\"40\" />";
            uitem += "<h2>"+infolist[i].name+"</h2><p> "+infolist[i].detail+" </p> ";
            var li = document.createElement("li");
            li.innerHTML = uitem;
            li.setAttribute('data-id', infolist[i].gid); 
            li.addEventListener('click', select_group,false);
            if(!grouplist_view) grouplist_view = document.getElementById("grouplist");
            grouplist_view.appendChild(li);
            
        }

    }

    function onSystemMsg(data)
    {
        output("onSystemMsg type:"+data.msgtype+" msg:"+data.msg);
    }

    function onOnlineEvent(data)
    {
        output("onOnlineEvent friendid:"+data.friendid+ " type:"+data.event_type+" data:"+data.data);
    }

    function output(data)
    {
        //$("output").value += data + "\n";

        //var d = document.getElementById("output").scrollHeight;
        //document.getElementById("output").scrollTop = d;
    }

    function onSelect(select)
    {
        output("onSelect:" +select.value);
        User.chat_user = select.value;
    }

    function userprofile(event)
    {
        console.log("userprofile");
    } 

    function logToConsole(message)
    {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        if(!consoleLog) consoleLog = document.getElementById("consoleLog");
        consoleLog.appendChild(pre);
    
        while (consoleLog.childNodes.length > 50) {
        consoleLog.removeChild(consoleLog.firstChild);
        }
        consoleLog.scrollTop = consoleLog.scrollHeight;
    }

    function show_chat(pre)
    {
        if(!consoleLog) consoleLog = document.getElementById("consoleLog");
        consoleLog.appendChild(pre);
    
        while (consoleLog.childNodes.length > 50) {
        consoleLog.removeChild(consoleLog.firstChild);
        }
        consoleLog.scrollTop = consoleLog.scrollHeight;
    }
    
    
function $(ElementId)
{
    return document.getElementById(ElementId);
}
    
function show_userinfo() 
{
    if(User.userid>0) {
        var a = '<img src=" '+ User.me.avatar +' " width=80 height=80 >';
        $("nickname").value = User.me.nickname;
        $("userid").value  = User.me.userid;
        $("avatarurl").value  = User.me.avatar;
        $("avatar").innerHTML  = a;
        $("signature").value  = User.me.signature;
    }
}

function friend_add()
{
    var friendid = $("friendid").value;
    FriendOperation(opt_add, friendid);
    GetFriendList();
}

function frined_del()
{
    var friendid = $("friendid").value;
    FriendOperation(opt_del, friendid);
    GetFriendList();
}


function group_add()
{
    GetGroupList();
}

function group_del()
{
    GetGroupList();
}
