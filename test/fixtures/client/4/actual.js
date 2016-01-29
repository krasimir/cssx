module.exports = function (cssx) {
  var selector = function () {
    return '.something' + ' ' + '.else';
  };
  var props = function (value) {
    return { p: value };
  };

  cssx.add(selector, props(1)).descendant(selector, props(2));
};