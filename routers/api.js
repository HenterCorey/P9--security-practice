/**
 * 路由
 */

const router = require('koa-router')();
const userModel = require('../model/user');
const commentModel = require('../model/comment');
const articleModel = require('../model/article');
const md5 = require('md5');   //引入md5

/**
 * 登录
 */
router.post('/login', async ( ctx )=>{
  const postData = ctx.request.body;
  const referer = ctx.request.header.referer;  //获取页面referer
  //判断用户输入是否正确并验证referer
  if (userModel.isSystemUser(postData.username, postData.password) && /https?:\/\/localhost:3000/.test(referer)) {
    // 设置登陆态cookie
    userModel.setUserCookie(postData.username, ctx);
    // 登陆成功
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // 登陆失败
    ctx.body = {
      success: false,
      message: '没有该用户或referer不正确'
    };
  }
});

/**
 * 登出
 */
router.post('/logout', async ( ctx )=>{
  const postData = ctx.request.body;
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    userModel.clearUserCookie(ctx);
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // 登陆失败
    ctx.body = {
      success: false,
      message: '没有登录'
    };
  }
});

/**
 * 增加评论
 */
router.post('/add_comment', async ( ctx )=>{
  let postData = ctx.request.body;
  const referer = ctx.request.header.referer;      //获取页面referer  
  // 判断是否是登陆了
  const user = userModel.checkUserByCookie(ctx);
  const metoken = md5(ctx.cookies.get('userkey') + '_token');   //获取用户userkey获取token
  const serverToken = md5(userModel.getUserToken(user.username, ctx)); //获取服务器token
  const isTureToken = metoken === serverToken;  //验证token
  const articleId = postData.articleId;
  if (user && articleId && /^https?:\/\/localhost:3000/.test(referer) && isTureToken) {
    // 增加评论
    commentModel.addComments(articleId, {
      comment: postData.comment,
      date: +postData.date,
      author: user.username,
      avatar: user.avatar
    });
    // 返回结果
    ctx.body = {
      success: true,
      retcode: 0,
      list: commentModel.getCommentById(articleId)
    };
  } else {
    ctx.body = {
      success: false,
      retcode: -1,
      message: '没有登陆或referer不正确或token不正确'
    };
  }
});


/**
 * 获取用户信息
 */
router.get('/get_userinfo', async ( ctx )=> {
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    ctx.body = {
      is_login: true,
      username: user.username,
      avatar: user.avatar
    }
  } else {
    ctx.body = {
      is_login: false
    }
  }
})

/**
 * 获取用户的评论信息
 */
router.get('/get_article_comment', async ( ctx )=>{
  // 判断是否是登陆了
  const articleId = ctx.query.articleId;
  const comments = commentModel.getCommentById(articleId);

  ctx.body = {
    success: true,
    list: comments
  };
});


/**
 * 获取文章列表
 */
router.get('/get_articles', async ( ctx )=>{
  ctx.body = {
    success: true,
    articles: articleModel.getArticles()
  };
});

/**
 * 获取文章详情
 */
router.get('/get_article_detail', async ( ctx )=>{
  // 获取文章 id
  const id = +ctx.query.id;
  ctx.body = {
    success: true,
    detail: articleModel.getArticleById(id)
  };
});


module.exports = router;
