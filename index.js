var esprima = require('esprima');
var estraverse = require('estraverse');
var rx = /export\s+(?:default|let|const|var|function|class|{)/;
var rx2 = /export\s+default\s+class\s+{/;
module.exports = function (string) {
    var found = false;
    if (rx.test(string)) {
        var ast = tryParse(string);
        if (!ast) {
            return found;
        } if (ast === true) {
            return ast;
        }
        estraverse.traverse(ast, {
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

function tryParse(string) {
    var regexed;
    try {
        return esprima.parse(string);
    } catch (e) {
        if (e.description === 'Unexpected token {') {
            regexed = string.match(rx2);
            if (e.index + 1 === regexed.index + regexed[0].length) {
                return true;
            }
        }
    }
}