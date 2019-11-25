const readline = require('readline');
const fs = require('fs');

// retrieve file & parse it to 'data' obj
const filePath = process.argv.slice(2)[0];
const jsonString = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonString);
// console.log(data);


// listen for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    traverseObj(line, data)
});


// traverse file to find the input

/*
within each object, we need to consider:
    subviews = array of objects which also need to be considered
    contentView = object containing subviews
    control = a single object to consider

possible view attributes to search for:
    1. class - The view class name, e.g. "StackView" --> a string
    2. classNames - CSS class names, e.g. ".container" --> an array of strings
    3. identifier - The view identifier, e.g. "#videoMode" --> a string
*/

/* implement basic BFS:
- if we are looking for a unique node e.g. identifier, we want to return the highest on the hierarchy
- if we are looking for multiple nodes, we would typically want to act on them from highest to lowest on hierarchy (e.g. establishing CSS precedence)
*/

function evaluateNode(attribute, input, node) {
    switch (attribute) {
        case 'class':
            if(node.class && node.class === input) {
                console.log(node)
            }
            break;

        case 'className':
            if(node.classNames && node.classNames.includes(input)) {
                console.log(node)
            }
            break;
        
        case 'identifier':
            if(node.identifier && node.identifier === input) {
                console.log(node)
            }
            break;

        default:
            return;
    }
}

function traverseObj(input, obj) {
    const queueArr = [];
    queueArr.push(obj);

    while (queueArr.length > 0) {
        const node = queueArr.shift();

        // search that node for the class
        evaluateNode('class', input, node);

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