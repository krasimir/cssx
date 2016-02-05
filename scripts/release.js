var readline = require('readline');
var fs = require('fs');

var clientFile = __dirname + '/../packages/client/package.json';
var transpilerFile = __dirname + '/../packages/transpiler/package.json';

var client = require(clientFile);
var transpiler = require(transpilerFile);

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

  fs.writeFileSync(clientFile, JSON.stringify(client, null, 2));
  fs.writeFileSync(transpilerFile, JSON.stringify(transpiler, null, 2));

  console.log('The version changed to ' + answer);
  reader.close();
  process.stdin.destroy();
});
