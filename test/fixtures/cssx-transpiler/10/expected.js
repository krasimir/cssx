(function () {
  var _9 = {};
  _9['b'] = '2';
  var _8 = {};
  _8['a'] = '1';
  var _7 = {};
  _7['transform'] = 'translateX(0)';
  var _6 = {};
  _6['transform'] = 'translateX(4px) rotateY(1deg)';
  var _5 = {};
  _5['transform'] = 'translateX(-10px) rotateY(-2deg)';
  var _4 = {};
  _4['transform'] = 'translateX(20px) rotateY(4deg)';
  var _3 = {};
  _3['transform'] = 'translateX(-40px) rotateY(-5deg)';
  var _2 = {};
  _2['transform'] = 'translateX(0)';

  var _1 = cssx('_1');

  var _10 = _1.add('@keyframes shake');

  _10.n('0%', _2);

  _10.n('12.5%', _3);

  _10.n('37.5%', _4);

  _10.n('62.5%', _5);

  _10.n('87.5%', _6);

  _10.n('100%', _7);

  _10.n('from', _8);

  _10.n('to', _9);

  return _1;
}.apply(this))