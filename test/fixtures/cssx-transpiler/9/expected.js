var pseudoClass = 'after';
var sectionSmallSize = function () {
  return 0.2;
};
var pInMedia = function () {
  return 0.8 + 'em';
};
var getSomeProp = function () {
  return ['text-decoration'];
};
var data = {
  prop: 'background',
  sel: ['section', 'p > a']
};
var image = 'bg.jpg';

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
  _3['font-size'] = sectionSmallSize() + "em";
  _4['font-size'] = pInMedia;
  _5[getSomeProp()[0]] = 'underline';
  _5['color'] = '#000';
  _6['p'] = _4;
  _6['p > a'] = _5;
  _7['text-decoration'] = 'none';
  _7[data.prop] = "url(\"../public/" + image + ".jpg\") no-repeat";
  _1["section::" + pseudoClass] = _2;
  _1['section small'] = _3;
  _1['@media screen and (max-width: 1000px)'] = _6;
  _1[data.sel.join(', ')] = _7;
  return _1;
}.apply(this))
;