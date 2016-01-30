var CSSXElement = require('./CSSXElement');
var formCSSXElement = CSSXElement.formCSSXElement;
var t = require('babel-types');
var injectAt = require('../helpers/injectAt');
var isArray = require('../helpers/isArray');
var settings = require('../settings');

var ids = 0;
var getID = function () { return '_m' + (++ids); };

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var id = getID(), lines = [];

    lines.push(t.variableDeclaration(
      'var',
      [
        t.variableDeclarator(
          t.identifier(id),
          formCSSXElement([
            t.stringLiteral(node.query)
          ])
        )
      ]
    ));
    lines = lines.concat(node.body.map(function (cssxElementNode) {
      cssxElementNode.callee.object.name = id;
      cssxElementNode.callee.property.name = settings.CSSXClientNestedMethodName;
      return t.expressionStatement(cssxElementNode);
    }));
    if (isArray(parent)) {
      injectAt(parent, index, lines);
    } else {
      /* This is the case where we have CSSXMediaQueryElement
         attached to a property of object and not part of an array.
      */
      delete parent[index];
    }
  }
};
