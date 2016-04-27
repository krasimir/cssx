var isEmpty = require('../helpers/isEmpty');
var resolveSelector = require('../helpers/resolveSelector');
var prefix = require('../helpers/prefix');
var isArray = require('../helpers/isArray');

var hasRules = function (rule) {
  var prop;

  for (prop in rule.props) {
    if (rule.props.hasOwnProperty(prop)) {
      return true;
    }
  }
  return false;
};

module.exports = function (topRules, minify, plugins, scope) {
  var scopeTheSelector = function (selector) {
    if (scope === '') return selector;
    if (selector.indexOf(scope) === 0 || selector.indexOf('@') === 0) return selector;
    return scope + ' ' + selector;
  };
  var applyPlugins = function (props) {
    var n;

    for (n = 0; n < plugins.length; n++) {
      props = plugins[n](props);
    }
    return props;
  };
  
  var areThereAnyPlugins = plugins && plugins.length > 0, sel, nestedRules;
  var newLine = minify ? '' : '\n';
  var interval = minify ? '' : ' ';
  var tab = minify ? '' : '  ';

  var process = function (rules, indent) {
    var css = '', r, prop, props;
    var addLine = function (line) {
      css += line + newLine;
    }
    var processRule = function (rule) {
      if (hasRules(rule) || rule.nestedRules !== null) {
        addLine(indent + scopeTheSelector(rule.selector) + interval + '{');
        props = applyPlugins(rule.props);
        for (prop in props) {
          addLine(indent + tab + prop + ':' + interval + props[prop] + ';');
        }
        if (rule.nestedRules !== null) {
          addLine(indent + process(rule.nestedRules, indent + tab));
        }
        addLine(indent + '}');
      }
    }

    indent = minify ? indent : '';

    if (isArray(rules)) {
      rules.forEach(processRule);
    } else {
      for (r in rules) {
        processRule(rules[r]);
      }
    };

    return css;
  }
  return process(topRules, '');
};
