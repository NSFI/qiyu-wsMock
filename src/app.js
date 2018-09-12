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

class Server{
	constructor(config){
		this.conf = Object.assign({},baseCfg,config);
	}
	// 驱动服务
	start(){
		// 解析req，生成body
		app.use(bodyParser.json());
		//静态资源文件指定目录
		router.get('/:name',function (req,res) {
			res.sendFile(process.cwd() + '/public/fe' + req.url);
		});
		app.use(router);
		// 路由
		app.get('/',function (req,res) {
			res.sendFile(process.cwd() + '/public/fe/index.html');
		});
		
		// 长链接已连接
		io.on('connection', function(socket){
			console.log(`${chalk.green('ws已连接！')}`);
			// 断开长链接
			socket.on('disconnect',function () {
				console.log(`${chalk.red('ws已断开！')}`);
				
			});
			// 异步接口
			app.post('/send',function (req,res) {
				const value = msgType[req.body.msgType];
				socket.emit('_message',JSON.stringify(value));
				
				res.status(200).send({
					code:200,
					message:'ok',
					result:req.body
				});
				console.log('下发：',value);
			});
		});
		
		// 监听
		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `${this.https ? 'https':'http'}://${this.conf.hostname}:${this.conf.port}`;
			openUrl(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
}

module.exports = Server;
