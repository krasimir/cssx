var a = (function () {
  var _7 = {};
  _7['margin'] = '6px';
  var _6 = {};
  _6['font-size'] = '20px';
  _6['padding'] = '0';
  _6['margin'] = '0';

  var _5 = cssx.s('_5');

  _5.add('body', _6);

  var _8 = _5.add('@media screen and (max-width: 200px)');

  _8.n('body', _7);

  return _5;
}).apply(this);;