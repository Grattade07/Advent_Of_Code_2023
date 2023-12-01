const fs = require("fs").promises;

async function getText() {
  const data = await fs.readFile("./Day 1/day-1-puzzle-input.txt", "utf-8");

  return data;
}

async function getTextArray() {
  const textInputArray = (await getText()).split("\n");

  console.log(textInputArray);
}

async function getAnswer() {
  let data = await getTextArray();
}

getAnswer();
