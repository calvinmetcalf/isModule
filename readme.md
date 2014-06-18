isModule
===

Test if a string is an es6 module.

`npm install --save ismodule`;

```js
var isModule = require('ismodule');

isModule('export default 9'); //true
isModule('let b = "export default 9"'); //false
```

There is one known bug due to esprima with default exports of anonymous classes, the following:

```js
isModule(['export default class {',
  'constructor () {}',
  'foo() {}',
'}'].join('\n'))
```

will throw.