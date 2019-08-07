// 加载完执行以及控制命名空间
var opts = {                   //XSS白名单设置
  whiteList: {
    a: ["href", "title", "src", "alt"],
    p: ["href", "title", "src", "alt"],
    img: ["href", "title", "src", "alt"],
    h1: ["href", "title", "src", "alt"],
    h2: ["href", "title", "src", "alt"],
    h3: ["href", "title", "src", "alt"],
    ul: ["href", "title", "src", "alt"],
    li: ["href", "title", "src", "alt"],
  }
}
$(function() {
  // 常用 dom 元素
  const $content = $('.content');
  const $comment = $('.comment');
  const $commentTotal = $('.comment-total');
  const $commentList = $('.comment-list');
  const $commentReply = $('.comment-reply');
  const $commentInput = $commentReply.find('.comment-input');
  let articleId;
  function htmlEncode(str) {   //过滤函数
    return String(str)
     .replace(/&/g,'&amp;')
     .replace(/"/g,'&quot;')
     .replace(/'/g,'&#39;')
     .replace(/</g,'&lt;')
     .replace(/>/g,'&gt;');
  }
  /**
   * 获取数据
   */
  function initData() {
    // 获取参数 id
    articleId = COMMON.getUrlParam('id');
    // ajax 获取文章详情
    if (articleId) {
      getArticleDetail(articleId);
      getArticleComment(articleId);
    }
  }

  /**
   * 根据参数拉取文章详情
   * @param {any} id
   */
  function getArticleDetail(id) {
    $.ajax({
      type:'get',
      url:'/api/get_article_detail',
      data: {
        id: id,
      },
      success: (data) => {
        // 获取到数据则渲染内容
        if (data.success) {
          renderDetail(data.detail);
        } else {
          alert(data.message);
        }
      }
    });
  }

  /**
   * 根据参数拉取文章评论
   * @param {any} id 
   */
  function getArticleComment(id) {
    $.ajax({
      type:'get',
      url:'/api/get_article_comment',
      data: {
        articleId: id,
      },
      success: (data) => {
        // 获取到数据则渲染内容
        if (data.success) {
          renderComment(data.list);
        } else {
          alert(data.message);
        }
      }
    });
  }


  /**
   * 渲染函数
   */
  function renderDetail(detail) {
    const htmlText = `
      <h1 class="content-title">${detail.title}</h1>
      <div class="content-info">
        <img class="article-avatar" src="${detail.avatar}"/>
        <div class="article-info">
          <span class="article-username">${detail.author}</span>
          <span class="article-date">${COMMON.formatDate("YYYY.MM.DD", detail.date)}</span>
        </div>
      </div>
      <div class="content-banner">
        <img src="${detail.cover}" alt="">
      </div>
      <div class="content-text">${filterXSS(detail.content,opts)}</div>
    `;

    $content.html(htmlText);
  }

  /**
   * 渲染函数
   */
  function renderComment(comments) {
    let htmlText = '';
    comments.forEach((item) => {
      htmlText += `
        <li class="comment-item">
          <img src="${item.avatar}" class="user-avatar">
          <div class="comment-item-content">
            <p class="comment-item-author">${item.author}</p>
            <p class="comment-item-text">${htmlEncode(item.comment)}</p>
          </div>
          <p class="comment-item-date">${COMMON.formatDate("YYYY.MM.DD", item.date)}</p>
        </li>
      `;
    });
    // 设置评论总数
    $commentTotal.text(`(${comments.length})`);
    $commentList.html(htmlText);
  }



  /**
   * 根据是否登陆展示登陆内容
   */
  function initComment() {
    const userInfo = window.userInfo;
    $comment.show();
    if (userInfo.is_login) {
      $commentReply.addClass('z-login');
      // 清空
      $commentInput.val('');
      $commentReply.find('.user-avatar').attr('src', userInfo.avatar);
      $commentReply.find('.user-name').text(userInfo.username);
    } else {
      $commentReply.removeClass('z-login');
    }
  }

  /**
   * 增加评论
   */
  function addComment() {
    const comment = $commentInput.val();
    if (articleId) {
      $.ajax({
        type:'post',
        url:'/api/add_comment',
        data: {
          articleId: articleId,
          comment: comment,
          date: Date.now()
        },
        success: (data) => {
          $commentInput.val('');
          // 获取到数据则渲染内容
          if (data.success) {
            renderComment(data.list);
          } else {
            alert(data.message);
          }
        }
      });
    } 
  }
 
  /**
   * 事件绑定
   */
  function bindEvent() {
    // 点击增加评论
    $('.js-add-comment').on('click', () => {
      if (!window.userInfo.is_login) {
        $(window).trigger('login');
      } else {
        addComment();
      }
    });
    $(window).on('getUserInfo', () => {
      initComment();
    });
  }
  
  /**
   * 页面初始化入口
   */
  function init() {
    initData();
    bindEvent();
  }
  
  init();
});