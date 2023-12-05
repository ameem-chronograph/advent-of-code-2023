const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .filter((line) => line);

const maps = [];
for (let i = 1; i < input.length; i++) {
  if (input[i].match(/map/)) {
    maps.push([]);
  } else {
    maps[maps.length - 1].push(input[i].match(/\d+/g).map((n) => parseInt(n)));
  }
}
maps.forEach((map) => map.sort((a, b) => a[1] - b[1]));

const pairs = input[0]
  .match(/\d+ \d+/g)
  .map((pair) => pair.split(" ").map((n) => parseInt(n)));

let curr = pairs;
for (let i = 0; i < maps.length; i++) {
  const map = maps[i];
  const next = [];
  for (let j = 0; j < curr.length; j++) {
    const [seedStart, seedCount] = curr[j];
    for (let n = 0; n < map.length; n++) {
      const [destStart, sourceStart, count] = map[n];
      if (seedStart >= sourceStart && seedStart < sourceStart + count) {
        next.push([
          destStart + (seedStart - sourceStart),
          Math.min(seedCount, count),
        ]);
        const excess = seedCount - count;
        if (excess > 0) {
          curr.push([sourceStart + count, excess - 1]);
        }
        break;
      } else if (seedStart < sourceStart) {
        next.push([seedStart, Math.min(sourceStart - seedStart, seedCount)]);
        const overlap = seedStart + seedCount - sourceStart;
        if (overlap > 0) {
          curr.push([sourceStart, overlap]);
        }
        break;
      } else if (n === map.length - 1) {
        next.push(curr[j]);
      }
    }
  }
  curr = next;
}

console.log(Math.min(...curr.map(([a]) => a)));
