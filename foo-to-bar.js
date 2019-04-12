// Find the variable 'foo', and rename to 'bar'
module.exports = function (fileInfo, api, options) {
  return api.jscodeshift(fileInfo.source)
    .findVariableDeclarators('foo')
    .renameTo('bar')
    .toSource();
};