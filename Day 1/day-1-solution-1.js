const fs = require("fs").promises;

async function getText() {
  const data = await fs.readFile("./Day 1/day-1-puzzle-input.txt", "utf-8");

  return data;
}

async function getTextArray() {
  const textInputArray = (await getText()).split("\r\n");

  return textInputArray;
}

function getInputSum(input) {
  let sum = "";

  for (let i = 0; i < input.length; i++) {
    if (!isNaN(Number(input[i]))) {
      sum += input[i];

      for (let j = input.length - 1; j >= i; j--) {
        if (!isNaN(Number(input[j]))) {
          sum += input[j];

          break;
        }
      }
      break;
    }
  }

  return Number(sum);
}

async function getAnswer() {
  let data = await getTextArray();

  let totalSum = 0;

  data.forEach((input) => {
    totalSum += getInputSum(input);
  });

  console.log(totalSum);
}

getAnswer();
