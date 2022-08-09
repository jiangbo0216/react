var path = require('path');

var rel = path.relative(process.cwd(), __dirname);

var alljs = path.join(rel, '../../build/node_modules/','**', '*.js');


// Get a reference to njstrace default Formatter class
var Formatter = require('njstrace/lib/formatter.js');

// // Create my custom Formatter class
// function MyFormatter() {
//     // No need to call Formatter ctor here
// }
// // But must "inherit" from Formatter
// require('util').inherits(MyFormatter, Formatter);


// // Implement the onEntry method
// MyFormatter.prototype.onEntry = function(args) {
//     Formatter.prototype.onEntry(args)
// };

// // Implement the onExit method
// MyFormatter.prototype.onExit = function(args) {
//     Formatter.prototype.onExit(args)

// };

class MyFormatter extends Formatter {
    onEntry (args) {
        if (args.name === '[Anonymous]') return
        args.file = args.file.slice('/Users/jiangbo/code/react/build/node_modules'.length)
        super.onEntry(args)
    }

    onExit(args) {
        if (args.name === '[Anonymous]') return

        args.file = args.file.slice('/Users/jiangbo/code/react/build/node_modules'.length)

        super.onExit(args)

    }
}


var njstrace = require('njstrace').inject({files: [alljs], formatter: new MyFormatter()});

const React = require('../../build/node_modules/react')
const { renderToString } = require('../../build/node_modules/react-dom/server')

renderToString(React.createElement('div', null, 'hello'))