const fs = require("fs").promises;

const numberStringArray = [
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
const digitsMapping = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

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

  let firstStringNumberIndex = input.length;
  let firstStringNumber = "";
  let lastStringNumberIndex = 0;
  let lastStringNumber = "";

  numberStringArray.forEach((numberString) => {
    if (input.includes(numberString)) {
      const indexArray = [];

      for (let i = 0; i < input.length; i++) {
        if (input.indexOf(numberString, i) >= 0) {
          indexArray.push(input.indexOf(numberString, i));
        }
      }

      if (indexArray[0] <= firstStringNumberIndex) {
        firstStringNumberIndex = indexArray[0];

        firstStringNumber = digitsMapping[numberString];
      }

      if (indexArray[indexArray.length - 1] >= lastStringNumberIndex) {
        lastStringNumberIndex = indexArray[indexArray.length - 1];

        lastStringNumber = digitsMapping[numberString];
      }
    }
  });

  // Find if there is a digit number before the first string number
  for (let i = 0; i <= firstStringNumberIndex; i++) {
    if (!isNaN(Number(input[i]))) {
      firstStringNumber = input[i];
      break;
    }
  }

  // Find if there is a digit number after the last string number
  for (let j = input.length; j >= lastStringNumberIndex; j--) {
    if (!isNaN(Number(input[j]))) {
      lastStringNumber = input[j];
      break;
    }
  }

  // Concat the final string values
  sum += firstStringNumber + lastStringNumber;

  return Number(sum);
}

async function getAnswer() {
  let data = await getTextArray();

  let totalSum = 0;

  data.forEach((input) => {
    totalSum += getInputSum(input);
  });

  // totalSum += getInputSum(data[20]);

  console.log(totalSum);
}

getAnswer();
