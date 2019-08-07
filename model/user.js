/**
 * 用户模块
 */


const router = require('koa-router')();
// 用户列表
const Users = [{
  username: 'cover',
  avatar: 'http://7tszky.com1.z0.glb.clouddn.com/Fuo_uHogN74Ndja9LzPyjqIX0_JM?d=retro',
  password: '123456'
},{
  username: 'kevin',
  avatar: 'http://7tszky.com1.z0.glb.clouddn.com/Fg_TNzhl6fYOsiCKbJ8P_euBhXz0?d=retro',
  password: '123456'
}];

// 当前用户登陆态
let userSession = {};

const UserModel = {
  isSystemUser: (username, password) => {
    for (let index = 0; index < Users.length; index++) {
      const item = Users[index];
      if (item.username === username && item.password === password) {
        return true;
      }
    }
    return false;
  },
  setUserCookie: (username, ctx) => {
    // 简单的计算获得用户的登陆态 cookie
    const userkey = 'userkey_' + Math.random() * 1000;
    // 设置 Cookie
    ctx.cookies.set('userkey', userkey);
    ctx.cookies.set('username', username);
    // 存用户登陆态 cookie
    userSession[username] = userkey;
  },
  // 根据 cookie 验证用户
  checkUserByCookie: (ctx) => {
    const userkey = ctx.cookies.get('userkey');
    // const username = ctx.cookies.get('userkey');

    let username = null;
    for (let key in userSession) {
      if (userSession[key] === userkey) {
        userName = key;
        // 返回用户登陆情况
        return UserModel.getUserDetail(key)
      }
    }
    // 找不到则返回 null
    return null;
  },
  // 清空 cookie
  clearUserCookie: (ctx) => {
    const username = ctx.cookies.get('username');
    userSession[username] = null;
    ctx.cookies.set('userkey', '', { expires: new Date(0) });
    ctx.cookies.set('username', '', { expires: new Date(0) });
  },
  /**
   * 获取用户详情
   */
  getUserDetail: (username)=> {
    function isBigEnough(element) {
      return element >= 10;
    }
    // 遍历查找
    for (let i = 0, len = Users.length; i < len; i++) {
      const user = Users[i];
      if (user.username === username) {
        // 过滤密码
        return {
          username: user.username,
          avatar: user.avatar
        }
      }
    }
  },
  /**
   * 获取 用户的 token
   * 每次使用一次，则重新更新 userkey
   */
  getUserToken: (username, ctx) => {
    const userkey = userSession[username];
    const token = userkey + '_token';
    // 更新 cookie
    UserModel.setUserCookie(username, ctx);
    console.log(token);
    return token;
  }
}

module.exports = UserModel;
