const fs = require("fs");

const lines = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((l) => l.split(/[:\|]/))
  .filter((l) => l[0]);

let total = 0;
lines.forEach(([card, winningStr, numsStr]) => {
  const winning = new Set(winningStr.match(/\d+/g));
  const nums = numsStr.match(/\d+/g);
  let matches = nums.reduce(
    (acc, curr) => (winning.has(curr) ? acc + 1 : acc),
    0
  );
  total += matches ? 2 ** (matches - 1) : 0;
});
console.log(total);
