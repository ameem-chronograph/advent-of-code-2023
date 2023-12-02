const fs = require("fs");

const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");

let limits = {
  red: 12,
  green: 13,
  blue: 14,
};

let total = 0;
lines.forEach((line) => {
  const [game, steps] = line.split(": ");
  const gameId = parseInt(game.match(/\d+/)[0]);
  const isValid = steps.split("; ").every((step) => {
    const groups = step.split(", ");
    return groups.every((group) => {
      const [count, color] = group.split(" ");
      return limits[color] >= parseInt(count);
    });
  });
  if (isValid) total += gameId;
});

console.log(total);
