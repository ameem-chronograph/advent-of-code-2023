const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const instructions = input[0];
const map = {};
for (let i = 2; i < input.length; i++) {
  const matches = input[i].match(/\w+/g);
  map[matches[0]] = [matches[1], matches[2]];
}

let steps = 0;
let curr = "AAA";
while (curr !== "ZZZ") {
  const index = instructions[steps % instructions.length] === "L" ? 0 : 1;
  curr = map[curr][index];
  steps++;
}
console.log(steps);
