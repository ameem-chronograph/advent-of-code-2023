const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

const spelled = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let total = 0;

for (let line of lines) {
  let firstDigit = null;
  let lastDigit = null;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char >= "0" && char <= "9") {
      if (firstDigit == null) firstDigit = char;
      lastDigit = char;
    } else {
      for (let j = 0; j < spelled.length; j++) {
        const current = spelled[j];
        if (line.slice(i, i + current.length) === current) {
          const digit = j + 1 + "";
          if (firstDigit == null) firstDigit = digit;
          lastDigit = digit;
        }
      }
    }
  }

  total += Number(firstDigit + lastDigit);
}

console.log(total);
