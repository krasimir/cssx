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

  var toDOM = function (css) {
    return applyToDOM(css, _id);
  };
  var generate = function (rs, parent) {
    var i, rule, props, prop, children, selector, firstRun = typeof rs === 'undefined';
    var rules = firstRun ? _rules : rs;
    var css = '';

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      children = rule.getChildren();
      selector = (parent ? parent + ' ' : '');
      selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
      props = typeof rule.props === 'function' ? rule.props() : rule.props;
      if (!isEmpty(props)) {
        css += selector + '{';
        if (props) {
          for (prop in props) {
            css += prop + ':' + props[prop] + ';';
          }
        }
        css += '}';
      }
      if (children.length > 0) {
        css += generate(children, selector);
      }
    };
    return css;
  };

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
  _api.compile = function (noDOM) {
    var css = generate();

    if (!noDOM) {
      _remove = toDOM(css);
    }
    return css;
  };
  _api.clear = function () {
    _rules = [];
    if (_remove !== null) {
      _remove();
      _remove = null;
    }
    return _api;
  };

  return _api;
};
