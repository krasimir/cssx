var animationApply = 'ball-animation 1s ease infinite alternate';
var stylesheet = cssx();
var animation = stylesheet.add((function () {
  var _6 = {};
  _6['animation'] = animationApply;
  var _5 = {};
  var _4 = {};
  _4['(a)transform'] = 'translateX(200px)';
  var _3 = {};
  _3['(woms)transform'] = 'translateX(0)';
  var _2 = [];

  _2.push(['@keyframes ball-animation', _5]);

  _2.push(['.ball', _6]);

  return _2;
}.apply(this)));