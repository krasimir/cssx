sheet.define('text', function (value) {
  var parts = value.split(/, ?/);
  return (function () {
    var _3 = {};
    _3['line-height'] = parts[1] + "em";
    _3['font-size'] = parts[0] + "em";
    return _3;
  }.apply(this));
});