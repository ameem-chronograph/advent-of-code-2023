const fs = require("fs");

const lines = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((l) => [...l.split(/[:\|]/), 1])
  .filter((l) => l[0]);

let total = 0;
lines.forEach(([card, winningStr, numsStr, copies], index) => {
  const winning = new Set(winningStr.match(/\d+/g));
  const nums = numsStr.match(/\d+/g);
  let matches = nums.reduce(
    (acc, curr) => (winning.has(curr) ? acc + 1 : acc),
    0
  );
  for (let i = 0; i < matches; i++) {
    if (index + i + 1 >= lines.length) break;
    lines[index + i + 1][3] += copies;
  }
  total += copies;
});
console.log(total);
