const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const isDigit = (char) => "0" <= char && "9" >= char;
const isValidIndex = (i, j) =>
  i >= 0 && i < input.length && j >= 0 && j < input[0].length;
const isSymbol = (char) => !isDigit(char) && char !== ".";
const getKey = (i, j) => i + "_" + j;

const neighbors = [
  [0, -1],
  [-1, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
  [-1, 1],
  [1, 1],
];

let total = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (isSymbol(input[i][j])) {
      const capturedIndexes = {};
      for (let n = 0; n < neighbors.length; n++) {
        const offset = neighbors[n];
        const nI = i + offset[0];
        const nJ = j + offset[1];
        if (
          isValidIndex(nI, nJ) &&
          !capturedIndexes[getKey(nI, nJ)] &&
          isDigit(input[nI][nJ])
        ) {
          let start = nJ;
          while (isValidIndex(i, start - 1) && isDigit(input[nI][start - 1]))
            start--;

          let number = 0;
          while (isValidIndex(nI, start) && isDigit(input[nI][start])) {
            number = number * 10 + parseInt(input[nI][start]);
            capturedIndexes[getKey(nI, start)] = true;
            start++;
          }
          total += number;
        }
      }
    }
  }
}

console.log(total);
