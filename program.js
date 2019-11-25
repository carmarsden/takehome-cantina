const readline = require('readline');
const fs = require('fs');

// retrieve file & parse it to 'data' obj
const filePath = process.argv.slice(2)[0];
console.log(filePath);

const jsonString = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonString);
console.log(data.subviews[0].subviews[0].subviews);


// listen for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    console.log(line.length);
});