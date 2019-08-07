# 安全防范实践
性能和安全是前端一直离不开的话题。在本章中我们学习许多安全相关的知识如 XSS、CSRF 和 DDOS 等。正所谓**实践是检验真理的唯一标准**，接下来就让我们实践一下吧。

## 项目说明
在本项目中提供了一个**博客网站应用**的基础服务代码。由于该网站应用没有做好安全防范的工作，导致其会遭受到黑客们的 Web 攻击。接下来需要大家来为该博客网站保驾护航，修补安全漏洞。

### 目录结构
```
├── README.md 说明文档
├── index.js 网站主入口文件
├── static  页面静态资源
├── model 页面数据相关（这里数据都是存在内存中的）
├── routers 路由相关
├── node_modules  依赖包
├── package.json
├── .editorconfig
└── .gitignore
```

博客网站共有两个页面：
* 文章列表页 (http://localhost:3000/index.html)
* 文章详情页 (http://localhost:3000/detail.html?id=文章ID)

### 默认用户账号密码
用户数据记录在 `/model/user.js` 中
- 用户1 账号: cover 密码: 123456
- 用户2 账号: kevin 密码: 123456

### 项目运行
* 通过 `npm install` 安装依赖
* 通过 `node index` 运行服务


## 具体要求

### 1.XSS 防范
事实上对于 XSS 防范，不同公司有相应的方案和措施。在本项目，更加强调的是前端的工作，因此需要大家实现下面的 XSS 防范：
* 展示在前端文章详情页的文章内容（富文本），需要使用白名单的方式 (使用工具库 [js-xss](https://github.com/leizongmin/js-xss)) 设置合法的标签和属性：
  * 白名单标签： `p`、`a`、`img`、`h1`、`h2`、`h3`、`ul`、`li`
  * 白名单属性：`src`、`href`、`alt`、`title`
* 展示在前端文章列表页的文章简介需要去除富文本内容的标签字符使其变成纯文本，如下所示：
  
  ```js
  var text = '<h1>这是h1的内容!<a href="a.com">详情可点击</a></><img src="a.jpg" />';
  // 通过使用自己实现的 delHtmlTag 函数删除 html 标签
  var result = delHtmlTag(text);
  // result： 这是h1的内容!详情可点击
  ```
  
* 对于前端获取到的评论信息（纯文本）需要使用 `HtmlEncode`（使用前面所学的自己的工具库）进行转义


### 2.referer 验证
添加评论接口和登陆接口增加 `referer` 校验逻辑。

### 3.token 验证
添加评论接口需要增加 token 参数来防范 CSRF 攻击，具体要求如下：

- 使用 [MD5 工具库](https://github.com/blueimp/JavaScript-MD5) 根据 userkey 来计算 token 的值

具体效果如下：
```js
// 获取到userkey
var userkey = 'userkey_323.0403154581376';
//计算 token
var token = md5(userkey); 
//计算出的 token 为： '6f4648e677dbb88c89806888e403ec29'
```

### 4. DDOS 防御
实现 DDOS 防御，建议使用下面两个工具包实现：

* [koa-limit](https://github.com/cnpm/koa-limit)
* [koa-ratelimit](https://github.com/koajs/ratelimit)

## 最后的最后
到这里，我们将迎来最后一个实践项目（安全实践）。对于前端开发来说，安全或许是一个不那么常见但必须深入了解的领域。所谓“苍蝇不叮无缝的蛋”，如果我们的网站不存在安全漏洞，黑客们也就无从下手了。或许现在，你们还不需要面临到安全相关的问题，但仍希望你们能够通过本项目，也就是最后一个项目，让大家对常规的 Web 攻击和防范有一个较为清晰的了解。为之后你们的安全的学习建立相应的基石。最后请记住：**学习前端，需要持之以恒方能成大器！** 