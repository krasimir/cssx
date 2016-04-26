cssx('selected').clear().add((function () {
  var _2 = {},
      _3 = {},
      _4 = {};
  _3['padding-left'] = '2em';
  _4['background-color'] = this.state.color;
  _2["li:nth-child(" + (index + 1) + ")"] = _3;
  _2["li:nth-child(" + (index + 1) + ") .btn"] = _4;
  return _2;
}.apply(this)));