/**
 * user相关逻辑
 * 包括右上角用户模块，登录登出等
 */

$(function(){
  // 全局 userInfo
  window.userInfo = {};

  function getUserInfo() {
    // 如果已登录，右上角显示用户名
    $.ajax({
      type:'get',
      url:'/api/get_userinfo',
      success: (data) => {
        // 更新全局 userInfo 数据
        window.userInfo = data;
        if (data.is_login) {
          const username = data.username;
          if (username) {
            $('.current-user').show();
            $('.current-user-name').text(username);
            $('.js-login').hide();
          }
        }
        $(window).trigger('getUserInfo');
      }
    });
  }

  function ajaxLogin(username, password) {
    $.ajax({
      type:'post',
      url:'/api/login',
      data: {
        username: username,
        password: password,
      },
      success: data => {
        if (data.success) {
          location.reload();
        } else {
          alert(data.message);
        }
      }
    });
  }


  function showLogin() {
    $('body').append(`
      <div class="login-dialog-ctn">
        <div class="login-dialog">
          <h2 class="dialog-title">登录</h2>
          <div class="input-ctn">
            <input class="ipt-username" type="text" placeholder="输入用户名"/><br />
            <input class="ipt-psw" type="password" placeholder="密码"/>
          </div>
          <button id='js-login-btn' class="login-btn">登录</button>
        </div>
        <div class="mask"></div>
      </div>
    `);
  }

  function logout() {
    $.ajax({
      type:'post',
      url:'/api/logout',
      success: data => {
        if (data.success) {
          location.reload();
        } else {
          alert(data.message);
        }
      }
    });
  }

  function bindEvents() {
    // 点击登录按钮
    $('.js-login').on('click', showLogin);

    // 点击登出按钮
    $('.js-logout').on('click', logout);

    // 自定义登陆事件
    $(window).on('login', showLogin);

    // 自定义登出事件
    $(window).on('logout',logout);

    // 因为 #js-login-btn 是动态 append 上去的，所以要事件代理
    $('body').on('click', '#js-login-btn', ()=> {
      const username = $('.ipt-username').val().trim();
      const password = $('.ipt-psw').val().trim();
      if (username && password) {
        ajaxLogin(username, password);
      } else {
        if (!username) {
          alert('请输入用户名');
        } else {
          alert('请输入密码');
        }
      }
    });
    
  }

  function init () {
    getUserInfo();
    bindEvents();
  }

  init();

})