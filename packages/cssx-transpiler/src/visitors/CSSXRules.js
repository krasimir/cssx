var t = require('babel-types');
var randomId = require('../helpers/randomId');
var isArray = require('../helpers/isArray');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var propAssignment, addToContext, processRule, key;
    var rules = node.body, nested = node.nested || [], normalizedRules = {};
    var id = randomId();

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
          // nested.length === 0 || options.format === 'object' ? t.objectExpression([]) : t.arrayExpression()
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
    nested.forEach(function (cssxElementNode, index) {
      addToContext(t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.identifier(id),
            t.stringLiteral(cssxElementNode.expression.left.property.value),
            true
          ),
          t.identifier(cssxElementNode.expression.right.name)
        )
      ));
    });

    for (key in normalizedRules) {
      processRule(normalizedRules[key]);
    }

    parent[index] = t.identifier(id);
  }
};
