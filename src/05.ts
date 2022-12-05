import { readFile } from "fs/promises";

type Instruction = {
  numberOfCrates: number;
  fromIndex: number;
  toIndex: number;
};

const parseCratesInput = (cratesInput: string): string[][] => {
  const data = cratesInput.split("\n").reverse();
  const numberOfCrates = parseInt(data[0].split("  ").slice(-1)[0].trim());
  const result: string[][] = Array(numberOfCrates)
    .fill(undefined)
    .map(() => []);

  for (let i = 1; i < data.length; i++) {
    const crates = Array(numberOfCrates)
      .fill("")
      .map((_, index) => {
        return data[i].charAt(1 + 4 * index);
      });

    for (let j = 0; j < crates.length; j++) {
      const crate = crates[j];
      if (crate.trim().length !== 0) {
        result[j].push(crate);
      }
    }
  }

  return result;
};

const parseInstruction = (data: string): Instruction[] => {
  return data
    .split("\n")
    .map((instructionString) =>
      instructionString.match(/move (\d+) from (\d+) to (\d+)/)
    )
    .map((instruction) => ({
      numberOfCrates: parseInt(instruction![1]),
      fromIndex: parseInt(instruction![2]) - 1,
      toIndex: parseInt(instruction![3]) - 1,
    }));
};

const moveCrates = (
  crates: string[][],
  instructions: Instruction[]
): string => {
  const result = [...crates];

  instructions.forEach((instruction) => {
    result[instruction.toIndex].push(
      ...result[instruction.fromIndex].splice(-instruction.numberOfCrates)
    );
  });

  return result.map((crates) => crates.slice(-1)[0]).join("");
};

const main = async () => {
  const [cratesInput, strategyInput] = (await readFile("./input/05.txt"))
    .toString()
    .split("\n\n");

  const crates = parseCratesInput(cratesInput);
  const instructions = parseInstruction(strategyInput);

  console.log("result", moveCrates(crates, instructions));
};

main();
