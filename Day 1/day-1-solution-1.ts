const fs = require("fs").promises;

let textInput: string;
let textInputArray: string[];

async function getTextInput() {
  const data = await fs.readFile("./Day 1/day-1-puzzle-input.txt", "utf-8");

  textInput = data;
  console.log(textInput);
}

function getTextArray() {
  textInput = textInput.replaceAll("'", "");

  textInputArray = textInput.split("\n");
}

function getInputSum(string: string) {}

async function getAnswer() {
  await getTextInput();

  getTextArray();
}

getAnswer();
