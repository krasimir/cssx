(function () {
  var _8 = {};
  _8['background'] = 'url("../public/bg.jpg") no-repeat';
  _8['text-decoration'] = 'none';
  var _5 = {};
  _5['color'] = '#000';
  _5['text-decoration'] = 'underline';
  var _4 = {};
  _4['font-size'] = '0.8em';
  var _3 = {};
  _3['font-size'] = '.2em';
  var _2 = {};
  _2['clear'] = 'both';
  _2['display'] = 'table';
  _2['content'] = '" "';

  var _1 = cssx('_1');

  _1.add('section::after', _2);

  _1.add('section small', _3);

  var _6 = _1.add('@media screen and (max-width: 1000px)');

  _6.n('p', _4);

  _6.n('p > a', _5);

  _1.add('section p > a', _8);

  return _1;
}.apply(this))
;