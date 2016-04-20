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
  var getOnlyTopRules = function () {
    return _rules.filter(function (rule) {
      return rule.parent === null;
    });
  };
  var buildGraph = function () {
    _graph = {};
    (function loop(rules, parent, obj) {
      if (!rules) return;
      rules.forEach(function (rule) {
        var selector = parent ? parent + ' ' : '';

        selector += resolveSelector(rule.selector);
        obj[selector] = {};
        obj[selector][graphRulePropName] = rule;
        loop(rule.getChildren(), selector, obj[selector]);
        loop(rule.getNestedChildren(), selector, obj[selector]);
      });
    })(getOnlyTopRules(), false, _graph);
    return _graph;
  };

  _api.id = function () {
    return _id;
  };
  _api.add = function (selector, props, parent, isWrapper) {
    var rule, r, s, scope;

    if (arguments.length === 1 && typeof selector === 'object') {
      if (isArray(selector)) {
        selector.forEach(function (sel) {
          if (isArray(sel)) {
            _api.add(sel[0], sel[1]);
          } else {
            // nested
            for (s in sel) {
              scope = _api.add(s);
              sel[s].forEach(function (nestedStyles) {
                scope.n(nestedStyles[0], nestedStyles[1]);
              });
            }
          }
        });
      } else {
        for (s in selector) {
          _api.add(s, selector[s]);
        }
      }
      return _api;
    }

    r = ruleExists(selector, parent);

    if (r) {
      rule = r.update(false, props);
    } else {
      rule = CSSRule(selector, props, _api);
      _rules.push(rule);
      if (parent) {
        rule.parent = parent;
        parent.addChild(rule, isWrapper);
      }
      buildGraph();
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
    _css = generate(getOnlyTopRules(), module.exports.minify, plugins, _scope);
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
  _api.update = function (selector, props) {
    var rule, s;

    if (arguments.length === 1 && typeof selector === 'object') {
      for (s in selector) {
        _api.update(s, selector[s]);
      }
      return _api;
    }

    rule = this.query(selector);

    if (!rule) {
      warning('There is no rule matching "' + selector + '"');
    } else {
      rule.update(null, props);
    }
    return rule;
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
