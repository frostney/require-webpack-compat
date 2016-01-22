require('../')(module, require);

var req = require.context('./', false, /\.js$/);

console.log(req.keys());

var path = require('path');

console.log(req.keys().reduce(function(obj, name) {
  var moduleName = path.basename(name).split(path.extname(name))[0];

  obj[moduleName] = req(name);
  return obj;
}, {}));
