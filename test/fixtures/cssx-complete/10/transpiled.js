var sheet = cssx();

sheet.scope('#component');

sheet.add('p', { 'font-size': '10px' });
sheet.add('b', (function () {
  var _2 = {};
  _2['margin-top'] = '10px';
  return _2;
}.apply(this)));

sheet.add((function () {
  var _4 = [],
      _5 = {},
      _6 = {},
      _7 = [];
  _5['display'] = 'block';
  _6['display'] = 'inline';

  _7.push(['header a', _6]);

  _4.push(['header a', _5]);

  _4.push(['@media (max-width: 600px)', _7]);

  return _4;
}.apply(this)));

var footer = sheet.add('footer');
footer.d('p', (function () {
  var _9 = {};
  _9['float'] = 'left';
  return _9;
}.apply(this)));