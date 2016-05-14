var CSSRule = require('./CSSRule');
var applyToDOM = require('./helpers/applyToDOM');
var nextTick = require('./helpers/nextTick');
var generate = require('./core/generate');
var isArray = require('./helpers/isArray');

var ids = 0;
var getId = function () { return 'x' + (++ids); };

module.exports = function (id, plugins) {
  var _id = id || getId();
  var _api = {};
  var _rules = [];
  var _customProperties = {};
  var _remove = null;
  var _css = '';
  var _scope = '';

  var ruleExists = function (rules, selector, parent) {
    return rules.reduce(function (result, rule) {
      if (result !== false) return result;
      if (rule.selector === selector) {
        if (parent) {
          return rule.parent && parent.selector === rule.parent.selector ? rule : false;
        }
        return rule;
      }
      return false;
    }, false);
  };
  var registerRule = function (rule, addAt) {
    if (typeof addAt !== 'undefined') {
      _rules.splice(addAt, 0, rule);
    } else {
      _rules.push(rule);
    }
    rule.index = _rules.length - 1;
  };
  var isNested = function (obj) {
    if (typeof obj !== 'object') {
      return true;
    } else if (isArray(obj)) {
      return typeof obj[0] === 'string';
    }
    return false;
  };

  _api.id = function () {
    return _id;
  };
  _api.add = _api.update = function (rawRules, parent, addAt, considerAsNew) {
    var rule, prop, tmpRawRules, cssProps, props, nestedRules, selector, tmp;
    var created = [];

    if (typeof rawRules === 'string') {
      tmp = {};
      tmp[rawRules] = {};
      rawRules = tmp;
    }

    if (typeof rawRules === 'function') {
      rawRules = rawRules();
    }

    for (selector in rawRules) {
      if (isArray(rawRules[selector])) {
        rawRules[selector].forEach(function (r) {
          tmp = {};
          tmp[selector] = r;
          _api.add(tmp, parent, undefined, true);
        });
      } else {
        rule = ruleExists(_rules, selector, parent);
        cssProps = {};
        props = {};
        nestedRules = [];

        // new rule
        if (considerAsNew || !rule) {
          props = rawRules[selector];
          for (prop in props) {
            if (isNested(props[prop])) {
              cssProps[prop] = props[prop];
            } else {
              tmpRawRules = {};
              tmpRawRules[prop] = props[prop];
              nestedRules.push(tmpRawRules);
            }
          }

          rule = CSSRule(selector, this.resolveCustomProps(cssProps), _api);

          if (!parent) {
            registerRule(rule, addAt);
          } else {
            rule.parent = parent;
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
  _api.define = function (prop, func) {
    _customProperties[prop] = func;
  };
  _api.scope = function (scope) {
    _scope = scope;
  };
  _api._getCustomProps = function () {
    return _customProperties;
  };
  _api.resolveCustomProps = function (actual) {
    var result = actual, prop, newProp, value;
    var custom = _customProperties;

    for (prop in custom) {
      if (typeof actual[prop] !== 'undefined') {
        value = custom[prop](actual[prop]);
        delete actual[prop];
        for (newProp in value) {
          actual[newProp] = value[newProp];
        }
      }
    }
    return result;
  };

  return _api;
};

module.exports.disableDOMChanges = false;
module.exports.minify = true;
module.exports.useNextTick = true;
