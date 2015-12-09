require('./index')(require);

var req = require.context('./', false, /\.js$/);

console.log(req.keys());
