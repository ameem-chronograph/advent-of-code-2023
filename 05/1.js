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

const seeds = input[0].match(/\d+/g).map((n) => parseInt(n));
let min = Infinity;
for (let i = 0; i < seeds.length; i++) {
  let curr = seeds[i];
  for (let j = 0; j < maps.length; j++) {
    for (let n = 0; n < maps[j].length; n++) {
      const [destStart, sourceStart, count] = maps[j][n];
      if (curr >= sourceStart && curr < sourceStart + count) {
        curr = curr - sourceStart + destStart;
        break;
      }
    }
  }
  min = Math.min(curr, min);
}

console.log(min);
