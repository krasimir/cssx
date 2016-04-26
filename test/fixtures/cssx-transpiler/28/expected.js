var animName = 'my-animation';
var a = (function () {
  var _1 = {},
      _2 = {},
      _3 = {},
      _4 = {};
  _2['opacity'] = '0';
  _3['opacity'] = '1';
  _4['from'] = _2;
  _4['to'] = _3;
  _1["@keyframes " + animName] = _4;
  return _1;
}.apply(this));