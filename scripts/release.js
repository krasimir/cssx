var readline = require('readline');
var fs = require('fs');

var currentVersion;
var packages = [
  'cssx',
  'cssx-transpiler',
  'gulp-cssx',
  'cssx-loader',
  'cssx-cli',
  'browserify-cssx',
  'rollup-plugin-cssx'
].map(function (p) {
  var pJSONPath = __dirname + '/../packages/' + p + '/package.json';

  return {
    name: p,
    path: pJSONPath,
    json: require(pJSONPath)
  }
});

currentVersion = checkVersions(packages);

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question('Type a new version. The current one is ' + currentVersion + '.\nversion: ', function(answer) {

  packages.forEach(function (package) {
    package.json.version = answer;
    dependencies(packages, answer, package.json, 'dependencies');
    dependencies(packages, answer, package.json, 'devDependencies');
    fs.writeFileSync(package.path, JSON.stringify(package.json, null, 2));
  });

  console.log('The version changed to ' + answer);
  reader.close();
  process.stdin.destroy();
});

function checkVersions(packages) {
  var report;
  var areEq = packages.reduce(function (version, package) {
    if (version === '') return package.json.version;
    if (version === false) return false;
    return version === package.json.version ? version : false;
  }, '');

  if (areEq === false) {
    report = packages.map(function (package) {
      return package.name + ': ' + package.json.version;
    }).join(', ');
    throw new Error('Mismatching versions: ' + report);
  } else {
    return areEq;
  }
};

function dependencies(packages, newVersion, json, key) {
  var packagesNames = packages.map(function(p) { return p.name; });
  if (json[key]) {
    Object.keys(json[key]).forEach(function (dep) {
      if (packagesNames.indexOf(dep) >= 0) {
        json.dependencies[dep] = newVersion;
      }
    });
  }
};
