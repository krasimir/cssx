var isEmpty = require('../helpers/isEmpty');
var resolveSelector = require('../helpers/resolveSelector');
var prefix = require('../helpers/prefix');

module.exports = function (rules, minify) {

  // at the top level, use only those which has no parent
  rules = rules.filter(function (rule) {
    return rule.parent === null;
  });

  // duplicate those that need prefixing
  rules = prefix.selector(rules);

  return (function generate(rules, parent, minify, nesting, nested) {
    var i, j, rule, props, prop, children, nestedChildren, selector, cssValue, tab;
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
      props = typeof rule.props === 'function' ? rule.props() : rule.props;
      if (!isEmpty(props) || nestedChildren.length > 0) {
        css += nesting + selector + interval + '{' + newLine;
        props = prefix.property(props);
        if (props) {
          for (prop in props) {
            cssValue = typeof props[prop] === 'function' ? props[prop]() : props[prop];
            css += tab + prop + ':' + interval + cssValue + ';' + newLine;
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
