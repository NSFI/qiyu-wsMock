/* 可作为依赖使用的入口 */

const express = require('express');
const router = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const baseCfg = require('./config/base.js');
const openUrl = require('./helper/openUrl.js');
const msgType = require('./config/msgType');

app.use(bodyParser.json());

class Server{
	constructor(config){
		this.conf = Object.assign({},baseCfg,config);
	}
	// 驱动服务
	start(){
		//静态资源文件指定目录
		router.get('/:name',function (req,res) {
			res.sendFile(process.cwd() + '/public/fe' + req.url);
		});
		app.get('/',function (req,res) {
			res.sendFile(process.cwd() + '/public/fe/index.html');
		});
		app.get('/sdk',function (req,res) {
			res.sendFile(process.cwd() + '/public/sdk.html');
		});
		
		// 长链接已连接
		io.on('connection', function(socket){
			console.log('ws已经连接！');
			// 断开长链接
			socket.on('disconnect',function () {
				console.log('disconnect');
			});
			// 异步接口
			app.post('/send',function (req,res) {
				const value = msgType[req.body.msgType];
				socket.broadcast.emit('_message',JSON.stringify(value));
				
				res.status(200).send({
					code:200,
					message:'ok',
					result:req.body
				});
				console.log('down')
			});
		});
		app.use(router);
		http.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `${this.https ? 'https':'http'}://${this.conf.hostname}:${this.conf.port}`;
			openUrl(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
}

module.exports = Server;
