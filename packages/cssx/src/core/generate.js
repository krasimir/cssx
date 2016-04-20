var isEmpty = require('../helpers/isEmpty');
var resolveSelector = require('../helpers/resolveSelector');
var prefix = require('../helpers/prefix');
var applyPlugins, areThereAnyPlugins = false, n;

module.exports = function (rules, minify, plugins, scope) {

  var scopeTheSelector = function (selector) {
    if (scope === '') return selector;
    if (selector.indexOf(scope) === 0 || selector.indexOf('@') === 0) return selector;
    return scope + ' ' + selector;
  };

  // duplicate those that need prefixing
  rules = prefix.selector(rules);

  areThereAnyPlugins = plugins && plugins.length > 0;
  applyPlugins = function (props) {
    for (n = 0; n < plugins.length; n++) {
      props = plugins[n](props);
    }
    return props;
  };

  return (function generate(rules, parent, minify, nesting, nested) {
    var i, j, rule, props, propsFinal, prop, children, nestedChildren, selector, tab;
    var css = '';
    var newLine = minify ? '' : '\n';
    var interval = minify ? '' : ' ';

    nesting = typeof nesting !== 'undefined' ? nesting : '';
    tab = minify ? '' : nesting + '  ';
    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      children = rule.getChildren();
      nestedChildren = rule.getNestedChildren();
      selector = (parent ? parent + ' ' : '');
      selector += resolveSelector(rule.selector);
      selector = scopeTheSelector(selector);
      props = typeof rule.props === 'function' ? rule.props() : rule.props;
      if (!isEmpty(props) || nestedChildren.length > 0) {
        css += nesting + selector + interval + '{' + newLine;
        props = prefix.property(props);
        if (props) {
          propsFinal = {};
          for (prop in props) {
            propsFinal[prop] = typeof props[prop] === 'function' ? props[prop]() : props[prop];
          }
          propsFinal = areThereAnyPlugins ? applyPlugins(propsFinal) : propsFinal;
          for (prop in propsFinal) {
            css += tab + prop + ':' + interval + propsFinal[prop] + ';' + newLine;
          }
        }
        for (j = 0; j < nestedChildren.length; j++) {
          css += generate([nestedChildren[j]], null, minify, tab, true);
        }
        css += nesting + '}' + newLine;
      }
      if (children.length > 0) {
        css += generate(children, selector, minify);
      }
    };
    return css;
  })(rules, null, minify);
};
