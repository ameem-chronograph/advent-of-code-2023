const fs = require("fs");

const graph = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

let startIndex = null;
for (let i = 0; i < graph.length; i++) {
  const j = graph[i].indexOf("S");
  if (j >= 0) {
    startIndex = [i, j];
    break;
  }
}

const pipes = {
  S: ["N", "S", "E", "W"],
  L: ["N", "E"],
  7: ["W", "S"],
  F: ["E", "S"],
  J: ["W", "N"],
  "|": ["N", "S"],
  "-": ["E", "W"],
};

const deltas = {
  N: [-1, 0],
  E: [0, 1],
  W: [0, -1],
  S: [1, 0],
};

const opposite = { N: "S", S: "N", E: "W", W: "E" };

const isCompatible = (sourceDir, nextPipe) => {
  return nextPipe in pipes && pipes[nextPipe].indexOf(sourceDir) > -1;
};

const isValid = ([i, j]) =>
  i >= 0 && i < graph.length && j >= 0 && j < graph[0].length;

function getLoop() {
  const stack = [[startIndex, pipes["S"], []]];

  while (stack.length) {
    const [currIndex, nextDirs, history] = stack.pop();
    const nextDeltas = nextDirs.map((d) => [d, deltas[d]]);
    for (let [dir, delta] of nextDeltas) {
      const nextIndex = [currIndex[0] + delta[0], currIndex[1] + delta[1]];
      if (!isValid(nextIndex)) continue;
      const nextPipe = graph[nextIndex[0]][nextIndex[1]];
      if (nextPipe === "S") {
        return [...history, currIndex];
      }
      const sourceDir = opposite[dir];
      if (!isCompatible(sourceDir, nextPipe)) continue;
      stack.push([
        nextIndex,
        pipes[nextPipe].filter((dir) => dir !== sourceDir),
        [...history, currIndex],
      ]);
    }
  }
}

const loop = getLoop();
const isLoopIndex = (index) => loop.find((l) => index.join("") === l.join(""));
const isMiddleIndexHorizontal = ([i, j]) =>
  isLoopIndex([i, j - 1]) && isLoopIndex([i, j + 1]);
const isMiddleIndexVertical = ([i, j]) =>
  isLoopIndex([i + 1, j]) && isLoopIndex([i - 1, j]);

let enclosed = 0;
let enclosedIndex = [];
for (let i = 0; i < graph.length; i++) {
  for (let j = 0; j < graph[0].length; j++) {
    if (loop.find((l) => l.join("") === [i, j].join(""))) continue;
    let borderCounts = [0, 0, 0, 0];
    for (let index of loop) {
      if (index[0] === i && index[1] < j) borderCounts[0]++;
      else if (index[0] === i && index[1] > j) borderCounts[1]++;
      else if (index[0] > i && index[1] === j) borderCounts[2]++;
      else if (index[0] < i && index[1] === j) borderCounts[3]++;
    }
    console.log(borderCounts);
    if (borderCounts.every((c) => c % 2 == 1)) {
      enclosed++;
      enclosedIndex.push([i, j]);
    }
  }
}

console.log(loop, enclosed);
