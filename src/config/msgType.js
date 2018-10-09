
module.exports = {
	'text': {
		id: '12345',
		type: 'text',
		content: 'this is text'
	},
	'image': {
		type: 'image',
		content: {
			url:'https://socket.io/images/mixmax.png'
		}
	},
	'file': {
		type: 'file',
		content: {
			url:'https://socket.io/images/mixmax.png'
		}
	},
	'rich': {
		type: 'custom',
		content: {
			cmd: 65,
			content: '<ul><li>rich</li><li>2</li></ul>'
		}
	},
	'onconnect':{
		type:'custom',
		content:'已建立连接'
	},
	'onkefu':{
		type:'custom',
		content: {
			"shop": {
				"setting": {
					"staffReadSwitch": 1,
					"inputSwitch": 1,
					"sendingRate": "1.5"
				},
				"id": "a",
				"logo": "",
				"qiyuInfoSwitch": 1,
				"hasEmail": 1,
				"hasMobile": 0,
				"name": " 七鱼测试企业123"
			},
			"realStaffid": -1,
			"operator_enable": 1,
			"inqueueNotify": "当前排队人数较多，请耐心等待...",
			"iconurl": "https://ysf.nosdn.127.net/6B347A987367A1BEE7B7717B1E3FEED4",
			"code": 200,
			"sessionid": 569634256,
			"evaluation_enable": 0,
			"session_token": "",
			"message": "Hello Robot!",
			"stafftype": 1,
			"showNum": 1,
			"cmd": 2,
			"lastMessage": {
				"content": "",
				"autoreply": "1",
				"time": "1536490677508",
				"fromUser": "0",
				"type": "qa"
			},
			"staffid": "QIYU_ROBOT",
			"groupid": 0,
			"staffname": "大白",
			"exchange": -1
		},
	},
	'onmsgWithdraw': {
		type: 'custom',
		content: {
			cmd: 28,
			msgIdClient: '12345',
			sessionId: '12345',
			result: 1,
			message: ''
		}
	}
	/* 'onvisitor': {
		type: 'custom',
		content: {
			"cmd": 3,
			"userid": "13f4e23003fafabd98512be476a695ad",
			"old_sessionid": 0,
			"userinfo": "[{\"value\":\"heartbeat\",\"key\":\"real_name\"}]",
			"sessionid": 14332015,
			"staffinfo": "{\"id\":29119,\"nickname\":\"shachaoheng\",\"realname\":\"shachaoheng\"}",
			"old_sessiontype": 1,
			"fromtype": "WEB",
			"version": 44
		}
	} */
};