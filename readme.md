isModule
===

Test if a string is an es6 module.

`npm install --save ismodule`;

```js
var isModule = require('ismodule');

isModule('export default 9'); //true
isModule('let b = "export default 9"'); //false
```