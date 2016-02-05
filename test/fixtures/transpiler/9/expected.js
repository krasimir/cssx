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
  var _7 = {};
  _7[data.prop] = "url(\"../public/" + image + ".jpg\") no-repeat";
  _7['text-decoration'] = 'none';
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

  var _1 = cssx.s('_1');

  _1.add("section::" + pseudoClass, _2);

  _1.add('section small', _3);

  var _6 = _1.add('@media screen and (max-width: 1000px)');

  _6.n('p', _4);

  _6.n('p > a', _5);

  _1.add(data.sel.join(', '), _7);

  return _1;
}).apply(this);
;