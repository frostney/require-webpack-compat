# require-webpack-compat
:monkey: Monkey-patches `require.context` into Node.js require

This is meant to simplify Universal JS apps that use Webpack and Node.js.

:warning: Caution: NEVER use it in libraries, only for applications

## Installation

```
npm install require-webpack-compat --save
```

## Usage
```javascript
require('require-webpack-compat')(module, require);
```

Afterwards, we have `.context` function on our `require` function. This allows us to do all the shenanigans we do with it in our Webpack projects.

Inside your webpack configuration, we need to add these lines
```javascript
node: {
  fs: 'empty'
}
```
Otherwise we run into an error while generating the build.

## Example

#### index.js
```javascript
require('require-webpack-compat')(module, require);

var req = require.context('./', false, /\.js$/);

console.log(req.keys().reduce(function(obj, name) {
  var moduleName = path.basename(name).split(path.extname(name))[0];

  obj[moduleName] = req(name);
  return obj;
}, {}));

// {a: 5, b: 6}
```

#### a.js
```javascript
module.exports = 5;
```

#### b.js
```javascript
module.exports = 6;
```

See `/example`.

## License
MIT
