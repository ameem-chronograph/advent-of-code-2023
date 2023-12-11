const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const expandedRows = [];
for (let i = 0; i < input.length; i++) {
  if (input[i].every((val) => val === ".")) {
    expandedRows.push(i);
  }
}

const expandedCols = [];
for (let j = 0; j < input[0].length; j++) {
  if (input.every((row) => row[j] === ".")) {
    expandedCols.push(j);
  }
}

let galaxyIndexes = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] !== ".") {
      galaxyIndexes.push([i, j]);
      input[i][j] = galaxyIndexes.length;
    }
  }
}

const expansionFactor = 2;
let total = 0;
for (let i = 0; i < galaxyIndexes.length; i++) {
  const start = galaxyIndexes[i];
  const startValue = input[start[0]][start[1]];
  let queue = [[start, 0]];
  let visited = {
    [start]: true,
  };

  while (queue.length) {
    const [next, distance] = queue.shift();
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach((delta) => {
      const index = [next[0] + delta[0], next[1] + delta[1]];
      if (
        visited[index] ||
        index[0] < 0 ||
        index[0] >= input.length ||
        index[1] < 0 ||
        index[1] >= input[0].length
      )
        return;
      const rowExpansion =
        expandedRows.indexOf(index[0]) > -1 ? expansionFactor : 1;
      const colExpansion =
        expandedCols.indexOf(index[1]) > -1 ? expansionFactor : 1;
      const newNode = [index, distance + 1 * rowExpansion * colExpansion];
      queue.push(newNode);
      visited[newNode[0]] = true;
      if (input[index[0]][index[1]] > startValue) {
        total += newNode[1];
      }
    });
  }
}

console.log(total);
