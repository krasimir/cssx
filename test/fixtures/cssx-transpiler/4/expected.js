(function () {
  var _1 = {},
      _2 = {},
      _3 = {},
      _4 = {},
      _5 = {},
      _6 = {},
      _7 = {};
  _2['content'] = '" "';
  _2['display'] = 'table';
  _2['clear'] = 'both';
  _3['font-size'] = '.2em';
  _4['font-size'] = '0.8em';
  _5['text-decoration'] = 'underline';
  _5['color'] = '#000';
  _6['p'] = _4;
  _6['p > a'] = _5;
  _7['text-decoration'] = 'none';
  _7['background'] = 'url("../public/bg.jpg") no-repeat';
  _1['section::after'] = _2;
  _1['section small'] = _3;
  _1['@media screen and (max-width: 1000px)'] = _6;
  _1['section p > a'] = _7;
  return _1;
}.apply(this))
;