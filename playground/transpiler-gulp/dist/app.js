var a = (function () {
  var _3 = {};
  _3['margin'] = '6px';
  var _2 = {};
  _2['font-size'] = '20px';
  _2['padding'] = '0';
  _2['margin'] = '0';

  var _1 = cssx('_1');

  _1.add('body', _2);

  var _4 = _1.add('@media screen and (max-width: 200px)');

  _4.n('body', _3);

  return _1;
}).apply(this);;