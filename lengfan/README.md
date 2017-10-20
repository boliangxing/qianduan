###安装
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务(http://localhost:4200)

```
npm start
```

###开发

###目录结构
<pre>
.
├── README.md           
├── node_modules               // 项目模块目录
├── proxy.conf.json         // 项目反向代理文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── main.ts     // 引导AppModule
│   ├── app          // 项目组件和依赖
│   │   │──app.module.ts     //各种模块配置
│   │   │──shared     //商品服务 websocket服务
│   │   │──其他文件    //项目中使用的模块
│   │      │──xxx.component.css    //模块样式
│   │      │──xxx.component.html   //模块模版
│   │      │──xxx.component.ts     //模块控制
│   ├── filters.js     // 各种过滤器
│   └── main.js        // Webpack 预编译入口
└── angular-cli.json  // angular 配置文件
</pre>
