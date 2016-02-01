var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var nextTick = require('./helpers/nextTick');
var generate = require('./core/generate');

var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function () {
  var _id = getId();
  var _api = {};
  var _rules = [];
  var _remove = null;
  var _css = '';

  _api.id = function () {
    return _id;
  };
  _api.add = function (selector, props, parent, isWrapper) {
    var rule = CSSRule(selector, props, _api);

    _rules.push(rule);
    if (parent) {
      parent.addChild(rule, isWrapper);
    }
    this.compile();
    return rule;
  };
  _api.rules = function () {
    return _rules;
  };
  _api.compile = function () {
    nextTick(function () {
      _api.compileImmediate();
    }, _id);
    return _api;
  };
  _api.compileImmediate = function () {
    _css = generate(_rules, module.exports.minify);
    if (!module.exports.disableDOMChanges) {
      _remove = applyToDOM(_css, _id);
    }
    return _api;
  };
  _api.clear = function () {
    _rules = [];
    _css = '';
    if (_remove !== null) {
      _remove();
      _remove = null;
    }
    return _api;
  };
  _api.getCSS = function () {
    return _css;
  };

  return _api;
};

module.exports.disableDOMChanges = false;
module.exports.minify = true;
