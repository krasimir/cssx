module.exports = function (selector, props, children) {
  var _children = children || [];

  var record = {
    selector: selector,
    props: props,
    addChild: function (c) {
      _children.push(c);
    },
    getChildren: function () {
      return _children;
    }
  };

  return record;
};
