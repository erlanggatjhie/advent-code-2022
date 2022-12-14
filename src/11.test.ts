import { calculateMonkeyBusiness, Monkey } from "./11";

describe("Monkey", () => {
  it("case 1", () => {
    const monkey0 = new Monkey([
      "Starting items: 1, 22",
      "Operation: new = old + 11",
      "Test: divisible by 2",
      "If true: throw to monkey 1",
      "If false: throw to monkey 2",
    ]);

    const monkey1 = new Monkey([
      "Starting items: 2",
      "Operation: new = old * 1",
      "Test: divisible by 2",
      "If true: throw to monkey 0",
      "If false: throw to monkey 2",
    ]);

    const monkey2 = new Monkey([
      "Starting items: 3",
      "Operation: new = old + 3",
      "Test: divisible by 3",
      "If true: throw to monkey 0",
      "If false: throw to monkey 1",
    ]);

    const monkeys = [monkey0, monkey1, monkey2];

    monkey0.performAction(monkeys, true);

    expect(monkey0.items).toEqual([]);
    expect(monkey1.items).toEqual([2, 4]);
    expect(monkey2.items).toEqual([3, 11]);
  });

  it("case 2", () => {
    const monkey0 = new Monkey([
      "Starting items: 1, 22",
      "Operation: new = old + 11",
      "Test: divisible by 5",
      "If true: throw to monkey 1",
      "If false: throw to monkey 2",
    ]);

    const monkey1 = new Monkey([
      "Starting items: 2",
      "Operation: new = old * 1",
      "Test: divisible by 2",
      "If true: throw to monkey 0",
      "If false: throw to monkey 2",
    ]);

    const monkey2 = new Monkey([
      "Starting items: 3",
      "Operation: new = old + 3",
      "Test: divisible by 3",
      "If true: throw to monkey 0",
      "If false: throw to monkey 1",
    ]);

    const monkeys = [monkey0, monkey1, monkey2];

    monkey0.performAction(monkeys, true);

    expect(monkey0.items).toEqual([]);
    expect(monkey2.items).toEqual([3, 4, 11]);
  });
});

describe("calculate monkey business", () => {
  it("should parse test data", async () => {
    await expect(
      calculateMonkeyBusiness("./input/11-test.txt", 20, true)
    ).resolves.toEqual(10605);
  });
});
