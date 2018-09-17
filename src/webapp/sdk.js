import io from 'socket.io-client';

const yxNIM = window.NIM;

const connectInfo = {
	"lastLoginDeviceId": "",
	"connectionId": "1d0e80d9-627c-4778-85dc-73c84edff1f2",
	"ip": "115.192.85.207",
	"port": "8764",
	"country": ""
};


class BaseMsg {
	constructor(content, type, from, to) {
		this.time = +new Date();
		this.idServer = + new Date();
		this.idClient = + new Date();
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
		this.switchMap = {
			65: 0
		}
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
		this.socket = io('http://localhost:3000', {
			reconnection: false
		});
		this.socket.on('connect', this.onconnect.bind(this));
		this.socket.on('_message', this.onMsg.bind(this));
		this.socket.on('_customSysMsg', this.onCustomSysMsg.bind(this));
		this.socket.on('_switch', this.onSwitch.bind(this))
	}
	onconnect() {
		this.option.onconnect(connectInfo);
	}
	onMsg(json) {
		const { content, type } = JSON.parse(json);
		const msg = new BaseMsg(content, type, this.option.bid || -1, this.option.account);
		this.option.onmsg(msg);
	}
	onCustomSysMsg(json) {
		const { content } = JSON.parse(json);
		const msg = new SysMsg(content, this.option.bid || -1, this.option.account);
		this.option.oncustomsysmsg(msg);
	}
	onSwitch(json) {
		const { cmd, value } = JSON.parse(json);
		this.switchMap[cmd] = value;
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
		if (this.switchMap[content.cmd]) {
			this.option.oncustomsysmsg(msg);
		}
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