module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.CallExpression, {
      callee: {
        property: {
          name: 'bind'
        }
      }
    })
    .replaceWith(p => j.bindExpression(null, p.value.callee.object))
    .toSource();
};