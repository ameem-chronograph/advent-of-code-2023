const fs = require("fs");

const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");

let total = 0;
lines.forEach((line) => {
  const [_, steps] = line.split(": ");
  const maxCounts = {};
  steps.split("; ").forEach((step) => {
    const groups = step.split(", ");
    groups.forEach((group) => {
      const [count, color] = group.split(" ");
      maxCounts[color] = Math.max(maxCounts[color] ?? 0, parseInt(count));
    });
  });
  total += Object.values(maxCounts).reduce((power, curr) => power * curr);
});

console.log(total);
