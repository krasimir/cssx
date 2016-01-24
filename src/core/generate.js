var isEmpty = require('../helpers/isEmpty');

module.exports = function generate(rules, parent) {
  var i, j, rule, props, prop, children, nestedChildren, selector;
  var css = '';

  for (i = 0; i < rules.length; i++) {
    rule = rules[i];
    children = rule.getChildren();
    nestedChildren = rule.getNestedChildren();
    selector = (parent ? parent + ' ' : '');
    selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
    props = typeof rule.props === 'function' ? rule.props() : rule.props;
    if (!isEmpty(props) || nestedChildren.length > 0) {
      css += selector + '{';
      if (props) {
        for (prop in props) {
          css += prop + ':' + props[prop] + ';';
        }
      }
      for(j = 0; j < nestedChildren.length; j++) {        
        css += generate([nestedChildren[j]]);
      }
      css += '}';
    }
    if (children.length > 0) {
      css += generate(children, selector);
    }
  };
  return css;
};
