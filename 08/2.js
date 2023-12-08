const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const instructions = input[0];
const map = {};
const nodes = [];
for (let i = 2; i < input.length; i++) {
  const matches = input[i].match(/\w+/g);
  map[matches[0]] = [matches[1], matches[2]];
  if (matches[0].match(/A$/)) {
    nodes.push(matches[0]);
  }
}

let steps = 0;
let zCounts = Array(nodes.length).fill(null);
let totalZCounts = 0;
while (totalZCounts < nodes.length) {
  const index = instructions[steps % instructions.length] === "L" ? 0 : 1;
  steps++;
  for (let i = 0; i < nodes.length; i++) {
    nodes[i] = map[nodes[i]][index];
    if (nodes[i].match(/Z$/) && zCounts[i] == null) {
      zCounts[i] = steps;
      totalZCounts++;
    }
  }
}

const gcd = (values) => {
  let curr = Math.min(...values);
  while (curr) {
    if (values.every((v) => v % curr === 0)) {
      return curr;
    }
    curr--;
  }
  return 1;
};

console.log(zCounts.reduce((acc, curr) => (acc * curr) / gcd([acc, curr])));
