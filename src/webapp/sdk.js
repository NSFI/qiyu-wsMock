import io from 'socket.io-client';

const yxNIM = window.NIM;

const connectInfo = {
	"lastLoginDeviceId": "",
	"connectionId": "1d0e80d9-627c-4778-85dc-73c84edff1f2",
	"ip": "115.192.85.207",
	"port": "8764",
	"country": ""
};

const applyInfo = {
	"time": 1536491129329,
	"to": "3127376fe4d4d84d066e3f650fb57348",
	"type": "custom",
	"from": "-1",
	"idServer": "97155956932",
	"content": "{\"shop\":{\"setting\":{\"staffReadSwitch\":1,\"inputSwitch\":1,\"sendingRate\":\"1.5\"},\"id\":\"a\",\"logo\":\"\",\"qiyuInfoSwitch\":1,\"hasEmail\":1,\"hasMobile\":0,\"name\":\" 七鱼测试企业123\"},\"realStaffid\":-1,\"operator_enable\":1,\"inqueueNotify\":\"当前排队人数较多，请耐心等待...\",\"iconurl\":\"https://ysf.nosdn.127.net/6B347A987367A1BEE7B7717B1E3FEED4\",\"code\":200,\"sessionid\":569634256,\"evaluation_enable\":0,\"session_token\":\"\",\"message\":\"Hello Robot!\",\"stafftype\":1,\"showNum\":1,\"cmd\":2,\"lastMessage\":{\"content\":\"{\\\"operator_hint\\\":0,\\\"operator_hint_desc\\\":\\\"\\\",\\\"answer_type\\\":6,\\\"cmd\\\":60,\\\"question_type\\\":1,\\\"answer_label\\\":\\\"您是不是想问：\\\",\\\"question\\\":\\\"\\\",\\\"answer_list\\\":\\\"[{\\\\\\\"id\\\\\\\":9814195,\\\\\\\"question\\\\\\\":\\\\\\\"请年假\\\\\\\"},{\\\\\\\"id\\\\\\\":9818885,\\\\\\\"question\\\\\\\":\\\\\\\"证明开具\\\\\\\"},{\\\\\\\"id\\\\\\\":9820426,\\\\\\\"question\\\\\\\":\\\\\\\"入离调转\\\\\\\"},{\\\\\\\"id\\\\\\\":4698672,\\\\\\\"question\\\\\\\":\\\\\\\"公积金\\\\\\\"}]\\\",\\\"answer_cnt\\\":4}\",\"autoreply\":\"1\",\"time\":\"1536490677508\",\"fromUser\":\"0\",\"type\":\"qa\"},\"staffid\":\"QIYU_ROBOT\",\"groupid\":0,\"staffname\":\"大白\",\"exchange\":-1}",
	"sendToOnlineUsersOnly": true,
	"cc": false,
	"isPushable": true,
	"isUnreadable": false,
	"needPushNick": false,
	"scene": "p2p",
	"status": "success",
	"filter": true
}

class baseMsg {
	constructor(content, type, from, to) {
		this.time = +new Date();
		this.idServer = + new Date();
		this.idClient = + new Date();
		this.formatContent(content, type);
	}
	formatContent(content, type) {
		switch(type) {
			case 'text':
				this.text = content;
				break;
			case 'image':
			case 'audio':
			case 'video':
			case 'file':
				this.file = content;
				break;
		}
	}
}

class sysMsg {
	constructor(content, from, to) {
		this.time = +new Date();
		this.idServer = + new Date();
		this.type = 'custom';
		this.content = content;
		this.from = from;
		this.to = to;
	}
}

class NIM {
	constructor(option) {
		this.socket = null;

		this.option = option;
		this.connect();
	}
	connect() {
		const yxNIMOption = Object.assign({}, this.option, {
			// onconnect: this.onyxConnect.bind(this),
			// onerror: this.onyxConnectError.bind(this),
			// ondisconnect: this.onyxDisconnect.bind(this),
			onmsg: this.onyxMsg.bind(this),
			oncustomsysmsg: this.onyxCustomSysMsg.bind(this)
		})
		this.nimSocket = new yxNIM(yxNIMOption);
		this.socket = io('http://localhost:3000', {
			reconnection: false
		});
		this.socket.on('_connect', this.onconnect.bind(this));
		this.socket.on('_disconnect', this.ondisconnect.bind(this));
		this.socket.on('_message', this.onmessage.bind(this));
		this.socket.on('_customSysMsg', this.onCustomSysMsg.bind(this));
	}
	onconnect(content) {
		console.log('mock-onconnect:',content);
	}
	ondisconnect(content){
		console.log('mock-ondisconnect:',content);
	}
	onmessage(content, type) {
		var msg = baseMsg(content, type, this.option.bid || -1, this.option.account);
		this.option.onmessage(msg);
		console.log('mock-onmessage:',content,type);
	}
	onCustomSysMsg(content) {
		var msg = new sysMsg(content, this.option.bid || -1, this.option.account)
		this.option.oncustomsysmsg(msg);
		console.log('mock-onCustomSysMsg:',content,type);
	}
	onyxMsg(msg) {
		this.option.onmessage(msg);
	}
	onyxCustomSysMsg(msg) {
		var content;
		try{
			content = JSON.parse(msg.content);
		}catch(err) {

		}
		if(!content) return;
		console.error(content.cmd);
		this.option.oncustomsysmsg(msg);
	}
	sendText(msg) {
		this.nimSocket.sendText(msg);
	}
	sendFile(msg) {
		this.nimSocket.sendFile(msg);
	}
	sendCustomSysMsg(msg) {
		this.nimSocket.sendCustomSysMsg(msg);
	}
}

window.NIM = NIM;
