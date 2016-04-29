module.exports = function (cssx) {
  var getSelector = function () {
    return 'omg';
  };
  (function () {
    var s = {};
    s[getSelector()] = { margin: '10px'};
    cssx.add(s);
  }).apply(this);
};