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

```cmd
fish-ws -h  // 帮助
fish-ws -c configfile
fish-ws // 默认在当前目录下，以config.json启动服务，否则以默认值启动服务
```
