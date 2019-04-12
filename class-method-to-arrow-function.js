module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;
  return j(fileInfo.source)
    .find(j.MethodDefinition, {
      value: {
        type: "FunctionExpression",
        body: {
          type: "BlockStatement"
        }
      }
    })
    .replaceWith(p => {
      // p.value is the node itself, the second value is the 'value' field
      var body = p.value.value.body;
      var funcName = p.value.key;
      var params = p.value.value.params;
      return j.expressionStatement(j.assignmentExpression("=", funcName, j.arrowFunctionExpression(params, body)));
    })
    .toSource();
}