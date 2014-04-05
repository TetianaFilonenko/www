/**
 * @jsx React.DOM
 */

"use strict";

var _ = require("underscore");
var React = require("react/addons");
var Authors = require("../data.js").Authors;
var Spinner = require("../components/Spinner.js");
var DefaultLayout = require("../layouts/DefaultLayout.js");

var AuthorPage = React.createClass({
  getInitialState: function () {
    return {
      author: false,
      loading: true
    };
  },
  componentWillMount: function () {
    var _this = this;
    var author = _.findWhere(Authors, {id: this.props.authorId});

    setTimeout(function() {
      _this.setState({author: author, loading: false});
    }, 500);
  },
  /*jshint ignore:start */
  render: function () {
    var state = this.state;
    var author = state.author;
    var content;

    if (state.loading) {
      content = <Spinner />
    } else if (author) {
      content = (
        <div>
          <h1 className="h1">{author.name}</h1>
        </div>
      );
    } else {
      content = <h1>Author not found</h1>
    }

    return (
      <DefaultLayout id="AuthorPage">
        {content}
      </DefaultLayout>
    );
  }
  /*jshint ignore:end */
});

module.exports = AuthorPage;