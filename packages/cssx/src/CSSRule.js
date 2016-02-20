var ids = 0;
var getId = function () { return 'r' + (++ids); }, CSSRule;

function resolveCustomProps(actual, custom) {
  var result = actual, prop, newProp, value;

  for (prop in custom) {
    if (typeof actual[prop] !== 'undefined') {
      value = custom[prop](actual[prop]);
      delete actual[prop];
      for (newProp in value) {
        actual[newProp] = value[newProp];
      }
    }
  }
  return result;
};

CSSRule = function (selector, props, stylesheet) {
  var _id = getId();
  var _children = [];
  var _nestedChildren = [];

  var record = {
    selector: selector,
    props: resolveCustomProps(props, stylesheet._getCustomProps()),
    parent: null,
    addChild: function (c, isWrapper) {
      (isWrapper ? _nestedChildren : _children).push(c);
      return this;
    },
    getChildren: function () {
      return _children;
    },
    setChildren: function (c) {
      _children = c;
    },
    getNestedChildren: function () {
      return _nestedChildren;
    },
    setNestedChildren: function (c) {
      _nestedChildren = c;
    },
    descendant: function (s, p) {
      return stylesheet.add(s, p, this, false);
    },
    nested: function (s, p) {
      return stylesheet.add(s, p, this, true);
    },
    d: function (s, p) {
      return this.descendant(s, p);
    },
    n: function (s, p) {
      return this.nested(s, p);
    },
    update: function (s, p) {
      var propName;

      if (arguments.length === 1) {
        p = s;
        s = false;
      }

      if (s) this.selector = s;
      if (p) {
        if (typeof p === 'function') p = p();
        if (!this.props) this.props = {};
        p = resolveCustomProps(p, stylesheet._getCustomProps());
        for (propName in p) {
          this.props[propName] = p[propName];
        }
      }
      stylesheet.compile();
      return this;
    },
    id: function () {
      return _id;
    },
    clone: function () {
      var rule = CSSRule(this.selector, this.props, stylesheet);

      rule.parent = this.parent;
      rule.setChildren(this.getChildren());
      rule.setNestedChildren(this.getNestedChildren());

      return rule;
    }
  };

  return record;
};

module.exports = CSSRule;
