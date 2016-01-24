module.exports = function (selector, props) {
  var _children = [];
  var _nestedChildren = [];

  var record = {
    selector: selector,
    props: props,
    addChild: function (c, isWrapper) {
      (isWrapper ? _nestedChildren : _children).push(c);
    },
    getChildren: function () {
      return _children;
    },
    getNestedChildren: function () {
      return _nestedChildren;
    }
  };

  return record;
};
