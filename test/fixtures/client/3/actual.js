module.exports = function (cssx) {
  var selector = function () {
    return '.something' + ' ' + '.else';
  };

  cssx.add(selector, { a: 1 }).descendant(selector, { b: 2 });
};