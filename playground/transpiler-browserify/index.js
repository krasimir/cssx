var browserify = require('browserify');
var cssxTransform = require('../../packages/browserify-cssx');

var CSSXTranspilerOptions = {
  format: 'object',
  minify: false
};

var b = browserify('src/index.js', {
  transform: [ cssxTransform ],
  cssx: CSSXTranspilerOptions
});
b.bundle(function (err, buff) {
  var code = buff.toString('utf8');
  console.log(code);
});  