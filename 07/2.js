const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((l) => l.split(" "));

for (let line of input) {
  const [hand] = line;
  const counts = {};
  let jokers = 0;
  for (let card of hand) {
    if (card === "J") jokers++;
    else {
      counts[card] = 1 + (counts[card] ?? 0);
    }
  }
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map((a) => a[1]);
  sorted.length ? (sorted[0] += jokers) : sorted.push(jokers);
  line.push(sorted.join(""));
}

const cardOrder = "J23456789TQKA";

const output = input
  .sort((a, b) => {
    const [aCard, aBid, aOrder] = a;
    const [bCard, bBid, bOrder] = b;
    if (aOrder === bOrder) {
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return cardOrder.indexOf(aCard[i]) - cardOrder.indexOf(bCard[i]);
        }
      }
      return 0;
    }
    return aOrder.localeCompare(bOrder);
  })
  .reduce((acc, curr, index) => acc + parseInt(curr[1]) * (index + 1), 0);

console.log(output);
