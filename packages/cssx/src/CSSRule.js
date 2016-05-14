var isArray = require('./helpers/isArray');

module.exports = function CSSRule(selector, props, stylesheet) {
  var _api = {
    selector: selector,
    props: props,
    stylesheet: stylesheet,
    index: null,
    nestedRules: null,
    parent: null
  };

  _api.clone = function () {
    var rule = CSSRule(this.selector, this.props, this.stylesheet);

    rule.index = this.index;
    rule.nestedRules = this.nestedRules;
    rule.parent = this.parent;

    return rule;
  };

  _api.descendant = _api.d = function (rawRules) {
    var selector;

    if (typeof rawRules === 'function') rawRules = rawRules();

    for (selector in rawRules) {
      rawRules[_api.selector + ' ' + selector] = rawRules[selector];
      delete rawRules[selector];
    }
    return _api.stylesheet.add(rawRules, this.parent, this.index);
  };
  _api.nested = _api.n = function (rawRules) {
    return _api.stylesheet.add(rawRules, this);
  };
  _api.update = function (props) {
    var prop, areThereNestedRules = this.nestedRules !== null;

    if (typeof props === 'function') {
      props = props();
    }

    props = this.stylesheet.resolveCustomProps(props);

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
  };
  _api.registerNested = function (rule) {
    var nestedRule;

    if (this.nestedRules === null) this.nestedRules = {};

    nestedRule = this.nestedRules[rule.selector];

    if (nestedRule) {
      if (isArray(nestedRule)) {
        nestedRule.push(rule);
      } else {
        this.nestedRules[rule.selector] = [ nestedRule, rule ];
      }
    } else {
      this.nestedRules[rule.selector] = rule;
    }
    return this;
  };

  return _api;
};
