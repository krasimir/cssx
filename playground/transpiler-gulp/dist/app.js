var css = (function () {
  var _3 = {};
  _3['margin'] = '6px';
  var _2 = {};
  _2['font-size'] = '20px';
  _2['padding'] = '0';
  _2['margin'] = '0';
  var _1 = [];

  _1.push(['body', _2]);

  var _4 = {},
      _5 = [];
  _4['@media screen and (max-width: 200px)'] = _5;

  _5.push(['body', _3]);

  _1.push(_4);

  return _1;
}.apply(this));

var sheet = cssx();
sheet.add(css);