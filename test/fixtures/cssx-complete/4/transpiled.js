var stylesheet = cssx();
var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = stylesheet.add((function () {
  var _2 = {},
      _3 = {},
      _4 = {},
      _5 = {},
      _6 = {};
  _3['transform'] = 'translateX(0)';
  _4['transform'] = 'translateX(200px)';
  _5['0%  '] = _3;
  _5['100%'] = _4;
  _6['animation'] = animationApply;
  _2['@keyframes ball-animation'] = _5;
  _2['.ball'] = _6;
  return _2;
}.apply(this)));