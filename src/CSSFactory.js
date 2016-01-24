var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var isObject = require('./helpers/isObject');
var generate = require('./core/generate');

var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function () {
  var _id = getId();
  var _api = {};
  var _rules = [];
  var _remove = null;

  var register = function (parent, selector, props) {
    var rule;

    rule = CSSRule(selector, props);

    if (parent !== null) {
      parent.addChild(rule);
    } else {
      _rules.push(rule);
    }
    return {
      add: function (selector, props) {
        var result = [], sel;

        if (isObject(selector)) {
          for (sel in selector) {
            result.push(register(rule, sel, selector[sel]));
          }
          return result;
        }
        return register(rule, selector, props);
      }
    };
  };

  _api.id = function () {
    return _id;
  };
  _api.add = function (selector, props) {
    var result = [], sel;

    if (isObject(selector)) {
      for (sel in selector) {
        result.push(register(sel, selector[sel]));
      }
      return result;
    }
    return register(null, selector, props);
  };
  _api.rules = function () {
    return _rules;
  };
  _api.compile = function (noDOM) {
    var css = generate(_rules);

    if (!noDOM) {
      _remove = applyToDOM(css, _id);
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
