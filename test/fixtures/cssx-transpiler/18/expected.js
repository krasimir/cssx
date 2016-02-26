var obj = {
  styles: function () {
    var _3 = {};
    _3['padding'] = '0';
    _3['margin'] = '0';
    _3['color'] = this.color;

    var _2 = cssx('_2');

    _2.add('body', _3);

    return _2;
  },
  color: '#FF0'
};