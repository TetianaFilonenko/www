"use strict";

var _ = require("underscore");
var Cortex = require("cortexjs");

var defaults = {
  "email": "stephen@curatescience.org",
  "first_name": "Stephen",
  "middle_name": "",
  "last_name": "Demjanenko",
  "articles": [],
  "comments": []
};

var UserModel = function(data, options) {
  data = _.defaults(data, defaults);
  options = options || {};
  this.cortex = new Cortex(data, options.callback);
};

UserModel.prototype.logout = function(callback) {
  var _this = this;
  setTimeout(function() {
    CS.user = null;
    _this.cortex.set({loading: true});
    if (_.isFunction(callback)) {
      callback();
    }
  }, 1000);
};

module.exports = UserModel;