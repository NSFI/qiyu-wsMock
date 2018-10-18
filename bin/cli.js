#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const Server = require('../src/app');
const baseCfg = require('../src/config/base.js');
const mockData = require('../src/config/msgType');

const dirPath = path.resolve(baseCfg.root, baseCfg.dir);
const mockFilePath = path.resolve(dirPath, baseCfg.mock);

const argv = yargs
    .command(
        'init',
        'init',
        (yargs) => {
            
        },
        (argv) => {
            init();
        }
    )
    .command(
        'server',
        'start server',
        (yargs) => {
            return yargs.option('p', {
                alias: 'port',
                describe: 'server port'
            })
        },
        (argv) => {
            startServer(argv);
        }
    )
    .help()
    .argv


function init() {
    if(!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    if(!fs.existsSync(mockFilePath)) {
        fs.writeFileSync(mockFilePath, JSON.stringify(mockData, null, '\t'));
    }
    console.log('init success');
}

function startServer(argv) {
    if(!fs.existsSync(dirPath)) {
        console.error('当前目录下未找到ws-mock文件夹，请先执行test init');
        return;
    }
    const config = {};
    Object.keys(argv).forEach((key) => {
        if(argv[key]) {
            config[key] = argv[key];
        }
    })
    const server = new Server(config);
    server.start(); 
}