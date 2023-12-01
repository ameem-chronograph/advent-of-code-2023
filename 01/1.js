const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

let total = 0;

for (let line of lines) {
  let firstDigit = null;
  let lastDigit = null;

  for (let char of line) {
    if (char >= "0" && char <= "9") {
      if (firstDigit == null) firstDigit = char;
      lastDigit = char;
    }
  }

  total += Number(firstDigit + lastDigit);
}

console.log(total);
