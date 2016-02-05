module.exports = function (cssx) {
  var value = function () {
    return '20px';
  }

  cssx.add('a', { b: value });
};