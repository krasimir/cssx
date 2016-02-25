(function () {
  var _2 = {};
  _2['(wmo)animation'] = 'snow 10s linear infinite';
  _2['background-image'] = showImages.reduce(function (value, image) {
    value.push('site/imgs/' + value);return value;
  }, []).join(',');
  _2['margin'] = value + "px";

  var _1 = cssx('_1');

  _1.add('.left', _2);

  return _1;
}.apply(this))