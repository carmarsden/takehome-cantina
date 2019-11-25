const readline = require('readline');

const filePath = process.argv.slice(2)[0];
console.log(filePath);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    console.log(line.length);
});