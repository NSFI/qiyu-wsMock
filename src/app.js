/* 可作为依赖使用的入口 */

const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
	pingTimeout: 20000
});
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const cors = require('cors');

const baseCfg = require('./config/base.js');
const openUrl = require('./helper/openUrl.js');
const defaultMsgTypeMap = require('./config/msgType');

const dirPath = path.resolve(baseCfg.root, baseCfg.dir);
const mockFilePath = path.resolve(dirPath, baseCfg.mock);

class Server{
	constructor(config){
		this.conf = Object.assign({},baseCfg,config);
		this.socket = null;
		this.switchSetting = {};
	}
	// 驱动服务
	start(){
		// 解析req，生成body
		app.use(bodyParser.json());
		app.use(cors());
		
		app.get('/getMsgTypeMap', (req, res) => {
			const msgType = this.getMsgTypeMap();
			res.status(200).send({
				code: 200,
				message: 'ok',
				result: msgType
			});
		})
		//静态资源
		router.get('/:name', (req,res) => {
			const isFavico = req.url.indexOf('favicon.ico');
			const dir = (isFavico == -1) ? 'public/fe/' : 'public/';
			//res.sendFile(process.cwd() + dir + req.url);
			res.sendFile(path.resolve(__dirname, '..', dir+req.url));
		});
		app.use(router);
		
		// 路由
		app.get('/', (req,res) => {
			//res.sendFile(process.cwd() + '/public/fe/index.html');
			res.sendFile(path.resolve(__dirname, '..', 'public/fe/index.html'));
		});
		app.post('/send', (req,res) => {
			// content为字符串，复杂数据为json字符串
			const { msgType, content } = req.body;
			const msgTypeMap = this.getMsgTypeMap();
			var ret = {...msgTypeMap[msgType], ...req.body}
			if(ret.type == 'custom'){
				ret = {...ret, cmd: msgType};
				io.emit('_customSysMsg', ret);
				console.log('下发：自定义消息', ret)
			}else{
				io.emit('_message', ret);
				console.log('下发：基础消息')
			}

			res.status(200).send({
				code:200,
				message:'ok',
				result:req.body
			});
		});
		app.post('/switch', (req, res) => {
			const { msgType, switch:value = 0 } = req.body; 
			this.switchSetting[msgType] = value;
			io.emit('_switch', {
				cmd: msgType,
				value: value
			});
			console.log('下发：开关切换', msgType, value);
			res.status(200).send({
				code:200,
				message:'ok',
				result:req.body
			});
		});
		// 长链接已连接
		io.on('connection', (socket) => {
			// 断开长链接
			socket.on('disconnect',function () {
				console.log(`${chalk.red('ws已断开！')}`);
			});
			console.log(`${chalk.green('ws已连接！')}`);
			// 连接成功后立刻下发开关配置
			io.emit('_syncSwitchSetting', this.switchSetting);
		});
		
		// 监听
		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `${this.https ? 'https':'http'}://${this.conf.hostname}:${this.conf.port}`;
			openUrl(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
	getMsgTypeMap() {
		var ret;
		try{
			const content = fs.readFileSync(mockFilePath, 'utf-8');
			ret = JSON.parse(content);
		}catch(err) {
			ret = defaultMsgTypeMap;
		}
 
		Object.keys(ret).forEach((key) => {
			var item = ret[key];
			// 开关默认打开
			if(this.switchSetting[key] === undefined) {
				this.switchSetting[key] = 1;
			}
			item.switch = this.switchSetting[key];
			if (typeof item.content != 'string') {
				item.content = JSON.stringify(item.content);
			}
		});
		return ret;
	}
}

module.exports = Server;
