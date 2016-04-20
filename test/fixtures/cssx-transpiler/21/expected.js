var sheet = cssx();

(function () {
  var _3 = {};
  _3['color'] = '#F00';
  var _2 = {};
  _2['color'] = '#000';

  var _1 = cssx('_1');

  _1.add('body', _2);

  _1.add('body.error', _3);

  return _1;
}.apply(this))
;

sheet.add((function () {
  var _7 = {};
  _7['padding'] = '2em';
  _7['margin'] = '0';
  var _6 = {};
  _6['line-height'] = '12px';
  _6['font-size'] = '10px';
  var _5 = [];

  _5.push(['p', _6]);

  _5.push(['ul > foo', _7]);

  return _5;
}.apply(this)));

var test = (function () {
  var _9 = {};
  _9['background'] = '#F00';
  _9['border'] = 'solid 1px #000';
  return _9;
}.apply(this));