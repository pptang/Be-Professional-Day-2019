module.exports = function (fileInfo, api, options) {

  const reactInternalMethods = ['render', 'constructor', 'componentWillMount', 'componentWillReceiveProps', 'componentDidMount', 'shouldComponentUpdate', 'componentDidUpdate', 'componentWillUnmount'];

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
    .filter(p => !reactInternalMethods.includes(p.value.key.name))
    .replaceWith(p => {
      // p.value is the node itself, the second value if the 'value' field
      var funcName = p.value.key;
      var funcBody = p.value.value.body;
      var funcParams = p.value.value.params;

      return j.expressionStatement(j.assignmentExpression("=", funcName, j.arrowFunctionExpression(funcParams, funcBody)));
    })
    .toSource();
}