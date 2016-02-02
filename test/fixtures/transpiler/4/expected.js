(function () {
  var _2 = cssx.s('_2');

  _2.add('section::after', {
    'content': '" "',
    'display': 'table',
    'clear': 'both'
  });

  _2.add('section small', {
    'font-size': '.2em'
  });

  var _1 = _2.add('@media screen and (max-width: 1000px)');

  _1.n('p', {
    'font-size': '0.8em'
  });

  _1.n('p > a', {
    'text-decoration': 'underline',
    'color': '#000'
  });

  _2.add('section p > a', {
    'text-decoration': 'none',
    'background': 'url("../public/bg.jpg") no-repeat'
  });

  return _2;
}).apply(this);
;