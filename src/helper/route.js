// const path = require('path');
// const fs = require('fs');
// const handlebars = require('handlebars');	// 服务器模版
// const promisify = require('util').promisify;
// const stat = promisify(fs.stat);
// const readdir = promisify(fs.readdir);
// const tpl = fs.readFileSync(path.join(__dirname,'../template/dir.tpl'),'utf8');	// 自定义模版
// const mime = require('./mime.js');	// mime类型值

module.exports = async function (req, res , cfg) {
	// const filepath = path.join(cfg.root,req.url);
	// const files = await readdir(filepath);
	// const template = handlebars.compile(tpl);
	// const dir = path.relative(cfg.root,filepath);
	// const html = template({
	// 	title: path.basename(filepath),
	// 	root: cfg.root,
	// 	files,
	// 	dir: dir ? `/${dir}` : ''
	// });
	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.end('hello world');
	
};
