import { readFile } from "fs/promises";

const NUMBER_OF_HIGHEST_CALORY = 3;

const main = async () => {
  const result = (await readFile("./input/01.txt"))
    .toString()
    .split("\n\n")
    .map((caloriesData) =>
      caloriesData
        .split("\n")
        .reduce((result, caloryData) => result + parseInt(caloryData, 10), 0)
    )
    .reduce((topCalories, calory) => {
      let result = topCalories;
      if (topCalories.length < NUMBER_OF_HIGHEST_CALORY) {
        result = [...topCalories, calory];
      } else if (topCalories[0] < calory) {
        result = [...topCalories.slice(1), calory];
      }

      result.sort((a, b) => a - b);
      return result;
    }, [] as number[])
    .reduce((result, number) => result + number, 0);

  console.log("result", result);
};

main();
