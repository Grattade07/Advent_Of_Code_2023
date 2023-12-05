const fs = require("fs").promises;

async function getText() {
  const data = await fs.readFile("./Day 3/input.txt", "utf-8");

  return data;
}

async function getTextArray() {
  const textInputArray = (await getText()).split("\r\n");

  return textInputArray;
}

function getLineSum(line, index, array) {
  const regexSearch = /[0-9.]/;
  let lineSum = 0;
  let stringPartNumber = "";
  let isNextToSymbol = false;

  // Loop through indexes, to check for number
  for (let i = 0; i <= line.length; i++) {
    if (i === line.length) {
      if (isNextToSymbol) {
        lineSum += Number(stringPartNumber);

        stringPartNumber = "";
      }
      return lineSum;
    } else if (!isNaN(line[i])) {
      // Add to number string
      stringPartNumber += line[i];

      // Check if next to a symbol based on index is flag is not true
      if (isNextToSymbol === false) {
        for (let j = index - 1; j < index + 2; j++) {
          if (isNextToSymbol === true) {
            break;
          } else if (j === index - 1 || j === index + 1) {
            for (let k = i - 1; k < i + 2; k++) {
              if (array[j] && array[j][k] && !regexSearch.test(array[j][k])) {
                isNextToSymbol = true;
                break;
              } else {
                continue;
              }
            }
          } else if (j === index) {
            if (
              array[j] &&
              ((array[j][i - 1] && !regexSearch.test(array[j][i - 1])) ||
                (array[j][i + 1] && !regexSearch.test(array[j][i + 1])))
            ) {
              isNextToSymbol = true;
              break;
            }
          }
        }
      }
    } else {
      if (isNextToSymbol === true) {
        lineSum += Number(stringPartNumber);

        stringPartNumber = "";

        isNextToSymbol = false;
      } else {
        stringPartNumber = "";
      }
    }
  }
}

async function getAnswer() {
  const schematicLineArray = await getTextArray();

  let sumPartNumber = 0;

  // Check each line
  schematicLineArray.forEach((line, index) => {
    sumPartNumber += getLineSum(line, index, schematicLineArray);
  });

  // sumPartNumber += getLineSum(schematicLineArray[139], 139, schematicLineArray);

  console.log(sumPartNumber);
}

getAnswer();
