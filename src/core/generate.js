var isEmpty = require('../helpers/isEmpty');

module.exports = function generate(rules, parent) {
  var i, rule, props, prop, children, selector;
  var css = '';

  for (i = 0; i < rules.length; i++) {
    rule = rules[i];
    children = rule.getChildren();
    selector = (parent ? parent + ' ' : '');
    selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
    props = typeof rule.props === 'function' ? rule.props() : rule.props;
    if (!isEmpty(props)) {
      css += selector + '{';
      if (props) {
        for (prop in props) {
          css += prop + ':' + props[prop] + ';';
        }
      }
      css += '}';
    }
    if (children.length > 0) {
      css += generate(children, selector);
    }
  };
  return css;
};
