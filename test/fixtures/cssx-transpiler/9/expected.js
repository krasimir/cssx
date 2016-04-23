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
  var _8 = {};
  _8[data.prop] = "url(\"../public/" + image + ".jpg\") no-repeat";
  _8['text-decoration'] = 'none';
  var _5 = {};
  _5['color'] = '#000';
  _5[getSomeProp()[0]] = 'underline';
  var _4 = {};
  _4['font-size'] = pInMedia;
  var _3 = {};
  _3['font-size'] = sectionSmallSize() + "em";
  var _2 = {};
  _2['clear'] = 'both';
  _2['display'] = 'table';
  _2['content'] = '" "';
  var _1 = [];

  _1.push(["section::" + pseudoClass, _2]);

  _1.push(['section small', _3]);

  var _6 = {},
      _7 = [];
  _6['@media screen and (max-width: 1000px)'] = _7;

  _7.push(['p', _4]);

  _7.push(['p > a', _5]);

  _1.push(_6);

  _1.push([data.sel.join(', '), _8]);

  return _1;
}.apply(this))
;