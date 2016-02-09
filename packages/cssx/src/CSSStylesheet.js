var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var nextTick = require('./helpers/nextTick');
var resolveSelector = require('./helpers/resolveSelector');
var generate = require('./core/generate');
var warning = require('./helpers/warning');

var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function (id) {
  var _id = id || getId();
  var _api = {};
  var _rules = [];
  var _remove = null;
  var _css = '';

  var ruleExists = function (selector, parent) {
    var i, rule, areParentsMatching, areThereNoParents;

    for (i = 0; i < _rules.length; i++) {
      rule = _rules[i];
      areParentsMatching = (rule.parent && typeof parent !== 'undefined' && parent.selector === rule.parent.selector);
      areThereNoParents = !rule.parent && !parent;
      if (resolveSelector(rule.selector) === resolveSelector(selector) && (areParentsMatching || areThereNoParents)) {
        return rule;
      }
    }
    return false;
  };
  var getRuleBySelector = function (selector, rules) {
    var i;

    for (i = 0; i < rules.length; i++) {
      if (resolveSelector(rules[i].selector) === selector) {
        return rules[i];
      }
    }
    warning('No rule matching "' + selector + '" selector.');
  };

  _api.id = function () {
    return _id;
  };
  _api.add = function (selector, props, parent, isWrapper) {
    var rule, r = ruleExists(selector, parent);

    if (r !== false) {
      rule = r.update(false, props);
    } else {
      rule = CSSRule(selector, props, _api);
      _rules.push(rule);
      if (parent) {
        rule.parent = parent;
        parent.addChild(rule, isWrapper);
      }
    }
    this.compile();
    return rule;
  };
  _api.rules = function () {
    return _rules;
  };
  _api.compile = function () {
    if (module.exports.useNextTick) {
      nextTick(function () {
        _api.compileImmediate();
      }, _id);
      return _api;
    }
    return _api.compileImmediate();
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
  _api.destroy = function () {
    return _api.clear();
  };
  _api.getCSS = function () {
    this.compileImmediate();
    return _css;
  };
  _api.update = function () {
    var args = Array.prototype.slice.call(arguments);
    var value = args.pop();
    var prop = args.pop();
    var rule;

    while (args.length > 0) {
      rule = getRuleBySelector(args.shift(), rule ? rule.getNestedChildren() : _rules);
      if (!rule) {
        break;
      }
    };

    if (rule) {
      rule.updateProp(prop, value);
    }
  };

  return _api;
};

module.exports.disableDOMChanges = false;
module.exports.minify = true;
module.exports.useNextTick = true;
