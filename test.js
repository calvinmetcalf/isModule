var isModule = require('./index');
var test = require('tape');
var multiline = require('multiline');


test('find export', function (t) {
  t.plan(10);
  t.ok(isModule(multiline(function (){/*
      export default function () {};
  */})), 'default export function');
  t.ok(isModule(multiline(function (){/*
      let d = 9;
      export default d;
  */})), 'default export');
  t.ok(isModule(multiline(function (){/*
      export let d = 9;
  */})), 'let based export');
  t.ok(isModule(multiline(function (){/*
      let d = 9;
      export {d as e}
  */})), 'as export');
  t.ok(isModule(multiline(function (){/*
      let bar = class {
        constructor () {
          
        }
        foo() {}
      }
      export default bar;
  */})), 'default export class');
  t.ok(isModule(multiline(function (){/*
      export default class {
        constructor () {
          
        }
        foo() {}
      };
  */})), 'default export class');
  t.ok(isModule(multiline(function (){/*
      import name from 'path';
      let namer = 'foo';
  */})), 'import name from \'path\'');
  t.ok(isModule(multiline(function (){/*
      import {name, otherNAme} from 'path'
      let namer = 'foo';
  */})), 'import {name, otherNAme} from \'path\'');
  t.notOk(isModule(multiline(function (){/*
      let d = 9;
      module.exports = d;
  */})), 'not in node');
  t.notOk(isModule(multiline(function (){/*
      let d = 9;
      //export {d as e}
  */})), 'not in comment');
});

