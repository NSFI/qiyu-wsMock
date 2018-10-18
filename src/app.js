/* 可作为依赖使用的入口 */

const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const baseCfg = require('./config/base.js');
const openUrl = require('./helper/openUrl.js');
const msgType = require('./config/msgType');

const dirPath = path.resolve(baseCfg.root, baseCfg.dir);
const mockFilePath = path.resolve(dirPath, baseCfg.mock);

class Server{
	constructor(config){
		this.conf = Object.assign({},baseCfg,config);
		this.socket = null;
	}
	// 驱动服务
	start(){
		// 解析req，生成body
		app.use(bodyParser.json());
		
		app.get('/getMsgTypeMap', (req, res) => {
			const msgType = this.getMsgType();
			res.status(200).send({
				code: 200,
				message: 'ok',
				result: msgType
			});
		})
		//静态资源
		router.get('/:name',function (req,res) {
			const isFavico = req.url.indexOf('favicon.ico');
			const dir = (isFavico == -1) ? 'public/fe/' : 'public/';
			//res.sendFile(process.cwd() + dir + req.url);
			res.sendFile(path.resolve(__dirname, '..', dir+req.url));
		});
		app.use(router);
		
		// 路由
		app.get('/',function (req,res) {
			//res.sendFile(process.cwd() + '/public/fe/index.html');
			res.sendFile(path.resolve(__dirname, '..', 'public/fe/index.html'));
		});
		app.post('/send', (req,res) => {
			const msgType = this.getMsgType();
			const data = msgType[req.body.msgType];
			
			if(data.type == 'custom'){
				io.emit('_customSysMsg',JSON.stringify(data));
				console.log('下发：自定义消息')
			}else{
				io.emit('_message',JSON.stringify(data));
				console.log('下发：基础消息')
			}

			res.status(200).send({
				code:200,
				message:'ok',
				result:req.body
			});
		});
		app.post('/switch',function (req,res) {
			const content = JSON.parse(msgType[req.body.id].content);
			const value = {
				cmd:content.cmd,
				value:req.body.switch || 0
			};
			io.emit('_switch',JSON.stringify(value));
			console.log('下发：',value);
			res.status(200).send({
				code:200,
				message:'ok',
				result:req.body
			});
		});
		// 长链接已连接
		io.on('connection', function(socket){
			// 断开长链接
			socket.on('disconnect',function () {
				console.log(`${chalk.red('ws已断开！')}`);
			});
			console.log(`${chalk.green('ws已连接！')}`);
		});
		
		// 监听
		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `${this.https ? 'https':'http'}://${this.conf.hostname}:${this.conf.port}`;
			openUrl(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
	getMsgType() {
		var ret;
		try{
			const content = fs.readFileSync(mockFilePath, 'utf-8');
			ret = JSON.parse(content);
		}catch(err) {
			ret = msgType;
		}
 
		Object.keys(ret).forEach((key) => {
			var item = ret[key];
			if (typeof item.content != 'string') {
				item.content = JSON.stringify(item.content);
			}
		});
		return ret;
	}
}

module.exports = Server;
