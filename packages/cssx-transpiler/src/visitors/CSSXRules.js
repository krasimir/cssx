var t = require('babel-types');
var randomId = require('../helpers/randomId');
var isArray = require('../helpers/isArray');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var propAssignment, addToContext, processRule, key;
    var rules = node.body;
    var nestedGrouped = [];
    var normalizedRules = {};
    var id = randomId();
    var rulesBuffer, bufferItem, selector;

    addToContext = function (item) {
      if (context && context.addToCSSXSelfInvoke) {
        context.addToCSSXSelfInvoke(item, parent);
      }
    };

    processRule = function (rule) {
      propAssignment = t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.identifier(id),
            rule.key,
            true
          ),
          isArray(rule.value.value) ?
            t.arrayExpression(rule.value.value.map(function (v) {
              return t.stringLiteral(v);
            })) :
            rule.value
        )
      );
      addToContext(propAssignment);
    };

    addToContext(t.variableDeclaration(
      'var',
      [
        t.variableDeclarator(
          t.identifier(id),
          t.objectExpression([])
        )
      ]
    ));

    // normalize the rules so we don't have multiple rules for same CSS property
    normalizedRules = rules.reduce(function (result, rule) {
      var r = result[rule.key.value];

      if (!r) {
        result[rule.key.value] = rule;
      } else {
        if (isArray(r.value.value)) {
          r.value.value.push(rule.value.value);
        } else {
          r.value.value = [r.value.value, rule.value.value];
        }
      }
      return result;
    }, {});

    // processing nested rules (if any)
    rulesBuffer = {};
    (node.nested || []).forEach(function (cssxElementNode, index) {
      selector = cssxElementNode.expression.left.property.value;
      bufferItem = rulesBuffer[selector];
      if (!bufferItem) {
        rulesBuffer[selector] = { type: 'single', el: cssxElementNode };
      } else {
        if (bufferItem.type === 'single') {
          rulesBuffer[selector] = { type: 'multiple', els: [ bufferItem.el, cssxElementNode ] };
        } else {
          bufferItem.els.push(cssxElementNode);
        }
      }
    });

    for (selector in rulesBuffer) {
      bufferItem = rulesBuffer[selector];
      if (bufferItem.type === 'single') {
        addToContext(t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(
              t.identifier(id),
              t.stringLiteral(selector),
              true
            ),
            t.identifier(bufferItem.el.expression.right.name)
          )
        ));
      } else {
        nestedGrouped = bufferItem.els.map(function (bufferItem) {
          return t.identifier(bufferItem.expression.right.name);
        });
        addToContext(t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(
              t.identifier(id),
              t.stringLiteral(selector),
              true
            ),
            t.arrayExpression(nestedGrouped)
          )
        ));
      }
    }

    for (key in normalizedRules) {
      processRule(normalizedRules[key]);
    }

    parent[index] = t.identifier(id);
  }
};
