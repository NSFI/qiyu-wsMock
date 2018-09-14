module.exports = {
	'text': {
		type: 'text',
		content: 'this is text'
	},
	'image': {
		type: 'image',
		content: JSON.stringify({
			url:'https://socket.io/images/mixmax.png'
		})
	},
	'file': {
		type: 'file',
		content: JSON.stringify({
			url:'https://socket.io/images/mixmax.png'
		})
	},
	'onconnect':{
		type:'custom',
		content:'已建立连接'
	},
	'onkefu':{
		type:'custom',
		content: JSON.stringify({
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
		}),
	},
	'rich': {
		type: 'custom',
		content: JSON.stringify({
			cmd:65,
			content:'<ul><li>rich</li><li>2</li></ul>'
		})
	},
};
