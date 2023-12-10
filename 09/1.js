const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.match(/-?\d+/g).map((s) => parseInt(s)));

let sum = 0;
for (let seq of input) {
  const steps = [seq];
  let hasNonZero = true;

  while (hasNonZero) {
    const last = steps[steps.length - 1];
    hasNonZero = false;
    const diffs = last.map((value, index) => {
      if (index === last.length - 1) return;
      const diff = last[index + 1] - value;
      if (diff !== 0) hasNonZero = true;
      return diff;
    });
    diffs.pop();
    steps.push(diffs);
  }

  for (let i = steps.length - 1; i >= 0; i--) {
    const currentStep = steps[i];
    if (i === steps.length - 1) {
      currentStep.push(0);
    } else {
      const stepBelow = steps[i + 1];
      currentStep.push(
        currentStep[currentStep.length - 1] + stepBelow[stepBelow.length - 1]
      );
    }
  }
  sum += steps[0][steps[0].length - 1];
}

console.log(sum);
