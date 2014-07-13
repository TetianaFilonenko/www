/** @jsx m */

"use strict";
require("./Modal.scss");

var _ = require("underscore");
var m = require("mithril");
var cx = require("../utils/ClassSet.js");

var Modal = {};

Modal.instances = {};

Modal.controller = function(options) {
  options = options || {};

  this.open = m.prop(false);
  this.className = options.className || "";

  var _this = this;
  this.toggle = function(e) {
    _this.open(!_this.open());
  };

  this.close = function() {
    _this.open(false);
  };

  this.id = _.uniqueId();
  Modal.instances[this.id] = this;
  this.onunload = function() {
    delete Modal.instances[_this.id];
  };

  this.config = function(el, isInitialized) {
    _this.el = el;
  };
};

Modal.view = function(ctrl, content, label, footer) {
  if (ctrl.open()) {
    return (
      <div className={"Modal " + ctrl.className} config={ctrl.config}>
        <table>
          <thead><tr><th>
            <table><tbody><tr>
              <td className="heading">
                <h1>{label}</h1>
              </td>
              <td><button className="btn xClose" onclick={ctrl.toggle}><span className="icon icon_close"/></button></td>
            </tr></tbody></table>
          </th></tr></thead>
          <tbody><tr><td>{content}
          </td></tr></tbody>
          <tfoot><tr><td>Footer</td></tr></tfoot>
        </table>
      </div>
    );
  }
};

var oldMouseDown = document.onmousedown;
document.onmousedown = function(e) {
  var node = e.target;
  var parentNodes = [node];
  while (node.parentNode) {
    node = node.parentNode;
    parentNodes.push(node);
  }

  _.each(Modal.instances, function(modal) {
    if (modal.open() && !_.contains(parentNodes, modal.el)) {
      modal.close();
    }
  });
  if (_.isFunction(oldMouseDown)) {
    oldMouseDown(e);
  }
  m.redraw();
};

module.exports = Modal;
