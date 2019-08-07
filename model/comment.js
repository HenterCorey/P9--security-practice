/**
* 评论模块
*/

const router = require('koa-router')();
// 文章评论信息
let comments = require('./comments-data');

/**
 * 评论处理 Model
 */
const ComentModel = {
  addComments: (articleId, data) => {
    articleComments = comments[articleId] || [];
    articleComments.push(data);
  },
  getCommentById: (articleId) => {
    // console.log(articleId, comments[articleId])
    return comments[articleId] || [];
  }
}

module.exports = ComentModel;
