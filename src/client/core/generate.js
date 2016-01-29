var isEmpty = require('../helpers/isEmpty');

module.exports = function (rules, minify) {
  var processed = {};

  return (function generate(rules, parent, minify, nesting) {
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
      selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
      props = typeof rule.props === 'function' ? rule.props() : rule.props;
      if ((!isEmpty(props) || nestedChildren.length > 0) && !processed[rule.id()]) {
        processed[rule.id()] = true;
        css += nesting + selector + interval + '{' + newLine;
        if (props) {
          for (prop in props) {
            cssValue = typeof props[prop] === 'function' ? props[prop]() : props[prop];
            css += tab + prop + ':' + interval + cssValue + ';' + newLine;
          }
        }
        for (j = 0; j < nestedChildren.length; j++) {
          css += generate([nestedChildren[j]], null, minify, tab);
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
