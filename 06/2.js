const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => parseInt(line.match(/\d+/g).join("")));

const t = input[0];
const d = input[1];
const xValues = [1, -1].map((op) => (t + op * (t ** 2 - 4 * d) ** 0.5) / 2);
const output = Math.ceil(xValues[0]) - Math.floor(xValues[1]) - 1;
console.log(output);
