var sheet = cssx();

(function () {
  var _1 = {},
      _2 = {},
      _3 = {};
  _2['color'] = '#000';
  _3['color'] = '#F00';
  _1['body'] = _2;
  _1['body.error'] = _3;
  return _1;
}.apply(this))
;

sheet.add((function () {
  var _5 = {},
      _6 = {},
      _7 = {};
  _6['font-size'] = '10px';
  _6['line-height'] = '12px';
  _7['margin'] = 0;
  _7['padding'] = '2em';
  _5['p'] = _6;
  _5['ul > foo'] = _7;
  return _5;
}.apply(this)));

var test = (function () {
  var _9 = {};
  _9['border'] = 'solid 1px #000';
  _9['background'] = '#F00';
  return _9;
}.apply(this));