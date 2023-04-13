import io from 'socket.io-client';
import config from '../config/base';

const yxNIM = window.NIM;

const connectInfo = {
	"lastLoginDeviceId": "",
	"connectionId": "1d0e80d9-627c-4778-85dc-73c84edff1f2",
	"ip": "115.192.85.207",
	"port": "8764",
	"country": ""
};

const customMsgMap = {
	60: !0,
	90: !0,
	95: !0,
	72: !0,
	200: !0,
	65: !0,
	203: !0,
	121: !0
};

class BaseMsg {
	constructor(id, content, type, from, to) {
		this.time = +new Date;
		this.idServer = + new Date;
		this.idClient = id || (+new Date+'#'+new Date);
		this.from = from || -1;
		this.to = to;
		this.formatContent(content, type);
	}
	formatContent(content, type) {
		this.type = type;
		switch (type) {
			case 'text':
				this.text = content;
				break;
			case 'image':
			case 'audio':
			case 'video':
			case 'file':
				this.file = JSON.parse(content);
				break;
		}
	}
}

class SysMsg {
	constructor(id, content, from, to) {
		this.time = +new Date;
		this.idServer = + new Date;
		this.idClient = id || (+new Date + '#' + new Date);
		this.type = 'custom';
		this.content = content;
		this.from = from || -1;
		this.to = to;
	}
}

class NIM {
	static getInstance(data) {
		if (!NIM.instance){
			NIM.instance = new NIM(data);
			return NIM.instance;
		}
    }
	constructor(option) {
		this.socket = null;
		this.switchMap = {};
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
		if(yxNIM) {
			this.nimSocket = new yxNIM(yxNIMOption);
		}
		const socketUrl = 'http://' + config.hostname + ':' + config.port;
		this.socket = io(socketUrl, {
			reconnection: false
		});
		this.socket.on('connect', this.onconnect.bind(this));
		this.socket.on('_message', this.onMsg.bind(this));
		this.socket.on('_customSysMsg', this.onCustomSysMsg.bind(this));
		this.socket.on('_switch', this.onSwitch.bind(this));
		this.socket.on('_syncSwitchSetting', this.onSyncSwitchSetting.bind(this));
	}
	disconnect() {
		this.nimSocket.disconnect();
		this.socket.disconnect();
	}
	onconnect() {
		// this.option.onconnect(connectInfo);
	}
	onMsg({ id, content, type, from }) {
		const msg = new BaseMsg(id, content, type, from, this.option.account);
		this.option.onmsg(msg);
	}
	onCustomSysMsg({ id, content, from, cmd }) {
		const msg = new SysMsg(id, content, from, this.option.account);
		if(customMsgMap[cmd]) {
			this.option.onmsg(msg);
		}else {
			this.option.oncustomsysmsg(msg);
		}
	}
	onSwitch({cmd, value}) {
		this.switchMap[cmd] = value;
	}
	onSyncSwitchSetting(data) {
		this.switchMap = data || {};
	}
	onyxMsg(msg) {
		this.option.onmsg(msg);
	}
	onyxCustomSysMsg(msg) {
		let content;
		try {
			content = JSON.parse(msg.content);
		} catch (err) {

		}
		if (!content || !content.cmd) return;
		if (this.switchMap[content.cmd] !== 0) {
			this.option.oncustomsysmsg(msg);
		}
	}
	sendText(msg) {
		this.nimSocket.sendText(msg);
	}
	sendFile(msg) {
		this.nimSocket.sendFile(msg);
	}
	sendCustomMsg(msg) {
		this.nimSocket.sendCustomSysMsg(msg);
	}
	sendCustomSysMsg(msg) {
		this.nimSocket.sendCustomSysMsg(msg);
	}
	previewFile(msg) {
		this.nimSocket.previewFile(msg);
	}
}

window.NIM = NIM;