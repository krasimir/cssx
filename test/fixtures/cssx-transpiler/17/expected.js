(function () {
  var _1 = {},
      _2 = {};
  _2['margin'] = value + "px";
  _2['background-image'] = showImages.reduce(function (value, image) {
    value.push('site/imgs/' + value);return value;
  }, []).join(',');
  _2['(wmo)animation'] = 'snow 10s linear infinite';
  _1['.left'] = _2;
  return _1;
}.apply(this))