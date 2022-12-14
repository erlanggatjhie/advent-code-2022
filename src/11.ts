import { readFile } from "fs/promises";

export class Monkey {
  private _items: number[];
  private _operation: string;
  private _divisibleBy: number;
  private _throwToMonkeyIndex: [number, number]; // [true, false]
  private _numberOfInspected: number;

  constructor(commands: string[]) {
    this._items = [];
    this._operation = "";
    this._divisibleBy = 0;
    this._throwToMonkeyIndex = [0, 0];
    this._numberOfInspected = 0;

    commands.forEach((command) => {
      if (command.startsWith("Starting items:")) {
        this._items = command
          .split(":")[1]
          .trim()
          .split(",")
          .map((data) => parseInt(data.trim()));
      } else if (command.startsWith("Operation:")) {
        this._operation = command.split("=")[1].trim();
      } else if (command.startsWith("Test:")) {
        this._divisibleBy = parseInt(
          command
            .split(":")[1]
            .trim()
            .match(/divisible by (\d+)/)![1]
        );
      } else if (command.startsWith("If true:")) {
        this._throwToMonkeyIndex[0] = parseInt(
          command
            .split(":")[1]
            .trim()
            .match(/throw to monkey (\d+)/)![1]
        );
      } else if (command.startsWith("If false:")) {
        this._throwToMonkeyIndex[1] = parseInt(
          command
            .split(":")[1]
            .trim()
            .match(/throw to monkey (\d+)/)![1]
        );
      }
    });
  }

  private calculate(operand1: number, operand2: number, operation: string) {
    if (operation === "+") {
      return operand1 + operand2;
    } else if (operation === "-") {
      return operand1 - operand2;
    } else if (operation === "*") {
      return operand1 * operand2;
    } else {
      return operand1 / operand2;
    }
  }

  public performAction(monkeys: Monkey[], forPart1: boolean) {
    let inspectedItem = this._items.shift();

    while (inspectedItem) {
      this._numberOfInspected++;

      let operand1 = inspectedItem ?? 0;
      let operand2 = inspectedItem ?? 0;

      const [operandFormula1, operation, operandFormula2] =
        this._operation.split(" ");

      if (operandFormula1 !== "old") {
        operand1 = parseInt(operandFormula1);
      }

      if (operandFormula2 !== "old") {
        operand2 = parseInt(operandFormula2);
      }

      const newWorryLevel = forPart1
        ? Math.floor(this.calculate(operand1, operand2, operation) / 3)
        : Math.floor(this.calculate(operand1, operand2, operation) % 258);

      if (newWorryLevel % this._divisibleBy === 0) {
        monkeys[this._throwToMonkeyIndex[0]].items.push(newWorryLevel);
      } else {
        monkeys[this._throwToMonkeyIndex[1]].items.push(newWorryLevel);
      }

      inspectedItem = this._items.shift();
    }
  }

  get items() {
    return this._items;
  }

  get numberOfInspected() {
    return this._numberOfInspected;
  }
}

export const calculateMonkeyBusiness = async (
  fileName: string,
  numberOfRounds: number,
  forPart1: boolean
): Promise<number> => {
  const monkeyInputs = (await readFile(fileName)).toString().split("\n\n");

  const monkeys = monkeyInputs.map(
    (input) =>
      new Monkey(
        input
          .split("\n")
          .map((i) => i.trim())
          .slice(1)
      )
  );

  for (let round = 0; round < numberOfRounds; round++) {
    monkeys.forEach((monkey) => monkey.performAction(monkeys, forPart1));
  }

  const highest = monkeys
    .map((monkey) => monkey.numberOfInspected)
    .reduce((result, value) => {
      if (result.length < 2) {
        return [...result, value].sort((a, b) => a - b);
      } else if (result[0] <= value) {
        return [value, result[1]].sort((a, b) => a - b);
      }
      return result;
    }, [] as number[]);

  console.log("highest", monkeys);

  return highest[0] * highest[1];
};

const main = async () => {
  //   console.log("part1", await calculateMonkeyBusiness("./input/11.txt", 20, 3));
  console.log(
    "part2",
    await calculateMonkeyBusiness("./input/11-test.txt", 10000, false)
  );
};

main();
