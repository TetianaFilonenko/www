/** @jsx m */

"use strict";
require("./CommentBox.scss");

var CommentList = require("./CommentList.js");
var CommentForm = require("./CommentForm.js");

var CommentBox = {};

CommentBox.controller = function(options) {
  this.user = options.user;
  this.comments = options.comments;
  
  this.controllers = {};
  this.controllers.commentForm = new CommentForm.controller({user: this.user, comments: this.comments});
  this.controllers.commentList = new CommentList.controller({user: this.user, comments: this.comments, reply: true});
};

CommentBox.view = function(ctrl) {
  return (
    <div className="CommentBox">
      {new CommentForm.view(ctrl.controllers.commentForm)}
      {new CommentList.view(ctrl.controllers.commentList)}
    </div>
  );
};

module.exports = CommentBox;
