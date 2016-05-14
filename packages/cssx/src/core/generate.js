var isEmpty = require('../helpers/isEmpty');
var isArray = require('../helpers/isArray');

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

  var newLine = minify ? '' : '\n';
  var interval = minify ? '' : ' ';
  var tab = minify ? '' : '  ';

  var process = function (rules, indent) {
    var css = '', r, prop, props, value;
    var addLine = function (line, noNewLine) {
      css += line + (noNewLine ? '' : newLine);
    };
    var processRule = function (rule) {
      // console.log(rule);
      if (!isEmpty(rule.props) || rule.nestedRules !== null) {
        addLine(indent + scopeTheSelector(rule.selector) + interval + '{');
        props = applyPlugins(rule.props);
        for (prop in props) {
          value = typeof props[prop] === 'function' ? props[prop]() : props[prop];
          if (isArray(value)) {
            value.forEach(function (v) {
              addLine(indent + tab + prop + ':' + interval + v + ';');
            });
          } else {
            addLine(indent + tab + prop + ':' + interval + value + ';');
          }
        }
        if (rule.nestedRules) {
          addLine(process(rule.nestedRules, indent + tab), true);
        }
        addLine(indent + '}');
      }
    };

    indent = minify ? '' : indent;
    if (isArray(rules)) {
      rules.forEach(processRule);
    } else {
      for (r in rules) {
        if (isArray(rules[r])) {
          rules[r].forEach(processRule);
        } else {
          processRule(rules[r]);
        }
      }
    };

    return css;
  };

  return process(topRules, '');
};
