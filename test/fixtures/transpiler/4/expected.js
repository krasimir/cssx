var _m1 = cssx.add('@media screen and (max-width: 1000px)');

_m1.nested('p', {
  'font-size': '0.8em'
});

_m1.nested('p > a', {
  'text-decoration': 'underline',
  'color': '#000'
});

;