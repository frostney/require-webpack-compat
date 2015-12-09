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
require('require-webpack-compat')(require);
```

Afterwards, we have `.context` function on our `require` function. This allows us to do all the shenanigans we do with it in our Webpack projects.

## License
MIT
