# fish-ws

#### 项目介绍
七鱼长链接服务器

#### 如何使用

安装cli工具
```cmd
npm i -g fish-ws
```

初始化:    
```cmd
fish-ws init
```
将在当前目录创建名为ws-mock的文件夹，该文件夹下包含mock.json文件，用于维护本地mock数据
<br/>
<br/>
启动mock服务：
```cmd
fish-ws server [参数]
```
mock页面将自动在浏览器打开

#### 开发说明
克隆工程后以npmscript来运行环境

```cmd
npm run fe:dev	// 前端开发环境
npm run fe:build	// 前端打包并部署
npm start	// 启动后端服务
```


