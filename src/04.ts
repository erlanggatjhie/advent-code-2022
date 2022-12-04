import { readLinesFromFile } from "./utils";

const isFullyContain = (range1: number[], range2: number[]): boolean => {
  return (
    (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
    (range2[0] >= range1[0] && range2[1] <= range1[1])
  );
};

const isOverlap = (range1: number[], range2: number[]): boolean => {
  return range1[0] <= range2[1] && range1[1] >= range2[0];
};

const findNumberOfAssigments = (
  assignments: string[],
  filterFn: (range1: number[], range2: number[]) => boolean
): number =>
  assignments.filter((assignment) => {
    const [firstElfSections, secondElfSections] = assignment
      .split(",")
      .map((section) => section.split("-").map((number) => parseInt(number)));

    return filterFn(firstElfSections, secondElfSections);
  }).length;

const main = async () => {
  const assignments = await readLinesFromFile("./input/04.txt");

  const result1 = findNumberOfAssigments(assignments, isFullyContain);
  console.log("result1", result1);

  const result2 = findNumberOfAssigments(assignments, isOverlap);
  console.log("result2", result2);
};

main();
