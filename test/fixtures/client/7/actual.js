module.exports = function (cssx) {
  var getSelector = function () {
    return 'omg';
  };
  (function () {
    cssx.add(getSelector, {
      'margin': '10px'
    });
  }).apply(this);
};