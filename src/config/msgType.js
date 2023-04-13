
module.exports = {
	"2": {
		"specType": "onkefu",
		"type": "custom",
		"content": {
			"shop": {
				"setting": {
					"staffReadSwitch": 1,
					"inputSwitch": 1,
					"sendingRate": "1.5",
					"show_evaluation_button": true
				},
				"id": "a",
				"logo": "",
				"qiyuInfoSwitch": 1,
				"hasEmail": 1,
				"hasMobile": 0,
				"name": "七鱼测试企业123"
			},
			"realStaffid": -1,
			"operator_enable": 1,
			"inqueueNotify": "当前排队人数较多，请耐心等待...",
			"iconurl": "https://ysf.nosdn.127.net/6B347A987367A1BEE7B7717B1E3FEED4",
			"code": 200,
			"sessionid": 7203,
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
		}
	},
	"28": {
		"specType": "onmsgWithdraw",
		"type": "custom",
		"content": {
			"cmd": 28,
			"msgidClient": "12345",
			"sessionid": "12345",
			"result": 200,
			"message": ""
		}
	},
	"65": {
		"specType": "rich",
		"type": "custom",
		"content": {
			"cmd": 65,
			"content": "<ul><li>rich</li><li>2</li></ul>"
		}
	},
	"95": {
		"specType": "ontransferResult",
		"type": "custom",
		"content": {
			"cmd": 95,
			"old_sessionid": 1111,
			"sessionid": 2222,
			"staffid": 333,
			"staffname": "sch",
			"iconurl": "https://ysf.nosdn.127.net/BDD91108186933293BE9FCB5ADE62BD7"
		}
	},
	"13": {
		"specType": "onkfStatus",
		"type": "custom",
		"content": {
			"cmd": 13,
			"result": 1,
			"status": 1
		}
	},
	"text": {
		"specType": "text",
		"type": "text",
		"content": "this is text"
	},
	"image": {
		"specType": "image",
		"type": "image",
		"content": {
			"url": "https://socket.io/images/mixmax.png"
		}
	},
	"file": {
		"specType": "file",
		"type": "file",
		"content": {
			"expire": 1540534706335,
			"ext": "jpeg",
			"md5": "fcc73344f2aff2dfc63db5a1319267ac",
			"name": "img-75f90a1d6b2ac13741e87a598593b589.jpg",
			"size": 127850,
			"url": "https://nim.nosdn.127.net/MTAxNzA2Mw==/bmltYV8xNjM0NTgzXzE1Mzk5Mjk5MDU3ODFfODcxN2M0YWUtMGZjNS00NzMyLWIxNjctY2JiMTczZjQ1Y2Qw"
		}
	},
	"3": {
		"specType": "onSession",
		"type": "custom",
		"content": {
			"staffinfo": "{\"nickname\":\"换一个很长长长长长长长长长长的名字试试\",\"id\":31006,\"realname\":\"超级管理员\"}",
			"fromtype": "WEB",
			"cmd": 3,
			"sessionid": 14461112,
			"old_sessionid": 0,
			"userid": "bd9b65ce871a1e3531cb0dcfe6a73a36",
			"version": 47,
			"old_sessiontype": 1,
			"withdraw": 1
		}
	},
	"108": {
		"specType": "receiveRoundNum",
		"type": "custom",
		"content": {
			"cmd": 108,
			"sessionid": 14461112
		}
	},
	"55": {
		"specType": "evaluSuccess",
		"type": "custom",
		"content": {
			"cmd": 55,
			"sessionid": 14494572,
			"old_sessionid": 0,
			"body": 413,
			"desc": 413,
			"satisfactionType":3, // 评价类型 2 3 5
			"satisfactionName": '不满意', // 评价结果
			"satisfaction": 1, // 评价分数
			"enableInvitation": 1 // 是否显示邀请评价按钮
		}
	},
	"50":{
		"specType": "receiveEval", // 访客端收到评价邀请
		"type": "eval-show",
		"content": {
			"evaluation_auto_popup": 1,
			"cmd": 50,
			"sessionid": 7203,
			"evaluationTimes": 1
		}
	  },
	"300":{
		"specType": "sendEvalInvitation", // 客服端收到刚刚发送的邀评成功
		"type": "custom",
		"content": {
            "cmd": 300, 
            "sessionid": 14494572,  //会话
            "enable_evaluation_muttimes": 0, // 多次评价开关
            "evaluationInviteSwitch": 1,  // 邀评开关
            "send": true // 是否已经发送
		}
	  },
	  "87":{
		"specType": "leave", // 客服端收到刚刚发送的邀评成功
		"type": "custom",
		"content": {
            "cmd": 87, 
            "sessionid": 14494572,  //会话
		}
	  },
	  "203": {
		"specType": "static_union",
		"scene": "p2p",
		"from": "-1",
		"fromNick": "",
		"fromClientType": "Server",
		"to": "f2e48bf325118ff23ffa3842a006030a",
		"time": 1550737671792,
		"type": "custom",
		"text": "",
		"isHistoryable": true,
		"isRoamingable": false,
		"isSyncable": true,
		"cc": false,
		"isPushable": true,
		"isOfflinable": true,
		"isUnreadable": true,
		"needPushNick": false,
		"isLocal": false,
		"resend": false,
		"idClient": "14509589#93f54a18a85f4b8b85338b5d6bdd2616",
		"idServer": "1345303",
		"userUpdateTime": 1520301854689,
		"custom": "",
		"status": "success",
		"content": "{\"template\":{\"unions\"￼{\"detail\":{\"url\":\"http://bot-resource-public.nos.netease.com/d198617a-f744-4c5f-8a38-108b1f79b66c.PNG\"},\"type\":\"image\"},{\"detail\":{\"label\":\"北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊北京雾霾真大啊\"},\"type\":\"text\"},{\"detail\":{\"label\":\"<a href=\\\"https://www.bilibili.com/video/av3295109/spm_id_from=333.338.recommend_report.5\\\" params=\\\"_preRequestId=fc603343-af6b-4ee6-9c45-cfdd8567f7ab&_sessionId=14509589&_preNodeId=E3F09B529779339A-ec9e41520088976c&_token=f361b8e69b3fcb2511abe0fa15027371&_flowId=E3F09B529779339A-E59196F5D2653BF2\\\" target=\\\"_blank\\\">跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接</a>\"},\"type\":\"richText\"},{\"detail\":{\"style\":\"button\",\"label\":\"跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块跳转模块\",\"params\":\"_preRequestId=fc603343-af6b-4ee6-9c45-cfdd8567f7ab&_sessionId=14509589&_preNodeId=E3F09B529779339A-ec9e41520088976c&_token=f361b8e69b3fcb2511abe0fa15027371&_flowId=E3F09B529779339A-E59196F5D2653BF2\",\"type\":\"block\",\"target\":\"_blank-093C48F2A62E0318\"},\"type\":\"link\"},{\"detail\":{\"style\":\"button\",\"label\":\"跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接跳转链接\",\"params\":\"_preRequestId=fc603343-af6b-4ee6-9c45-cfdd8567f7ab&_sessionId=14509589&_preNodeId=E3F09B529779339A-ec9e41520088976c&_token=f361b8e69b3fcb2511abe0fa15027371&_flowId=E3F09B529779339A-E59196F5D2653BF2\",\"type\":\"url\",\"target\":\"http://api.multimedia.netease.com/test/bot01_7373/point/add?targetUrl=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav3295109%2Fspm_id_from%3D333.338.recommend_report.5&_preRequestId=fc603343-af6b-4ee6-9c45-cfdd8567f7ab&_sessionId=14509589&_preNodeId=E3F09B529779339A-ec9e41520088976c&_token=f361b8e69b3fcb2511abe0fa15027371&_flowId=E3F09B529779339A-E59196F5D2653BF2\"},\"type\":\"link\"}],\"id\":\"static_union\",\"version\":\"1.0\"},\"cmd\":203,\"type\":\"11\",\"extendInfo\":{\"flowId\":\"E3F09B529779339A-E59196F5D2653BF2\",\"nodeId\":\"E3F09B529779339A-ec9e41520088976c\",\"preRequestId\":\"b2ddf443-6622-4a9c-90fa-b9eee1df4736\",\"requestId\":\"fc603343-af6b-4ee6-9c45-cfdd8567f7ab\",\"showUseful\":true}}",
		"target": "-1",
		"sessionId": "7203",
		"flow": "in",
		"filter": true
		},
};