import { readLinesFromFile } from "./utils";

export const calculateSignalStrength = (commands: string[]): number => {
  let cycle = 1;
  let registerValue = 1;
  let result = 0;

  const increaseCycle = () => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      result += cycle * registerValue;
    }
    cycle++;
  };

  commands.forEach((command) => {
    if (command === "noop") {
      increaseCycle();
      return;
    }

    const value = parseInt(command.split(" ")[1]);
    increaseCycle();
    increaseCycle();

    registerValue += value;
  });

  return result;
};

const main = async () => {
  const commands = await readLinesFromFile("./input/10.txt");
  console.log("part1", calculateSignalStrength(commands));
};

main();
