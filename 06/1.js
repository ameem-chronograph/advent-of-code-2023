const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.match(/\d+/g).map((n) => parseInt(n)));

const output = input[0].reduce((acc, curr, index) => {
  const t = curr;
  const d = input[1][index];
  const xValues = [1, -1].map((op) => (t + op * (t ** 2 - 4 * d) ** 0.5) / 2);
  return acc * (Math.ceil(xValues[0]) - Math.floor(xValues[1]) - 1);
}, 1);

console.log(output);
