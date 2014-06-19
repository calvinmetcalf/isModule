var esprima = require('esprima');
var estraverse = require('estraverse');
var rx = /export\s+(?:default|let|const|var|function|class|{)/;
var rx2 = /export\s+default\s+class\s+{/;
module.exports = function (string) {
    var found = false;
    if (rx.test(string)) {
        estraverse.traverse(esprima.parse(string), {
            enter: function (node) {
                if (node.type === 'ExportDeclaration' || node.type === 'ExportSpecifier' || node.type === 'ExportBatchSpecifier') {
                    found = true;
                    this.break();
                }
            }
        });
    } 
    return found;
};