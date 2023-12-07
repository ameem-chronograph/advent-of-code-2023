const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((l) => l.split(" "));

for (let line of input) {
  const [hand] = line;
  const counts = {};
  for (let card of hand) {
    counts[card] = 1 + (counts[card] ?? 0);
  }
  const order = Object.values(counts)
    .sort((a, b) => b - a)
    .join("");
  line.push(order);
}

const cardOrder = "23456789TJQKA";

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
