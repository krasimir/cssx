module.exports = function (cssx) {
  var selector = function (props) {
    var r = {};
    r['.something' + ' ' + '.else'] = props;
    return r;
  };

  cssx.add(selector.bind(null, { a: 1 })).descendant(selector.bind(null, { b: 2 }));
};