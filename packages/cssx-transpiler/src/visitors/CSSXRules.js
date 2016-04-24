var t = require('babel-types');
var randomId = require('../helpers/randomId');
var isArray = require('../helpers/isArray');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var propAssignment, propsObject, addToContext, processRule, key;
    var rules = node.body, normalizedRules = {};
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

    propsObject = t.variableDeclaration(
      'var',
      [
        t.variableDeclarator(
          t.identifier(id),
          t.objectExpression([])
        )
      ]
    );

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

    for (key in normalizedRules) {
      processRule(normalizedRules[key]);
    }

    addToContext(propsObject);

    parent[index] = t.identifier(id);
  }
};
