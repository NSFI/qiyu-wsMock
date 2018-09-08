/* 可作为依赖使用的入口 */

const path = require('path');
const http = require('http');
const fs = require('fs');
const chalk = require('chalk');

const baseCfg = require('./config/base.js');
const route = require('./helper/route.js');
const openUrl = require('./helper/openUrl.js');

class Server{
	constructor(config){
		this.conf = Object.assign({},baseCfg,config);
	}
	start(){
		const server = http.createServer((req,res) => {
			route(req, res, this.conf);
		});
		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `${this.https ? 'https':'http'}://${this.conf.hostname}:${this.conf.port}`;
			openUrl(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
}

module.exports = Server;
