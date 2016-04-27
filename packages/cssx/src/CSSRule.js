var isArray = require('./helpers/isArray');

module.exports = function CSSRule(selector, props) {
  var _api = {
    index: null,
    stylesheet: null,
    selector: selector,
    props: props,
    nestedRules: null,
    parent: null
  };

  _api.descendant = _api.d = function (rawRules) {
    var selector, tmp, newRule;

    if (typeof rawRules === 'function') rawRules = rawRules();

    for (selector in rawRules) {
      rawRules[_api.selector + ' ' + selector] = rawRules[selector];
      delete rawRules[selector];
    }
    return _api.stylesheet.add(rawRules, this.parent, this.index);
  }
  _api.nested = _api.n = function (rawRules) {
    return _api.stylesheet.add(rawRules, this.parent);
  };
  _api.update = function (props) {
    var prop, selector, areThereNestedRules = this.nestedRules !== null;

    if (typeof props === 'function') {
      props = props();
    }

    for (prop in props) {
      if (typeof props[prop] !== 'object') {
        this.props[prop] = props[prop];
      } else if (areThereNestedRules) {
        if (this.nestedRules[prop]) {
          this.nestedRules[prop].update(props[prop]);
        }
      }
    }
    return this;
  }
  _api.registerNested = function (rule) {
    if (this.nestedRules === null) this.nestedRules = {};
    this.nestedRules[rule.selector] = rule;
    return this;
  }

  return _api;
};
