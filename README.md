# Cantina Homework Exercise

* Instructions are in file "instructions.md"
* Input data is in file "input.json"

## Technology

This program was written in Javascript to run on Node.js. Built & tested with node version 12.13.0.

## Run Instructions

* To run, ensure you have Node installed: `node --version`
    * If not, install based on Node documentation: https://nodejs.org/en/
* Download `program.js` and input JSON file, either from `input.json` in this repository or from remote repo listed in the instructions.
* Run program.js from terminal, supplying path to your local input file, e.g.: `node program.js ./input.json`
* After running, program will wait for your input. Type your search terms (e.g. `Input`, `.container`, or `#apply`) and hit enter to search. Note that **search terms are case-sensitive**.
* Program will output all matching nodes as JSON.
    * If you prefer to see output as JS objects (slightly more readable in the CLI!), follow instructions in `printNode` function comments, in `program.js` lines 92-105
* To quit program, type CTRL-C

## Notes

At this time, the program only supports single selectors, e.g. `Input`, `.container`, or `#apply`. It does *not* currently support compound selectors (e.g. `View#identifier`) or selector chains (e.g. `StackView .container`).