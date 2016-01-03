function rule (selector, props, children) {
  if (children) {
    if (Array !== children.constructor) children = [children];
  } else {
    children = [];
  }

  return {
    _ownSelector: selector,
    selector: selector,
    props: props,
    children: children,    
    setProperSelectors: function (s) {
      var self = this;
      !!s ? self.selector = s + ' ' + self._ownSelector : null;
      self.children.forEach(function (c) {
        c.setProperSelectors(self.selector);
      });
    }
  };
};

function generate (rule) {
  rule.setProperSelectors();
  return (function rulesToCSS(r) {
    var result = '', key, skip = isEmpty(r.props);

    if (!skip) {
      result += r.selector + '{';
      for (key in r.props) {
        result += key + ':' + r.props[key] + ';';
      }
      result += '}';
    }
    r.children.forEach(function (c) {
      result += rulesToCSS(c);
    });
    return result;
  })(rule);
};

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

module.exports = {
  rule: rule,
  generate: generate
};
