var minWidth = 1024;

var a = (function () {
  var _3 = {};
  _3['width'] = '200px';
  var _2 = {};
  _2['width'] = '100px';
  var _1 = {};
  _1['button'] = _2;
  var _5 = {};
  _1["@media (min-width: " + minWidth + "px)"] = _5;
  _5['button'] = _3;
  return _1;
}.apply(this));