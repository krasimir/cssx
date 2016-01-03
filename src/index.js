var CSSFactory = require('./CSSFactory');

var ids = 0;
var getId = function () { return 'cssx' + (ids += 1); }
var cssCache = {};

var applyToDOM = function (css, id) {
  var el;

  if (!cssCache[id]) {
    el = createNode(
      'style', [
        { name: "id", value: id },
        { name: "type", value: "text/css"}
      ],
       css
    );
    cssCache[id] = { el: el, css: css };
  } else {
    if (cssCache[id].css !== css) {
      cssCache[id].css = css;
      cssCache[id].el.innerHTML = css;
    }
  }

};

var createNode = function (type, attrs, content) {
  var node = document.createElement(type), i, a;
  for(i=0; i<attrs.length, a=attrs[i]; i++) {
    node.setAttribute(a.name, a.value);
  }
  node.innerHTML = content;
  (qs("head") || qs("body")).appendChild(node);
  return node;
};

var qs = function (selector) {
  return document.querySelector(selector);
};

var cssx = function (rule, id) {
  if (!id) id = getId();
  if (rule) applyToDOM(CSSFactory.generate(rule), id);
  return id;
};

module.exports.compile = function () {
  var id = cssx();
  return function (rule) {
    return cssx(rule, id);
  };
};
module.exports.rule = CSSFactory.rule;
