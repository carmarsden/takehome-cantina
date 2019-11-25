const readline = require('readline');
const fs = require('fs');

// retrieve file & parse it to 'data' obj
const filePath = process.argv.slice(2)[0];
const jsonString = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonString);

// listen for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    const inputType = parseInput(line);
    traverseObj(inputType, line, data)
});



// determine whether input is class, className, or identifier
function parseInput(input) {
    if (input[0] === '.') {
        return 'className'
    } else if (input[0] === '#') {
        return 'identifier'
    } else {
        return 'class'
    }
}

// traverse data object with BFS
/* reasons to use BFS rather than DFS:
- if we are looking for a unique node e.g. identifier, we want to return the highest on the hierarchy
- if we are looking for multiple nodes, we would typically want to act on them from highest to lowest on hierarchy (e.g. establishing CSS precedence)
*/

function traverseObj(attribute, input, obj) {
    const queueArr = [];
    queueArr.push(obj);

    while (queueArr.length > 0) {
        const node = queueArr.shift();

        // search that node for the class
        evaluateNode(attribute, input, node);

        // add children options to the queue
        if (node.subviews) {
            node.subviews.forEach(obj => queueArr.push(obj))
        }

        if (node.contentView) {
            queueArr.push(node.contentView)
        }

        if (node.control) {
            queueArr.push(node.control)
        }
    }

    return;
}

// check if node matches the search criteria
function evaluateNode(attribute, input, node) {
    switch (attribute) {
        case 'class':
            if(node.class && node.class === input) {
                printNode(node);
            }
            break;

        case 'className':
            if(node.classNames && node.classNames.includes(input.slice(1))) {
                printNode(node);
            }
            break;
        
        case 'identifier':
            if(node.identifier && node.identifier === input.slice(1)) {
                printNode(node);
            }
            break;

        default:
            return;
    }
}

function printNode(node) {
    // this function prints node as JSON to stdout, per instructions
    console.log(JSON.stringify(node, null, ' '));
    
    /*
    for more readable format in your CLI, print node as JS object, not JSON!
    1. comment out line above (#94)
    2. un-comment out line below (#102)
    */

    //console.log(node);

    return;
}