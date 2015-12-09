# require-webpack-compat
:monkey: Monkey-patches `require.context` into Node.js require

This is meant to simplify Universal JS apps that use Webpack and Node.js.

:warning: Caution: Don't use it in libraries, only for applications

## Usage
```
require('require-webpack-compat')(require);
```

Afterwards, we have `.context` function on our `require` function. This allows us

## License
MIT
