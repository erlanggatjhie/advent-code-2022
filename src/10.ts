import { readLinesFromFile } from "./utils";

const getRegisterValuePerCycle = (commands: string[]): number[] => {
  let cycle = 1;
  let registerValue = 1;
  let result = [registerValue];

  const increaseCycle = () => {
    result[cycle] = registerValue;
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

export const calculateSignalStrength = (commands: string[]): number => {
  const registers = getRegisterValuePerCycle(commands);

  return [20, 60, 100, 140, 180, 220].reduce(
    (result, cycle) => result + registers[cycle] * cycle,
    0
  );
};

export const drawImage = (commands: string[]): string[] => {
  const registers = getRegisterValuePerCycle(commands);

  return [0, 40, 80, 120, 160, 200].map((cycle) =>
    Array(40)
      .fill(0)
      .reduce((result, _, index) => {
        const pixelPosition = index;
        const register = registers[cycle + pixelPosition + 1] - 1;

        return (
          result +
          (register <= pixelPosition && pixelPosition <= register + 2
            ? "#"
            : ".")
        );
      }, "")
  );
};

const main = async () => {
  const commands = await readLinesFromFile("./input/10.txt");
  console.log("part1", calculateSignalStrength(commands));
  console.log("part2", `\n${drawImage(commands).join("\n")}`);
};

main();
