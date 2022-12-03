import { readFile } from "fs/promises";

const getPriority = (item: string): number => {
  const unicode = item.charCodeAt(0);
  if (unicode >= 65 && unicode <= 90) {
    return unicode - 38;
  }

  return unicode - 96;
};

const getCompartments = (rucksacks: string): [string, string] => {
  const rucksacksMidpoint = rucksacks.length / 2;

  return [
    rucksacks.slice(0, rucksacksMidpoint),
    rucksacks.slice(rucksacksMidpoint, rucksacks.length),
  ];
};

const findBadge = (rucksacks: string[]): string => {
  return rucksacks.reduce((result, rucksack) => {
    if (result.length === 0) {
      return rucksack.split("");
    }

    return result.filter((item) => rucksack.includes(item));
  }, [] as string[])[0];
};

const main = async () => {
  const rucksacks = (await readFile("./input/03.txt")).toString().split("\n");

  const result1 = rucksacks
    .map((rucksack) => {
      const [compartment1, compartment2] = getCompartments(rucksack);
      return getPriority(findBadge([compartment1, compartment2]));
    })
    .reduce((result, priority) => result + priority, 0);

  console.log("part1", result1);

  const result2 = rucksacks
    .reduce((result, rucksack, index) => {
      if (index % 3 === 0) {
        return [...result, [rucksack]];
      }

      result[result.length - 1].push(rucksack);
      return result;
    }, [] as string[][])
    .map((groupRucksacks) => findBadge(groupRucksacks))
    .reduce((result, badge) => result + getPriority(badge), 0);

  console.log("part2", result2);
};

main();
