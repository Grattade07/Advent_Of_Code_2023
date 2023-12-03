const fs = require("fs").promises;

async function getText() {
  const data = await fs.readFile("./Day 2/input.txt", "utf-8");

  return data;
}

async function getTextArray() {
  const textInputArray = (await getText()).split("\r\n");

  return textInputArray;
}

function checkValidCubeNumber(cubesNumber, cubeString) {
  // Check if cube number is valid based on color
  if (cubeString.toLowerCase().includes("blue")) {
    return cubesNumber <= 14 ? true : false;
  } else if (cubeString.toLowerCase().includes("green")) {
    return cubesNumber <= 13 ? true : false;
  } else {
    return cubesNumber <= 12 ? true : false;
  }
}

function getGamePower(gameLine) {
  let fewestBlue;
  let fewestRed;
  let fewestGreen;

  // Remove 'Game XX' string
  const gameSubsets = gameLine.slice(gameLine.indexOf(":") + 1).trim();

  // Split game subsets and trim whitespace
  const gameSubsetArray = gameSubsets.split(";");

  gameSubsetArray.forEach((subset, index) => {
    gameSubsetArray[index] = subset.trim();
  });

  // Loop through each subset and determine if any are invalid rounds
  for (let i = 0; i < gameSubsetArray.length; i++) {
    const game = gameSubsetArray[i];

    const gameCubeList = game.split(",");

    for (let k = 0; k < gameCubeList.length; k++) {
      const cubeString = gameCubeList[k].trim();

      let cubeNumberString = "";

      // Get no. of cubes
      for (let j = 0; j < cubeString.length; j++) {
        // Concat string to get number
        if (!isNaN(cubeString[j])) {
          cubeNumberString += cubeString[j];
        }
        // Once isNaN is true, break as you have got to the end of the number string
        else {
          break;
        }
      }

      // Check what color and if the number is lower than the current number, if number is not yet defined
      if (cubeString.toLowerCase().includes("blue")) {
        if (fewestBlue === undefined) {
          fewestBlue = Number(cubeNumberString);
        } else {
          Number(cubeNumberString) > fewestBlue
            ? (fewestBlue = Number(cubeNumberString))
            : fewestBlue;
        }
      } else if (cubeString.toLowerCase().includes("red")) {
        if (fewestRed === undefined) {
          fewestRed = Number(cubeNumberString);
        } else {
          Number(cubeNumberString) > fewestRed
            ? (fewestRed = Number(cubeNumberString))
            : fewestRed;
        }
      } else if (cubeString.toLowerCase().includes("green")) {
        if (fewestGreen === undefined) {
          fewestGreen = Number(cubeNumberString);
        } else {
          Number(cubeNumberString) > fewestGreen
            ? (fewestGreen = Number(cubeNumberString))
            : fewestGreen;
        }
      }
    }
  }

  return fewestBlue * fewestGreen * fewestRed;
}

async function getAnswer() {
  const data = await getTextArray();

  let powerSum = 0;

  // Find valid games, get sum
  data.forEach((game) => {
    powerSum += getGamePower(game);
  });

  // console.log(getGameValid(data[5]));

  console.log(`The id sum is ${powerSum}`);
}

getAnswer();
