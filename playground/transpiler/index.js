var cssxTranspiler = require('cssx-transpiler');
var fs = require('fs');

var code = fs.readFileSync('./file.js', { encoding: 'utf8' }).toString();

console.log(cssxTranspiler(code, { minified: false }));