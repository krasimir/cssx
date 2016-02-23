var resolveSelector = require('./resolveSelector');
var SELECTORS = {
  '@keyframes': [
    '@-webkit-keyframes',
    '@-moz-keyframes',
    '@-o-keyframes'
  ]
};
var prefixProperty = function (list) {
  return list.split('').map(function (ch) {
    if (ch === 's') return '-ms-'; // Microsoft
    if (ch === 'z') return 'mso- '; // icrosoft Office
    if (ch === 'm') return '-moz-'; // Mozilla Foundation (Gecko-based browsers)
    if (ch === 'o') return '-o-'; //  -xv- Opera Software
    if (ch === 't') return '-atsc-'; // Advanced Television Standards Committee
    if (ch === 'p') return '-wap-'; // The WAP Forum
    if (ch === 'w') return '-webkit-'; // Safari, Chrome (and other WebKit-based browsers)
    if (ch === 'k') return '-khtml-'; // Konqueror browser
    if (ch === 'a') return '-apple-'; // Webkit supports properties using the -apple- prefixes as well
    if (ch === 'e') return 'prince- '; // esLogic
    if (ch === 'n') return '-ah-'; // Antenna House
    if (ch === 'h') return '-hp-'; // Hewlett Packard
    if (ch === 'r') return '-ro-'; // Real Objects
    if (ch === 'i') return '-rim-'; // Research In Motion
    if (ch === 'c') return '-tc-'; // Tall Components
    return [];
  });
};

module.exports = {
  selector: function (rules) {
    var result = [], keyword, newRule, sel;

    rules.forEach(function (rule) {
      sel = resolveSelector(rule.selector);
      result.push(rule);
      if (sel) keyword = resolveSelector(rule.selector).split(' ')[0];
      if (SELECTORS[keyword]) {
        SELECTORS[keyword].forEach(function (prefixed) {
          newRule = rule.clone();
          newRule.selector = rule.selector.replace(keyword, prefixed);
          result.push(newRule);
        });
      }
    });
    return result;
  },
  property: function (props) {
    var prop, match, cleanProp;

    for (prop in props) {
      match = prop.match(/^\(([szmotpwkaenhric]+)\)/);
      if (match) {
        cleanProp = prop.replace(match[0], '');
        props[cleanProp] = props[prop];
        prefixProperty(match[1]).forEach(function (prefix) {
          props[prefix + cleanProp] = props[prop];
        });
        delete props[prop];
      }
    }
    return props;
  }
};
