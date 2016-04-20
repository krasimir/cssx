cssx('selected').clear().add((function () {
  var _4 = {};
  _4['background-color'] = this.state.color;
  var _3 = {};
  _3['padding-left'] = '2em';
  var _2 = [];

  _2.push(["li:nth-child(" + (index + 1) + ")", _3]);

  _2.push(["li:nth-child(" + (index + 1) + ") .btn", _4]);

  return _2;
}.apply(this)));