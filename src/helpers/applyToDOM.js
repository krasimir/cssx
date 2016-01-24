var cache = {};

var qs = function (selector) {
  return document.querySelector(selector);
};

var createNode = function (type, attrs, content) {
  var node = document.createElement(type), i, a;

  for (i = 0; i < attrs.length; i++) {
    a = attrs[i];
    node.setAttribute(a.name, a.value);
  }
  node.innerHTML = content;
  (qs('head') || qs('body')).appendChild(node);
  return node;
};

var remove = function (id) {
  return function () {
    if (cache[id]) {
      cache[id].el.parentNode.removeChild(cache[id].el);
      delete cache[id];
    }
  };
};

module.exports = function (css, id) {
  var el;

  if (!cache[id]) {
    el = createNode(
      'style', [
        { name: 'id', value: id },
        { name: 'type', value: 'text/css'}
      ],
       css
    );
    cache[id] = { el: el, css: css, remove: remove(id) };
  } else {
    if (cache[id].css !== css) {
      cache[id].css = css;
      cache[id].el.innerHTML = css;
    }
  }

  return cache[id].remove;
};
