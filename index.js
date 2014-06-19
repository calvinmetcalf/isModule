var esprima = require('esprima');
var estraverse = require('estraverse');
var rx = /(?:export\s+(?:default|let|const|var|function|class|{))|import/;
var rx2 = /export\s+default\s+class\s+{/;
module.exports = function (string) {
    var found = false;
    var depth = 0;
    if (rx.test(string)) {
        estraverse.traverse(esprima.parse(string), {
            enter: function (node) {
                depth++;
                if (depth === 3) {
                    return this.skip();
                }
                if (
                    node.type === 'ExportDeclaration' ||
                    node.type === 'ExportSpecifier' ||
                    node.type === 'ExportBatchSpecifier' ||
                    node.type === 'ImportDeclaration'
                ) {
                    found = true;
                    this.break();
                }
            },
            leave: function (node) {
                depth--;
            }
        });
    }
    return found;
};