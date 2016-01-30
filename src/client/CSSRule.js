var ids = 0;
var getId = function () { return 'r' + (++ids); };

module.exports = function (selector, props, stylesheet) {
  var _id = getId();
  var _children = [];
  var _nestedChildren = [];

  var record = {
    selector: selector,
    props: props,
    addChild: function (c, isWrapper) {
      (isWrapper ? _nestedChildren : _children).push(c);
      return this;
    },
    getChildren: function () {
      return _children;
    },
    getNestedChildren: function () {
      return _nestedChildren;
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
      if (!s) this.selector = s;
      if (!p) this.props = p;
      stylesheet.compile();
      return this;
    },
    id: function () {
      return _id;
    }
  };

  return record;
};
