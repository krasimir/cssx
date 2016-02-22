cssx('selected').clear().add((function () {
  var _4 = {};
  _4['background-color'] = this.state.color;
  var _3 = {};
  _3['padding-left'] = '2em';
  return [["li:nth-child(" + (index + 1) + ")", _3], ["li:nth-child(" + (index + 1) + ") .btn", _4]];
}.apply(this)));