module.exports = function (cssx) {
  var selector = function (props) {
    var r = {};
    r['.something' + ' ' + '.else'] = props;
    return r;
  };
  var props = function (value) {
    return { p: value };
  };

  cssx.add(selector.bind(null, props(1))).descendant(selector.bind(null, props(2)));
};