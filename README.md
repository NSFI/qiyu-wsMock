# fish-ws

#### 项目介绍
七鱼长链接服务器

#### 软件架构
既可作为cli工具使用，也可作为npm包使用

#### 安装教程
作为cli工具安装

```cmd
npm i -g fish-ws
```

作为npm包安装
```cmd
npm i fish-ws
import {app} from 'fish-ws';
```

#### 使用说明
克隆工程后以npmscript来运行环境

```cmd
npm run fe:dev	// 前端开发环境
npm run fe:build	// 前端打包并部署
npm start	// 启动ws服务
```

```dir
后端路由：
/	// 服务端下发消息面板
/sdk	// sdk端模拟页面
```

