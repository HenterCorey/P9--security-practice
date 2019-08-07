module.exports = [{
  "id": 1,
  "date": 1499051520000,
  "avatar": "https://avatars2.githubusercontent.com/u/2024949?v=4",
  "author": "黎腾",
  "title": "反击爬虫，前端工程师的脑洞可以有多大？",
  "cover": "http://7tszky.com1.z0.glb.clouddn.com/FmIvXiOiFFET4oPGkVU6rdDCl87S",
  "content":`
    <h2>1. 前言</h2>
    <p>对于一张网页，<button>这是一个按钮</button>我们往往希望它是结构良好，内容清晰的，这样搜索引擎才能准确地认知它。
    而反过来，又有一些情景，我们不希望内容能被轻易获取，比方说电商网站的交易额，教育网站的题目等。因为这些内容，往往是一个产品的生命线，必须做到有效地保护。这就是爬虫与反爬虫这一话题的由来。</p>
    <h2>2. 常见反爬虫策略</h2>
    <p>但是世界上没有一个网站，能做到完美地反爬虫。<p>
    <p>如果页面希望能在用户面前正常展示，同时又不给爬虫机会，就必须要做到识别真人与机器人。因此工程师们做了各种尝试，这些策略大多采用于后端，也是目前比较常规单有效的手段，比如：</p>
    <ul>
      <li>User-Agent + Referer检测</li>
      <li>账号及Cookie验证</li>
      <li>验证码</li>
      <li>IP限制频次</li>
    </ul> 
    <p>而爬虫是可以无限逼近于真人的，比如：</p>
    <ul>
      <li>chrome headless或phantomjs来模拟浏览器环境</li>
      <li>tesseract识别验证码</li>
      <li>代理IP淘宝就能买到</li>
    </ul>
    <p>所以我们说，100%的反爬虫策略？不存在的。</p>
    <p>更多的是体力活，是个难易程度的问题。</p>
    <p>不过作为前端工程师，我们可以增加一下游戏难度，设计出一些很(sang)有(xin)意(bing)思(kuang)的反爬虫策略。</p>
    <a href="http://imweb.io/topic/595b7161d6ca6b4f0ac71f05" onclick="alert('xss')">更多请点击</a>  
  `
}, {
  "id": 2,
  "date": 1498882331000,
  "author": "halwu",
  "title": "流媒体加密",
  "avatar": "http://7tszky.com1.z0.glb.clouddn.com/FurRS_mjoEVMDeAhfQlmKS71dIQ3",
  "cover": "https://user-images.githubusercontent.com/5773264/28862374-6f2bcb24-7797-11e7-9671-4a7a471dfb8a.png",
  "content": `
   <h2>为什么要加密视频</h2>
   <p>付费观看视频的模式是很多平台的核心业务，如果视频被录制并非法传播，付费业务将受到严重威胁。因此对视频服务进行加密的技术变得尤为重要。</p>
   <p>本文所指的视频加密是为了让要保护的视频不能轻易被下载，即使下载到了也是加密后的内容，其它人解开加密后的内容需要付出非常大的代价。</p>
   <p>无法做到严格的让要保护的视频不被录制，原因在于你需要在客户端播放出视频的原内容，解密的流程在客户端的话不法分子就能模拟整个流程，最保守也能用屏幕录制软件录制到视频的原内容(可以通过加水印的方法缓解下)。我们的目标是让他获取原内容的代价更大。</p>
   <h2>常见视频加密技术</h2>
   <p>视频加密技术分为两种：</p>
   <ul>
    <li>防盗链：通过验证的用户才能访问到没有加密的视频内容，这种方案存在视频很容易就被下载的风险，严格来说这不属于加密。这种方式其实是资源访问授权，它实现起来简单。</li>
    <li>加密视频本身：通过对称加密算法加密视频内容本身，用户获得加密后的视频内容，通过验证的用户可以获取解密视频的密钥，在客户端解密后播放。这种方式实现起来流程复杂会带来更多的计算量。</li>
   </ul>
   <p>一般结合这两种技术一起用，第1种技术很成熟也有很多教程就不再复述，本文主要介绍第2种加密技术。</p>
   <h2>流媒体加密技术原理</h2>
   <p>看视频分为两种，看点播和看录播。 要看点播可以通过下载完整个视频后再看，或者通过流媒体边下边看。 看直播只能通过流媒体看最新的画面。</p>
   <p>加密整个视频的技术很简单，把视频看成一个文件采用加密文件的技术，这种技术太多就不介绍了。 加密流媒体的技术很少，也很难找到学习资料，本文主要介绍流媒体加密技术。
  常见的应用与浏览器播放的流媒体传输协议有：</p>
  <a href="http://imweb.io/topic/59819d7bf8b6c96352a593ff">更多请点击</a>  
  
   `
},{
  "id": 3,
  "date": 1498795260000,
  "author": "jero",
  "title": "VS Code 初上手",
  "avatar": "http://gravatar.com/avatar/7aa3f8405cd18d1ed6caa1fc168ca90b?size=48&d=retro",
  "cover": "http://7tszky.com1.z0.glb.clouddn.com/FtpPTq72whtNO-6iTP2BVVh8IqBA",
  "content": `
    <p>这是《小江品评编辑器》系列的开篇，当然想开个好头。</p>
    <p>我 2012 年开始接触前端，从最开始的记事本，到 Dreamweaver ，到 notepad++ ，到风头一时无两的 Sublime Text ，到现在社区庞大的 Atom，都使用过很长一段时间。</p>
    <p>期间也抽空玩耍过 Vim、Emac和 Brackets 等等，觉得智商不够浅尝辄止。</p>
    <p>当然也不会放过 IDE ，Eclispe、NetBeans 、Aptana 都试过，现在专注 jetbrains 三十年、Webstorm 脑残粉……别胡思乱想了，我买了 license。</p>
    <p>扯这么多就是为了证明，品评编辑器，我还真有这个资格。</p>
    <p>今天要说的编辑器不是 Sublime ，她很棒，但更新太缓慢，在这个各种技术井喷的时代，再不奋起直追，只会被淘汰。</p>
    <p>也不是 Atom ，他一样棒，意外的是启动时间要一个世纪。</p>
    <p>Webstorm 当然是压轴登场。</p>
    <p>今天聊聊 VS Code ，上镇楼图！</p>
    <img alt="vscode" src="http://7tszky.com1.z0.glb.clouddn.com/FtpPTq72whtNO-6iTP2BVVh8IqBA" onclick="document.body.style.background='red';" />
  `
}]