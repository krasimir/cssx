var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var nextTick = require('./helpers/nextTick');
var resolveSelector = require('./helpers/resolveSelector');
var generate = require('./core/generate');
var warning = require('./helpers/warning');
var isArray = require('./helpers/isArray');

var graphRulePropName = '__$__cssx_rule';
var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function (id, plugins) {
  var _id = id || getId();
  var _api = {};
  var _rules = [];
  var _customProperties = {};
  var _remove = null;
  var _css = '';
  var _graph = {};
  var _queries = {};
  var _scope = '';

  var ruleExists = function (rules, selector, parent) {
    return rules.reduce(function (result, rule) {
      if (result !== false) return result;
      if (rule.selector === selector) {
        if (parent) {
          return parent.id === rule.parent.id ? rule : false;
        } else {
          return rule;
        }
      }
      return false;
    }, false);
  };
  var registerRule = function (rule, addAt) {
    var tmp;

    if (typeof addAt !== 'undefined') {
      _rules.splice(addAt, 0, rule);
    } else {
      _rules.push(rule);
    }
    rule.index = _rules.length - 1;
  };

  _api.id = function () {
    return _id;
  };
  _api.add = _api.update = function (rawRules, parent, addAt) {
    var rule, prop, tmpRawRules, cssProps, props, nestedRules;
    var created = [];

    if (typeof rawRules === 'function') {
      rawRules = rawRules();
    }

    for (selector in rawRules) {
      rule = ruleExists(_rules, selector, parent);
      cssProps = {};
      props = {};
      nestedRules = [];

      // new rule
      if (!rule) {
        rule = CSSRule(selector, cssProps);

        props = rawRules[selector];
        for (prop in props) {
          if (typeof props[prop] !== 'object') {
            cssProps[prop] = props[prop];
          } else {
            tmpRawRules = {};
            tmpRawRules[prop] = props[prop];
            nestedRules.push(tmpRawRules);
          }
        }  

        rule.stylesheet = _api;
        if (!parent) {
          registerRule(rule, addAt);
        } else {
          parent.registerNested(rule);
        }
        nestedRules.forEach(function (rawRulesNested) {
          _api.add(rawRulesNested, rule);
        });

      // existing rule
      } else {
        rule.update(rawRules[selector]);
      }

      this.compile();
      created.push(rule);
    }

    return created.length === 1 ? created[0] : created;
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
    _css = generate(_rules, module.exports.minify, plugins, _scope);
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
  _api.query = function (selector) {
    var rule;

    selector = resolveSelector(selector);

    if (_queries[selector]) return _queries[selector];
    (function find(node) {
      var sel;

      if (!rule) {
        for (sel in node) {
          if (sel === selector && sel !== graphRulePropName) {
            rule = node[selector][graphRulePropName];
            break;
          } else {
            if (typeof node[sel][graphRulePropName] !== 'undefined') {
              find(node[sel]);
            }
          }
        }
      }
    })(_graph);

    if (rule) {
      _queries[selector] = rule;
    }

    return rule;
  };
  _api.graph = function () {
    return _graph;
  };
  _api.define = function (prop, func) {
    _customProperties[prop] = func;
  };
  _api.scope = function (scope) {
    _scope = scope;
  };
  _api._getCustomProps = function () {
    return _customProperties;
  };

  return _api;
};

module.exports.disableDOMChanges = false;
module.exports.minify = true;
module.exports.useNextTick = true;
