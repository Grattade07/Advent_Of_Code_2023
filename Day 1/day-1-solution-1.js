const fs = require("fs").promises;

let textInput = undefined;
let textInputArray = undefined;

async function getTextInput() {
  const data = await fs.readFile("./Day 1/day-1-puzzle-input.txt", "utf-8");

  textInput = data;
  console.log(textInput);
}

function getInputArray() {
  textInput = textInput.replaceAll("'", "");

  textInputArray = textInput.split("\n");
}

async function getAnswer() {
  await getTextInput();

  getInputArray();
}

getAnswer();
