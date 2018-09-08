/* cli入口 */
const yargs = require('yargs');
const Server = require('./app');
const baseCfg = require('./config/base.js');

const argv = yargs
	.usage('kdir [options]')
	.option('p', {
		alias: 'port',
		describe: '端口号',
		default: baseCfg.port
	})
	.option('h', {
		alias: 'hostname',
		describe: '地址',
		default: baseCfg.hostname
	})
	.option('r', {
		alias: 'root',
		describe: '根目录',
		default: baseCfg.root
	})
	.version()
	.alias('v','version')
	.help()
	.argv;

const server = new Server(argv);
server.start(); 
