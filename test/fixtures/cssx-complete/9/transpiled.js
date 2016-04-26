var func = function () {
  return (function () {
    var _6 = {};
    var _5 = {};
    _5['line-height'] = '2em';
    var _4 = {};
    _4['color'] = 'red';
    var _3 = {};
    _3['color'] = '#000';
    var _2 = [];

    _2.push(['h1', _3]);

    _2.push(['@media (max-width: 600px)', _6]);

    return _2;
  }.apply(this));
};

var sheet = cssx();
sheet.add(func());