module.exports = function (cssx) {
  var media = cssx.add('a');

  media.nested('b', { c: 1 }).nested('f', { g: 1 });
  media.nested('d', { e: 1 });
};