var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var isArray = require('./helpers/isArray');
var isEmpty = require('./helpers/isEmpty');

var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function () {
  var _id = getId();
  var _api = {};
  var _rules = [];
  var _remove = null;

  _api.id = function () {
    return _id;
  };
  _api.add = function (parent, selector, props) {
    var rule, i, args = Array.prototype.slice.call(arguments);

    if (arguments.length <= 2) {
      selector = args[0];
      props = args[1];
      parent = null;
    }

    rule = CSSRule(selector, props);

    if (parent !== null) {
      parent.addChild(rule);
    } else {
      _rules.push(rule);
    }
    return {
      add: function (selector, props) {
        var result = [];

        if (isArray(selector)) {
          for (i = 0; i < selector.length; i++) {
            result.push(this.add(selector[i], props));
          }
          return result;
        }
        return _api.add(rule, selector, props);
      }
    };
  };
  _api.rules = function () {
    return _rules;
  };
  _api.build = function (rs, parent) {
    var i, rule, prop, children, selector, firstRun = typeof rs === 'undefined';
    var rules = firstRun ? _rules : rs;
    var css = '';

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      children = rule.getChildren();
      selector = (parent ? parent + ' ' : '') + rule.selector;
      if (!isEmpty(rule.props)) {
        css += selector + '{';
        if (rule.props) {
          for (prop in rule.props) {
            css += prop + ':' + rule.props[prop] + ';';
          }
        }
        css += '}';
      }
      if (children.length > 0) {
        css += _api.build(children, selector);
      }
    };
    if (firstRun) {
      _remove = applyToDOM(css, _id);
    }
    return css;
  };
  _api.clear = function () {
    _rules = [];
    if (_remove !== null) _remove();
    return _api;
  };

  return _api;
};
