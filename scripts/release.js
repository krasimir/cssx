var readline = require('readline');
var fs = require('fs');

var client = require('../packages/client/package.json');
var transpiler = require('../packages/transpiler/package.json');

if (client.version !== transpiler.version) {
  throw new Error('Client and Transpiler have different versions: ' + client.version + ', ' + transpiler.version);
}

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question('Type a new version. The current one is ' + client.version + '.\nversion: ', function(answer) {

  client.version = answer;
  transpiler.version = answer;

  fs.writeFileSync('../packages/client/package.json', JSON.stringify(client, null, 2));
  fs.writeFileSync('../packages/transpiler/package.json', JSON.stringify(transpiler, null, 2));

  console.log('The version changed to ' + answer);
  reader.close();
  process.stdin.destroy();
});
